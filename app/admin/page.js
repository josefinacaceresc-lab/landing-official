'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from '@/components/ui/select'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import {
  Tabs, TabsContent, TabsList, TabsTrigger,
} from '@/components/ui/tabs'
import {
  Lock, AlertCircle, LogOut, Download, RefreshCw, CheckCircle2,
  Clock, Phone, Mail, MessageCircle, TrendingUp, Users, Moon, Sun, Search,
} from 'lucide-react'

// ─── Helpers ──────────────────────────────────────────────────────────────
function formatDate(iso) {
  if (!iso) return '—'
  try {
    const d = new Date(iso)
    return d.toLocaleString('es-CL', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit', timeZone: 'America/Santiago',
    })
  } catch (_) { return '—' }
}

function StatCard({ label, value, icon: Icon, color = 'emerald' }) {
  const colorMap = {
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    amber: 'bg-amber-50 text-amber-700 border-amber-100',
    sky: 'bg-sky-50 text-sky-700 border-sky-100',
    violet: 'bg-violet-50 text-violet-700 border-violet-100',
    slate: 'bg-slate-50 text-slate-700 border-slate-200',
  }
  return (
    <div className={`rounded-lg border p-4 ${colorMap[color]}`}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium opacity-75 uppercase tracking-wide">{label}</span>
        {Icon && <Icon className="w-4 h-4 opacity-60" />}
      </div>
      <div className="text-2xl font-light">{value}</div>
    </div>
  )
}

