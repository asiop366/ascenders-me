import { ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-asc-bg">
      <header className="border-b border-asc-border bg-asc-surface/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <Image 
                src="/logo.png" 
                alt="Ascenders Logo" 
                width={32} 
                height={32}
                className="rounded-lg"
              />
              <span className="text-xl font-bold text-asc-text">Ascenders</span>
            </Link>
            <nav className="flex items-center gap-4">
              <Link
                href="/pricing"
                className="px-4 py-2 text-asc-secondary hover:text-asc-text transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/login"
                className="px-4 py-2 text-asc-secondary hover:text-asc-text transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 bg-asc-text text-asc-bg rounded-lg font-medium hover:bg-white transition-colors"
              >
                Get Started
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-asc-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm text-asc-muted">
            <p>© 2025 Ascenders. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/terms" className="hover:text-asc-text transition-colors">
                Terms
              </Link>
              <Link href="/privacy" className="hover:text-asc-text transition-colors">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
