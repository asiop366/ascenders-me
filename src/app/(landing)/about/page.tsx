import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About | Ascenders',
  description: 'Learn more about Ascenders community platform',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <nav className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            ⚡ Ascenders
          </Link>
          <div className="flex gap-4">
            <Link href="/login" className="px-4 py-2 hover:text-zinc-300 transition-colors">
              Login
            </Link>
            <Link href="/register" className="px-4 py-2 bg-white text-black rounded-lg hover:bg-zinc-200 transition-colors">
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-5xl font-bold mb-6">About Ascenders</h1>
        
        <div className="space-y-6 text-zinc-300 text-lg leading-relaxed">
          <p>
            Ascenders is a modern community platform designed for meaningful discussions 
            and collaborative knowledge sharing.
          </p>

          <h2 className="text-3xl font-bold text-white mt-12 mb-4">Our Mission</h2>
          <p>
            We believe in creating a space where quality conversations thrive. Our platform 
            combines the best aspects of forums, social networks, and knowledge bases to 
            create an engaging community experience.
          </p>

          <h2 className="text-3xl font-bold text-white mt-12 mb-4">Features</h2>
          <ul className="space-y-3 list-disc list-inside">
            <li>Rich threaded discussions with markdown support</li>
            <li>Topic-based organization for easy navigation</li>
            <li>Premium grade system to recognize contributions</li>
            <li>Real-time notifications and bookmarks</li>
            <li>Community-driven moderation</li>
          </ul>

          <h2 className="text-3xl font-bold text-white mt-12 mb-4">Get Started</h2>
          <p>
            Ready to join? <Link href="/register" className="text-blue-400 hover:underline">Create your account</Link> and 
            start participating in discussions today.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-800">
          <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
