export type Priority = 'critical' | 'high' | 'medium' | 'low'

export type Label = {
  id: string
  name: string
  color: string
}

export type Assignee = {
  id: string
  name: string
  image?: string
}

export type Ticket = {
  id: string
  title: string
  priority: Priority
  labels: Label[]
  assignees: Assignee[]
  dueDate?: string
  statusId: string
}

export type BoardStatus = {
  id: string
  name: string
  color: string
  tickets: Ticket[]
}

export type BoardFilters = {
  assignees: string[]
  statuses: string[]
  priorities: Priority[]
  labels: string[]
}
