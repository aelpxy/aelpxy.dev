import type { Metadata } from 'next'
import { Gowun_Dodum, JetBrains_Mono } from 'next/font/google'
import './globals.css'

import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

const primaryFont = Gowun_Dodum({ weight: ['400'], subsets: ['vietnamese'] })
const monoFont = JetBrains_Mono({
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
        className={`${primaryFont.className} ${monoFont.variable} selection:text-neutral-900 selection:bg-neutral-100 min-h-screen antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
