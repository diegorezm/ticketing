# Ticketing App — Roadmap & TODO

## ✅ Completed

### Infrastructure

- [x] TanStack Start + Vite setup
- [x] Cloudflare Workers deployment config (wrangler.json with dev/test/production environments)
- [x] D1 database setup with Drizzle ORM
- [x] Environment variables strategy (`.env.*` files + wrangler secrets)

### Auth

- [x] Better Auth setup with organization plugin
- [x] Login page (email/password + GitHub/Google placeholders)
- [x] Register page
- [x] Session management (`assertSessionFn`, `getSession`)
- [x] Onboarding flow (create or join org on first login)
- [x] `_private` route guard (redirect to login if no session)
- [x] Org check on `_private` (redirect to onboarding if no active org)
- [x] `setActiveOrganization` server function

### Permissions

- [x] Access control setup (`createAccessControl` with Better Auth)
- [x] `hasPermissionFn` server function (checks active member role + specific permission)
- [x] `usePermission` react-query hook (with 30min cache + background refresh)
- [x] Permission-gated sidebar subitems (Invitations hidden from non-owners)

### UI / Design

- [x] Landing page (navbar, hero, features, CTA)
- [x] Responsive navbar with mobile sheet
- [x] Dashboard sidebar with org switcher, nav items, project switcher
- [x] Collapsible sidebar subitems
- [x] Dashboard navbar with breadcrumbs (desktop only) + sidebar trigger + user button
- [x] `UserButton` component (avatar, dropdown with profile/settings/sign out)
- [x] `OrganizationsDropdown` with skeleton loading states
- [x] Board UI (Kanban columns, ticket cards, drag and drop via dnd-kit)
- [x] Board filters bar (search, assignee, status, priority, labels)
- [x] `PriorityBadge` and `AssigneeAvatars` components
- [x] Breadcrumbs component (dynamic via `useMatches`)

### Data / Hooks

- [x] React Query setup
- [x] Org hooks (`useOrganizations`, `useOrganization`, `useOrgMembers`, `useOrgInvites`)
- [x] Org mutation hooks (`useCreateOrg`, `useLeaveOrg`, `useAcceptInvite`)
- [x] `tryCatch` helper for error handling

---

## 🔄 In Progress / Needs Finishing

### Auth

- [ ] Wire up GitHub OAuth
- [ ] Wire up Google OAuth

### Board

- [ ] Connect board to real data (replace mock data)
- [ ] Dynamic ticket statuses per organization (CRUD for statuses)
- [ ] Wire up drag-and-drop to update ticket status in DB

---

## 📋 TODO

### Invitations

- [ ] Invitation creation UI (form to invite by email)
- [ ] Invitation server functions (`createInviteFn`, `listInvitesFn`, `revokeInviteFn`)
- [ ] Invitation accept flow (via invite code on onboarding join tab)
- [ ] Invitation email sending (Cloudflare Email or Resend)
- [ ] `members/invitations` page UI

### Roles & Permissions

- [ ] Roles management page UI (list roles, create role, delete role)
- [ ] Permission assignment UI (checkboxes per resource/action)
- [ ] Server functions for role CRUD
- [ ] Assign roles to members UI
- [ ] Update `usePermission` to invalidate on role change

### Board — Business Logic

- [ ] Ticket CRUD server functions (`createTicketFn`, `updateTicketFn`, `deleteTicketFn`)
- [ ] Status CRUD server functions (`createStatusFn`, `updateStatusFn`, `deleteStatusFn`, `reorderStatusFn`)
- [ ] Board react-query hooks (`useBoard`, `useTicket`, `boardKeys`)
- [ ] Ticket detail view / modal (edit title, assignees, priority, labels, due date, description)
- [ ] Create ticket UI (modal or inline)
- [ ] Labels CRUD

### Real-time (Durable Objects)

- [ ] Set up Cloudflare Durable Object for board rooms (`BoardRoom` DO)
- [ ] WebSocket token issuance server function (short-lived, signed)
- [ ] Worker gate for WebSocket connections (auth + membership check before forwarding to DO)
- [ ] `useBoardSocket` hook (connect on board mount, disconnect on unmount, invalidate react-query on message)
- [ ] DO broadcasts ticket/status updates to all connected viewers
- [ ] Presence indicators (who is currently viewing the board) using DO ephemeral storage

### Projects

- [ ] Projects page UI (list of projects per org)
- [ ] Create project form + server function
- [ ] Each project gets its own board
- [ ] Project switcher in sidebar wired to real data
- [ ] Project-scoped routing (`/projects/:projectId/board`)
- [ ] `useProjects` and `useProject` react-query hooks

### Clients

- [ ] Client user type (separate from org members)
- [ ] Client invitation system (re-use Better Auth invite, special client role)
- [ ] Client dashboard view (limited — only see their own issues)
- [ ] Issue submission form (title, description, image uploads)
- [ ] Issues list view for clients (track status of submitted issues)
- [ ] Issues appear on a dedicated "Client Issues" board for operators
- [ ] Operator assignment to a client issue
- [ ] Chat feature between client and assigned operator
  - [ ] Chat UI (message list + input)
  - [ ] Image upload support in chat (Cloudflare R2)
  - [ ] Real-time chat via Durable Objects (or reuse board DO pattern)
- [ ] Client management page for operators (list clients, invite clients, remove clients)

### General

- [ ] `notFoundComponent` on `_private/dashboard` and other routes
- [ ] Error boundaries
- [ ] Members page UI (list org members, roles, remove member)
- [ ] Settings page (org settings — name, slug, danger zone)
- [ ] Profile page (update name, avatar, password)
- [ ] Dark mode toggle wired up
- [ ] Inbox page (notifications for ticket assignments, mentions, status changes)

---

## 🔮 Future / Nice to Have

- [ ] Cloudflare R2 for image/file attachments on tickets
- [ ] Email notifications (ticket assigned, status changed, new comment)
- [ ] Activity log per ticket
- [ ] Ticket comments/discussion thread
- [ ] Board analytics (tickets per status, avg resolution time)
- [ ] Mobile-friendly board view
- [ ] Keyboard shortcuts
- [ ] Public status page per org