// ─── Main page (single-file, gated render) ───────────────────────────────
export default function AdminPage() {
  const [view, setView] = useState('loading') // loading | login | dashboard
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const [leads, setLeads] = useState([])
  const [clicks, setClicks] = useState([])
  const [leadStats, setLeadStats] = useState({})
  const [clickStats, setClickStats] = useState({})
  const [refreshing, setRefreshing] = useState(false)
  const [filterMode, setFilterMode] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // ─── Auth check on mount ──
  useEffect(() => {
    fetch('/api/admin/me', { credentials: 'include' })
      .then((r) => setView(r.ok ? 'dashboard' : 'login'))
      .catch(() => setView('login'))
  }, [])

  // ─── Load data when authenticated ──
  const loadData = useCallback(async () => {
    setRefreshing(true)
    try {
      const params = new URLSearchParams()
      if (filterMode !== 'all') params.set('mode', filterMode)
      if (filterStatus !== 'all') params.set('status', filterStatus)
      const [leadsRes, clicksRes] = await Promise.all([
        fetch(`/api/admin/leads?${params.toString()}`, { credentials: 'include' }),
        fetch('/api/admin/whatsapp-clicks', { credentials: 'include' }),
      ])
      if (leadsRes.status === 401) {
        setView('login')
        return
      }
      const leadsData = await leadsRes.json()
      const clicksData = await clicksRes.json()
      setLeads(leadsData.leads || [])
      setLeadStats(leadsData.stats || {})
      setClicks(clicksData.clicks || [])
      setClickStats(clicksData.stats || {})
    } finally {
      setRefreshing(false)
    }
  }, [filterMode, filterStatus])

  useEffect(() => {
    if (view === 'dashboard') loadData()
  }, [view, filterMode, filterStatus, loadData])

  // ─── Actions ──
  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginError('')
    setSubmitting(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
        credentials: 'include',
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setLoginError(data?.error || 'Contraseña incorrecta')
        setSubmitting(false)
        return
      }
      setPassword('')
      setView('dashboard')
    } catch (err) {
      setLoginError('No se pudo conectar. Intenta de nuevo.')
      setSubmitting(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST', credentials: 'include' })
    setView('login')
  }

  const toggleContacted = async (lead) => {
    const newStatus = lead.status === 'contacted' ? 'new' : 'contacted'
    const res = await fetch(`/api/admin/leads/${encodeURIComponent(lead.id)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
      credentials: 'include',
    })
    if (res.ok) loadData()
  }

  const openWhatsApp = (phone, name) => {
    const digits = String(phone || '').replace(/\D/g, '')
    if (!digits) return
    const intl = digits.startsWith('56') ? digits : `56${digits}`
    const firstName = name?.split(' ')[0] || ''
    const text = encodeURIComponent(`Hola ${firstName}, te contacto desde Instituto DBT Chile. ¿Cómo estás?`)
    window.open(`https://wa.me/${intl}?text=${text}`, '_blank', 'noopener,noreferrer')
  }

  const exportCsv = () => { window.location.href = '/api/admin/export-csv' }

  const filteredLeads = leads.filter((l) => {
    if (!searchTerm) return true
    const s = searchTerm.toLowerCase()
    return [l.fullName, l.email, l.phone, l.sourceContext].some(
      (v) => v && String(v).toLowerCase().includes(s)
    )
  })

  // ─── Render: LOADING ──
  if (view === 'loading') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500">
        <RefreshCw className="w-5 h-5 animate-spin mr-2" /> Cargando…
      </div>
    )
  }

  // ─── Render: LOGIN ──
  if (view === 'login') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-emerald-50 via-white to-slate-100">
        <Card className="w-full max-w-md shadow-xl border-0">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center mb-3">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-light text-slate-900">
              Panel Instituto DBT Chile
            </CardTitle>
            <p className="text-sm text-slate-500 mt-1">
              Acceso privado · Solo personal autorizado
            </p>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Tu clave de acceso"
                  autoFocus
                  required
                  className="h-11"
                />
              </div>
              {loginError && (
                <div className="flex items-start gap-2 p-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}
              <Button
                type="submit"
                disabled={submitting || password.length < 4}
                className="w-full bg-emerald-600 hover:bg-emerald-700 h-11"
              >
                {submitting ? 'Verificando…' : 'Entrar al panel'}
              </Button>
            </form>
            <p className="mt-6 text-xs text-center text-slate-400">
              Sesión válida por 24 horas · Datos cifrados
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // ─── Render: DASHBOARD ──
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-slate-900">Panel · Leads</h1>
            <p className="text-xs text-slate-500">Instituto DBT Chile</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={loadData} disabled={refreshing}>
              <RefreshCw className={`w-4 h-4 mr-1.5 ${refreshing ? 'animate-spin' : ''}`} />
              Actualizar
            </Button>
            <Button variant="outline" size="sm" onClick={exportCsv}>
              <Download className="w-4 h-4 mr-1.5" />
              CSV
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-1.5" />
              Salir
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <Tabs defaultValue="leads" className="space-y-6">
          <TabsList>
            <TabsTrigger value="leads">
              <Users className="w-4 h-4 mr-1.5" />
              Leads ({leadStats.total || 0})
            </TabsTrigger>
            <TabsTrigger value="clicks">
              <MessageCircle className="w-4 h-4 mr-1.5" />
              Clics WhatsApp ({clickStats.total || 0})
            </TabsTrigger>
          </TabsList>

          {/* LEADS */}
          <TabsContent value="leads" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
              <StatCard label="Hoy" value={leadStats.today || 0} icon={TrendingUp} color="emerald" />
              <StatCard label="Esta semana" value={leadStats.week || 0} icon={TrendingUp} color="sky" />
              <StatCard label="Este mes" value={leadStats.month || 0} icon={TrendingUp} color="violet" />
              <StatCard label="Total" value={leadStats.total || 0} icon={Users} color="slate" />
              <StatCard label="Off-hours" value={leadStats.afterHours || 0} icon={Moon} color="amber" />
              <StatCard label="Contactados" value={leadStats.contacted || 0} icon={CheckCircle2} color="emerald" />
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <Input
                      placeholder="Buscar por nombre, email, teléfono…"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <Select value={filterMode} onValueChange={setFilterMode}>
                    <SelectTrigger className="w-full sm:w-48"><SelectValue placeholder="Modo" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los modos</SelectItem>
                      <SelectItem value="business-hours">En horario</SelectItem>
                      <SelectItem value="after-hours">Fuera de horario</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-full sm:w-48"><SelectValue placeholder="Estado" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los estados</SelectItem>
                      <SelectItem value="new">Nuevos</SelectItem>
                      <SelectItem value="contacted">Contactados</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-32">Fecha</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Contacto</TableHead>
                        <TableHead>Origen</TableHead>
                        <TableHead>Modo</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLeads.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center text-slate-400 py-8">
                            No hay leads con esos filtros.
                          </TableCell>
                        </TableRow>
                      )}
                      {filteredLeads.map((lead) => (
                        <TableRow key={lead.id} className={lead.status === 'contacted' ? 'opacity-60' : ''}>
                          <TableCell className="text-xs text-slate-600 whitespace-nowrap">
                            {formatDate(lead.createdAt)}
                          </TableCell>
                          <TableCell className="font-medium">{lead.fullName}</TableCell>
                          <TableCell className="text-sm space-y-0.5">
                            {lead.phone && (
                              <div className="flex items-center gap-1.5 text-slate-700">
                                <Phone className="w-3 h-3 text-slate-400" />{lead.phone}
                              </div>
                            )}
                            {lead.email && (
                              <div className="flex items-center gap-1.5 text-slate-700">
                                <Mail className="w-3 h-3 text-slate-400" />
                                <span className="truncate max-w-[180px]">{lead.email}</span>
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="text-xs">
                              {lead.sourceContext || lead.source || '—'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {lead.mode === 'after-hours' ? (
                              <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                                <Moon className="w-3 h-3 mr-1" /> Off-hours
                              </Badge>
                            ) : (
                              <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
                                <Sun className="w-3 h-3 mr-1" /> En horario
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {lead.status === 'contacted' ? (
                              <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white">
                                <CheckCircle2 className="w-3 h-3 mr-1" /> Contactado
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-slate-700">
                                <Clock className="w-3 h-3 mr-1" /> Pendiente
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right space-x-1">
                            {lead.phone && (
                              <Button
                                size="sm" variant="ghost"
                                className="text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50"
                                onClick={() => openWhatsApp(lead.phone, lead.fullName)}
                                title="Abrir WhatsApp"
                              >
                                <MessageCircle className="w-4 h-4" />
                              </Button>
                            )}
                            <Button
                              size="sm" variant="ghost"
                              onClick={() => toggleContacted(lead)}
                              title={lead.status === 'contacted' ? 'Desmarcar' : 'Marcar contactado'}
                              className={lead.status === 'contacted' ? 'text-slate-500' : 'text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50'}
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <p className="text-xs text-slate-400 mt-3">
                  Mostrando {filteredLeads.length} de {leadStats.count || leads.length} leads (límite: 500 más recientes)
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* CLICKS */}
          <TabsContent value="clicks" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <StatCard label="Hoy" value={clickStats.today || 0} icon={TrendingUp} color="emerald" />
              <StatCard label="Esta semana" value={clickStats.week || 0} icon={TrendingUp} color="sky" />
              <StatCard label="Total" value={clickStats.total || 0} icon={MessageCircle} color="slate" />
              <StatCard label="Directos" value={clickStats.direct || 0} icon={Sun} color="emerald" />
              <StatCard label="Off-hours" value={clickStats.afterHours || 0} icon={Moon} color="amber" />
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-32">Fecha</TableHead>
                        <TableHead>Origen</TableHead>
                        <TableHead>Página</TableHead>
                        <TableHead>Modo</TableHead>
                        <TableHead>IP</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {clicks.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center text-slate-400 py-8">
                            Aún no se han registrado clics.
                          </TableCell>
                        </TableRow>
                      )}
                      {clicks.map((c) => (
                        <TableRow key={c.id}>
                          <TableCell className="text-xs text-slate-600 whitespace-nowrap">
                            {formatDate(c.createdAt)}
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="text-xs">{c.source || '—'}</Badge>
                          </TableCell>
                          <TableCell className="text-xs text-slate-600 max-w-[200px] truncate">
                            {c.page || '—'}
                          </TableCell>
                          <TableCell>
                            {c.mode === 'after-hours' ? (
                              <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                                <Moon className="w-3 h-3 mr-1" /> Off-hours
                              </Badge>
                            ) : (
                              <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
                                <Sun className="w-3 h-3 mr-1" /> Directo
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-xs text-slate-500">{c.ip || '—'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <p className="text-xs text-slate-400 mt-3">
                  Tracking silencioso: cada clic a WhatsApp se registra automáticamente para auditar conversiones de ads.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
