import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { Separator } from '#/components/ui/separator'
import { cn } from '#/lib/utils'
import { ChevronDown, Search, SlidersHorizontal, X } from 'lucide-react'
import { useState } from 'react'
import {
  mockAssignees,
  mockLabels,
  mockStatuses,
} from '../../lib/board-mock-data'
import type { BoardFilters, Priority } from '../../lib/board-types'
import { AssigneeAvatars } from './assignee-avatars'
import { PriorityBadge } from './priority-badge'
import { Input } from '#/components/ui/input'

const priorities: Priority[] = ['critical', 'high', 'medium', 'low']

type Props = {
  filters: BoardFilters
  onFiltersChange: (filters: BoardFilters) => void
  search: string
  onSearchChange: (search: string) => void
}

export function BoardFiltersBar({
  filters,
  onFiltersChange,
  search,
  onSearchChange,
}: Props) {
  const [expanded, setExpanded] = useState(false)

  const activeCount =
    filters.assignees.length +
    filters.statuses.length +
    filters.priorities.length +
    filters.labels.length

  function toggleAssignee(id: string) {
    const next = filters.assignees.includes(id)
      ? filters.assignees.filter((a) => a !== id)
      : [...filters.assignees, id]
    onFiltersChange({ ...filters, assignees: next })
  }

  function toggleStatus(id: string) {
    const next = filters.statuses.includes(id)
      ? filters.statuses.filter((s) => s !== id)
      : [...filters.statuses, id]
    onFiltersChange({ ...filters, statuses: next })
  }

  function togglePriority(p: Priority) {
    const next = filters.priorities.includes(p)
      ? filters.priorities.filter((x) => x !== p)
      : [...filters.priorities, p]
    onFiltersChange({ ...filters, priorities: next })
  }

  function toggleLabel(id: string) {
    const next = filters.labels.includes(id)
      ? filters.labels.filter((l) => l !== id)
      : [...filters.labels, id]
    onFiltersChange({ ...filters, labels: next })
  }

  function clearAll() {
    onFiltersChange({ assignees: [], statuses: [], priorities: [], labels: [] })
    onSearchChange('')
  }

  return (
    <div className="border-b border-border bg-background">
      {/* Top bar */}
      <div className="flex items-center gap-2 px-4 py-2">
        {/* Search */}
        <div className="relative flex-1 max-w-64">
          <Search
            size={14}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Search tickets..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8 h-8 text-sm"
          />
        </div>

        <Separator orientation="vertical" className="h-5" />

        {/* Filter toggle */}
        <Button
          variant={expanded ? 'secondary' : 'ghost'}
          size="sm"
          className="gap-1.5 h-8"
          onClick={() => setExpanded((v) => !v)}
        >
          <SlidersHorizontal size={14} />
          Filters
          {activeCount > 0 && (
            <Badge variant="secondary" className="h-4 px-1 text-xs font-mono">
              {activeCount}
            </Badge>
          )}
          <ChevronDown
            size={13}
            className={cn(
              'transition-transform text-muted-foreground',
              expanded && 'rotate-180',
            )}
          />
        </Button>

        {activeCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 h-8 text-muted-foreground"
            onClick={clearAll}
          >
            <X size={13} />
            Clear
          </Button>
        )}
      </div>

      {/* Expandable panel */}
      {expanded && (
        <div className="px-4 pb-3 grid grid-cols-4 gap-6 border-t border-border pt-3">
          {/* Assignees */}
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
              Assignee
            </p>
            <div className="space-y-1">
              {mockAssignees.map((a) => (
                <button
                  key={a.id}
                  onClick={() => toggleAssignee(a.id)}
                  className={cn(
                    'flex items-center gap-2 w-full px-2 py-1 rounded-sm text-sm transition-colors',
                    filters.assignees.includes(a.id)
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-muted text-foreground',
                  )}
                >
                  <AssigneeAvatars assignees={[a]} max={1} />
                  <span className="truncate">{a.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
              Status
            </p>
            <div className="space-y-1">
              {mockStatuses.map((s) => (
                <button
                  key={s.id}
                  onClick={() => toggleStatus(s.id)}
                  className={cn(
                    'flex items-center gap-2 w-full px-2 py-1 rounded-sm text-sm transition-colors',
                    filters.statuses.includes(s.id)
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-muted text-foreground',
                  )}
                >
                  <div
                    className={cn('w-2 h-2 rounded-full shrink-0', s.color)}
                  />
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          {/* Priority */}
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
              Priority
            </p>
            <div className="space-y-1">
              {priorities.map((p) => (
                <button
                  key={p}
                  onClick={() => togglePriority(p)}
                  className={cn(
                    'flex items-center gap-2 w-full px-2 py-1 rounded-sm text-sm transition-colors',
                    filters.priorities.includes(p)
                      ? 'bg-primary/10'
                      : 'hover:bg-muted text-foreground',
                  )}
                >
                  <PriorityBadge priority={p} showLabel />
                </button>
              ))}
            </div>
          </div>

          {/* Labels */}
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
              Labels
            </p>
            <div className="space-y-1">
              {mockLabels.map((l) => (
                <button
                  key={l.id}
                  onClick={() => toggleLabel(l.id)}
                  className={cn(
                    'flex items-center gap-2 w-full px-2 py-1 rounded-sm text-sm transition-colors',
                    filters.labels.includes(l.id)
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-muted text-foreground',
                  )}
                >
                  <div
                    className={cn('w-2 h-2 rounded-full shrink-0', l.color)}
                  />
                  {l.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
