'use client'

import Link from 'next/link'
import { Check, ArrowLeft } from 'lucide-react'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-asc-bg">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-asc-bg/80 backdrop-blur-lg border-b border-asc-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-asc-text rounded-lg flex items-center justify-center">
              <span className="text-asc-bg font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold text-asc-text">Ascenders</span>
          </Link>
          
          <Link href="/" className="flex items-center gap-2 text-asc-secondary hover:text-asc-text transition-colors">
            <ArrowLeft size={18} />
            <span>Back</span>
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-asc-text mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-asc-secondary">Choose the perfect plan for your needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Free */}
            <div className="p-8 bg-asc-surface border border-asc-border rounded-xl">
              <h3 className="text-2xl font-bold text-asc-text mb-2">Free</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-asc-text">$0</span>
                <span className="text-asc-muted">/month</span>
              </div>
              <Link href="/register" className="block w-full py-3 bg-asc-bg border border-asc-border hover:border-asc-text rounded-lg text-center text-asc-text font-medium transition-all mb-6">
                Get Started
              </Link>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-asc-secondary">
                  <Check size={18} className="text-asc-text" />
                  Access to all public topics
                </li>
                <li className="flex items-center gap-2 text-asc-secondary">
                  <Check size={18} className="text-asc-text" />
                  Create unlimited threads
                </li>
                <li className="flex items-center gap-2 text-asc-secondary">
                  <Check size={18} className="text-asc-text" />
                  Community support
                </li>
              </ul>
            </div>

            {/* Pro */}
            <div className="p-8 bg-asc-text text-asc-bg rounded-xl relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-asc-bg border border-asc-border rounded-full text-xs text-asc-text font-medium">
                POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">$9</span>
                <span className="opacity-70">/month</span>
              </div>
              <Link href="/register" className="block w-full py-3 bg-asc-bg hover:bg-asc-surface rounded-lg text-center text-asc-text font-medium transition-all mb-6">
                Start Free Trial
              </Link>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check size={18} />
                  Everything in Free
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} />
                  Access to premium topics
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} />
                  Custom profile badge
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} />
                  Priority support
                </li>
              </ul>
            </div>

            {/* Enterprise */}
            <div className="p-8 bg-asc-surface border border-asc-border rounded-xl">
              <h3 className="text-2xl font-bold text-asc-text mb-2">Enterprise</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-asc-text">Custom</span>
              </div>
              <Link href="/contact" className="block w-full py-3 bg-asc-bg border border-asc-border hover:border-asc-text rounded-lg text-center text-asc-text font-medium transition-all mb-6">
                Contact Sales
              </Link>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-asc-secondary">
                  <Check size={18} className="text-asc-text" />
                  Everything in Pro
                </li>
                <li className="flex items-center gap-2 text-asc-secondary">
                  <Check size={18} className="text-asc-text" />
                  Private community spaces
                </li>
                <li className="flex items-center gap-2 text-asc-secondary">
                  <Check size={18} className="text-asc-text" />
                  Advanced moderation tools
                </li>
                <li className="flex items-center gap-2 text-asc-secondary">
                  <Check size={18} className="text-asc-text" />
                  Dedicated account manager
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
