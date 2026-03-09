import { OnboardingPage } from '#/features/onboarding/ui/views/onboarding-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_private/onboarding')({
  component: () => {
    const ctx = Route.useRouteContext()
    return (
      <OnboardingPage
        hasActiveOrganization={!!ctx.session.activeOrganizationId}
      />
    )
  },
})
