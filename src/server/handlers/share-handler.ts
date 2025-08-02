import { db } from '@/lib/db'
import { ORPCError, os } from '@orpc/server'
import * as z from 'zod'

const CreateShareSchema = z.object({
  encryptedContent: z.string(),
  salt: z.string(),
  iv: z.string(),
  keyHash: z.string(),
  authTag: z.string(),
  version: z.string(),
  expiresAt: z.date().optional(),
})

const GetShareSchema = z.object({
  id: z.string(),
})

export const createShare = os
  .input(CreateShareSchema)
  .handler(async ({ input }) => {
    try {
      const share = await db.share.create({
        data: {
          encryptedContent: input.encryptedContent,
          salt: input.salt,
          iv: input.iv,
          keyHash: input.keyHash,
          authTag: input.authTag,
          version: input.version,
          expiresAt: input.expiresAt,
        },
      })

      return { id: share.id }
    } catch (error) {
      console.error(error)
      throw new ORPCError('INTERNAL_SERVER_ERROR')
    }
  })

export const getShare = os.input(GetShareSchema).handler(async ({ input }) => {
  try {
    const share = await db.share.findUnique({
      where: { id: input.id },
      select: {
        id: true,
        encryptedContent: true,
        salt: true,
        iv: true,
        keyHash: true,
        authTag: true,
        version: true,
        createdAt: true,
        expiresAt: true,
      },
    })

    if (!share) {
      throw new ORPCError('NOT_FOUND', {
        message: 'Share not found',
      })
    }

    if (share.expiresAt && share.expiresAt < new Date()) {
      throw new ORPCError('FORBIDDEN', {
        message: 'Share has expired',
      })
    }

    return share
  } catch (error) {
    console.error(error)
    throw new ORPCError('INTERNAL_SERVER_ERROR')
  }
})
