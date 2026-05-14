import { MongoClient } from 'mongodb'
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
  const { pathname } = new URL(request.url)
  
  if (pathname === '/api/' || pathname === '/api') {
    return Response.json({ 
      message: 'InstitutoDBT.cl API - Centro de Alta Complejidad',
      status: 'operational',
      services: ['leads', 'lakaira-tokens', 'assessments']
    })
  }
  
  return Response.json({ error: 'Endpoint not found' }, { status: 404 })
}

export async function POST(request) {
  const { pathname } = new URL(request.url)
  
  try {
    const body = await request.json()
    
    // Store Fast WhatsApp Capture Lead (Name + Phone)
    if (pathname === '/api/leads/fast-capture') {
      const { fullName, phone, source } = body || {}

      if (!fullName || !phone) {
        return Response.json({ error: 'Nombre y teléfono son obligatorios' }, { status: 400 })
      }

      const cleanName = String(fullName).trim()
      const cleanPhone = String(phone).trim()
      const phoneDigits = cleanPhone.replace(/\D/g, '')

      if (cleanName.length < 2) {
        return Response.json({ error: 'Nombre inválido' }, { status: 400 })
      }
      if (phoneDigits.length < 8) {
        return Response.json({ error: 'Teléfono inválido' }, { status: 400 })
      }

      const db = await connectToDatabase()
      const leadsCollection = db.collection('leads')

      const lead = {
        fullName: cleanName,
        phone: cleanPhone,
        phoneDigits,
        source: 'whatsapp-fast-capture',
        sourceContext: source || 'general',
        createdAt: new Date(),
        status: 'new',
      }

      const result = await leadsCollection.insertOne(lead)

      // Fire-and-forget Telegram notification (only if env token is configured)
      try {
        const TG_TOKEN = process.env.TELEGRAM_BOT_TOKEN
        const TG_CHAT = process.env.TELEGRAM_CHAT_ID || '533798039'
        if (TG_TOKEN) {
          const msg = `🟢 NUEVO LEAD WhatsApp\nNombre: ${cleanName}\nTeléfono: ${cleanPhone}\nOrigen: ${source || 'general'}`
          fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: TG_CHAT, text: msg }),
          }).catch(() => {})
        }
      } catch (_) { /* ignore */ }

      return Response.json({
        success: true,
        leadId: result.insertedId?.toString?.() || null,
        message: 'Lead registrado, redirigiendo a WhatsApp',
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
      
      const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/
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
      const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/
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
        fullName,
        rut,
        email,
        phone,
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
        fullName,
        rut,
        email,
        phone,
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

export async function OPTIONS(request) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}