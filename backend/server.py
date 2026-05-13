from fastapi import FastAPI, APIRouter, HTTPException, Header, UploadFile, File, Form, Depends
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import logging
import secrets
import time
import re
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Email (Resend)
RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '').strip()
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev').strip()
NOTIFICATION_EMAIL = os.environ.get('NOTIFICATION_EMAIL', 'contacto@dbtchile.cl').strip()

# Admin
ADMIN_PIN = os.environ.get('ADMIN_PIN', '240875').strip()

# Uploads
UPLOAD_DIR = ROOT_DIR / 'uploads'
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
ALLOWED_IMAGE_EXT = {'.jpg', '.jpeg', '.png', '.webp', '.gif'}
ALLOWED_PDF_EXT = {'.pdf'}
ALLOWED_UPLOAD_EXT = ALLOWED_IMAGE_EXT | ALLOWED_PDF_EXT
MAX_IMAGE_BYTES = 8 * 1024 * 1024  # 8 MB
MAX_PDF_BYTES = 25 * 1024 * 1024  # 25 MB

# In-memory session store (token -> expiry timestamp)
_admin_sessions: dict[str, float] = {}
_SESSION_TTL_SEC = 60 * 60 * 48  # 48h

try:
    import resend  # type: ignore
    if RESEND_API_KEY:
        resend.api_key = RESEND_API_KEY
    RESEND_AVAILABLE = True
except Exception:
    RESEND_AVAILABLE = False

# Telegram notifications (one-way alerts → clinic owner)
TELEGRAM_BOT_TOKEN = os.environ.get('TELEGRAM_BOT_TOKEN', '').strip()
TELEGRAM_CHAT_ID = os.environ.get('TELEGRAM_CHAT_ID', '').strip()
TELEGRAM_ENABLED = bool(TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID)

app = FastAPI(title="Instituto DBT Chile API")
api_router = APIRouter(prefix="/api")

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# ─── Models ─────────────────────────────────────────────
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class ContactLeadCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=120)
    email: EmailStr
    phone: Optional[str] = Field(default=None, max_length=40)
    message: Optional[str] = Field(default=None, max_length=2000)
    program: Optional[str] = Field(default=None, max_length=80)


class ContactLead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    name: str
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    message: Optional[str] = None
    program: Optional[str] = None
    rut: Optional[str] = None
    source: Optional[str] = None
    status: Optional[str] = None
    handoff_status: Optional[str] = None
    email_status: str  # sent | pending | failed | n/a
    created_at: datetime


class WhatsAppClickIn(BaseModel):
    source: Optional[str] = Field(default="unknown", max_length=40)
    referrer: Optional[str] = Field(default=None, max_length=500)


class WhatsAppHandoffIn(BaseModel):
    """Capture-first payload: name + phone (and optional email/RUT) submitted in
    Serena before WA redirect or as an after-hours intake form."""
    model_config = ConfigDict(extra="ignore")
    name: str = Field(min_length=2, max_length=120)
    phone: Optional[str] = Field(default=None, max_length=40)
    email: Optional[EmailStr] = None
    rut: Optional[str] = Field(default=None, max_length=20)
    source: Optional[str] = Field(default="floating-cta-serena", max_length=40)
    referrer: Optional[str] = Field(default=None, max_length=500)
    handoff_status: Optional[str] = Field(default="open", max_length=20)  # open | after-hours | weekend


class StatsBucket(BaseModel):
    total: int
    today: int
    week: int
    month: int


class StatsResponse(BaseModel):
    whatsapp: StatsBucket
    whatsapp_by_source: dict
    leads: StatsBucket
    leads_email_sent: int
    recent_leads: List[ContactLead]


