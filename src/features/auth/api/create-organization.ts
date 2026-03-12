import { createServerFn } from '@tanstack/react-start'
import { createOrgSchema } from '../schemas/organization-schemas'
import { auth } from '../lib/auth'
import { assertSessionFn } from './assert-session'

export const createOrganizationFn = createServerFn()
  .inputValidator(createOrgSchema)
  .handler(async ({ data }) => {
    const session = await assertSessionFn()

    const org = await auth.api.createOrganization({
      body: {
        ...data,
        userId: session.user.id,
      },
      method: 'POST',
    })

    return org
  })
