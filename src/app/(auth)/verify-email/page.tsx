'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, XCircle, Loader2, Mail } from 'lucide-react'

export default function VerifyEmailPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const token = searchParams.get('token')

    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
    const [message, setMessage] = useState('')

    useEffect(() => {
        const verifyEmail = async () => {
            if (!token) {
                setStatus('error')
                setMessage('No verification token provided')
                return
            }

            try {
                const res = await fetch('/api/auth/verify-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token }),
                })

                const data = await res.json()

                if (res.ok) {
                    setStatus('success')
                    setMessage(data.message || 'Your email has been verified successfully!')

                    // Redirect to login after 3 seconds
                    setTimeout(() => {
                        router.push('/login')
                    }, 3000)
                } else {
                    setStatus('error')
                    setMessage(data.error || 'Verification failed')
                }
            } catch (error) {
                setStatus('error')
                setMessage('Something went wrong. Please try again.')
            }
        }

        verifyEmail()
    }, [token, router])

    return (
        <div className="min-h-screen bg-dark-950 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 bg-gradient-mesh opacity-30 pointer-events-none" />

            <div className="w-full max-w-md relative z-10">
                <div className="glass rounded-2xl p-10 shadow-card text-center">
                    {status === 'loading' && (
                        <>
                            <Loader2 size={64} className="mx-auto mb-4 text-primary animate-spin" />
                            <h1 className="text-2xl font-display font-bold text-white mb-2">
                                Verifying your email...
                            </h1>
                            <p className="text-dark-300">Please wait a moment</p>
                        </>
                    )}

                    {status === 'success' && (
                        <>
                            <CheckCircle size={64} className="mx-auto mb-4 text-green-500" />
                            <h1 className="text-2xl font-display font-bold text-white mb-2">
                                Email Verified! 🎉
                            </h1>
                            <p className="text-dark-300 mb-6">{message}</p>
                            <p className="text-sm text-dark-400">Redirecting to login...</p>
                            <div className="mt-6">
                                <Link
                                    href="/login"
                                    className="btn-primary inline-flex items-center gap-2"
                                >
                                    Go to Login
                                </Link>
                            </div>
                        </>
                    )}

                    {status === 'error' && (
                        <>
                            <XCircle size={64} className="mx-auto mb-4 text-red-500" />
                            <h1 className="text-2xl font-display font-bold text-white mb-2">
                                Verification Failed
                            </h1>
                            <p className="text-dark-300 mb-6">{message}</p>
                            <div className="space-y-3">
                                <Link
                                    href="/register"
                                    className="btn-primary w-full inline-block"
                                >
                                    Register Again
                                </Link>
                                <Link
                                    href="/login"
                                    className="btn-secondary w-full inline-block"
                                >
                                    Back to Login
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
