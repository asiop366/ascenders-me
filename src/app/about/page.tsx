// app/about/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "About | Ascenders",
  description: "Learn more about Ascenders",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="text-5xl font-bold mb-8">About Ascenders</h1>

        <div className="prose prose-invert prose-gray max-w-none space-y-6">
          <p className="text-xl text-gray-300">
            Ascenders is a modern community platform designed to bring people together 
            through meaningful conversations and shared interests.
          </p>

          <section className="mt-12">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-300">
              We believe in creating spaces where everyone can share their voice, learn from 
              others, and build lasting connections. Our platform is built on the principles 
              of authenticity, respect, and growth.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-3xl font-bold mb-4">What Makes Us Different</h2>
            <ul className="space-y-4 text-gray-300">
              <li className="flex gap-3">
                <span className="text-2xl">🎯</span>
                <div>
                  <strong className="text-white">Quality Over Quantity</strong> - We focus on 
                  meaningful interactions rather than vanity metrics
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-2xl">🌟</span>
                <div>
                  <strong className="text-white">Tier-Based Growth</strong> - Unlock features 
                  as you engage and contribute to the community
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-2xl">🔒</span>
                <div>
                  <strong className="text-white">Privacy First</strong> - Your data is yours, 
                  and we're transparent about how we use it
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-2xl">🚀</span>
                <div>
                  <strong className="text-white">Always Evolving</strong> - We listen to our 
                  community and continuously improve
                </div>
              </li>
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="text-3xl font-bold mb-4">Join Us</h2>
            <p className="text-gray-300 mb-6">
              Whether you're here to learn, share, or connect, we're excited to have you. 
              Start your journey today and see where it takes you.
            </p>
            <Link
              href="/app"
              className="inline-block px-8 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Get Started
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
