'use client'

import { ReactNode, useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function MainLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-dark-950">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 glass border-b border-white/5 px-4 flex items-center justify-between z-30">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 text-dark-300 hover:text-white transition-colors"
        >
          <Menu size={24} />
        </button>
        <div className="font-bold text-white tracking-tight">Ascenders</div>
        <div className="w-10" /> {/* Spacer */}
      </div>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className={cn(
        "flex-1 transition-all duration-300",
        "lg:ml-72", // Desktop margin
        "pt-16 lg:pt-0" // Mobile top padding for fixed header
      )}>
        {children}
      </main>
    </div>
  )
}
