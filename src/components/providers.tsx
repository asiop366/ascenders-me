'use client'

import { SessionProvider } from 'next-auth/react'
import { ToastProvider } from '@/components/ui/toast'
import { LanguageProvider } from '@/lib/language-context'
import { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <LanguageProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </LanguageProvider>
    </SessionProvider>
  )
}
