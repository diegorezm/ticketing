import { OnboardingPage } from '#/features/onboarding/ui/views/onboarding-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/onboarding')({
  component: OnboardingPage,
})
