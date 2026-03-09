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
import { useCreateOrg } from '#/features/auth/hooks/use-organizations'
import { createOrgSchema } from '#/features/auth/schemas/organization-schemas'
import { useForm } from '@tanstack/react-form-start'
import { useNavigate } from '@tanstack/react-router'

function toSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export function CreateOrgForm() {
  const { mutateAsync, isPending, isError } = useCreateOrg()
  const navigate = useNavigate()

  const form = useForm({
    defaultValues: { name: '', slug: '' },
    validators: { onSubmit: createOrgSchema },
    onSubmit: async ({ value }) => {
      await mutateAsync(value)

      navigate({
        to: '/dashboard',
      })
    },
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">New organization</CardTitle>
        <CardDescription>
          You'll be the admin and can invite others later.
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
              name="name"
              validators={{ onBlur: createOrgSchema.shape.name }}
            >
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>
                    Organization name
                  </FieldLabel>
                  <Input
                    id={field.name}
                    placeholder="Acme Corp"
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(e.target.value)
                      // only auto-fill slug if user hasn't manually customized it
                      const currentSlug = form.getFieldValue('slug')
                      const prevAutoSlug = toSlug(field.state.value)
                      if (currentSlug === prevAutoSlug || currentSlug === '') {
                        form.setFieldValue('slug', toSlug(e.target.value))
                      }
                    }}
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

            <form.Field
              name="slug"
              validators={{ onBlur: createOrgSchema.shape.slug }}
            >
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Slug</FieldLabel>
                  <Input
                    id={field.name}
                    placeholder="acme-corp"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(toSlug(e.target.value))}
                    onBlur={field.handleBlur}
                  />
                  <FieldDescription>
                    Used in URLs — only lowercase letters, numbers and hyphens.
                  </FieldDescription>
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
                Something went wrong. Please try again.
              </FieldDescription>
            )}

            <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting]}>
              {([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  className="w-full"
                  disabled={!canSubmit || isSubmitting || isPending}
                >
                  {isPending ? 'Creating...' : 'Create organization'}
                </Button>
              )}
            </form.Subscribe>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
