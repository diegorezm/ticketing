import type { Assignee, BoardStatus, Label } from './board-types'

export const mockAssignees: Assignee[] = [
  { id: 'u1', name: 'Alice Martin' },
  { id: 'u2', name: 'Bob Chen' },
  { id: 'u3', name: 'Carol White' },
  { id: 'u4', name: 'Dave Park' },
]

export const mockLabels: Label[] = [
  { id: 'l1', name: 'Bug', color: 'bg-red-500' },
  { id: 'l2', name: 'Feature', color: 'bg-primary' },
  { id: 'l3', name: 'Docs', color: 'bg-yellow-500' },
  { id: 'l4', name: 'Refactor', color: 'bg-purple-500' },
]

export const mockStatuses: BoardStatus[] = [
  {
    id: 's1',
    name: 'Backlog',
    color: 'bg-muted-foreground',
    tickets: [
      {
        id: 't1',
        title: 'Set up CI/CD pipeline',
        priority: 'medium',
        labels: [mockLabels[3]],
        assignees: [mockAssignees[0]],
        dueDate: '2026-04-10',
        statusId: 's1',
      },
      {
        id: 't2',
        title: 'Write onboarding docs',
        priority: 'low',
        labels: [mockLabels[2]],
        assignees: [mockAssignees[1], mockAssignees[2]],
        statusId: 's1',
      },
    ],
  },
  {
    id: 's2',
    name: 'In Progress',
    color: 'bg-blue-500',
    tickets: [
      {
        id: 't3',
        title: 'Login page returns 500 error',
        priority: 'critical',
        labels: [mockLabels[0]],
        assignees: [mockAssignees[0]],
        dueDate: '2026-03-15',
        statusId: 's2',
      },
      {
        id: 't4',
        title: 'Implement org switcher',
        priority: 'high',
        labels: [mockLabels[1]],
        assignees: [mockAssignees[2], mockAssignees[3]],
        dueDate: '2026-03-20',
        statusId: 's2',
      },
    ],
  },
  {
    id: 's3',
    name: 'In Review',
    color: 'bg-yellow-500',
    tickets: [
      {
        id: 't5',
        title: 'Export to CSV not working',
        priority: 'high',
        labels: [mockLabels[0]],
        assignees: [mockAssignees[1]],
        dueDate: '2026-03-12',
        statusId: 's3',
      },
    ],
  },
  {
    id: 's4',
    name: 'Done',
    color: 'bg-primary',
    tickets: [
      {
        id: 't6',
        title: 'Update billing address form',
        priority: 'low',
        labels: [mockLabels[1]],
        assignees: [mockAssignees[3]],
        statusId: 's4',
      },
    ],
  },
]
