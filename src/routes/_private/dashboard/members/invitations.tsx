import { hasPermissionFn } from '#/features/auth/api/has-permission'
import { InvitationsPage } from '#/features/invitations/ui/views/invitations-page'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_private/dashboard/members/invitations')(
  {
    component: InvitationsPage,
    beforeLoad: async () => {
      const result = await hasPermissionFn({
        data: { resource: 'organizations', actions: ['invite'] },
      })
      if (!result.success) {
        throw redirect({ to: '/dashboard' })
      }
    },
  },
)
