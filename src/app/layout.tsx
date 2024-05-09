import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const mono = JetBrains_Mono({
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
    images: 'https://avatars.githubusercontent.com/u/84912564',
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
        className={`${inter.className} ${mono.variable} selection:text-neutral-900 selection:bg-neutral-100 min-h-screen antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
