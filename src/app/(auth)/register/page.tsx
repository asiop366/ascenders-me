'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { registerSchema } from '@/lib/validations'

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const validated = registerSchema.parse(formData)

      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validated),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Registration failed')
        setLoading(false)
        return
      }

      router.push('/login?registered=true')
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-xl mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Join Ascenders</h1>
          <p className="text-dark-muted">Create your account and start connecting</p>
        </div>

        <div className="bg-dark-surface border border-dark-border rounded-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="px-4 py-3 bg-accent-error/10 border border-accent-error/30 rounded-lg text-accent-error text-sm">
                {error}
              </div>
            )}

            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <Input
              label="Username"
              type="text"
              placeholder="cooluser123"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              helperText="At least 6 characters"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />

            <Button type="submit" fullWidth disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-dark-muted">Already have an account? </span>
            <Link href="/login" className="text-accent-primary hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

