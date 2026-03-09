import { getSessionFn } from '#/features/auth/api/get-session'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_private')({
  beforeLoad: async ({ location }) => {
    const session = await getSessionFn()
    if (!session) {
      throw redirect({
        to: '/login',
        search: { redirect: location.href },
      })
    }
    return {
      ...session,
    }
  },
  component: Outlet,
})
