'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, Loader2, ArrowRight, Check } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Password strength
  const hasMinLength = password.length >= 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasNumber = /[0-9]/.test(password)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!hasMinLength) {
      setError('Password must be at least 8 characters')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Registration failed')
      }

      router.push('/login?registered=true')
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-asc-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-asc-text rounded-asc flex items-center justify-center">
              <span className="text-asc-bg font-bold text-xl">A</span>
            </div>
            <span className="text-xl font-bold text-asc-text">Ascenders</span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-asc-surface border border-asc-border rounded-asc-lg p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-asc-text mb-2">Create account</h1>
            <p className="text-asc-muted">Join the Ascenders community</p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-asc text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-asc-secondary mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-asc-secondary mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                placeholder="johndoe"
                className="input"
                required
                minLength={3}
                maxLength={20}
                disabled={loading}
              />
              <p className="text-xs text-asc-muted mt-1">
                3-20 characters, letters, numbers and underscore only
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-asc-secondary mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input pr-10"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-asc-muted hover:text-asc-text transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              
              {/* Password strength */}
              <div className="mt-3 space-y-2">
                <PasswordRule met={hasMinLength} text="At least 8 characters" />
                <PasswordRule met={hasUppercase} text="One uppercase letter" />
                <PasswordRule met={hasNumber} text="One number" />
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary w-full flex items-center justify-center gap-2 py-3 mt-6"
              disabled={loading || !hasMinLength}
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  Create account
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-asc-border" />
            <span className="text-sm text-asc-muted">or</span>
            <div className="flex-1 h-px bg-asc-border" />
          </div>

          {/* Login link */}
          <p className="text-center text-asc-secondary">
            Already have an account?{' '}
            <Link href="/login" className="text-asc-text font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-asc-muted mt-6">
          By creating an account, you agree to our{' '}
          <Link href="/terms" className="hover:text-asc-text">Terms of Service</Link>
          {' '}and{' '}
          <Link href="/privacy" className="hover:text-asc-text">Privacy Policy</Link>
        </p>
      </div>
    </div>
  )
}

function PasswordRule({ met, text }: { met: boolean; text: string }) {
  return (
    <div className={`flex items-center gap-2 text-xs ${met ? 'text-green-500' : 'text-asc-muted'}`}>
      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
        met ? 'bg-green-500/20' : 'bg-asc-surface2'
      }`}>
        {met && <Check size={10} />}
      </div>
      <span>{text}</span>
    </div>
  )
}
