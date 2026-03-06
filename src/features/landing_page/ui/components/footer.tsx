import { Ticket } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bottom-0 max-w-6xl mx-auto border-t border-border px-10 py-5 flex items-center justify-between gap-2">
      <span className="text-primary font-semibold text-sm flex items-center gap-2">
        <Ticket size={15} /> Ticketing
      </span>
      <p className="font-mono text-xs text-muted-foreground">
        © Diego Rezende -{' '}
        <a href="mailto:contact@diegorezm.xyz" className="text-primary">
          contact@diegorezm.xyz
        </a>
      </p>
    </footer>
  )
}
