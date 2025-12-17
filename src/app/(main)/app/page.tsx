// app/page.tsx
import Link from "next/link";
import { routes } from "@/config/routes";
import { ArrowRight, Zap, Users, Shield } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
          Welcome to Ascenders
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
          Join a community where your voice matters. Connect, share, and grow with people who inspire you.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={routes.app}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-medium text-lg"
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href={routes.pricing}
            className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 transition-colors font-medium text-lg"
          >
            View Pricing
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-24">
        <h2 className="text-4xl font-bold text-center mb-16">Why Choose Ascenders?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-lg">
            <Zap className="w-12 h-12 mb-4 text-yellow-500" />
            <h3 className="text-2xl font-bold mb-4">Lightning Fast</h3>
            <p className="text-gray-400">
              Built with modern technology for a seamless experience
            </p>
          </div>

          <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-lg">
            <Users className="w-12 h-12 mb-4 text-blue-500" />
            <h3 className="text-2xl font-bold mb-4">Community First</h3>
            <p className="text-gray-400">
              Connect with like-minded individuals and build lasting relationships
            </p>
          </div>

          <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-lg">
            <Shield className="w-12 h-12 mb-4 text-green-500" />
            <h3 className="text-2xl font-bold mb-4">Safe & Secure</h3>
            <p className="text-gray-400">
              Your privacy and security are our top priorities
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Ascend?</h2>
        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
          Join thousands of users already building amazing communities
        </p>
        <Link
          href={routes.app}
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-medium text-lg"
        >
          Start Your Journey
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href={routes.pricing} className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href={routes.about} className="hover:text-white transition-colors">About</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href={routes.terms} className="hover:text-white transition-colors">Terms</Link></li>
                <li><Link href={routes.privacy} className="hover:text-white transition-colors">Privacy</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="mailto:support@ascenders.me" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Social</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-zinc-800 text-center text-gray-400">
            <p>&copy; 2024 Ascenders. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
