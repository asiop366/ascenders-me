import { ReactNode } from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { canAdmin } from '@/lib/permissions'
import Link from 'next/link'
import {
    LayoutDashboard,
    Users,
    MessageSquare,
    AlertTriangle,
    Settings
} from 'lucide-react'

export default async function AdminLayout({ children }: { children: ReactNode }) {
    const session = await getServerSession(authOptions)

    if (!session?.user || !canAdmin(session.user.role as any)) {
        redirect('/app')
    }

    const navItems = [
        { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
        { href: '/admin/users', icon: Users, label: 'Users' },
        { href: '/admin/content', icon: MessageSquare, label: 'Content' },
        { href: '/admin/reports', icon: AlertTriangle, label: 'Reports' },
    ]

    return (
        <div className="min-h-screen bg-dark-950 flex">
            {/* Sidebar */}
            <div className="w-64 glass border-r border-white/5 flex flex-col">
                <div className="p-6 border-b border-white/5">
                    <h1 className="text-2xl font-display font-bold text-white flex items-center gap-2">
                        <Settings className="text-primary" size={28} />
                        Admin Panel
                    </h1>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-dark-200 hover:text-white hover:bg-dark-800 transition-all group"
                        >
                            <item.icon size={20} className="group-hover:text-primary transition-colors" />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <Link
                        href="/app"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-dark-400 hover:text-white hover:bg-dark-800 transition-all"
                    >
                        ← Back to App
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
                {children}
            </div>
        </div>
    )
}
