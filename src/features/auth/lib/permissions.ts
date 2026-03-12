import { createAccessControl } from 'better-auth/plugins/access'

const stmt = {
  organizations: ['invite'],
  projects: ['create'],
} as const

export type Permissions = typeof stmt

export const ac = createAccessControl(stmt)
