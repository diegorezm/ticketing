import { createServerFn } from '@tanstack/react-start'
import { auth } from '../lib/auth'
import { z } from 'zod'
import { getRequestHeaders } from '@tanstack/react-start/server'

export const setUserCurrentActiveOrganizationFn = createServerFn({
  method: 'POST',
})
  .inputValidator(
    z.object({
      orgId: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const headers = getRequestHeaders()
    return await auth.api.setActiveOrganization({
      body: {
        organizationId: data.orgId,
      },
      headers,
    })
  })
