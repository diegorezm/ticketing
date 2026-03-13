import { InvitationsPage } from '#/features/invitations/ui/views/invitations-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_private/dashboard/members/invitations')(
  {
    component: InvitationsPage,
  },
)
