import { useQuery } from '@tanstack/react-query'
import { hasPermissionFn } from '../api/has-permission'
import type { PermissionInput } from '../schemas/permissions-schema'

export const permissionKeys = {
  all: ['permissions'] as const,
  check: (input: PermissionInput) =>
    ['permissions', input.resource, input.actions] as const,
}

export function usePermission(input: PermissionInput) {
  return useQuery({
    queryKey: permissionKeys.check(input),
    queryFn: () => hasPermissionFn({ data: input }),
    staleTime: 1000 * 60 * 30,
    refetchInterval: 1000 * 60 * 30,
  })
}