# ─── Email helpers ──────────────────────────────────────
def _build_lead_email_html(lead: dict) -> str:
    safe = {k: (str(v) if v is not None else '') for k, v in lead.items()}
    return f"""
    <div style="font-family:Arial,Helvetica,sans-serif;background:#F5F1EA;padding:32px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #CEC5B2;">
        <tr>
          <td style="background:#0E2333;padding:28px 32px;">
            <div style="font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#BFA06A;">Instituto DBT Chile</div>
            <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;font-family:Georgia,serif;">Nueva consulta desde el sitio</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 32px;color:#1C1C1C;">
            <p style="margin:0 0 16px;font-size:14px;color:#3D3D3D;">Se ha recibido una nueva solicitud de contacto:</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;color:#1C1C1C;">
              <tr><td style="padding:8px 0;border-bottom:1px solid #EDE7DB;width:130px;"><strong>Nombre</strong></td><td style="padding:8px 0;border-bottom:1px solid #EDE7DB;">{safe['name']}</td></tr>
              <tr><td style="padding:8px 0;border-bottom:1px solid #EDE7DB;"><strong>Email</strong></td><td style="padding:8px 0;border-bottom:1px solid #EDE7DB;">{safe['email']}</td></tr>
              <tr><td style="padding:8px 0;border-bottom:1px solid #EDE7DB;"><strong>Teléfono</strong></td><td style="padding:8px 0;border-bottom:1px solid #EDE7DB;">{safe['phone'] or '—'}</td></tr>
              <tr><td style="padding:8px 0;border-bottom:1px solid #EDE7DB;"><strong>Programa</strong></td><td style="padding:8px 0;border-bottom:1px solid #EDE7DB;">{safe['program'] or '—'}</td></tr>
            </table>
            <div style="margin-top:20px;padding:16px;background:#F5F1EA;border-left:3px solid #BFA06A;font-size:14px;color:#3D3D3D;white-space:pre-wrap;">{safe['message'] or '(sin mensaje)'}</div>
            <p style="margin:24px 0 0;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#BFA06A;">Lead ID · {safe['id']}</p>
          </td>
        </tr>
      </table>
    </div>
    """


# ─── Telegram one-way alerts ────────────────────────────
_TG_MD_ESCAPE_RE = re.compile(r"([_*\[\]()~`>#+\-=|{}.!\\])")


def _tg_escape(text: str) -> str:
    """Escape MarkdownV2 special chars for Telegram."""
    if text is None:
        return ""
    return _TG_MD_ESCAPE_RE.sub(r"\\\1", str(text))


def _format_lead_for_telegram(lead: dict, *, kind: str) -> str:
    """Build a MarkdownV2 message for a new lead.

    kind: 'contact' | 'whatsapp_open' | 'after_hours_lead'
    """
    title_map = {
        "contact": "📩 Nueva consulta · Formulario",
        "whatsapp_open": "🟢 WhatsApp · Lead en horario clínico",
        "after_hours_lead": "🌙 WhatsApp · Lead fuera de horario",
    }
    title = title_map.get(kind, "📩 Nuevo lead")
    name = _tg_escape(lead.get("name") or "—")
    phone = _tg_escape(lead.get("phone") or "—")
    email = _tg_escape(lead.get("email") or "—")
    rut = _tg_escape(lead.get("rut") or "—")
    program = _tg_escape(lead.get("program") or "—")
    source = _tg_escape(lead.get("source") or "—")
    handoff = _tg_escape(lead.get("handoff_status") or "—")
    msg = _tg_escape(lead.get("message") or "")
    created = _tg_escape(lead.get("created_at") or "")

    lines = [
        f"*{title}*",
        "",
        f"👤 *Nombre:* {name}",
        f"📞 *Teléfono:* {phone}",
    ]
    if lead.get("email"):
        lines.append(f"✉️ *Email:* {email}")
    if lead.get("rut"):
        lines.append(f"🆔 *RUT:* {rut}")
    if lead.get("program"):
        lines.append(f"🎯 *Programa:* {program}")
    if lead.get("message"):
        lines.append("")
        lines.append(f"💬 _{msg}_")
    lines.append("")
    lines.append(f"📍 *Origen:* {source}")
    if lead.get("handoff_status"):
        lines.append(f"🕒 *Estado:* {handoff}")
    if created:
        lines.append(f"🗓️ {created}")
    return "\n".join(lines)


