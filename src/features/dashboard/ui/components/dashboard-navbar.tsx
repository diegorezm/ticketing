import { Separator } from '#/components/ui/separator'
import { SidebarTrigger } from '#/components/ui/sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '#/components/ui/breadcrumb'
import { UserButton } from '#/features/auth/ui/components/user-button'

const breadcrumbs = [
  { label: 'Acme Corp', href: '/' },
  { label: 'Website Redesign', href: '/projects/website-redesign' },
  { label: 'Board', href: null }, // null = current page, renders as <BreadcrumbPage>
]

export function DashboardNavbar() {
  return (
    <header className="flex items-center gap-3 border-b border-border bg-background px-4 py-2 justify-between w-full">
      <div className="flex items-center flex-1 gap-2">
        <SidebarTrigger size={'icon'} />

        <Separator orientation="vertical" className="h-4" />

        {/* Breadcrumbs */}
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1
              return (
                <BreadcrumbItem key={crumb.label}>
                  {isLast ? (
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  ) : (
                    <>
                      <BreadcrumbLink href={crumb.href ?? '#'}>
                        {crumb.label}
                      </BreadcrumbLink>
                      <BreadcrumbSeparator />
                    </>
                  )}
                </BreadcrumbItem>
              )
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div>
        <UserButton />
      </div>
    </header>
  )
}
