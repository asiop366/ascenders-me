'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Sidebar } from '@/components/sidebar'

interface MobileSidebarToggleProps {
    topTopics: any[]
    unreadCount: number
}

export function MobileSidebarToggle({ topTopics, unreadCount }: MobileSidebarToggleProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 glass border-b border-white/5 px-4 flex items-center justify-between z-30">
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-2 text-dark-300 hover:text-white transition-colors"
                >
                    <Menu size={24} />
                </button>
                <div className="font-bold text-white tracking-tight">Ascenders</div>
                <div className="w-10" /> {/* Spacer */}
            </div>

            <Sidebar
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                topTopics={topTopics}
                unreadCount={unreadCount}
            />
        </>
    )
}
