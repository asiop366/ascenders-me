// app/terms/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | Ascenders",
  description: "Terms of Service for Ascenders platform",
};

export default function TermsPage() {
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
        
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose prose-invert prose-gray max-w-none">
          <p className="text-gray-400 text-lg mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-300">
              By accessing and using Ascenders, you accept and agree to be bound by the terms 
              and provision of this agreement.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
            <p className="text-gray-300">
              Permission is granted to temporarily access the materials on Ascenders for personal, 
              non-commercial transitory viewing only.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. User Conduct</h2>
            <p className="text-gray-300">
              You agree not to use the platform for any unlawful purpose or any purpose prohibited 
              under this clause.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Content</h2>
            <p className="text-gray-300">
              Users are responsible for the content they post. We reserve the right to remove 
              content that violates our policies.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Termination</h2>
            <p className="text-gray-300">
              We may terminate or suspend access to our service immediately, without prior notice, 
              for any reason whatsoever.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Contact</h2>
            <p className="text-gray-300">
              If you have any questions about these Terms, please contact us at legal@ascenders.me
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
