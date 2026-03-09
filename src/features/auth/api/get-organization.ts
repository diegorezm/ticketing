import { createServerFn } from '@tanstack/react-start'
import z from 'zod'
import { assertSessionFn } from './assert-session'
import { db } from '#/db'
import { eq } from 'drizzle-orm'
import { organizations } from '#/db/schemas'
import { assertMembershipFn } from './assert-membership'

export const getOrganizationFn = createServerFn({
  method: 'GET',
})
  .inputValidator(
    z.object({
      orgId: z.uuid(),
    }),
  )
  .handler(async ({ data }) => {
    const session = await assertSessionFn()

    await assertMembershipFn({
      data: {
        orgId: data.orgId,
        userId: session.user.id,
      },
    })

    const org = await db.query.organizations.findFirst({
      where: eq(organizations.id, data.orgId),
    })

    return org
  })
