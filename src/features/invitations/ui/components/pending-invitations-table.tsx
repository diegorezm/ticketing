import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '#/components/ui/card'
import { Skeleton } from '#/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '#/components/ui/table'
import { orgKeys } from '#/features/auth/hooks/use-organizations'
import { authClient } from '#/features/auth/lib/auth-client'
import { cn } from '#/lib/utils'
import { useQueryClient } from '@tanstack/react-query'
import { formatDistanceToNow, isPast } from 'date-fns'
import { MailX } from 'lucide-react'
import { useState } from 'react'

type Invitation = {
  id: string
  email: string
  inviterId: string
  inviterName?: string
  createdAt: string | Date
  expiresAt: string | Date
  status: 'pending' | 'accepted' | 'rejected' | 'canceled'
  organizationId: string
}

type Props = {
  orgId: string
  invitations: Invitation[]
  isPending?: boolean
}

export function PendingInvitationsTable({
  orgId,
  invitations,
  isPending = false,
}: Props) {
  const queryClient = useQueryClient()
  const [revokingId, setRevokingId] = useState<string | null>(null)

  async function handleRevoke(invitationId: string) {
    setRevokingId(invitationId)
    await authClient.organization.cancelInvitation({ invitationId })
    queryClient.invalidateQueries({ queryKey: orgKeys.invites(orgId) })
    setRevokingId(null)
  }

  const pending = invitations.filter((i) => i.status === 'pending')

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Pending invitations</CardTitle>
        <CardDescription>
          Invitations that have been sent but not yet accepted.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isPending ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16 ml-auto" />
              </div>
            ))}
          </div>
        ) : pending.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <MailX size={24} className="text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">
              No pending invitations.
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Invited by</TableHead>
                <TableHead>Sent</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead>Status</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {pending.map((invite) => {
                const expired = isPast(new Date(invite.expiresAt))
                return (
                  <TableRow key={invite.id}>
                    <TableCell className="font-medium">
                      {invite.email}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {invite.inviterName ?? invite.inviterId}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {formatDistanceToNow(new Date(invite.createdAt), {
                        addSuffix: true,
                      })}
                    </TableCell>
                    <TableCell
                      className={cn(
                        'text-sm',
                        expired ? 'text-destructive' : 'text-muted-foreground',
                      )}
                    >
                      {expired
                        ? 'Expired'
                        : formatDistanceToNow(new Date(invite.expiresAt), {
                            addSuffix: true,
                          })}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={expired ? 'destructive' : 'secondary'}
                        className="font-mono text-xs"
                      >
                        {expired ? 'Expired' : 'Pending'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-destructive"
                        disabled={revokingId === invite.id}
                        onClick={() => handleRevoke(invite.id)}
                      >
                        {revokingId === invite.id ? 'Revoking...' : 'Revoke'}
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
