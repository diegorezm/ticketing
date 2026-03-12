import { createServerFn } from '@tanstack/react-start'
import { getRequestHeaders } from '@tanstack/react-start/server'
import { auth } from '../lib/auth'
import { permissionsSchema } from '../schemas/permissions-schema'

export const hasPermissionFn = createServerFn({
  method: 'GET',
})
  .inputValidator(permissionsSchema)
  .handler(async ({ data }) => {
    try {
      const headers = getRequestHeaders()
      const member = await auth.api.getActiveMember({ headers })

      if (member.role === 'owner') return { success: true, error: null }

      return await auth.api.hasPermission({
        body: {
          permissions: { [data.resource]: data.actions },
          organizationId: member.organizationId,
        },
        headers,
      })
    } catch (e) {
      console.error('hasPermissionFn error:', e)
      return { success: false, error: String(e) }
    }
  })
