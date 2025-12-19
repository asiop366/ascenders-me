import Link from 'next/link'
import { Check, Zap } from 'lucide-react'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-dark-950 relative overflow-hidden">
      <div className="fixed inset-0 bg-gradient-mesh opacity-30 pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <div className="text-center mb-20">
          <div className="badge mb-6">
            <Zap size={16} />
            Pricing
          </div>
          <h1 className="text-display-lg font-display font-bold text-white mb-6">
            Choose Your Path
          </h1>
          <p className="text-xl text-dark-100 max-w-2xl mx-auto">
            Start free, upgrade when you're ready to unlock premium features
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free */}
          <div className="glass rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
            <div className="text-4xl font-bold text-white mb-6">
              $0<span className="text-lg text-dark-200">/mo</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-dark-100">
                <Check size={20} className="text-primary" />
                Access to public forums
              </li>
              <li className="flex items-center gap-3 text-dark-100">
                <Check size={20} className="text-primary" />
                Create threads & replies
              </li>
              <li className="flex items-center gap-3 text-dark-100">
                <Check size={20} className="text-primary" />
                Basic profile
              </li>
            </ul>
            <Link href="/register" className="btn-secondary w-full block text-center">
              Get Started
            </Link>
          </div>

          {/* Pro */}
          <div className="glass rounded-2xl p-8 border-2 border-primary relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-primary rounded-full text-white text-sm font-semibold">
              Most Popular
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
            <div className="text-4xl font-bold text-white mb-6">
              $9<span className="text-lg text-dark-200">/mo</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-dark-100">
                <Check size={20} className="text-primary" />
                Everything in Free
              </li>
              <li className="flex items-center gap-3 text-dark-100">
                <Check size={20} className="text-primary" />
                Access to Pro forums
              </li>
              <li className="flex items-center gap-3 text-dark-100">
                <Check size={20} className="text-primary" />
                Custom profile badge
              </li>
              <li className="flex items-center gap-3 text-dark-100">
                <Check size={20} className="text-primary" />
                Priority support
              </li>
            </ul>
            <Link href="/register" className="btn-primary w-full block text-center">
              Upgrade to Pro
            </Link>
          </div>

          {/* Elite */}
          <div className="glass rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-2">Elite</h3>
            <div className="text-4xl font-bold text-white mb-6">
              $19<span className="text-lg text-dark-200">/mo</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-dark-100">
                <Check size={20} className="text-primary" />
                Everything in Pro
              </li>
              <li className="flex items-center gap-3 text-dark-100">
                <Check size={20} className="text-primary" />
                Exclusive Elite forums
              </li>
              <li className="flex items-center gap-3 text-dark-100">
                <Check size={20} className="text-primary" />
                Premium badge
              </li>
              <li className="flex items-center gap-3 text-dark-100">
                <Check size={20} className="text-primary" />
                1-on-1 consultations
              </li>
            </ul>
            <Link href="/register" className="btn-secondary w-full block text-center">
              Go Elite
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
