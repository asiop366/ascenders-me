'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Dumbbell, Heart, Sparkles, TrendingUp, Award, ArrowRight, Zap, Shield, Users } from 'lucide-react'

export default function LandingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-asc-bg">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-asc-bg/80 backdrop-blur-lg border-b border-asc-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <Image 
              src="/logo.png" 
              alt="Ascenders Logo" 
              width={32} 
              height={32}
              className="rounded-lg group-hover:scale-110 transition-transform"
            />
            <span className="text-xl font-bold text-asc-text">Ascenders</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link 
              href="/login" 
              className="px-4 py-2 text-asc-text hover:text-white transition-colors font-medium"
            >
              Login
            </Link>
            <Link 
              href="/register" 
              className="px-6 py-2 bg-asc-text text-asc-bg rounded-lg hover:bg-white transition-all font-medium"
            >
              Start Your Journey
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-asc-surface border border-asc-border rounded-full mb-8">
            <Sparkles size={16} className="text-asc-text" />
            <span className="text-sm text-asc-secondary">The forefront of looksmaxxing</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-asc-text mb-6 leading-tight">
            Welcome to Ascenders.
          </h1>
          
          <p className="text-xl md:text-2xl text-asc-secondary mb-10 max-w-3xl mx-auto leading-relaxed">
            The First Modern Forum About Looksmaxxing.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/register"
              className="group px-8 py-4 bg-asc-text text-asc-bg rounded-lg font-semibold text-lg hover:bg-white transition-all hover:scale-105 flex items-center gap-2 shadow-lg"
            >
              Ready to Ascend ?
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/app"
              className="px-8 py-4 bg-transparent border-2 border-asc-text rounded-lg text-asc-text font-semibold text-lg hover:bg-asc-surface transition-all"
            >
              Explore the Forum
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-asc-text mb-1">5k+</div>
              <div className="text-sm text-asc-muted">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-asc-text mb-1">12k+</div>
              <div className="text-sm text-asc-muted">Success Stories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-asc-text mb-1">24/7</div>
              <div className="text-sm text-asc-muted">Expert Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 border-t border-asc-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-asc-text mb-4">
              start you looksmaxxing journey
            </h2>
            <p className="text-lg text-asc-secondary max-w-2xl mx-auto">
              Everything you need to maximize your physical potential
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<Dumbbell className="w-8 h-8" />}
              title="Fitness & Training"
              description="Science-backed workout routines, nutrition plans, and body transformation guides."
              link="/app"
            />
            <FeatureCard
              icon={<Heart className="w-8 h-8" />}
              title="Skincare & Grooming"
              description="Expert skincare routines, grooming tips, and product recommendations for all skin types."
              link="/app"
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="Style & Fashion"
              description="Elevate your appearance with personalized style guides and fashion advice."
              link="/app"
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title="Evidence-Based Methods"
              description="Science-backed approaches to mewing, posture correction, and aesthetic enhancement."
              link="/app"
            />
          </div>
        </div>
      </section>

      {/* Trending Topics */}
      <section className="py-20 px-6 border-t border-asc-surface">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-asc-text mb-4">
            Popular Categories
          </h2>
          <p className="text-lg text-asc-secondary mb-10">
            Join the most active discussions in the community
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <TopicCard 
              name="Fitness & Training"
              threads={2847}
              members={1892}
              trending
              link="/app"
            />
            <TopicCard 
              name="Skincare Routines"
              threads={1567}
              members={1445}
              link="/app"
            />
            <TopicCard 
              name="Style & Fashion"
              threads={934}
              members={1178}
              link="/app"
            />
          </div>

          <div className="text-center mt-10">
            <Link 
              href="/app"
              className="inline-flex items-center gap-2 px-6 py-4 bg-asc-text border border-asc-border rounded-lg text-asc-bg font-semibold hover:bg-white transition-all"
            >
              View All Categories
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-asc-border">
        <div className="max-w-4xl mx-auto text-center">
          <Award size={48} className="text-asc-text mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold text-asc-text mb-6">
            Ready to Ascend ?
          </h2>
          <p className="text-xl text-asc-secondary mb-10 max-w-2xl mx-auto">
            Join thousands of members already transforming their appearance and confidence through evidence-based looksmaxxing.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-asc-text text-asc-bg rounded-lg font-semibold text-lg hover:bg-white transition-all hover:scale-105 shadow-lg"
          >
            Start Your Transformation
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-asc-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Image 
                  src="/logo.png" 
                  alt="Ascenders Logo" 
                  width={24} 
                  height={24}
                  className="rounded"
                />
                <span className="font-bold text-asc-text">Ascenders</span>
              </div>
              <p className="text-sm text-asc-muted">
                The premier looksmaxxing community.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-asc-text mb-3">Categories</h3>
              <ul className="space-y-2">
                <li><Link href="/app" className="text-sm text-asc-muted hover:text-asc-text transition-colors">Fitness</Link></li>
                <li><Link href="/app" className="text-sm text-asc-muted hover:text-asc-text transition-colors">Skincare</Link></li>
                <li><Link href="/app" className="text-sm text-asc-muted hover:text-asc-text transition-colors">Style</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-asc-text mb-3">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-sm text-asc-muted hover:text-asc-text transition-colors">About</Link></li>
                <li><Link href="/pricing" className="text-sm text-asc-muted hover:text-asc-text transition-colors">Pricing</Link></li>
                <li><Link href="/" className="text-sm text-asc-muted hover:text-asc-text transition-colors">Guides</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-asc-text mb-3">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/terms" className="text-sm text-asc-muted hover:text-asc-text transition-colors">Terms</Link></li>
                <li><Link href="/privacy" className="text-sm text-asc-muted hover:text-asc-text transition-colors">Privacy</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-asc-border text-center">
            <p className="text-sm text-asc-muted">
              © 2025 Ascenders. Elevate your potential.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description, link }: { 
  icon: React.ReactNode
  title: string
  description: string
  link: string
}) {
  return (
    <Link
      href={link}
      className="group p-6 bg-asc-surface border border-asc-border rounded-lg hover:border-asc-text transition-all hover:scale-105 flex flex-col items-center gap-4 text-center"
    >
      <div className="text-asc-text">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-asc-text group-hover:underline">{title}</h3>
      <p className="text-asc-secondary leading-relaxed text-sm">{description}</p>
    </Link>
  )
}

function TopicCard({ name, threads, members, trending, link }: { 
  name: string
  threads: number
  members: number
  trending?: boolean
  link: string
}) {
  return (
    <Link
      href={link}
      className="group p-6 bg-asc-surface border border-asc-border rounded-lg hover:border-asc-text transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-asc-text group-hover:underline">{name}</h3>
        {trending && (
          <div className="flex items-center gap-1 text-asc-text">
            <TrendingUp size={16} />
          </div>
        )}
      </div>
      <div className="flex justify-between text-asc-secondary text-sm">
        <div>{threads} Threads</div>
        <div>{members} Members</div>
      </div>
    </Link>
  )
}
