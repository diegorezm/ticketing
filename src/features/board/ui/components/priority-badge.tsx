import { cn } from '#/lib/utils'
import type { Priority } from '../../lib/board-types'
import { AlertCircle, ArrowDown, ArrowUp, Minus } from 'lucide-react'

const config: Record<
  Priority,
  { label: string; icon: React.ReactNode; className: string }
> = {
  critical: {
    label: 'Critical',
    icon: <AlertCircle size={11} />,
    className:
      'text-red-600 bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800 dark:text-red-400',
  },
  high: {
    label: 'High',
    icon: <ArrowUp size={11} />,
    className:
      'text-orange-600 bg-orange-50 border-orange-200 dark:bg-orange-950 dark:border-orange-800 dark:text-orange-400',
  },
  medium: {
    label: 'Medium',
    icon: <Minus size={11} />,
    className:
      'text-yellow-600 bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800 dark:text-yellow-400',
  },
  low: {
    label: 'Low',
    icon: <ArrowDown size={11} />,
    className: 'text-muted-foreground bg-muted border-border',
  },
}

type Props = {
  priority: Priority
  showLabel?: boolean
}

export function PriorityBadge({ priority, showLabel = false }: Props) {
  const { label, icon, className } = config[priority]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 border rounded-sm px-1.5 py-0.5 text-xs font-medium',
        className,
      )}
    >
      {icon}
      {showLabel && label}
    </span>
  )
}
