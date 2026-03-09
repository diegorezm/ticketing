import { AppLogo } from '#/components/logo'
import { OrgTabs } from '../components/org-tabs'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from '@tanstack/react-router'
import { Button } from '#/components/ui/button'

type Props = {
  hasActiveOrganization?: boolean
}

export function OnboardingPage({ hasActiveOrganization }: Props) {
  const router = useRouter()

  const handleBack = () => {
    router.history.back()
  }

  const title = hasActiveOrganization
    ? 'Create a new organization'
    : 'Set up your workspace'

  const description = hasActiveOrganization
    ? 'Add a new workspace to manage different projects or teams.'
    : 'Create a new organization or join an existing one to get started.'

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[2fr_3fr]">
      {/* Image side */}
      <div className="hidden lg:flex flex-col bg-muted items-center justify-center relative overflow-hidden">
        <img src="/undraw_cabin_7fei.svg" alt="Cabin" className="size-92" />
        <a
          href="https://undraw.co"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 text-xs text-muted-foreground transition-colors font-mono"
        >
          Illustration by <span className="text-primary">unDraw</span>
        </a>
      </div>

      {/* Form side */}
      <div className="flex flex-col items-center justify-center px-8 py-16 relative">
        {/* Only show 'Go back' if they already have an org to go back to */}
        {hasActiveOrganization && (
          <div className="absolute top-10 left-8">
            <Button variant="outline" size="sm" onClick={handleBack}>
              <ChevronLeft className="size-4 mr-2" />
              Go back
            </Button>
          </div>
        )}

        <div className="w-full max-w-sm">
          <div className="mb-6">
            <AppLogo />
            <div className="mt-6">
              <h1 className="text-xl font-semibold text-foreground tracking-tight mb-1">
                {title}
              </h1>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>

          <OrgTabs />
        </div>
      </div>
    </div>
  )
}
