import { createServerFn } from '@tanstack/react-start'
import { getRequestHeaders } from '@tanstack/react-start/server'
import { auth } from '../lib/auth'
import { assertSessionFn } from './assert-session'
import { permissionsSchema } from '../schemas/permissions-schema'

export const hasPermissionFn = createServerFn({
  method: 'GET',
})
  .inputValidator(permissionsSchema)
  .handler(async ({ data }) => {
    const session = await assertSessionFn()
    const orgId = session.session.activeOrganizationId

    if (!orgId) {
      throw Error('Forbidden')
    }

    const headers = getRequestHeaders()

    return await auth.api.hasPermission({
      body: {
        permissions: { [data.resource]: data.actions },
        organizationId: orgId,
      },
      headers,
    })
  })
