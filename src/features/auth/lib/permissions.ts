import { createAccessControl } from 'better-auth/plugins/access'

export const stmt = {
  all: ['all'],
  organizations: ['invite'],
  projects: ['create'],
} as const

export type Permissions = typeof stmt

export const ac = createAccessControl(stmt)
