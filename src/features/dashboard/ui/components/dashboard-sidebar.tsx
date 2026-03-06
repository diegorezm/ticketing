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
  SidebarSeparator,
} from '#/components/ui/sidebar'
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
  Building2,
  ChevronUp,
  ChevronsUpDown,
  FolderKanban,
  Inbox,
  KanbanSquare,
  Plus,
  Settings,
  Users,
} from 'lucide-react'

const navItems = [
  { label: 'Inbox', icon: Inbox, to: '/inbox' },
  { label: 'Board', icon: KanbanSquare, to: '/board' },
  { label: 'Projects', icon: FolderKanban, to: '/projects' },
  { label: 'Members', icon: Users, to: '/members' },
  { label: 'Settings', icon: Settings, to: '/settings' },
]

// Placeholder data — replace with real data later
const orgs = [
  { id: '1', name: 'Acme Corp', plan: 'Pro' },
  { id: '2', name: 'Globex Inc', plan: 'Free' },
]

const projects = [
  { id: '1', name: 'Website Redesign' },
  { id: '2', name: 'Mobile App' },
  { id: '3', name: 'API v2' },
]

const currentOrg = orgs[0]
const currentProject = projects[0]

export function DashboardSidebar() {
  const { pathname } = useLocation()
  return (
    <Sidebar collapsible="icon">
      {/* Org switcher */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-primary text-primary-foreground shrink-0">
                    <Building2 size={14} />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none overflow-hidden">
                    <span className="font-semibold truncate">
                      {currentOrg.name}
                    </span>
                    <span className="text-xs text-muted-foreground truncate">
                      {currentOrg.plan}
                    </span>
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
                {orgs.map((org) => (
                  <DropdownMenuItem key={org.id} className="gap-2">
                    <div className="flex size-5 items-center justify-center rounded bg-primary/10">
                      <Building2 size={11} className="text-primary" />
                    </div>
                    <span>{org.name}</span>
                    {org.id === currentOrg.id && (
                      <span className="ml-auto text-xs text-muted-foreground">
                        Current
                      </span>
                    )}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 text-muted-foreground">
                  <Plus size={14} />
                  Create organization
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator className="bg-border overflow-hidden mx-0" />

      {/* Nav items */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(item.to)}
                    tooltip={item.label}
                  >
                    <Link to={item.to}>
                      <item.icon size={16} />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
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
