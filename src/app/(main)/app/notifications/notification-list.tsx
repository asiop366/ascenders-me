'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
    MessageSquare,
    Heart,
    AtSign,
    Shield,
    Bell,
    Trash2
} from 'lucide-react'
import { getTimeAgo } from '@/lib/utils'
import { useLanguage } from '@/lib/language-context'

interface Notification {
    id: string
    type: string
    message: string
    link: string | null
    read: boolean
    createdAt: Date
}

export function NotificationList({
    initialNotifications,
    userId
}: {
    initialNotifications: any[],
    userId: string
}) {
    const { t, language } = useLanguage()
    const [notifications, setNotifications] = useState(initialNotifications)
    const [filter, setFilter] = useState<'all' | 'unread'>('all')

    const filteredNotifications = notifications.filter(n =>
        filter === 'all' || !n.read
    )

    const icons: any = {
        reply: MessageSquare,
        like: Heart,
        mention: AtSign,
        mod: Shield,
    }

    return (
        <>
            {/* Filters */}
            <div className="flex items-center gap-6 mb-8 border-b border-white/5">
                <button
                    onClick={() => setFilter('all')}
                    className={`pb-4 text-sm font-bold transition-all ${filter === 'all' ? 'text-primary border-b-2 border-primary shadow-glow-sm' : 'text-dark-400 hover:text-white'
                        }`}
                >
                    {t('forum.all')}
                </button>
                <button
                    onClick={() => setFilter('unread')}
                    className={`pb-4 text-sm font-bold transition-all ${filter === 'unread' ? 'text-primary border-b-2 border-primary shadow-glow-sm' : 'text-dark-400 hover:text-white'
                        }`}
                >
                    {language === 'fr' ? 'Non lues' : 'Unread'}
                </button>
            </div>

            {/* List */}
            {filteredNotifications.length === 0 ? (
                <div className="text-center py-24 glass rounded-3xl border border-white/5">
                    <div className="w-20 h-20 bg-dark-800 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                        <Bell size={36} className="text-dark-500" />
                    </div>
                    <h2 className="text-xl font-bold text-white mb-2">
                        {language === 'fr' ? 'Aucune notification' : 'No notifications'}
                    </h2>
                    <p className="text-dark-400">
                        {language === 'fr' ? 'Vous êtes à jour !' : "You're all caught up!"}
                    </p>
                </div>
            ) : (
                <div className="space-y-3">
                    {filteredNotifications.map((n) => {
                        const Icon = icons[n.type] || Bell
                        return (
                            <Link
                                key={n.id}
                                href={n.link || '#'}
                                className={`flex items-start gap-5 p-5 rounded-2xl transition-all group border ${!n.read
                                        ? 'bg-primary/10 border-primary/20 hover:bg-primary/15'
                                        : 'bg-dark-800 border-white/5 hover:border-white/10 hover:bg-dark-700'
                                    }`}
                            >
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${!n.read ? 'bg-primary/20 text-primary shadow-glow' : 'bg-dark-700 text-dark-400'
                                    }`}>
                                    <Icon size={24} />
                                </div>

                                <div className="flex-1 min-w-0 py-1">
                                    <p className={`text-[15px] leading-relaxed ${!n.read ? 'text-white font-medium' : 'text-dark-200'
                                        }`}>
                                        {n.message}
                                    </p>
                                    <p className="text-xs text-dark-500 mt-2 font-medium">
                                        {getTimeAgo(new Date(n.createdAt))}
                                    </p>
                                </div>

                                {!n.read && (
                                    <div className="w-2.5 h-2.5 bg-primary rounded-full flex-shrink-0 mt-4 shadow-glow" />
                                )}

                                <button
                                    className="p-2.5 opacity-0 group-hover:opacity-100 hover:bg-dark-600 rounded-xl transition-all"
                                    onClick={(e) => { e.preventDefault(); e.stopPropagation() }}
                                >
                                    <Trash2 size={18} className="text-dark-500 hover:text-red-400" />
                                </button>
                            </Link>
                        )
                    })}
                </div>
            )}
        </>
    )
}
