'use client'

import { useTransitionRouter } from 'next-view-transitions'
import { useHotkeys } from 'react-hotkeys-hook'

export default function Hotkeys() {
  const router = useTransitionRouter()

  useHotkeys('h', () => router.push('/'), { enableOnFormTags: true })
  useHotkeys(['b', 'p'], () => router.push('/blog'), { enableOnFormTags: true })

  return null
}