async def _send_telegram_alert(lead: dict, *, kind: str) -> str:
    """Send a Telegram alert. Returns: 'sent' | 'disabled' | 'failed'.

    Fire-and-forget friendly: never raises; lead persistence must not depend on this.
    """
    if not TELEGRAM_ENABLED:
        return "disabled"
    try:
        import httpx  # local import to keep startup lean
        text = _format_lead_for_telegram(lead, kind=kind)
        url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
        payload = {
            "chat_id": TELEGRAM_CHAT_ID,
            "text": text,
            "parse_mode": "MarkdownV2",
            "disable_web_page_preview": True,
        }
        async with httpx.AsyncClient(timeout=6.0) as client_:
            r = await client_.post(url, json=payload)
        if r.status_code == 200 and r.json().get("ok"):
            return "sent"
        logger.warning(f"Telegram alert failed ({r.status_code}): {r.text[:200]}")
        # Fallback: retry as plain text if MarkdownV2 escaping caused a 400
        if r.status_code == 400:
            try:
                async with httpx.AsyncClient(timeout=6.0) as client_:
                    r2 = await client_.post(url, json={
                        "chat_id": TELEGRAM_CHAT_ID,
                        "text": text.replace("\\", ""),
                        "disable_web_page_preview": True,
                    })
                if r2.status_code == 200 and r2.json().get("ok"):
                    return "sent"
            except Exception:
                pass
        return "failed"
    except Exception as e:
        logger.warning(f"Telegram alert exception: {e}")
        return "failed"




async def _send_lead_email(lead: dict) -> str:
    """Returns: 'sent' | 'pending' | 'failed'."""
    if not RESEND_API_KEY or not RESEND_AVAILABLE:
        logger.info("Resend API key not configured — email marked as pending.")
        return "pending"
    try:
        params = {
            "from": f"Instituto DBT Chile <{SENDER_EMAIL}>",
            "to": [NOTIFICATION_EMAIL],
            "reply_to": lead.get("email"),
            "subject": f"Nueva consulta — {lead.get('name', 'Sin nombre')}",
            "html": _build_lead_email_html(lead),
        }
        result = await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Lead email sent. id={result.get('id') if isinstance(result, dict) else result}")
        return "sent"
    except Exception as e:
        logger.error(f"Resend error: {e}")
        return "failed"


# ─── Routes ─────────────────────────────────────────────
SITE_ORIGIN = os.environ.get("SITE_ORIGIN", "https://www.institutodbt.cl").rstrip("/")

# Static landing-page sections that should always live in the sitemap
STATIC_SITEMAP_PATHS = [
    ("/", "1.0", "weekly"),
    ("/#tratamiento", "0.9", "monthly"),
    ("/#schema", "0.9", "monthly"),
    ("/#ciencia", "0.9", "monthly"),
    ("/#foro", "0.9", "weekly"),
    ("/#equipo", "0.8", "monthly"),
    ("/#comunidad", "0.8", "monthly"),
    ("/#contacto", "0.8", "monthly"),
]


def _slugify_article(title: str) -> str:
    """Mirrors frontend slugify(strict=true) behavior for sitemap URLs."""
    if not title:
        return ""
    s = title.lower().strip()
    # Replace Spanish accents and common chars
    replacements = {
        "á": "a", "é": "e", "í": "i", "ó": "o", "ú": "u", "ñ": "n",
        "à": "a", "è": "e", "ì": "i", "ò": "o", "ù": "u",
        "â": "a", "ê": "e", "î": "i", "ô": "o", "û": "u",
        "ä": "a", "ë": "e", "ï": "i", "ö": "o", "ü": "u",
    }
    for src, dst in replacements.items():
        s = s.replace(src, dst)
    s = re.sub(r"[^a-z0-9]+", "-", s)
    s = re.sub(r"-+", "-", s).strip("-")
    return s[:80]


def _article_slug(article: dict) -> str:
    base = _slugify_article(article.get("title", ""))
    raw_id = (article.get("id") or "").replace("-", "")
    suffix = raw_id[:8]
    return f"{base}-{suffix}" if suffix else base


async def _build_sitemap_xml() -> str:
    """Build a fresh sitemap.xml from the current article list + static routes."""
    now_iso = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ]
    for path, priority, changefreq in STATIC_SITEMAP_PATHS:
        lines += [
            "  <url>",
            f"    <loc>{SITE_ORIGIN}{path}</loc>",
            f"    <lastmod>{now_iso}</lastmod>",
            f"    <changefreq>{changefreq}</changefreq>",
            f"    <priority>{priority}</priority>",
            "  </url>",
        ]
    cursor = (
        db.articles.find({}, {"_id": 0, "id": 1, "title": 1, "updated_at": 1, "article_date": 1})
        .sort("created_at", -1)
        .limit(500)
    )
    async for art in cursor:
        slug = _article_slug(art)
        if not slug:
            continue
        lastmod = art.get("updated_at") or art.get("article_date") or now_iso
        if isinstance(lastmod, datetime):
            lastmod = lastmod.strftime("%Y-%m-%d")
        elif isinstance(lastmod, str):
            lastmod = lastmod[:10]
        lines += [
            "  <url>",
            f"    <loc>{SITE_ORIGIN}/foro/articulo/{slug}</loc>",
            f"    <lastmod>{lastmod}</lastmod>",
            "    <changefreq>monthly</changefreq>",
            "    <priority>0.85</priority>",
            "  </url>",
        ]
    lines.append("</urlset>")
    return "\n".join(lines)


