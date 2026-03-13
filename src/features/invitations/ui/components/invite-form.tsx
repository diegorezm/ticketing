import { Button } from '#/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '#/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import { authClient } from '#/features/auth/lib/auth-client'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from '@tanstack/react-form-start'
import { Mail, RefreshCw } from 'lucide-react'
import { z } from 'zod'
import { orgKeys } from '#/features/auth/hooks/use-organizations'
import { toast } from 'sonner'

const inviteByEmailSchema = z.object({
  email: z.email(),
})

type Props = {
  orgId: string
}

export function InviteForm({ orgId }: Props) {
  const queryClient = useQueryClient()

  const form = useForm({
    defaultValues: { email: '' },
    validators: { onSubmit: inviteByEmailSchema },
    onSubmit: async ({ value }) => {
      const { error: err } = await authClient.organization.inviteMember({
        organizationId: orgId,
        email: value.email,
        role: 'member',
      })
      if (err) {
        toast.error(err.message ?? 'Failed to send invite.')
        return
      }

      queryClient.invalidateQueries({ queryKey: orgKeys.invites(orgId) })
      form.reset()
    },
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Invite people</CardTitle>
        <CardDescription>
          Send an invite by email or share a link.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Invite by email */}
        <div>
          <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
            <Mail size={12} />
            By email
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit()
            }}
          >
            <FieldGroup>
              <form.Field
                name="email"
                validators={{ onBlur: inviteByEmailSchema.shape.email }}
              >
                {(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Email address</FieldLabel>
                    <div className="flex gap-2">
                      <Input
                        id={field.name}
                        type="email"
                        placeholder="colleague@company.com"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        className="flex-1"
                      />
                      <form.Subscribe
                        selector={(s) => [s.canSubmit, s.isSubmitting]}
                      >
                        {([canSubmit, isSubmitting]) => (
                          <Button
                            type="submit"
                            disabled={!canSubmit || isSubmitting}
                          >
                            {isSubmitting ? (
                              <RefreshCw size={14} className="animate-spin" />
                            ) : (
                              'Send invite'
                            )}
                          </Button>
                        )}
                      </form.Subscribe>
                    </div>
                    {field.state.meta.errors.length > 0 && (
                      <FieldDescription className="text-destructive">
                        {field.state.meta.errors[0]?.message}
                      </FieldDescription>
                    )}
                  </Field>
                )}
              </form.Field>
            </FieldGroup>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}
