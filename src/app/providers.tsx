'use client'

import { createQueryClient } from '@/lib/query/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

export function Providers(props: { children: React.ReactNode }) {
  const [queryClient] = useState(() => createQueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  )
}
