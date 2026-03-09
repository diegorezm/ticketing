import { getCurrentUserOrganizationsFn } from '#/features/auth/api/get-user-organizations'
import { setUserCurrentActiveOrganizationFn } from '#/features/auth/api/set-user-current-active-organization'
import { DashboardPage } from '#/features/dashboard/ui/views/dashboard-page'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_private/dashboard')({
  component: DashboardPage,
  beforeLoad: async ({ context }) => {
    if (!context.session.activeOrganizationId) {
      const orgs = await getCurrentUserOrganizationsFn()
      if (orgs.length === 0) {
        throw redirect({ to: '/onboarding' })
      }

      await setUserCurrentActiveOrganizationFn({
        data: {
          orgId: orgs[0].id,
        },
      })
    }
  },
})
