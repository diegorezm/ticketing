import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarSeparator,
} from '#/components/ui/sidebar'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '#/components/ui/collapsible'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'
import { Link, useLocation } from '@tanstack/react-router'
import {
  ChevronRight,
  ChevronUp,
  FolderKanban,
  Inbox,
  KanbanSquare,
  MailPlus,
  Plus,
  Settings,
  Users,
} from 'lucide-react'
import { OrganizationsDropdown } from './organizations-dropdown'
import type { PermissionInput } from '#/features/auth/schemas/permissions-schema'
import { DashboardSubitem } from './dashboard-sidebar-sub-item'

export type SubItem = {
  label: string
  to: string
  icon?: React.ElementType
  permission?: PermissionInput
}

export type NavItem = {
  label: string
  icon: React.ElementType
  to: string
  subitems?: SubItem[]
}

const navItems: NavItem[] = [
  { label: 'Inbox', icon: Inbox, to: '/inbox' },
  { label: 'Board', icon: KanbanSquare, to: '/board' },
  { label: 'Projects', icon: FolderKanban, to: '/projects' },
  {
    label: 'Members',
    icon: Users,
    to: '/members',
    subitems: [
      { label: 'All Members', to: '/members' },
      {
        label: 'Invitations',
        to: '/members/invitations',
        icon: MailPlus,
        permission: { resource: 'organizations', actions: ['invite'] },
      },
    ],
  },
  { label: 'Settings', icon: Settings, to: '/settings' },
]

const projects = [
  { id: '1', name: 'Website Redesign' },
  { id: '2', name: 'Mobile App' },
  { id: '3', name: 'API v2' },
]

const currentProject = projects[0]

export function DashboardSidebar() {
  const { pathname } = useLocation()

  return (
    <Sidebar collapsible="icon">
      {/* Org switcher */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <OrganizationsDropdown />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator className="bg-border overflow-hidden mx-0" />

      {/* Nav items */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = pathname.startsWith(item.to)

                if (item.subitems) {
                  return (
                    <Collapsible
                      key={item.label}
                      defaultOpen={isActive}
                      asChild
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            isActive={isActive}
                            tooltip={item.label}
                          >
                            <item.icon size={16} />
                            <span>{item.label}</span>
                            <ChevronRight
                              size={14}
                              className="ml-auto text-muted-foreground transition-transform group-data-[state=open]/collapsible:rotate-90"
                            />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.subitems.map((sub) => (
                              <DashboardSubitem
                                key={sub.to}
                                sub={sub}
                                pathname={pathname}
                              />
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  )
                }

                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.label}
                    >
                      <Link to={item.to}>
                        <item.icon size={16} />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator className="bg-border overflow-hidden mx-0" />

      {/* Project switcher */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent"
                  tooltip="Switch project"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-muted shrink-0">
                    <FolderKanban size={14} className="text-muted-foreground" />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none overflow-hidden">
                    <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                      Project
                    </span>
                    <span className="font-medium truncate">
                      {currentProject.name}
                    </span>
                  </div>
                  <ChevronUp
                    size={14}
                    className="ml-auto shrink-0 text-muted-foreground"
                  />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" align="start" className="w-56">
                <DropdownMenuLabel className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                  Projects
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {projects.map((project) => (
                  <DropdownMenuItem key={project.id} className="gap-2">
                    <div className="flex size-5 items-center justify-center rounded bg-muted">
                      <FolderKanban
                        size={11}
                        className="text-muted-foreground"
                      />
                    </div>
                    <span>{project.name}</span>
                    {project.id === currentProject.id && (
                      <span className="ml-auto text-xs text-muted-foreground">
                        Current
                      </span>
                    )}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 text-muted-foreground">
                  <Plus size={14} />
                  New project
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
