import type { Metadata } from 'next'
import { DM_Mono, DM_Sans } from 'next/font/google'
import './globals.css'

import Footer from '@/components/footer'
import Navbar from '@/components/navbar'

const primaryFont = DM_Sans({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
})
const monoFont = DM_Mono({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'aelpxy',
  description: '~/root',
  openGraph: {
    title: 'aelpxy',
    description: '~/root',
    images: 'https://aelpxy.dev/image.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${primaryFont.className} ${monoFont.variable} selection:text-stone-900 selection:bg-stone-100 min-h-screen antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