async def _persist_static_sitemap() -> None:
    """Write sitemap.xml to public/ so the frontend serves it at /sitemap.xml."""
    try:
        xml = await _build_sitemap_xml()
        target = ROOT_DIR.parent / "frontend" / "public" / "sitemap.xml"
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(xml, encoding="utf-8")
        logger.info(f"sitemap.xml regenerated: {target}")
    except Exception as e:
        logger.warning(f"Could not persist static sitemap.xml: {e}")


@api_router.get("/")
async def root():
    return {"message": "Instituto DBT Chile API"}


@api_router.get("/health")
async def health():
    return {
        "status": "ok",
        "email_configured": bool(RESEND_API_KEY) and RESEND_AVAILABLE,
    }


@api_router.get("/sitemap.xml")
async def dynamic_sitemap():
    from fastapi.responses import Response
    xml = await _build_sitemap_xml()
    return Response(content=xml, media_type="application/xml")



@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check.get('timestamp'), str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


@api_router.post("/contact", response_model=ContactLead, status_code=201)
async def create_contact_lead(payload: ContactLeadCreate):
    lead_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc)
    doc = {
        "id": lead_id,
        "name": payload.name.strip(),
        "email": payload.email,
        "phone": (payload.phone or '').strip() or None,
        "message": (payload.message or '').strip() or None,
        "program": (payload.program or '').strip() or None,
        "created_at": now.isoformat(),
        "email_status": "pending",
    }

    # Persist first (source of truth)
    try:
        await db.leads.insert_one({**doc})
    except Exception as e:
        logger.error(f"MongoDB insert failed: {e}")
        raise HTTPException(status_code=500, detail="No se pudo guardar la consulta")

    # Send email (best effort)
    email_status = await _send_lead_email(doc)
    if email_status != doc["email_status"]:
        await db.leads.update_one({"id": lead_id}, {"$set": {"email_status": email_status}})
        doc["email_status"] = email_status

    # Telegram alert (fire-and-forget; never blocks the response)
    asyncio.create_task(_send_telegram_alert(doc, kind="contact"))

    return ContactLead(
        id=doc["id"],
        name=doc["name"],
        email=doc["email"],
        phone=doc["phone"],
        message=doc["message"],
        program=doc["program"],
        email_status=doc["email_status"],
        created_at=now,
    )


@api_router.get("/contact", response_model=List[ContactLead])
async def list_contact_leads(limit: int = 100):
    cursor = db.leads.find({}, {"_id": 0}).sort("created_at", -1).limit(max(1, min(limit, 500)))
    rows = await cursor.to_list(length=limit)
    out: List[ContactLead] = []
    for r in rows:
        ca = r.get("created_at")
        if isinstance(ca, str):
            try:
                ca = datetime.fromisoformat(ca)
            except Exception:
                ca = datetime.now(timezone.utc)
        out.append(ContactLead(
            id=r.get("id", str(uuid.uuid4())),
            name=r.get("name", ""),
            email=r.get("email"),
            phone=r.get("phone"),
            message=r.get("message"),
            program=r.get("program"),
            rut=r.get("rut"),
            source=r.get("source"),
            status=r.get("status"),
            handoff_status=r.get("handoff_status"),
            email_status=r.get("email_status", "pending"),
            created_at=ca or datetime.now(timezone.utc),
        ))
    return out


# ─── Foro · Article models ──────────────────────────────
class ArticleBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=300)
    author: str = Field(..., min_length=1, max_length=200)
    summary: Optional[str] = Field(default=None, max_length=600)
    content: str = Field(default="", max_length=200000)
    category: Optional[str] = Field(default=None, max_length=120)
    cover_url: Optional[str] = Field(default=None, max_length=500)
    pdf_url: Optional[str] = Field(default=None, max_length=500)
    pdf_name: Optional[str] = Field(default=None, max_length=300)
    article_date: Optional[str] = Field(default=None, max_length=40)


class ArticleCreate(ArticleBase):
    pass


