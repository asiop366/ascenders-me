import Link from 'next/link'
import { MessageSquare, Users, Zap, Shield } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="py-20 md:py-32 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary bg-clip-text text-transparent">
            Welcome to Ascenders
          </h1>
          <p className="text-xl md:text-2xl text-dark-muted mb-10 leading-relaxed">
            A modern community platform where discussions thrive. 
            Connect, share, and grow with like-minded individuals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="px-8 py-4 bg-accent-primary hover:bg-accent-primary/90 rounded-lg text-white font-semibold text-lg transition-all transform hover:scale-105"
            >
              Join the Community
            </Link>
            <Link
              href="/app"
              className="px-8 py-4 bg-dark-surface hover:bg-dark-hover border border-dark-border rounded-lg text-dark-text font-semibold text-lg transition-all"
            >
              Explore Spaces
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 border-t border-dark-border">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Why Choose Ascenders?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<MessageSquare className="w-8 h-8" />}
              title="Rich Discussions"
              description="Create threads, reply to posts, and engage in meaningful conversations."
            />
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="Community Driven"
              description="Join spaces and channels tailored to your interests and passions."
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="Premium Grades"
              description="Unlock exclusive features and channels with our tiered membership system."
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title="Secure & Moderated"
              description="Safe environment with active moderation and community guidelines."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-dark-border">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Ascend?
          </h2>
          <p className="text-xl text-dark-muted mb-10">
            Join thousands of members already part of our growing community.
          </p>
          <Link
            href="/register"
            className="inline-block px-8 py-4 bg-gradient-to-r from-accent-primary to-accent-secondary hover:opacity-90 rounded-lg text-white font-semibold text-lg transition-all transform hover:scale-105"
          >
            Create Your Account
          </Link>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 bg-dark-surface border border-dark-border rounded-xl hover:border-accent-primary/50 transition-all">
      <div className="w-12 h-12 bg-accent-primary/20 rounded-lg flex items-center justify-center text-accent-primary mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-dark-muted leading-relaxed">{description}</p>
    </div>
  )
}

