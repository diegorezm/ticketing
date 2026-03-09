import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/avatar'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '#/components/ui/tooltip'
import type { Assignee } from '../../lib/board-types'

type Props = {
  assignees: Assignee[]
  max?: number
}

export function AssigneeAvatars({ assignees, max = 3 }: Props) {
  const visible = assignees.slice(0, max)
  const overflow = assignees.length - max

  return (
    <TooltipProvider>
      <div className="flex -space-x-1.5">
        {visible.map((a) => (
          <Tooltip key={a.id}>
            <TooltipTrigger asChild>
              <Avatar className="h-5 w-5 rounded-full border-2 border-card ring-0">
                <AvatarImage src={a.image} alt={a.name} />
                <AvatarFallback className="text-[9px] bg-primary text-primary-foreground rounded-full">
                  {a.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-xs">
              {a.name}
            </TooltipContent>
          </Tooltip>
        ))}
        {overflow > 0 && (
          <div className="h-5 w-5 rounded-full border-2 border-card bg-muted flex items-center justify-center">
            <span className="text-[9px] font-medium text-muted-foreground">
              +{overflow}
            </span>
          </div>
        )}
      </div>
    </TooltipProvider>
  )
}
