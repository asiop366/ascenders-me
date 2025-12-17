import { ReactNode } from 'react'
import Link from 'next/link'
import '../globals.css'

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          <header className="border-b border-dark-border bg-dark-surface/50 backdrop-blur-sm sticky top-0 z-40">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between h-16">
                <Link href="/" className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-lg" />
                  <span className="text-xl font-bold">Ascenders</span>
                </Link>
                <nav className="flex items-center gap-4">
                  <Link
                    href="/login"
                    className="px-4 py-2 text-dark-text hover:text-white transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-2 bg-accent-primary hover:bg-accent-primary/90 rounded-lg text-white transition-colors"
                  >
                    Get Started
                  </Link>
                </nav>
              </div>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t border-dark-border py-8">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between text-sm text-dark-muted">
                <p>&copy; 2025 Ascenders. All rights reserved.</p>
                <div className="flex gap-6">
                  <Link href="/terms" className="hover:text-dark-text transition-colors">
                    Terms
                  </Link>
                  <Link href="/privacy" className="hover:text-dark-text transition-colors">
                    Privacy
                  </Link>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}

