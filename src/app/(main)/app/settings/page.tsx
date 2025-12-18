import { Metadata } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { User, Shield, CreditCard, Bell, Palette, Lock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Settings | Ascenders',
}

const settingsPages = [
  {
    title: 'Profile',
    description: 'Manage your public profile information',
    href: '/app/settings/profile',
    icon: User,
  },
  {
    title: 'Account',
    description: 'Privacy settings and account preferences',
    href: '/app/settings/account',
    icon: Shield,
  },
  {
    title: 'Billing',
    description: 'Manage subscription and payment methods',
    href: '/app/settings/billing',
    icon: CreditCard,
  },
  {
    title: 'Notifications',
    description: 'Control how you receive notifications',
    href: '/app/settings/notifications',
    icon: Bell,
  },
  {
    title: 'Appearance',
    description: 'Customize theme and display options',
    href: '/app/settings/appearance',
    icon: Palette,
  },
  {
    title: 'Security',
    description: 'Password and authentication settings',
    href: '/app/settings/security',
    icon: Lock,
  },
]

export default async function SettingsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-zinc-400">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {settingsPages.map((page) => {
          const Icon = page.icon
          return (
            <Link
              key={page.href}
              href={page.href}
              className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-lg hover:border-zinc-700 hover:bg-zinc-900 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-zinc-800 rounded-lg group-hover:bg-zinc-700 transition-colors">
                  <Icon size={24} className="text-zinc-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1 group-hover:text-blue-400 transition-colors">
                    {page.title}
                  </h3>
                  <p className="text-sm text-zinc-400">{page.description}</p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
