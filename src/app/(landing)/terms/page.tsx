'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function TermsPage() {
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
          <Link href="/" className="flex items-center gap-2 text-asc-secondary hover:text-asc-text">
            <ArrowLeft size={18} />
            Back
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-asc-text mb-4">Terms of Service</h1>
        <p className="text-asc-muted mb-8">Last updated: December 17, 2024</p>

        <div className="space-y-6 text-asc-secondary">
          <section>
            <h2 className="text-2xl font-semibold text-asc-text mb-3">1. Acceptance of Terms</h2>
            <p className="leading-relaxed">
              By accessing and using Ascenders, you accept and agree to be bound by the terms and 
              provision of this agreement. If you do not agree to these Terms of Service, please do 
              not use our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-asc-text mb-3">2. User Accounts</h2>
            <p className="leading-relaxed mb-3">
              When you create an account with us, you must provide accurate, complete, and current 
              information. You are responsible for:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Maintaining the security of your account and password</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized use</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-asc-text mb-3">3. Content Guidelines</h2>
            <p className="leading-relaxed mb-3">You agree not to post content that:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Is illegal, harmful, or violates others' rights</li>
              <li>Contains hate speech, harassment, or discrimination</li>
              <li>Is spam, misleading, or fraudulent</li>
              <li>Infringes on intellectual property rights</li>
              <li>Contains malware or malicious code</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-asc-text mb-3">4. Moderation</h2>
            <p className="leading-relaxed">
              We reserve the right to remove any content and suspend or terminate accounts that 
              violate these terms. Moderators may edit, move, or delete content at their discretion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-asc-text mb-3">5. Intellectual Property</h2>
            <p className="leading-relaxed">
              You retain ownership of content you post. By posting, you grant us a worldwide, 
              royalty-free license to use, display, and distribute your content on the platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-asc-text mb-3">6. Termination</h2>
            <p className="leading-relaxed">
              We may terminate or suspend access to our service immediately, without prior notice, 
              for any reason, including breach of these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-asc-text mb-3">7. Disclaimer</h2>
            <p className="leading-relaxed">
              The service is provided "as is" without warranties of any kind. We do not guarantee 
              uninterrupted or error-free service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-asc-text mb-3">8. Contact</h2>
            <p className="leading-relaxed">
              For questions about these Terms, contact us at legal@ascenders.com
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
