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
import { useJoinOrg } from '#/features/auth/hooks/use-organizations'
import { joinOrgSchema } from '#/features/auth/schemas/organization-schemas'
import { useForm } from '@tanstack/react-form-start'

export function JoinOrgForm() {
  const { mutateAsync, isPending, isError } = useJoinOrg()

  const form = useForm({
    defaultValues: { code: '' },
    validators: { onSubmit: joinOrgSchema },
    onSubmit: async ({ value }) => {
      await mutateAsync(value)
    },
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Join an organization</CardTitle>
        <CardDescription>
          Ask your organization admin for an invite code.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup>
            <form.Field
              name="code"
              validators={{ onBlur: joinOrgSchema.shape.code }}
            >
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Invite code</FieldLabel>
                  <Input
                    id={field.name}
                    placeholder="e.g. ACME-X7K2"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <FieldDescription className="text-destructive">
                      {field.state.meta.errors[0]?.message}
                    </FieldDescription>
                  )}
                </Field>
              )}
            </form.Field>

            {isError && (
              <FieldDescription className="text-destructive">
                Invalid or expired invite code. Please try again.
              </FieldDescription>
            )}

            <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting]}>
              {([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  className="w-full"
                  disabled={!canSubmit || isSubmitting || isPending}
                >
                  {isPending ? 'Joining...' : 'Join organization'}
                </Button>
              )}
            </form.Subscribe>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
