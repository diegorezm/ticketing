import { SidebarProvider } from '#/components/ui/sidebar'
import { Outlet } from '@tanstack/react-router'
import { DashboardSidebar } from '../components/dashboard-sidebar'
import { DashboardNavbar } from '../components/dashboard-navbar'

export function DashboardPage() {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <div className="flex flex-col w-full min-h-screen">
        <DashboardNavbar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  )
}
