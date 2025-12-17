'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-asc-bg">
      <nav className="sticky top-0 bg-asc-bg/80 backdrop-blur-lg border-b border-asc-border">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-asc-text rounded-lg flex items-center justify-center">
              <span className="text-asc-bg font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold text-asc-text">Ascenders</span>
          </Link>
          <Link href="/" className="flex items-center gap-2 text-asc-secondary hover:text-asc-text transition-colors">
            <ArrowLeft size={18} />
            Back
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-asc-text mb-4">Privacy Policy</h1>
        <p className="text-asc-mute mb-8">Last updated: December 17, 2024</p>
        
        <div className="space-y-6 text-asc-secondary">
          <section>
            <h2 className="text-2xl font-semibold text-asc-text mb-3">1. Information We Collect</h2>
            <p className="leading-relaxed">
              We collect information you provide when you create an account, post content, or communicate with other users.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-asc-text mb-3">2. How We Use Your Information</h2>
            <p className="leading-relaxed">
              We use the information to provide, maintain, and improve our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-asc-text mb-3">3. Contact Us</h2>
            <p className="leading-relaxed">
              For questions, contact us at privacy@ascenders.com
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
