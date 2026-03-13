import { Button } from '#/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '#/components/ui/card'
import { authClient } from '#/features/auth/lib/auth-client'
import { useQueryClient } from '@tanstack/react-query'
import {
  createFileRoute,
  Link,
  useNavigate,
  useParams,
} from '@tanstack/react-router'
import { CheckCircle, Loader2, XCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { AppLogo } from '#/components/logo'
import { orgKeys } from '#/features/auth/hooks/use-organizations'

export const Route = createFileRoute('/_public/invite/$invitationId')({
  component: RouteComponent,
})

type State = 'loading' | 'success' | 'error' | 'unauthenticated'

function RouteComponent() {
  const { invitationId } = useParams({ from: '/_public/invite/$invitationId' })
  const { data: session, isPending: sessionPending } = authClient.useSession()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [state, setState] = useState<State>('loading')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    if (sessionPending) return

    if (!session?.user) {
      setState('unauthenticated')
      return
    }

    async function accept() {
      setState('loading')

      const { error } = await authClient.organization.acceptInvitation({
        invitationId,
      })

      if (error) {
        setErrorMessage(
          error.message ?? 'This invite is invalid or has expired.',
        )
        setState('error')
        return
      }

      queryClient.invalidateQueries({ queryKey: orgKeys.all })
      setState('success')

      setTimeout(() => {
        navigate({ to: '/dashboard' })
      }, 2000)
    }

    accept()
  }, [sessionPending, session])

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <AppLogo className="mb-8" />

      <div className="w-full max-w-sm">
        {state === 'loading' && (
          <Card>
            <CardContent className="flex flex-col items-center py-10 gap-3">
              <Loader2
                size={24}
                className="animate-spin text-muted-foreground"
              />
              <p className="text-sm text-muted-foreground">
                Accepting your invitation...
              </p>
            </CardContent>
          </Card>
        )}

        {state === 'success' && (
          <Card>
            <CardContent className="flex flex-col items-center py-10 gap-3 text-center">
              <CheckCircle size={24} className="text-primary" />
              <p className="text-sm font-medium text-foreground">
                You've joined the organization!
              </p>
              <p className="text-xs text-muted-foreground">
                Redirecting you to the dashboard...
              </p>
            </CardContent>
          </Card>
        )}

        {state === 'error' && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <XCircle size={18} className="text-destructive" />
                <CardTitle className="text-base">Invite unavailable</CardTitle>
              </div>
              <CardDescription>{errorMessage}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link to="/dashboard">Go to dashboard</Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {state === 'unauthenticated' && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                You need an account first
              </CardTitle>
              <CardDescription>
                Sign in or create an account to accept this invitation.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button asChild className="w-full">
                <Link
                  to="/register"
                  search={{ redirect: `/invite/${invitationId}` }}
                >
                  Create account
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link
                  to="/login"
                  search={{ redirect: `/invite/${invitationId}` }}
                >
                  Sign in
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
