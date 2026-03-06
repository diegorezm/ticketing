import BetterAuthHeader from '#/features/auth/ui/components/header-user'
import { Button } from '#/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '#/components/ui/sheet'
import { Separator } from '#/components/ui/separator'
import { Link } from '@tanstack/react-router'
import { Menu, Ticket } from 'lucide-react'
import { UserButton } from '#/features/auth/ui/components/user-button'

const links = [
  { label: 'Features', href: '#' },
  { label: 'Docs', href: '#' },
  { label: 'Pricing', href: '#' },
]

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background px-6 md:px-10 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center gap-2 text-primary font-semibold tracking-tight"
      >
        <Ticket size={18} />
        <span>Ticketing</span>
      </Link>

      {/* Desktop links */}
      <ul className="hidden md:flex gap-8 list-none font-mono text-sm text-muted-foreground">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Desktop auth */}
      <div className="hidden md:block">
        <UserButton />
      </div>

      {/* Mobile menu */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu size={18} />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="flex flex-col pt-10 px-2 w-64">
            <ul className="flex flex-col gap-4 list-none font-mono text-sm text-muted-foreground">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="hover:text-primary transition-colors"
                  >
                    <Button variant={'outline'} className="w-full">
                      {link.label}
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
            <Separator className="my-6" />
            <UserButton />
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
