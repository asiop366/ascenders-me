'use client'

import { Bell, Check, Settings } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/lib/language-context'

export function NotificationHeader({ unreadCount }: { unreadCount: number }) {
    const { t, language } = useLanguage()
    const router = useRouter()

    const handleMarkAllRead = async () => {
        try {
            const res = await fetch('/api/notifications/mark-all-read', {
                method: 'POST',
            })
            if (res.ok) {
                router.refresh()
            }
        } catch (error) {
            console.error('Failed to mark all as read:', error)
        }
    }

    return (
        <div className="flex items-center justify-between mb-8">
            <div>
                <h1 className="text-3xl font-display font-bold text-white flex items-center gap-3">
                    <Bell size={32} className="text-primary" />
                    {t('nav.notifications')}
                </h1>
                <p className="text-dark-400 mt-2 font-medium">
                    {unreadCount > 0
                        ? `${unreadCount} ${language === 'fr' ? 'notifications non lues' : 'unread notifications'}`
                        : (language === 'fr' ? 'Tout est à jour !' : 'All caught up!')
                    }
                </p>
            </div>

            <div className="flex items-center gap-3">
                <button
                    onClick={handleMarkAllRead}
                    className="btn-ghost flex items-center gap-2 text-sm px-4"
                >
                    <Check size={18} />
                    {language === 'fr' ? 'Tout marquer comme lu' : 'Mark all as read'}
                </button>
                <Link href="/app/settings" className="btn-ghost p-2.5">
                    <Settings size={20} />
                </Link>
            </div>
        </div>
    )
}