class Article(ArticleBase):
    model_config = ConfigDict(extra="ignore")
    id: str
    created_at: datetime
    updated_at: datetime


class AdminLoginRequest(BaseModel):
    pin: str = Field(..., min_length=1, max_length=20)


class AdminLoginResponse(BaseModel):
    token: str
    expires_in: int


# ─── Admin auth helpers ──────────────────────────────
def _purge_expired_sessions() -> None:
    now = time.time()
    expired = [t for t, exp in _admin_sessions.items() if exp < now]
    for t in expired:
        _admin_sessions.pop(t, None)


def require_admin(authorization: str = Header(default="")) -> bool:
    """Validates Bearer token from admin login."""
    _purge_expired_sessions()
    if not authorization or not authorization.lower().startswith("bearer "):
        raise HTTPException(status_code=401, detail="No autorizado")
    token = authorization.split(" ", 1)[1].strip()
    exp = _admin_sessions.get(token)
    if not exp or exp < time.time():
        raise HTTPException(status_code=401, detail="Sesión expirada")
    return True


def _safe_filename(name: str) -> str:
    base = Path(name).stem
    ext = Path(name).suffix.lower()
    base = re.sub(r'[^a-zA-Z0-9_-]', '-', base)[:60] or 'file'
    return f"{base}-{uuid.uuid4().hex[:10]}{ext}"


# ─── Admin & Foro routes ──────────────────────────────
@api_router.post("/admin/login", response_model=AdminLoginResponse)
async def admin_login(payload: AdminLoginRequest):
    if not ADMIN_PIN:
        raise HTTPException(status_code=503, detail="Admin no configurado")
    if payload.pin.strip() != ADMIN_PIN:
        # constant-time compare
        if not secrets.compare_digest(payload.pin.strip(), ADMIN_PIN):
            raise HTTPException(status_code=401, detail="PIN incorrecto")
    _purge_expired_sessions()
    token = secrets.token_urlsafe(28)
    _admin_sessions[token] = time.time() + _SESSION_TTL_SEC
    return AdminLoginResponse(token=token, expires_in=_SESSION_TTL_SEC)


@api_router.post("/admin/logout")
async def admin_logout(authorization: str = Header(default="")):
    if authorization.lower().startswith("bearer "):
        tok = authorization.split(" ", 1)[1].strip()
        _admin_sessions.pop(tok, None)
    return {"ok": True}


@api_router.get("/admin/me")
async def admin_me(_: bool = Depends(require_admin)):
    return {"authenticated": True}


@api_router.post("/admin/upload")
async def admin_upload(
    file: UploadFile = File(...),
    _: bool = Depends(require_admin),
):
    ext = Path(file.filename or '').suffix.lower()
    if ext not in ALLOWED_UPLOAD_EXT:
        raise HTTPException(status_code=400, detail="Formato no permitido. Usa JPG/PNG/WEBP/GIF/PDF.")
    is_pdf = ext in ALLOWED_PDF_EXT
    max_bytes = MAX_PDF_BYTES if is_pdf else MAX_IMAGE_BYTES
    content = await file.read()
    if len(content) > max_bytes:
        if is_pdf:
            raise HTTPException(status_code=400, detail="PDF demasiado grande (máx 25MB).")
        raise HTTPException(status_code=400, detail="Imagen demasiado grande (máx 8MB).")

    # Auto-optimize images: resize + compress for fast web delivery
    final_ext = ext
    final_bytes = content
    if not is_pdf and ext != '.gif':
        try:
            from PIL import Image  # type: ignore
            from io import BytesIO
            img = Image.open(BytesIO(content))
            # Convert RGBA/P → RGB on white bg for JPEG output (smaller)
            if img.mode in ("RGBA", "P", "LA"):
                bg = Image.new("RGB", img.size, (255, 255, 255))
                if img.mode == "P":
                    img = img.convert("RGBA")
                bg.paste(img, mask=img.split()[-1] if img.mode in ("RGBA", "LA") else None)
                img = bg
            elif img.mode != "RGB":
                img = img.convert("RGB")
            # Limit max dimension to 1600px (preserves quality on retina)
            max_side = 1600
            if max(img.size) > max_side:
                ratio = max_side / max(img.size)
                new_size = (int(img.size[0] * ratio), int(img.size[1] * ratio))
                img = img.resize(new_size, Image.LANCZOS)
            buf = BytesIO()
            img.save(buf, format="JPEG", quality=82, optimize=True, progressive=True)
            final_bytes = buf.getvalue()
            final_ext = ".jpg"
        except Exception as e:
            logger.warning(f"Image optimization skipped: {e}")

    src_name = file.filename or f"upload{ext}"
    if final_ext != ext:
        src_name = Path(src_name).stem + final_ext
    filename = _safe_filename(src_name)
    path = UPLOAD_DIR / filename
    path.write_bytes(final_bytes)
    url = f"/api/uploads/{filename}"
    return {
        "url": url,
        "filename": filename,
        "original_name": file.filename or filename,
        "size": len(final_bytes),
        "kind": "pdf" if is_pdf else "image",
    }


