import { useGetCurrentUserOrganizations } from '#/features/auth/hooks/use-organizations'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'
import { Skeleton } from '#/components/ui/skeleton'
import { SidebarMenuButton } from '#/components/ui/sidebar'
import { authClient } from '#/features/auth/lib/auth-client'
import { Link } from '@tanstack/react-router'
import { Building2, ChevronsUpDown, Plus } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import { permissionKeys } from '#/features/auth/hooks/use-permissions'

export function OrganizationsDropdown() {
  const { data: orgs, isPending, isError } = useGetCurrentUserOrganizations()
  const { data: session } = authClient.useSession()
  const queryClient = useQueryClient()

  const activeOrgId = session?.session.activeOrganizationId
  const activeOrg = orgs?.find((org) => org.id === activeOrgId) ?? orgs?.[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-primary text-primary-foreground shrink-0">
            <Building2 size={14} />
          </div>
          <div className="flex flex-col gap-0.5 leading-none overflow-hidden flex-1">
            {isPending ? (
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-2.5 w-16" />
              </div>
            ) : isError ? (
              <span className="text-sm text-destructive truncate">
                Failed to load
              </span>
            ) : (
              <>
                <span className="font-semibold truncate">
                  {activeOrg?.name ?? 'Select org'}
                </span>
                <span className="text-xs text-muted-foreground truncate">
                  {activeOrg?.slug}
                </span>
              </>
            )}
          </div>
          <ChevronsUpDown
            size={14}
            className="ml-auto shrink-0 text-muted-foreground"
          />
        </SidebarMenuButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent side="bottom" align="start" className="w-56">
        <DropdownMenuLabel className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
          Organizations
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {isPending && (
          <div className="space-y-1 p-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2 px-2 py-1.5">
                <Skeleton className="size-5 rounded" />
                <Skeleton className="h-3 w-28" />
              </div>
            ))}
          </div>
        )}

        {isError && (
          <p className="text-xs text-destructive px-2 py-1.5">
            Could not load organizations.
          </p>
        )}

        {orgs?.map((org) => (
          <DropdownMenuItem
            key={org.id}
            className="gap-2"
            onClick={() => {
              authClient.organization.setActive({ organizationId: org.id })
              queryClient.invalidateQueries({ queryKey: permissionKeys.all })
            }}
          >
            <div className="flex size-5 items-center justify-center rounded bg-primary/10 shrink-0">
              <Building2 size={11} className="text-primary" />
            </div>
            <span className="truncate">{org.name}</span>
            {org.id === activeOrgId && (
              <span className="ml-auto text-xs text-muted-foreground shrink-0">
                Active
              </span>
            )}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="gap-2 text-muted-foreground">
          <Link to="/onboarding">
            <Plus size={14} />
            Create organization
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
