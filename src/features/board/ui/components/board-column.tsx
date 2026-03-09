import { Button } from '#/components/ui/button'
import { cn } from '#/lib/utils'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Plus } from 'lucide-react'
import { TicketCard } from './ticket-card'
import type { BoardStatus } from '../../lib/board-types'

type Props = {
  status: BoardStatus
}

export function BoardColumn({ status }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id: status.id })

  return (
    <div className="flex flex-col w-72 shrink-0">
      {/* Column header */}
      <div className="flex items-center gap-2 mb-3 px-1">
        <div className={cn('w-2 h-2 rounded-full shrink-0', status.color)} />
        <span className="text-sm font-semibold text-foreground">
          {status.name}
        </span>
        <span className="text-xs text-muted-foreground font-mono ml-0.5">
          {status.tickets.length}
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto h-6 w-6 text-muted-foreground hover:text-foreground"
        >
          <Plus size={14} />
        </Button>
      </div>

      {/* Drop zone */}
      <SortableContext
        items={status.tickets.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div
          ref={setNodeRef}
          className={cn(
            'flex flex-col gap-2 min-h-24 rounded-md p-1 transition-colors',
            isOver && 'bg-primary/5 ring-1 ring-primary/20',
          )}
        >
          {status.tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}

          {status.tickets.length === 0 && (
            <div
              className={cn(
                'flex items-center justify-center h-24 rounded-md border border-dashed border-border transition-colors',
                isOver && 'border-primary/40 bg-primary/5',
              )}
            >
              <span className="text-xs text-muted-foreground">
                {isOver ? 'Drop here' : 'No tickets'}
              </span>
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  )
}