@api_router.get("/articles", response_model=List[Article])
async def list_articles(limit: int = 50):
    cursor = db.articles.find({}, {"_id": 0}).sort("created_at", -1).limit(max(1, min(limit, 200)))
    rows = await cursor.to_list(length=limit)
    out: List[Article] = []
    for r in rows:
        for k in ("created_at", "updated_at"):
            if isinstance(r.get(k), str):
                try:
                    r[k] = datetime.fromisoformat(r[k])
                except Exception:
                    r[k] = datetime.now(timezone.utc)
        out.append(Article(**r))
    return out


@api_router.get("/articles/{article_id}", response_model=Article)
async def get_article(article_id: str):
    row = await db.articles.find_one({"id": article_id}, {"_id": 0})
    if not row:
        raise HTTPException(status_code=404, detail="Artículo no encontrado")
    for k in ("created_at", "updated_at"):
        if isinstance(row.get(k), str):
            try:
                row[k] = datetime.fromisoformat(row[k])
            except Exception:
                row[k] = datetime.now(timezone.utc)
    return Article(**row)


@api_router.post("/articles", response_model=Article, status_code=201)
async def create_article(payload: ArticleCreate, _: bool = Depends(require_admin)):
    now = datetime.now(timezone.utc)
    art_id = str(uuid.uuid4())
    doc = payload.model_dump()
    doc["id"] = art_id
    doc["created_at"] = now.isoformat()
    doc["updated_at"] = now.isoformat()
    await db.articles.insert_one({**doc})
    doc["created_at"] = now
    doc["updated_at"] = now
    await _persist_static_sitemap()
    return Article(**doc)


@api_router.put("/articles/{article_id}", response_model=Article)
async def update_article(
    article_id: str,
    payload: ArticleCreate,
    _: bool = Depends(require_admin),
):
    existing = await db.articles.find_one({"id": article_id}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="Artículo no encontrado")
    now = datetime.now(timezone.utc)
    update_doc = payload.model_dump()
    update_doc["updated_at"] = now.isoformat()
    await db.articles.update_one({"id": article_id}, {"$set": update_doc})
    merged = {**existing, **update_doc, "id": article_id}
    for k in ("created_at", "updated_at"):
        if isinstance(merged.get(k), str):
            try:
                merged[k] = datetime.fromisoformat(merged[k])
            except Exception:
                merged[k] = datetime.now(timezone.utc)
    await _persist_static_sitemap()
    return Article(**merged)


