import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  return NextResponse.json({ result: 'OK' })
}

export const runtime = 'edge'
