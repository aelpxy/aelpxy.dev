import 'server-only'

import { rpcRouter } from '@/server/router'
import { createRouterClient } from '@orpc/server'
import { headers } from 'next/headers'

globalThis.$client = createRouterClient(rpcRouter, {
  context: async () => ({
    headers: await headers(),
  }),
})
