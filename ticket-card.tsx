import { cn } from '#/lib/utils'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Calendar } from 'lucide-react'
import { AssigneeAvatars } from './assignee-avatars'
import { PriorityBadge } from './priority-badge'
import type { Ticket } from '../../lib/board-types'

type Props = {
  ticket: Ticket
}

function isOverdue(date: string) {
  return new Date(date) < new Date()
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

export function TicketCard({ ticket }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: ticket.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        'bg-card border border-border rounded-md p-3 space-y-2.5',
        'cursor-grab active:cursor-grabbing select-none',
        'hover:border-primary/30 hover:shadow-sm transition-all',
        isDragging && 'opacity-50 shadow-lg',
      )}
    >
      {/* Labels */}
      {ticket.labels.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {ticket.labels.map((label) => (
            <span
              key={label.id}
              className={cn(
                'inline-flex items-center text-xs px-1.5 py-0.5 rounded-sm font-medium text-white',
                label.color,
              )}
            >
              {label.name}
            </span>
          ))}
        </div>
      )}

      {/* Title */}
      <p className="text-sm font-medium text-foreground leading-snug">
        {ticket.title}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <PriorityBadge priority={ticket.priority} />
          {ticket.dueDate && (
            <span
              className={cn(
                'inline-flex items-center gap-1 text-xs',
                isOverdue(ticket.dueDate)
                  ? 'text-red-500'
                  : 'text-muted-foreground',
              )}
            >
              <Calendar size={11} />
              {formatDate(ticket.dueDate)}
            </span>
          )}
        </div>
        <AssigneeAvatars assignees={ticket.assignees} />
      </div>
    </div>
  )
}
