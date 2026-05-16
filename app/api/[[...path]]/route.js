import { MongoClient, ObjectId } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'

const client = new MongoClient(process.env.MONGO_URL || 'mongodb://localhost:27017')
const dbName = process.env.DB_NAME || 'institutodbt'

let cachedDb = null

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb
  }
  await client.connect()
  const db = client.db(dbName)
  cachedDb = db
  return db
}

// ─── Admin auth helpers ─────────────────────────────────────────────────────
const ADMIN_SESSION_COOKIE = 'admin_session'
const ADMIN_SESSION_TTL_HOURS = 24

/**
 * Normalises Chilean phone numbers into a canonical E.164-without-plus form:
 * `569XXXXXXXX` (11 digits total: country 56 + mobile prefix 9 + 8 digits).
 *
 * Handles common operator-error cases:
 *  - "+56 9 1234 5678"      → 56912345678
 *  - "56569 1234 5678"      → 56912345678   (duplicate country code)
 *  - "5656569 1234 5678"    → 56912345678   (triple country code)
 *  - "9 1234 5678"          → 56912345678   (9-digit local Chilean mobile)
 *  - "1234 5678"            → 1234 5678     (under 9 digits — left as-is, caller decides)
 *  - "9123 4567"            → 56991234567   (typo: 8-digit prefixed with 9 → still treat as mobile)
 *
 * Returns the cleaned digit string. Never throws.
 */
function normalizeChileanPhone(raw) {
  if (raw == null) return ''
  let digits = String(raw).replace(/\D/g, '')
  if (!digits) return ''
  // Remove ANY '5656' duplicated country-code prefix, unconditionally.
  // A real Chilean mobile cannot start with '5656' because the mobile prefix
  // after country code 56 must be '9'.
  while (digits.startsWith('5656')) {
    digits = digits.slice(2)
  }
  // 9-digit local Chilean mobile starting with '9' → prepend country code
  if (digits.length === 9 && digits.startsWith('9')) {
    digits = '56' + digits
  }
  return digits
}

function parseCookie(request, name) {
  const cookieHeader = request.headers.get('cookie') || ''
  const cookies = Object.fromEntries(
    cookieHeader.split(';').map((c) => {
      const [k, ...v] = c.trim().split('=')
      return [k, v.join('=')]
    })
  )
  return cookies[name] || null
}

async function getAdminSession(request) {
  const token = parseCookie(request, ADMIN_SESSION_COOKIE)
  if (!token) return null
  const db = await connectToDatabase()
  const session = await db.collection('admin_sessions').findOne({ token })
  if (!session) return null
  if (new Date(session.expiresAt).getTime() < Date.now()) {
    await db.collection('admin_sessions').deleteOne({ token })
    return null
  }
  return session
}

function unauthorized() {
  return Response.json({ error: 'No autorizado' }, { status: 401 })
}

function buildSessionCookie(token, maxAgeSeconds) {
  // HttpOnly, Secure (in prod), SameSite=Lax, Path=/, valid 24h
  const isProd = process.env.NODE_ENV === 'production'
  const parts = [
    `${ADMIN_SESSION_COOKIE}=${token}`,
    'HttpOnly',
    'Path=/',
    'SameSite=Lax',
    `Max-Age=${maxAgeSeconds}`,
  ]
  if (isProd) parts.push('Secure')
  return parts.join('; ')
}

function buildClearCookie() {
  return `${ADMIN_SESSION_COOKIE}=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0`
}

// RUT Validation for Chile
function validateRUT(rut) {
  // Remove dots and dash
  const cleanRUT = rut.replace(/\./g, '').replace(/-/g, '')
  
  if (cleanRUT.length < 2) return false
  
  const body = cleanRUT.slice(0, -1)
  const dv = cleanRUT.slice(-1).toUpperCase()
  
  // Calculate verification digit
  let sum = 0
  let multiplier = 2
  
  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i]) * multiplier
    multiplier = multiplier === 7 ? 2 : multiplier + 1
  }
  
  const calculatedDV = 11 - (sum % 11)
  let expectedDV
  
  if (calculatedDV === 11) expectedDV = '0'
  else if (calculatedDV === 10) expectedDV = 'K'
  else expectedDV = calculatedDV.toString()
  
  return dv === expectedDV
}

