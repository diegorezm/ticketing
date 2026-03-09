import { z } from 'zod'

export const createOrgSchema = z.object({
  name: z.string().min(2).max(256),
  slug: z
    .string()
    .min(2)
    .max(64)
    .regex(/^[a-z0-9-]+$/, 'Only lowercase letters, numbers and hyphens'),
})

export const joinOrgSchema = z.object({
  code: z.string().min(6).max(32),
})

export type CreateOrganization = z.infer<typeof createOrgSchema>
export type JoinOrg = z.infer<typeof joinOrgSchema>
