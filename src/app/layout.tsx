import type { Metadata } from 'next'
import { ViewTransitions } from 'next-view-transitions'
import { JetBrains_Mono } from 'next/font/google'

import './globals.css'

import Footer from '@/components/footer'
import Hotkeys from '@/components/hotkeys'
import Navbar from '@/components/navbar'

const primaryFont = JetBrains_Mono({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'aelpxy',
  description: '~/root',
  openGraph: {
    title: 'aelpxy',
    description: '~/root',
    images: 'https://aelpxy.dev/favicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ViewTransitions>
      <html lang='en'>
        <Hotkeys />
        <body
          className={`${primaryFont.className} selection:text-neutral-900 selection:bg-neutral-100 min-h-screen antialiased`}
        >
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </ViewTransitions>
  )
}