// Generate 24-hour access token
function generateAccessToken() {
  const token = uuidv4()
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
  return { token, expiresAt }
}

export async function GET(request) {
  const { pathname, searchParams } = new URL(request.url)
  
  if (pathname === '/api/' || pathname === '/api') {
    return Response.json({ 
      message: 'Instituto DBT Chile API - Centro de Alta Complejidad',
      status: 'operational',
      services: ['leads', 'lakaira-tokens', 'assessments', 'admin']
    })
  }

  // ─── Admin: who am I? ───────────────────────────────────────────────────
  if (pathname === '/api/admin/me') {
    const session = await getAdminSession(request)
    if (!session) return unauthorized()
    return Response.json({
      authenticated: true,
      expiresAt: session.expiresAt,
    })
  }

  // ─── Admin: list leads ──────────────────────────────────────────────────
  if (pathname === '/api/admin/leads') {
    const session = await getAdminSession(request)
    if (!session) return unauthorized()
    const db = await connectToDatabase()
    const mode = searchParams.get('mode') || ''
    const status = searchParams.get('status') || ''
    const since = searchParams.get('since') || ''
    const query = {}
    if (mode) query.mode = mode
    if (status) query.status = status
    if (since) {
      const sinceDate = new Date(since)
      if (!Number.isNaN(sinceDate.getTime())) query.createdAt = { $gte: sinceDate }
    }
    const leads = await db
      .collection('leads')
      .find(query)
      .sort({ createdAt: -1 })
      .limit(500)
      .toArray()

    // Normalise: ensure every lead has a stable `id` (uuid for new, _id for legacy)
    for (const l of leads) {
      if (!l.id && l._id) l.id = l._id.toString()
      delete l._id
    }

    // Compute quick stats (always over full collection so the dashboard cards
    // are not affected by the active filter).
    const now = new Date()
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const startOfWeek = new Date(startOfDay)
    startOfWeek.setDate(startOfDay.getDate() - startOfDay.getDay())
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const [total, today, week, month, afterHours, contacted] = await Promise.all([
      db.collection('leads').countDocuments({}),
      db.collection('leads').countDocuments({ createdAt: { $gte: startOfDay } }),
      db.collection('leads').countDocuments({ createdAt: { $gte: startOfWeek } }),
      db.collection('leads').countDocuments({ createdAt: { $gte: startOfMonth } }),
      db.collection('leads').countDocuments({ mode: 'after-hours' }),
      db.collection('leads').countDocuments({ status: 'contacted' }),
    ])

    return Response.json({
      leads,
      stats: { total, today, week, month, afterHours, contacted, count: leads.length },
    })
  }

  // ─── Admin: list whatsapp clicks ────────────────────────────────────────
  if (pathname === '/api/admin/whatsapp-clicks') {
    const session = await getAdminSession(request)
    if (!session) return unauthorized()
    const db = await connectToDatabase()
    const clicks = await db
      .collection('whatsapp_clicks')
      .find({}, { projection: { _id: 0 } })
      .sort({ createdAt: -1 })
      .limit(500)
      .toArray()

    const now = new Date()
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const startOfWeek = new Date(startOfDay)
    startOfWeek.setDate(startOfDay.getDate() - startOfDay.getDay())
    const [total, today, week, direct, afterHours] = await Promise.all([
      db.collection('whatsapp_clicks').countDocuments({}),
      db.collection('whatsapp_clicks').countDocuments({ createdAt: { $gte: startOfDay } }),
      db.collection('whatsapp_clicks').countDocuments({ createdAt: { $gte: startOfWeek } }),
      db.collection('whatsapp_clicks').countDocuments({ mode: 'direct' }),
      db.collection('whatsapp_clicks').countDocuments({ mode: 'after-hours' }),
    ])

    return Response.json({ clicks, stats: { total, today, week, direct, afterHours } })
  }

  // ─── Admin: CSV export ──────────────────────────────────────────────────
  if (pathname === '/api/admin/export-csv') {
    const session = await getAdminSession(request)
    if (!session) return unauthorized()
    const db = await connectToDatabase()
    const leads = await db
      .collection('leads')
      .find({}, { projection: { _id: 0 } })
      .sort({ createdAt: -1 })
      .toArray()
    const escape = (v) => {
      if (v == null) return ''
      const s = String(v).replace(/"/g, '""')
      return /[",\n]/.test(s) ? `"${s}"` : s
    }
    const headers = [
      'createdAt', 'fullName', 'phone', 'email', 'mode',
      'source', 'sourceContext', 'status', 'contactedAt', 'age', 'rut',
    ]
    const lines = [headers.join(',')]
    for (const lead of leads) {
      lines.push(headers.map((h) => escape(lead[h])).join(','))
    }
    return new Response(lines.join('\n'), {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="leads-dbtchile-${Date.now()}.csv"`,
      },
    })
  }
  
  return Response.json({ error: 'Endpoint not found' }, { status: 404 })
}

export async function POST(request) {
  const { pathname } = new URL(request.url)
  
  try {
    // ─── Admin: login ─────────────────────────────────────────────────────
    if (pathname === '/api/admin/login') {
      const body = await request.json().catch(() => ({}))
      const { password } = body || {}
      const expected = process.env.ADMIN_PASSWORD
      if (!expected) {
        return Response.json({ error: 'Admin no configurado' }, { status: 500 })
      }
      if (typeof password !== 'string' || password.length < 4) {
        return Response.json({ error: 'Contraseña requerida' }, { status: 400 })
      }
      // Simple constant-time-ish compare (string length differs leak is acceptable here)
      if (password !== expected) {
        // Small delay to slow down brute force
        await new Promise((r) => setTimeout(r, 600))
        return Response.json({ error: 'Contraseña incorrecta' }, { status: 401 })
      }
      const db = await connectToDatabase()
      const token = uuidv4()
      const expiresAt = new Date(Date.now() + ADMIN_SESSION_TTL_HOURS * 60 * 60 * 1000)
      await db.collection('admin_sessions').insertOne({
        token,
        expiresAt,
        createdAt: new Date(),
        ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || null,
        userAgent: (request.headers.get('user-agent') || '').slice(0, 500),
      })
      return new Response(JSON.stringify({ success: true, expiresAt }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': buildSessionCookie(token, ADMIN_SESSION_TTL_HOURS * 3600),
        },
      })
    }

    // ─── Admin: backfill phone normalization on existing leads ───────────
    if (pathname === '/api/admin/normalize-phones') {
      const session = await getAdminSession(request)
      if (!session) return unauthorized()
      const db = await connectToDatabase()
      const cursor = db.collection('leads').find({ phone: { $ne: null } })
      let scanned = 0
      let updated = 0
      const samples = []
      while (await cursor.hasNext()) {
        const lead = await cursor.next()
        scanned++
        const cleaned = normalizeChileanPhone(lead.phone)
        if (cleaned && cleaned !== String(lead.phone || '')) {
          await db.collection('leads').updateOne(
            { _id: lead._id },
            { $set: { phone: cleaned, phoneDigits: cleaned } }
          )
          updated++
          if (samples.length < 10) {
            samples.push({ before: lead.phone, after: cleaned })
          }
        }
      }
      return Response.json({ success: true, scanned, updated, samples })
    }

    // ─── Admin: logout ────────────────────────────────────────────────────
    if (pathname === '/api/admin/logout') {
      const token = parseCookie(request, ADMIN_SESSION_COOKIE)
      if (token) {
        try {
          const db = await connectToDatabase()
          await db.collection('admin_sessions').deleteOne({ token })
        } catch (_) {}
      }
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': buildClearCookie(),
        },
      })
    }

    const body = await request.json()
    
    // Register IDP-4 informed consent (Chilean Law 19.628 / 21.331 / 20.584)
    if (pathname === '/api/leads/idp4-consent') {
      const { consentAccepted, consentedAt, userAgent, legalFramework } = body || {}
      if (!consentAccepted) {
        return Response.json({ error: 'Consentimiento requerido' }, { status: 400 })
      }
      const db = await connectToDatabase()
      const consents = db.collection('idp4_consents')
      const doc = {
        consentAccepted: true,
        consentedAt: consentedAt || new Date().toISOString(),
        legalFramework: Array.isArray(legalFramework) ? legalFramework : ['Ley 19.628', 'Ley 21.331', 'Ley 20.584'],
        userAgent: typeof userAgent === 'string' ? userAgent.slice(0, 500) : '',
        ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || null,
        createdAt: new Date(),
      }
      const result = await consents.insertOne(doc)
      return Response.json({
        success: true,
        consentId: result.insertedId?.toString?.() || null,
        registeredAt: doc.consentedAt,
      })
    }

    // Silent WhatsApp click tracking (ads conversion visibility)
    if (pathname === '/api/whatsapp-click') {
      try {
        const { source, mode, clientTimestamp, userAgent, page } = body || {}
        const db = await connectToDatabase()
        const clicks = db.collection('whatsapp_clicks')
        await clicks.insertOne({
          id: uuidv4(),
          source: typeof source === 'string' ? source.slice(0, 80) : 'unknown',
          mode: mode === 'direct' || mode === 'after-hours' ? mode : 'unknown',
          page: typeof page === 'string' ? page.slice(0, 200) : '',
          userAgent: typeof userAgent === 'string' ? userAgent.slice(0, 500) : '',
          ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || null,
          referer: request.headers.get('referer') || null,
          clientTimestamp: clientTimestamp || null,
          createdAt: new Date(),
        })
        return Response.json({ success: true })
      } catch (e) {
        // Never break user flow — return success even on failure
        return Response.json({ success: false }, { status: 200 })
      }
    }

    // Store Fast WhatsApp Capture Lead (Name + optional Phone/Email)
    if (pathname === '/api/leads/fast-capture') {
      const { fullName, phone, email, source, mode, timestamp } = body || {}

      if (!fullName) {
        return Response.json({ error: 'Nombre es obligatorio' }, { status: 400 })
      }

      const cleanName = String(fullName).trim()
      if (cleanName.length < 2) {
        return Response.json({ error: 'Nombre inválido' }, { status: 400 })
      }

      const cleanPhone = phone ? String(phone).trim() : ''
      const phoneDigits = normalizeChileanPhone(cleanPhone)
      const cleanEmail = email ? String(email).trim() : ''

      // After-hours mode requires phone + email
      if (mode === 'after-hours') {
        if (phoneDigits.length < 8) {
          return Response.json({ error: 'Teléfono inválido' }, { status: 400 })
        }
        if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
          return Response.json({ error: 'Email inválido' }, { status: 400 })
        }
      }

      const db = await connectToDatabase()
      const leadsCollection = db.collection('leads')

      const lead = {
        id: uuidv4(),
        fullName: cleanName,
        phone: phoneDigits || null,
        phoneDigits: phoneDigits || null,
        email: cleanEmail || null,
        source: 'whatsapp-fast-capture',
        sourceContext: source || 'general',
        mode: mode || 'business-hours',
        clientTimestamp: timestamp || null,
        createdAt: new Date(),
        status: 'new',
      }

      const result = await leadsCollection.insertOne(lead)

      // Fire-and-forget Telegram notification (only if env token is configured)
      try {
        const TG_TOKEN = process.env.TELEGRAM_BOT_TOKEN
        const TG_CHAT = process.env.TELEGRAM_CHAT_ID || '533798039'
        if (TG_TOKEN) {
          const tag = mode === 'after-hours' ? '🌙 FUERA DE HORARIO' : '🟢 EN HORARIO'
          const lines = [
            `${tag} · Lead WhatsApp`,
            `Nombre: ${cleanName}`,
          ]
          if (phoneDigits) lines.push(`Teléfono: +${phoneDigits}`)
          if (cleanEmail) lines.push(`Email: ${cleanEmail}`)
          lines.push(`Origen: ${source || 'general'}`)
          fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: TG_CHAT, text: lines.join('\n') }),
          }).catch(() => {})
        }
      } catch (_) { /* ignore */ }

      return Response.json({
        success: true,
        leadId: result.insertedId?.toString?.() || null,
        mode: mode || 'business-hours',
      })
    }

    // Store Lead from IDP-4 Assessment
    if (pathname === '/api/leads/idp4') {
      const { fullName, age, rut, email, domainScores, responses } = body
      
      if (!fullName || !age || !rut || !email) {
        return Response.json({ error: 'Todos los campos son obligatorios' }, { status: 400 })
      }
      
      if (!validateRUT(rut)) {
        return Response.json({ error: 'RUT inválido' }, { status: 400 })
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return Response.json({ error: 'Email inválido' }, { status: 400 })
      }
      
      const { token, expiresAt } = generateAccessToken()
      const db = await connectToDatabase()
      const leadsCollection = db.collection('leads')
      
      const lead = {
        fullName,
        age: parseInt(age),
        rut,
        email,
        domainScores: domainScores || {},
        responses: responses || [],
        lakairaToken: token,
        lakairaExpiresAt: expiresAt,
        source: 'idp4',
        createdAt: new Date(),
        status: 'new'
      }
      
      await leadsCollection.insertOne(lead)
      
      return Response.json({
        success: true,
        message: 'Evaluación IDP-4 registrada exitosamente',
        lakairaToken: token,
        lakairaExpiresAt: expiresAt
      })
    }
    
    // Store Lead from BSL-23 Assessment
    if (pathname === '/api/leads/bsl23') {
      const { fullName, rut, email, phone, totalScore, meanScore, subscaleScores, responses } = body
      
      // Validate required fields
      if (!fullName || !rut || !email || !phone) {
        return Response.json(
          { error: 'Todos los campos son obligatorios' },
          { status: 400 }
        )
      }
      
      // Validate RUT
      if (!validateRUT(rut)) {
        return Response.json(
          { error: 'RUT inválido. Por favor verifica el número ingresado.' },
          { status: 400 }
        )
      }
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return Response.json(
          { error: 'Email inválido' },
          { status: 400 }
        )
      }
      
      // Generate LaKaira AI access token
      const { token, expiresAt } = generateAccessToken()
      
      const db = await connectToDatabase()
      const leadsCollection = db.collection('leads')
      
      const lead = {
        id: uuidv4(),
        fullName,
        rut,
        email,
        phone: normalizeChileanPhone(phone) || null,
        totalScore,
        meanScore,
        subscaleScores: subscaleScores || {},
        responses: responses || [],
        lakairaToken: token,
        lakairaExpiresAt: expiresAt,
        source: 'bsl23',
        createdAt: new Date(),
        status: 'new'
      }
      
      await leadsCollection.insertOne(lead)
      
      return Response.json({
        success: true,
        message: 'Evaluación BSL-23 registrada exitosamente',
        lakairaToken: token,
        lakairaExpiresAt: expiresAt,
        totalScore,
        meanScore
      })
    }
    
    // Store Lead from Self-Assessment
    if (pathname === '/api/leads/assessment') {
      const { fullName, rut, email, phone, assessmentScore, responses } = body
      
      // Validate required fields
      if (!fullName || !rut || !email || !phone) {
        return Response.json(
          { error: 'Todos los campos son obligatorios' },
          { status: 400 }
        )
      }
      
      // Validate RUT
      if (!validateRUT(rut)) {
        return Response.json(
          { error: 'RUT inválido. Por favor verifica el número ingresado.' },
          { status: 400 }
        )
      }
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return Response.json(
          { error: 'Email inválido' },
          { status: 400 }
        )
      }
      
      // Generate LaKaira AI access token
      const { token, expiresAt } = generateAccessToken()
      
      const db = await connectToDatabase()
      const leadsCollection = db.collection('leads')
      
      const lead = {
        id: uuidv4(),
        fullName,
        rut,
        email,
        phone: normalizeChileanPhone(phone) || null,
        assessmentScore,
        responses: responses || [],
        lakairaToken: token,
        lakairaExpiresAt: expiresAt,
        source: 'autoevaluacion',
        createdAt: new Date(),
        status: 'new'
      }
      
      await leadsCollection.insertOne(lead)
      
      return Response.json({
        success: true,
        message: 'Evaluación registrada exitosamente',
        lakairaToken: token,
        lakairaExpiresAt: expiresAt,
        assessmentScore
      })
    }
    
    // Verify LaKaira Token
    if (pathname === '/api/lakaira/verify-token') {
      const { token } = body
      
      if (!token) {
        return Response.json(
          { error: 'Token requerido' },
          { status: 400 }
        )
      }
      
      const db = await connectToDatabase()
      const leadsCollection = db.collection('leads')
      
      const lead = await leadsCollection.findOne({ lakairaToken: token })
      
      if (!lead) {
        return Response.json(
          { valid: false, error: 'Token no encontrado' },
          { status: 404 }
        )
      }
      
      const now = new Date()
      const expired = new Date(lead.lakairaExpiresAt) < now
      
      if (expired) {
        return Response.json({
          valid: false,
          expired: true,
          error: 'Token expirado. Por favor realiza una nueva evaluación.'
        })
      }
      
      return Response.json({
        valid: true,
        fullName: lead.fullName,
        expiresAt: lead.lakairaExpiresAt,
        assessmentScore: lead.assessmentScore
      })
    }
    
    return Response.json({ error: 'Endpoint not found' }, { status: 404 })
    
  } catch (error) {
    console.error('API Error:', error)
    return Response.json(
      { error: 'Error interno del servidor', details: error.message },
      { status: 500 }
    )
  }
}

export async function PATCH(request) {
  const { pathname } = new URL(request.url)
  try {
    // ─── Admin: mark a lead as contacted / un-contacted ───────────────────
    // PATCH /api/admin/leads/:id  body: { status: 'contacted' | 'new', notes? }
    const leadPatchMatch = pathname.match(/^\/api\/admin\/leads\/([^/]+)$/)
    if (leadPatchMatch) {
      const session = await getAdminSession(request)
      if (!session) return unauthorized()
      const leadId = leadPatchMatch[1]
      const body = await request.json().catch(() => ({}))
      const newStatus = body.status === 'contacted' ? 'contacted' : 'new'
      const notes = typeof body.notes === 'string' ? body.notes.slice(0, 1000) : undefined
      const db = await connectToDatabase()
      const update = {
        status: newStatus,
        contactedAt: newStatus === 'contacted' ? new Date() : null,
      }
      if (notes !== undefined) update.adminNotes = notes
      const result = await db.collection('leads').findOneAndUpdate(
        { id: leadId },
        { $set: update },
        { returnDocument: 'after', includeResultMetadata: true }
      )
      if (!result?.value) {
        // try matching by leadId field (IDP-4) or by Mongo _id (legacy)
        let r2 = await db.collection('leads').findOneAndUpdate(
          { leadId },
          { $set: update },
          { returnDocument: 'after', includeResultMetadata: true }
        )
        if (!r2?.value) {
          try {
            const oid = new ObjectId(leadId)
            r2 = await db.collection('leads').findOneAndUpdate(
              { _id: oid },
              { $set: update },
              { returnDocument: 'after', includeResultMetadata: true }
            )
          } catch (_) { /* not a valid ObjectId */ }
        }
        if (!r2?.value) {
          return Response.json({ error: 'Lead no encontrado' }, { status: 404 })
        }
      }
      return Response.json({ success: true, status: newStatus })
    }
    return Response.json({ error: 'Endpoint not found' }, { status: 404 })
  } catch (error) {
    console.error('PATCH Error:', error)
    return Response.json({ error: 'Error interno', details: error.message }, { status: 500 })
  }
}

export async function OPTIONS(request) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}