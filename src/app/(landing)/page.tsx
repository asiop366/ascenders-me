'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { MessageSquare, Users, Zap, Shield, ArrowRight, Sparkles, TrendingUp, Award } from 'lucide-react'

export default function LandingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-asc-bg">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-asc-bg/80 backdrop-blur-lg border-b border-asc-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-asc-text rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-asc-bg font-bold text-lg">A</span>
            </div>
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
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-asc-surface border border-asc-border rounded-full mb-8">
            <Sparkles size={16} className="text-asc-text" />
            <span className="text-sm text-asc-secondary">Built for modern communities</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-asc-text mb-6 leading-tight">
            Welcome to Ascenders
          </h1>
          
          <p className="text-xl md:text-2xl text-asc-secondary mb-10 max-w-3xl mx-auto leading-relaxed">
            A modern community platform where discussions thrive. Connect, share, and grow with like-minded individuals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/register"
              className="group px-8 py-4 bg-asc-text text-asc-bg rounded-lg font-semibold text-lg hover:bg-white transition-all hover:scale-105 flex items-center gap-2 shadow-lg"
            >
              Join the Community
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/app"
              className="px-8 py-4 bg-transparent border-2 border-asc-border hover:border-asc-text rounded-lg text-asc-text font-semibold text-lg transition-all hover:bg-asc-surface flex items-center gap-2"
            >
              Explore Spaces
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-asc-text mb-1">1.2k+</div>
              <div className="text-sm text-asc-muted">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-asc-text mb-1">5.8k+</div>
              <div className="text-sm text-asc-muted">Discussions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-asc-text mb-1">24/7</div>
              <div className="text-sm text-asc-muted">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 border-t border-asc-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-asc-text mb-4">
              Why Choose Ascenders?
            </h2>
            <p className="text-lg text-asc-secondary max-w-2xl mx-auto">
              Everything you need to build and grow a thriving community
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<MessageSquare className="w-8 h-8" />}
              title="Rich Discussions"
              description="Create threads, reply to posts, and engage in meaningful conversations."
              link="/app"
            />
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="Community Driven"
              description="Join spaces and channels tailored to your interests and passions."
              link="/app/topics"
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="Premium Grades"
              description="Unlock exclusive features and channels with our tiered membership system."
              link="/pricing"
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title="Secure & Moderated"
              description="Safe environment with active moderation and community guidelines."
              link="/app"
            />
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="py-20 px-6 border-t border-asc-border bg-asc-surface">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-asc-text mb-4">
              Trending Topics
            </h2>
            <p className="text-lg text-asc-secondary">
              Join the hottest discussions right now
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <TopicCard 
              name="General Discussion"
              threads={1243}
              members={892}
              trending
              link="/app/topics/general"
            />
            <TopicCard 
              name="Build Logs"
              threads={567}
              members={445}
              link="/app/topics/build-logs"
            />
            <TopicCard 
              name="Guides & Tutorials"
              threads={234}
              members={678}
              link="/app/topics/guides"
            />
          </div>

          <div className="text-center mt-10">
            <Link 
              href="/app/topics"
              className="inline-flex items-center gap-2 px-6 py-3 bg-asc-bg border border-asc-border hover:border-asc-text rounded-lg text-asc-text font-medium transition-all"
            >
              View All Topics
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
            Ready to Ascend?
          </h2>
          <p className="text-xl text-asc-secondary mb-10 max-w-2xl mx-auto">
            Join thousands of members already part of our growing community.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-asc-text text-asc-bg rounded-lg font-semibold text-lg hover:bg-white transition-all hover:scale-105 shadow-lg"
          >
            Create Your Account
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-asc-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-asc-text rounded flex items-center justify-center">
                  <span className="text-asc-bg font-bold text-sm">A</span>
                </div>
                <span className="font-bold text-asc-text">Ascenders</span>
              </div>
              <p className="text-sm text-asc-muted">
                Building the future of online communities.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-asc-text mb-3">Product</h3>
              <ul className="space-y-2">
                <li><Link href="/app" className="text-sm text-asc-muted hover:text-asc-text transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="text-sm text-asc-muted hover:text-asc-text transition-colors">Pricing</Link></li>
                <li><Link href="/app/topics" className="text-sm text-asc-muted hover:text-asc-text transition-colors">Topics</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-asc-text mb-3">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-sm text-asc-muted hover:text-asc-text transition-colors">About</Link></li>
                <li><Link href="/" className="text-sm text-asc-muted hover:text-asc-text transition-colors">Blog</Link></li>
                <li><Link href="/" className="text-sm text-asc-muted hover:text-asc-text transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-asc-text mb-3">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-sm text-asc-muted hover:text-asc-text transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="text-sm text-asc-muted hover:text-asc-text transition-colors">Terms</Link></li>
                <li><Link href="/" className="text-sm text-asc-muted hover:text-asc-text transition-colors">Guidelines</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-asc-border text-center">
            <p className="text-sm text-asc-muted">
              © 2024 Ascenders. All rights reserved.
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
      className="group p-6 bg-asc-surface border border-asc-border rounded-xl hover:border-asc-text transition-all hover:-translate-y-1"
    >
      <div className="w-14 h-14 bg-asc-bg border border-asc-border rounded-lg flex items-center justify-center text-asc-text mb-4 group-hover:border-asc-text group-hover:scale-110 transition-all">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-asc-text mb-2">{title}</h3>
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
      className="group p-6 bg-asc-bg border border-asc-border rounded-lg hover:border-asc-text transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-asc-text group-hover:underline">{name}</h3>
        {trending && (
          <div className="flex items-center gap-1 text-asc-text">
            <TrendingUp size={16} />
          </div>
        )}
      </div>
      <div className="flex items-center gap-4 text-sm text-asc-muted">
        <span className="flex items-center gap-1">
          <MessageSquare size={14} />
          {threads} threads
        </span>
        <span className="flex items-center gap-1">
          <Users size={14} />
          {members} members
        </span>
      </div>
    </Link>
  )
}
