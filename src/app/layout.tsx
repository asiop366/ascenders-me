import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ascenders - The First Modern Looksmaxxing Forum',
  description: 'Join the premier looksmaxxing community. Science-backed discussions on fitness, skincare, style, and physical self-improvement.',
  keywords: ['looksmaxxing', 'fitness', 'skincare', 'style', 'self-improvement', 'grooming', 'transformation'],
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-asc-bg text-asc-text antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
