'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Lock, AlertCircle } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
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
        setError(data?.error || 'Error al ingresar')
        setSubmitting(false)
        return
      }
      router.push('/admin/leads')
      router.refresh()
    } catch (err) {
      setError('No se pudo conectar. Intenta de nuevo.')
      setSubmitting(false)
    }
  }

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
          <p className="text-sm text-slate-500 mt-1">Acceso privado · Solo personal autorizado</p>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
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

            {error && (
              <div className="flex items-start gap-2 p-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
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
