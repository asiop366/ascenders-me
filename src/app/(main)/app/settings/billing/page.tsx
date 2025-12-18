import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Billing Settings | Ascenders',
}

export default function SettingsBillingPage() {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Billing & Subscription</h1>
        <p className="text-zinc-400">Manage your subscription and payment methods</p>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Current Plan</h3>
          <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg">
            <div>
              <div className="font-semibold">Free Tier</div>
              <div className="text-sm text-zinc-400">Basic features included</div>
            </div>
            <Link
              href="/pricing"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Upgrade
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Payment Methods</h3>
          <div className="text-center py-8 text-zinc-500">
            No payment methods added
          </div>
          <button className="w-full px-4 py-2 border border-zinc-700 hover:bg-zinc-800 rounded-lg transition-colors">
            Add Payment Method
          </button>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Billing History</h3>
          <div className="text-center py-8 text-zinc-500">
            No billing history available
          </div>
        </div>
      </div>
    </div>
  )
}
