import Link from 'next/link'
import { MessageSquare, Users, Zap, Shield } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="py-20 md:py-32 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            Welcome to Ascenders
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-10 leading-relaxed">
            A modern community platform where discussions thrive. 
            Connect, share, and grow with like-minded individuals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="px-8 py-4 bg-white text-black hover:bg-gray-200 rounded-lg font-semibold text-lg transition-all transform hover:scale-105"
            >
              Join the Community
            </Link>
            <Link
              href="/app"
              className="px-8 py-4 bg-transparent hover:bg-white/10 border-2 border-white rounded-lg text-white font-semibold text-lg transition-all"
            >
              Explore Spaces
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
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
      <section className="py-20 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Ascend?
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            Join thousands of members already part of our growing community.
          </p>
          <Link
            href="/register"
            className="inline-block px-8 py-4 bg-white text-black hover:bg-gray-200 rounded-lg font-semibold text-lg transition-all transform hover:scale-105"
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
    <div className="p-6 bg-[#0a0a0a] border border-gray-800 rounded-xl hover:border-white transition-all">
      <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-white mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  )
}
