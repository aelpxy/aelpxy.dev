import { Hono } from 'hono'
import { handle } from 'hono/vercel'

import { rpcRouter } from '@/server/router'
import { RPCHandler } from '@orpc/server/fetch'
import { cors } from 'hono/cors'

const app = new Hono().basePath('/api')
const rpcHandler = new RPCHandler(rpcRouter)

app.use(
  cors({
    origin: ['*'],
  })
)

app.get('/health', (c) => {
  return c.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  })
})

app.use('/rpc/*', async (c, next) => {
  const { matched, response } = await rpcHandler.handle(c.req.raw, {
    prefix: '/api/rpc',
    context: {},
  })

  if (matched) {
    return c.newResponse(response.body, response)
  }

  await next()
})

const handler = handle(app)

export {
  handler as DELETE,
  handler as GET,
  handler as PATCH,
  handler as POST,
  handler as PUT,
}

export const runtime = 'nodejs'
