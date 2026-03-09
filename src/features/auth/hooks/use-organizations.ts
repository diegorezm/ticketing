import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getCurrentUserOrganizationsFn } from '../api/get-user-organizations'
import { getOrganizationFn } from '../api/get-organization'
import { createOrganizationFn } from '../api/create-organization'
import type {
  CreateOrganization,
  JoinOrg,
} from '../schemas/organization-schemas'
import { authClient } from '../lib/auth-client'

export const orgKeys = {
  all: ['organizations'] as const,
  detail: (id: string) => ['organizations', id] as const,
  members: (id: string) => ['organizations', id, 'members'] as const,
  invites: (id: string) => ['organizations', id, 'invites'] as const,
}

export function useGetCurrentUserOrganizations() {
  return useQuery({
    queryKey: orgKeys.all,
    queryFn: () => getCurrentUserOrganizationsFn(),
    staleTime: Infinity,
  })
}

export function useOrganization(orgId: string) {
  return useQuery({
    queryKey: orgKeys.detail(orgId),
    queryFn: () => getOrganizationFn({ data: { orgId } }),
    staleTime: Infinity,
  })
}

export function useCreateOrg() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateOrganization) => createOrganizationFn({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orgKeys.all })
    },
  })
}

export function useJoinOrg() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: JoinOrg) => {
      return await authClient.organization.acceptInvitation({
        invitationId: data.code,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orgKeys.all })
    },
  })
}
