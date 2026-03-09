import { BoardView } from '#/features/board/ui/views/board-view'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_private/dashboard/playground/board')({
  component: BoardView,
})

function RouteComponent() {
  return <div>Hello "/playground/board"!</div>
}
