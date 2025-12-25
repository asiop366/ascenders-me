'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Eye, EyeOff, Mail, Lock, ArrowRight, Check } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

function LoginForm() {
  const { t } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const callbackUrl = searchParams.get('callbackUrl') || '/app'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe ? 'true' : 'false',
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid email or password')
      } else if (result?.ok) {
        router.push(callbackUrl)
      }
    } catch (err) {
      setError('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm backdrop-blur-sm">
          {error}
        </div>
      )}

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-dark-100 mb-2">
          {t('auth.email')}
        </label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-300" size={20} />
          <input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="pl-12"
            placeholder="you@example.com"
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-dark-100 mb-2">
          {t('auth.password')}
        </label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-300" size={20} />
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="pl-12 pr-12"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-300 hover:text-white transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer group">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              checked={formData.rememberMe}
              onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
              className="peer h-5 w-5 appearance-none rounded-md border border-white/10 bg-dark-800 checked:bg-primary checked:border-primary transition-all cursor-pointer"
            />
            <Check className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white h-3.5 w-3.5 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
          </div>
          <span className="text-sm text-dark-200 group-hover:text-white transition-colors">
            {t('auth.remember_me')}
          </span>
        </label>
        <Link href="/forgot-password" title={t('auth.forgot_password')} className="text-sm text-primary hover:text-primary-light transition-colors">
          {t('auth.forgot_password')}
        </Link>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        {isLoading ? t('auth.signing_in') : t('auth.sign_in')}
        <ArrowRight size={20} />
      </button>

      {/* Create account link */}
      <p className="text-center text-sm text-dark-200">
        {t('auth.no_account')}{' '}
        <Link href="/register" className="text-primary hover:text-primary-light transition-colors font-semibold">
          {t('auth.start_journey')}
        </Link>
      </p>
    </form>
  )
}

export default function LoginPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-mesh opacity-30 pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-4 mb-8 group">
            <div className="relative">
              <Image
                src="/logo.png"
                alt="Ascenders Logo"
                width={56}
                height={56}
                className="rounded-2xl group-hover:scale-110 transition-transform"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-primary opacity-0 group-hover:opacity-30 blur-xl transition-opacity" />
            </div>
            <span className="text-3xl font-display font-bold text-white">Ascenders</span>
          </Link>
          <h1 className="text-4xl font-display font-bold text-white mb-3">{t('auth.login_title')}</h1>
          <p className="text-dark-200">{t('auth.login_subtitle')}</p>
        </div>

        {/* Form Card */}
        <div className="glass rounded-2xl p-8 shadow-card">
          <Suspense fallback={
            <div className="text-center py-8">
              <div className="skeleton h-12 w-full rounded-xl mb-4" />
              <div className="skeleton h-12 w-full rounded-xl" />
            </div>
          }>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
