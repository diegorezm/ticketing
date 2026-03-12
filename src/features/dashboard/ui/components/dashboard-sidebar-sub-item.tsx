import {
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '#/components/ui/sidebar'
import { usePermission } from '#/features/auth/hooks/use-permissions'
import { Link } from '@tanstack/react-router'
import type { SubItem } from './dashboard-sidebar'

export function DashboardSubitem({
  sub,
  pathname,
}: {
  sub: SubItem
  pathname: string
}) {
  const { data } = usePermission(
    sub.permission ?? { resource: 'organizations', actions: ['invite'] },
  )

  if (sub.permission && !data?.success) return null

  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton asChild isActive={pathname === sub.to}>
        <Link to={sub.to}>
          {sub.icon && <sub.icon size={13} />}
          <span>{sub.label}</span>
        </Link>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  )
}