@api_router.delete("/articles/{article_id}")
async def delete_article(article_id: str, _: bool = Depends(require_admin)):
    res = await db.articles.delete_one({"id": article_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Artículo no encontrado")
    await _persist_static_sitemap()
    return {"ok": True}


@api_router.post("/whatsapp-click", status_code=201)
async def track_whatsapp_click(payload: WhatsAppClickIn):
    doc = {
        "id": str(uuid.uuid4()),
        "source": (payload.source or "unknown").strip()[:40] or "unknown",
        "referrer": (payload.referrer or "")[:500] or None,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    try:
        await db.wa_clicks.insert_one({**doc})
    except Exception as e:
        logger.warning(f"WA click insert failed: {e}")
    return {"ok": True}


@api_router.post("/whatsapp-handoff", status_code=201)
async def whatsapp_handoff(payload: WhatsAppHandoffIn):
    """Capture-first: store name + phone (and optional email/RUT) in 'leads' BEFORE
    redirecting to WhatsApp. Status logic:
      • handoff_status == 'open'                         → 'whatsapp_initiated'
      • handoff_status in {'after-hours', 'weekend'}     → 'after_hours_lead'
    Always fires a Telegram alert (fire-and-forget) so the clinic is notified live.
    """
    now = datetime.now(timezone.utc)
    name = payload.name.strip()[:120]
    phone = (payload.phone or "").strip()[:40] or None
    email = (payload.email or None)
    rut = (payload.rut or "").strip().upper().replace(" ", "")[:20] or None
    handoff = (payload.handoff_status or "open").strip()[:20]
    if handoff in ("after-hours", "weekend"):
        status = "after_hours_lead"
        alert_kind = "after_hours_lead"
    else:
        status = "whatsapp_initiated"
        alert_kind = "whatsapp_open"

    doc = {
        "id": str(uuid.uuid4()),
        "name": name,
        "rut": rut,
        "email": email,
        "phone": phone,
        "program": None,
        "message": None,
        "source": (payload.source or "floating-cta-serena").strip()[:40],
        "handoff_status": handoff,
        "referrer": (payload.referrer or "")[:500] or None,
        "status": status,
        "email_status": "n/a",
        "created_at": now.isoformat(),
    }
    try:
        await db.leads.insert_one({**doc})
        logger.info(
            f"Capture-first handoff: name={name!r} phone={phone!r} email={email!r} "
            f"rut={rut!r} status={status} handoff_status={handoff}"
        )
    except Exception as e:
        logger.error(f"Capture-first handoff insert failed: {e}")
        raise HTTPException(status_code=500, detail="No se pudo registrar el handoff")

    # Telegram alert (fire-and-forget; never blocks the redirect)
    asyncio.create_task(_send_telegram_alert(doc, kind=alert_kind))

    return {"ok": True, "id": doc["id"], "status": status}


@api_router.get("/admin/stats", response_model=StatsResponse)
async def admin_stats(_: bool = Depends(require_admin)):
    now = datetime.now(timezone.utc)
    today_iso = now.replace(hour=0, minute=0, second=0, microsecond=0).isoformat()
    week_iso = (now - timedelta(days=7)).isoformat()
    month_iso = (now - timedelta(days=30)).isoformat()

    async def _counts(coll):
        total = await coll.count_documents({})
        today = await coll.count_documents({"created_at": {"$gte": today_iso}})
        week = await coll.count_documents({"created_at": {"$gte": week_iso}})
        month = await coll.count_documents({"created_at": {"$gte": month_iso}})
        return StatsBucket(total=total, today=today, week=week, month=month)

    wa_bucket = await _counts(db.wa_clicks)
    leads_bucket = await _counts(db.leads)

    # WhatsApp by source
    wa_by_source: dict = {}
    try:
        cursor = db.wa_clicks.aggregate([
            {"$group": {"_id": "$source", "count": {"$sum": 1}}},
            {"$sort": {"count": -1}},
        ])
        async for row in cursor:
            wa_by_source[row.get("_id") or "unknown"] = row.get("count", 0)
    except Exception as e:
        logger.warning(f"WA aggregation failed: {e}")

    # Email sent count
    leads_email_sent = await db.leads.count_documents({"email_status": "sent"})

    # Recent 10 leads
    recent_rows = await db.leads.find({}, {"_id": 0}).sort("created_at", -1).limit(10).to_list(10)
    recent_leads: List[ContactLead] = []
    for r in recent_rows:
        ca = r.get("created_at")
        if isinstance(ca, str):
            try:
                ca = datetime.fromisoformat(ca)
            except Exception:
                ca = datetime.now(timezone.utc)
        recent_leads.append(ContactLead(
            id=r.get("id", str(uuid.uuid4())),
            name=r.get("name", ""),
            email=r.get("email", "unknown@example.com"),
            phone=r.get("phone"),
            message=r.get("message"),
            program=r.get("program"),
            email_status=r.get("email_status", "pending"),
            created_at=ca or datetime.now(timezone.utc),
        ))

    return StatsResponse(
        whatsapp=wa_bucket,
        whatsapp_by_source=wa_by_source,
        leads=leads_bucket,
        leads_email_sent=leads_email_sent,
        recent_leads=recent_leads,
    )


# Include the router in the main app
app.include_router(api_router)


@app.middleware("http")
async def cache_uploaded_assets(request, call_next):
    response = await call_next(request)
    if request.url.path.startswith("/api/uploads/"):
        response.headers["Cache-Control"] = "public, max-age=31536000, immutable"
    return response


# Mount uploads as static files at /api/uploads/*
app.mount("/api/uploads", StaticFiles(directory=str(UPLOAD_DIR)), name="uploads")

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
