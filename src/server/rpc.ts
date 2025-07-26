import { rpcRouter } from '@/server/router'
import { createORPCClient } from '@orpc/client'
import { RPCLink } from '@orpc/client/fetch'
import { RouterClient } from '@orpc/server'
import { createTanstackQueryUtils } from '@orpc/tanstack-query'

declare global {
  var $client: RouterClient<typeof rpcRouter> | undefined
}

const link = new RPCLink({
  url: `${typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'}/api/rpc`,
  headers: async () => {
    if (typeof window !== 'undefined') {
      return {}
    }

    const { headers } = await import('next/headers')
    return Object.fromEntries(await headers())
  },
})

export const client: RouterClient<typeof rpcRouter> =
  globalThis.$client ?? createORPCClient(link)
export const rpc = createTanstackQueryUtils(client)
