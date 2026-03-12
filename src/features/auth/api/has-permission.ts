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

    if (!orgId) return { success: false }

    const headers = getRequestHeaders()

    const [hasAll, hasSpecific] = await Promise.all([
      auth.api.hasPermission({
        body: { permissions: { all: ['all'] }, organizationId: orgId },
        headers,
      }),
      auth.api.hasPermission({
        body: {
          permissions: { [data.resource]: data.actions },
          organizationId: orgId,
        },
        headers,
      }),
    ])

    if (hasAll.success || hasSpecific.success) {
      return { success: true, error: null }
    }

    return {
      success: false,
      error: `Missing permission: ${data.resource}:${data.actions.join(', ')}`,
    }
  })
