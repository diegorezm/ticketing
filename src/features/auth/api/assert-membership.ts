import { db } from '#/db'
import { members } from '#/db/schemas'
import { createServerFn } from '@tanstack/react-start'
import { and, eq } from 'drizzle-orm'
import z from 'zod'

export const assertMembershipFn = createServerFn({ method: 'GET' })
  .inputValidator(
    z.object({
      userId: z.uuid(),
      orgId: z.uuid(),
    }),
  )
  .handler(async ({ data }) => {
    const { orgId, userId } = data
    const membership = await db.query.members.findFirst({
      where: and(eq(members.organizationId, orgId), eq(members.userId, userId)),
    })
    if (!membership) throw new Error('Forbidden')
    return membership
  })
