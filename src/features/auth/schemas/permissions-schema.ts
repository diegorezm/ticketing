import type { Permissions } from '../lib/permissions'
import { z } from 'zod'

export type PermissionInput = {
  [K in keyof Permissions]: {
    resource: K
    actions: Array<Permissions[K][number]>
  }
}[keyof Permissions]

export const permissionsSchema = z.custom<PermissionInput>()
