import { getSessionAction } from '#/features/auth/actions/get-session-action'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_private')({
  beforeLoad: async ({ location }) => {
    const session = await getSessionAction()
    if (!session) {
      throw redirect({
        to: '/login',
        search: { redirect: location.href },
      })
    }
  },
  component: Outlet,
})
