import tips from '@/lib/data/tips.json'
import { NextResponse } from 'next/server'

export async function GET() {
  const randomIndex = Math.floor(Math.random() * tips.length)
  const randomTip = tips[randomIndex]

  return NextResponse.json({ tip: randomTip })
}

export const runtime = 'edge'
