import { useListOrganizationInvitations } from '#/features/auth/hooks/use-organizations'
import { authClient } from '#/features/auth/lib/auth-client'
import { InviteForm } from '../components/invite-form'
import { PendingInvitationsTable } from '../components/pending-invitations-table'

export function InvitationsPage() {
  const { data: session } = authClient.useSession()
  const { data: invitations, isPending } = useListOrganizationInvitations(
    session?.session.activeOrganizationId ?? undefined,
  )

  const orgId = session?.session.activeOrganizationId

  if (!orgId) return null

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground tracking-tight">
          Invitations
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Invite new members to your organization.
        </p>
      </div>

      <InviteForm orgId={orgId} />

      <PendingInvitationsTable
        orgId={orgId}
        invitations={invitations ?? []}
        isPending={isPending}
      />
    </div>
  )
}
