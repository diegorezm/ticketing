import { useState, useMemo } from 'react'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  type DragOverEvent,
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { BoardColumn } from '../components/board-column'
import { BoardFiltersBar } from '../components/board-filters-bar'
import { TicketCard } from '../components/ticket-card'
import { mockStatuses } from '../../lib/board-mock-data'
import type { BoardFilters, BoardStatus, Ticket } from '../../lib/board-types'

const emptyFilters: BoardFilters = {
  assignees: [],
  statuses: [],
  priorities: [],
  labels: [],
}

export function BoardView() {
  const [statuses, setStatuses] = useState<BoardStatus[]>(mockStatuses)
  const [filters, setFilters] = useState<BoardFilters>(emptyFilters)
  const [search, setSearch] = useState('')
  const [activeTicket, setActiveTicket] = useState<Ticket | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 }, // prevents accidental drags on click
    }),
  )

  // find which column a ticket belongs to
  function findColumnByTicketId(ticketId: string) {
    return statuses.find((s) => s.tickets.some((t) => t.id === ticketId))
  }

  function handleDragStart({ active }: DragStartEvent) {
    const ticket = statuses
      .flatMap((s) => s.tickets)
      .find((t) => t.id === active.id)
    setActiveTicket(ticket ?? null)
  }

  function handleDragOver({ active, over }: DragOverEvent) {
    if (!over) return

    const activeCol = findColumnByTicketId(active.id as string)
    // over could be a column id or a ticket id
    const overCol =
      statuses.find((s) => s.id === over.id) ??
      findColumnByTicketId(over.id as string)

    if (!activeCol || !overCol || activeCol.id === overCol.id) return

    setStatuses((prev) =>
      prev.map((s) => {
        if (s.id === activeCol.id) {
          return {
            ...s,
            tickets: s.tickets.filter((t) => t.id !== active.id),
          }
        }
        if (s.id === overCol.id) {
          const ticket = activeCol.tickets.find((t) => t.id === active.id)!
          const overIndex = s.tickets.findIndex((t) => t.id === over.id)
          const insertAt = overIndex >= 0 ? overIndex : s.tickets.length
          const newTickets = [...s.tickets]
          newTickets.splice(insertAt, 0, { ...ticket, statusId: overCol.id })
          return { ...s, tickets: newTickets }
        }
        return s
      }),
    )
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    setActiveTicket(null)
    if (!over) return

    const activeCol = findColumnByTicketId(active.id as string)
    const overCol = findColumnByTicketId(over.id as string)

    // reorder within same column
    if (activeCol && overCol && activeCol.id === overCol.id) {
      const oldIndex = activeCol.tickets.findIndex((t) => t.id === active.id)
      const newIndex = activeCol.tickets.findIndex((t) => t.id === over.id)
      if (oldIndex !== newIndex) {
        setStatuses((prev) =>
          prev.map((s) =>
            s.id === activeCol.id
              ? { ...s, tickets: arrayMove(s.tickets, oldIndex, newIndex) }
              : s,
          ),
        )
      }
    }
  }

  //
  const filteredStatuses: BoardStatus[] = useMemo(() => {
    return statuses
      .filter(
        (s) => filters.statuses.length === 0 || filters.statuses.includes(s.id),
      )
      .map((status) => ({
        ...status,
        tickets: status.tickets.filter((ticket) => {
          if (
            search &&
            !ticket.title.toLowerCase().includes(search.toLowerCase())
          )
            return false
          if (
            filters.assignees.length > 0 &&
            !ticket.assignees.some((a) => filters.assignees.includes(a.id))
          )
            return false
          if (
            filters.priorities.length > 0 &&
            !filters.priorities.includes(ticket.priority)
          )
            return false
          if (
            filters.labels.length > 0 &&
            !ticket.labels.some((l) => filters.labels.includes(l.id))
          )
            return false
          return true
        }),
      }))
  }, [statuses, filters, search])

  return (
    <div className="flex flex-col h-full">
      <BoardFiltersBar
        filters={filters}
        onFiltersChange={setFilters}
        search={search}
        onSearchChange={setSearch}
      />

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex-1 overflow-x-auto">
          <div className="flex gap-4 p-4 h-full min-w-max">
            {filteredStatuses.map((status) => (
              <BoardColumn key={status.id} status={status} />
            ))}
          </div>
        </div>

        {/* Drag overlay — renders the card while dragging */}
        <DragOverlay>
          {activeTicket && (
            <div className="rotate-2 opacity-95 shadow-xl w-72">
              <TicketCard ticket={activeTicket} />
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  )
}
