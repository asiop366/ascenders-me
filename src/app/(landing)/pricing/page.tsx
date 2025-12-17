// app/pricing/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing | Ascenders",
  description: "Choose the perfect plan for your needs",
};

export default function PricingPage() {
  const tiers = [
    {
      name: "Bronze",
      price: "Free",
      description: "Perfect for getting started",
      features: [
        "Access to public spaces",
        "Create up to 3 threads per day",
        "Basic profile customization",
        "Community support",
      ],
      cta: "Get Started",
      highlighted: false,
    },
    {
      name: "Silver",
      price: "$9",
      period: "/month",
      description: "For active community members",
      features: [
        "Everything in Bronze",
        "Unlimited threads",
        "Create private spaces",
        "Custom profile themes",
        "Priority support",
        "Ad-free experience",
      ],
      cta: "Upgrade to Silver",
      highlighted: true,
    },
    {
      name: "Gold",
      price: "$19",
      period: "/month",
      description: "For power users and creators",
      features: [
        "Everything in Silver",
        "Advanced analytics",
        "Custom badges",
        "Early access to features",
        "Dedicated support",
        "API access",
        "Space moderation tools",
      ],
      cta: "Upgrade to Gold",
      highlighted: false,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-xl text-gray-400">
            Unlock more features and take your experience to the next level
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-lg p-8 ${
                tier.highlighted
                  ? "bg-white text-black border-4 border-white"
                  : "bg-zinc-900/50 border border-zinc-800"
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold rounded-full">
                  POPULAR
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  {tier.period && (
                    <span className={tier.highlighted ? "text-gray-700" : "text-gray-400"}>
                      {tier.period}
                    </span>
                  )}
                </div>
                <p className={tier.highlighted ? "text-gray-700" : "text-gray-400"}>
                  {tier.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 flex-shrink-0 ${tier.highlighted ? "text-black" : "text-green-500"}`} />
                    <span className={tier.highlighted ? "text-gray-800" : "text-gray-300"}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/app"
                className={`block w-full py-3 rounded-lg font-medium text-center transition-colors ${
                  tier.highlighted
                    ? "bg-black text-white hover:bg-gray-900"
                    : "bg-white text-black hover:bg-gray-200"
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 text-gray-400">
          <p>All plans include a 14-day money-back guarantee</p>
          <p className="mt-2">
            Questions? <Link href="/contact" className="text-white hover:underline">Contact us</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
