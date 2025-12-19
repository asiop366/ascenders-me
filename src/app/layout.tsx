import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@components/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ascenders - Community Platform',
  description: 'A modern community platform for discussions and connections',
  keywords: ['community', 'forum', 'discussions', 'social'],
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
