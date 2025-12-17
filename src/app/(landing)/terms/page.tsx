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
          <Link href="/" className="flex items-center gap-2 text-asc-secondary hover:text-asc-text transition-colors">
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
              By accessing and using Ascenders, you accept and agree to be bound by the terms and provisions of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-asc-text mb-3">2. Use License</h2>
            <p className="leading-relaxed">
              Permission is granted to temporarily access the materials on Ascenders for personal, non-commercial transitory viewing only.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-asc-text mb-3">3. User Conduct</h2>
            <p className="leading-relaxed">
              You agree to use the service in a respectful manner. Prohibited activities include:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2 ml-4">
              <li>Posting spam or irrelevant content</li>
              <li>Harassing or threatening other users</li>
              <li>Sharing illegal or harmful content</li>
              <li>Impersonating others</li>
              <li>Attempting to hack or disrupt the service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-asc-text mb-3">4. Content Ownership</h2>
            <p className="leading-relaxed">
              You retain all rights to the content you post. By posting, you grant Ascenders a license to use, display, and distribute your content on the platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-asc-text mb-3">5. Account Termination</h2>
            <p className="leading-relaxed">
              We reserve the right to terminate or suspend accounts that violate these terms without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-asc-text mb-3">6. Disclaimer</h2>
            <p className="leading-relaxed">
              The service is provided "as is" without warranties of any kind, either express or implied.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-asc-text mb-3">7. Changes to Terms</h2>
            <p className="leading-relaxed">
              We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-asc-text mb-3">8. Contact Information</h2>
            <p className="leading-relaxed">
              For questions about these Terms, please contact us at{' '}
              <a href="mailto:legal@ascenders.com" className="text-asc-text hover:underline">
                legal@ascenders.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
