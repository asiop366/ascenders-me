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
          <Link href="/" className="flex items-center gap-2 text-asc-secondary hover:text-asc-text">
            <ArrowLeft size={18} />
            Back
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-asc-text mb-4">Privacy Policy</h1>
        <p className="text-asc-muted mb-8">Last updated: December 17, 2024</p>

        <div className="space-y-6 text-asc-secondary">
          <section>
            <h2 className="text-2xl font-semibold text-asc-text mb-3">1. Information We Collect</h2>
            <p className="leading-relaxed">
              We collect information you provide directly to us when you create an account, post content, 
              or communicate with other users. This includes your email address, username, profile information, 
              and any content you create or share on Ascenders.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-asc-text mb-3">2. How We Use Your Information</h2>
            <p className="leading-relaxed mb-3">We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Send you technical notices and support messages</li>
              <li>Communicate with you about products, services, and events</li>
              <li>Monitor and analyze trends and usage</li>
              <li>Detect, prevent, and address technical issues and abuse</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-asc-text mb-3">3. Information Sharing</h2>
            <p className="leading-relaxed">
              We do not share your personal information with third parties except as described in this policy. 
              We may share information with service providers who perform services on our behalf, and when 
              required by law or to protect our rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-asc-text mb-3">4. Data Security</h2>
            <p className="leading-relaxed">
              We take reasonable measures to help protect your personal information from loss, theft, 
              misuse, unauthorized access, disclosure, alteration, and destruction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-asc-text mb-3">5. Your Rights</h2>
            <p className="leading-relaxed">
              You have the right to access, update, or delete your personal information at any time 
              through your account settings. You can also contact us to request deletion of your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-asc-text mb-3">6. Contact Us</h2>
            <p className="leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at privacy@ascenders.com
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
