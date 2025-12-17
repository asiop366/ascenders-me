// app/settings/billing/page.tsx
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Billing Settings | Ascenders",
};

export default function BillingSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Billing & Subscription</h2>
        <p className="text-gray-400">Manage your subscription and payment methods</p>
      </div>

      <div className="space-y-6">
        {/* Current Plan */}
        <div className="p-6 bg-black border border-zinc-700 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Current Plan</h3>
              <p className="text-gray-400 text-sm">Bronze Tier</p>
            </div>
            <Link 
              href="/pricing"
              className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
            >
              Upgrade
            </Link>
          </div>
          <p className="text-gray-300">Next billing date: January 1, 2024</p>
        </div>

        {/* Payment Methods */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Payment Methods</h3>
          <div className="p-6 bg-black border border-zinc-700 rounded-lg">
            <p className="text-gray-400 text-center py-8">No payment methods added</p>
            <button className="w-full px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-medium">
              Add Payment Method
            </button>
          </div>
        </div>

        {/* Billing History */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Billing History</h3>
          <div className="p-6 bg-black border border-zinc-700 rounded-lg">
            <p className="text-gray-400 text-center py-8">No billing history yet</p>
          </div>
        </div>
      </div>
    </div>
  );
}
