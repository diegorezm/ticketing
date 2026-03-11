# Agent Coding Rules

This document defines how to write code in this repository. Follow these rules strictly when making changes or adding features.

---

## Stack

- **Framework**: TanStack Start
- **Language**: TypeScript
- **Database ORM**: Drizzle
- **Auth**: Better Auth
- **Forms**: TanStack Form

---

## Project Structure

Code is organized by **feature**. Every feature lives under `features/` and is self-contained.

```
features/
  <feature-name>/
    api/
    hooks/
    lib/
    schemas/
    ui/
      components/
      views/
```

When adding new functionality, identify which feature it belongs to and place it in the correct folder. If a feature doesn't exist yet, create a new folder following this exact structure.

---

## Folder Responsibilities

### `api/`

Server functions (TanStack Start `createServerFn`). One file per server function. Name files after what they do, using kebab-case verbs:

```
get-session.ts
create-organization.ts
assert-membership.ts
set-user-current-active-organization.ts
```

Rules:

- Each file exports a single server function as its default or named export.
- No business logic in the server function itself — delegate to `lib/`.
- Validate inputs using schemas from `schemas/`.
- Never expose raw database errors to the client.

### `hooks/`

React hooks that encapsulate client-side logic for the feature. These may call `api/` functions, manage local state, or wrap libraries.

Rules:

- Prefix all hooks with `use`.
- Hooks should not contain JSX.
- Keep hooks focused — one concern per hook.

### `lib/`

Core business logic, utilities, and helpers specific to the feature. Pure functions where possible.

Rules:

- No React imports here.
- Functions here can be called from `api/` (server-side) or `hooks/` (client-side) — be mindful of the environment.
- If a util is needed by multiple features, consider whether it belongs in a top-level `lib/` or `utils/` instead.

### `schemas/`

Zod schemas for this feature's input validation and data shapes. This is **not** where database tables are defined.

Rules:

- Input validation schemas live here and are shared between `api/` and `hooks/`.
- Export types derived from schemas using `z.infer<>`.
- Do not put Drizzle table definitions here — those live in `db/`.

### `ui/components/`

Small, reusable UI pieces for this feature. May be used within the feature's views or imported by other features.

Rules:

- One component per file, named in PascalCase.
- Components receive data via props — no direct API calls inside components (use hooks instead).
- Keep components presentational where possible.

### `ui/views/`

Full pages for this feature (e.g. login page, register page, dashboard page).

Rules:

- Views wire together components and hooks.
- Views are registered as routes in TanStack Start.
- A view should read like an outline of the page — keep logic in hooks, keep markup in components.

---

## General Coding Rules

### TypeScript

- No `any`. Use `unknown` and narrow it.
- Prefer explicit return types on server functions and hooks.
- Use `satisfies` where appropriate instead of casting with `as`.

### Server Functions (TanStack Start)

- Always use `createServerFn` from TanStack Start.
- Authenticate/authorize at the top of every server function that requires it — use the relevant `assert-*` helpers from the feature's `api/` folder.
- Return plain serializable objects (no class instances, no Dates unless serialized).

### Drizzle

- Table schemas live in the top-level `db/` directory, not inside features.
- Feature `schemas/` folders are for Zod validation only.
- Use Drizzle's query builder; avoid raw SQL unless strictly necessary.
- Mutations should go through server functions — never call the database from client code.

### Better Auth

- Auth session retrieval lives in `features/auth/api/get-session.ts`.
- To protect a route or server function, use `assert-session.ts`.
- To check organization membership, use `assert-membership.ts`.
- Do not re-implement auth checks — always use the existing assert helpers.

### File & Naming Conventions

All files use **kebab-case**, no exceptions.

| Thing                 | Convention | Example                       |
| --------------------- | ---------- | ----------------------------- |
| Server function files | kebab-case | `get-user-organizations.ts`   |
| Component files       | kebab-case | `user-avatar.tsx`             |
| Hook files            | kebab-case | `use-current-organization.ts` |
| Schema files          | kebab-case | `organization-schema.ts`      |
| View files            | kebab-case | `login-view.tsx`              |

Note: file names are kebab-case, but the exported React component or function inside the file still uses the appropriate JS convention (PascalCase for components, camelCase for hooks and functions).

### Forms (TanStack Form)

- Always use TanStack Form for any form in the codebase — no uncontrolled forms, no plain HTML `<form>` submissions.
- Every form **must** have Zod validation. A form without a Zod schema is never acceptable.
- Define the form's Zod schema in the feature's `schemas/` folder and import it into the form.
- Wire the schema to the form via TanStack Form's validator adapter (`zodValidator`).
- Validate on both change and submit where it makes sense — never only on submit for fields where instant feedback helps the user.

**Example:**

```tsx
// features/auth/schemas/auth-schemas.ts
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

// features/auth/ui/views/login-page.tsx
import { useForm } from '@tanstack/react-form-start'

export function LoginPage() {
  const form = useForm({
    defaultValues: { email: '', password: '' },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => {
      // call server function or auth client here
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <FieldGroup>
        <form.Field name="email">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <Input
                id={field.name}
                type="email"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
              {field.state.meta.errors.length > 0 && (
                <FieldDescription className="text-destructive">
                  {field.state.meta.errors[0]?.message}
                </FieldDescription>
              )}
            </Field>
          )}
        </form.Field>

        <form.Subscribe selector={(s) => s.canSubmit}>
          {(canSubmit) => (
            <Button type="submit" disabled={!canSubmit}>
              Submit
            </Button>
          )}
        </form.Subscribe>
      </FieldGroup>
    </form>
  )
}
```

Key patterns to follow from this example:

- Schema defined in `schemas/`, imported into the view
- `validators.onSubmit` is where the Zod schema is wired in
- Each field renders its own error via `field.state.meta.errors`
- Submit button is gated by `form.Subscribe` + `canSubmit`

### Imports

- Use absolute imports from the project root, not relative `../../` chains.
- Import schemas from the feature's `schemas/`, not inline.

---

## Routing

Routes live under the `routes/` directory and follow a **folder-based** structure. Always use `index.tsx` inside a folder — never the flat dot-notation alternative.

```
// ✅ correct
routes/__private/dashboard/members/index.tsx  → /dashboard/members

// ❌ never do this
routes/__private/dashboard.members.tsx
```

### Auth-based Route Directories

Two tagged root directories control authentication:

| Directory    | Auth required | Use for                                          |
| ------------ | ------------- | ------------------------------------------------ |
| `__private/` | Yes           | Any route that requires the user to be logged in |
| `__public/`  | No            | Login, register, landing pages, etc.             |

When creating a new route, always ask: does this require authentication? Place it in the correct directory accordingly. Never put an authenticated route under `__public/` or a public route under `__private/`.

```
routes/
  __private/
    dashboard/
      index.tsx          → /dashboard
      members/
        index.tsx        → /dashboard/members
      settings/
        index.tsx        → /dashboard/settings
  __public/
    index.tsx            → /
    login/
      index.tsx          → /login
    register/
      index.tsx          → /register
```

---

## Adding a New Feature

1. Create `features/<feature-name>/` with the full folder structure.
2. Define Zod schemas in `schemas/`.
3. Add database tables (if needed) in the top-level `db/` directory using Drizzle.
4. Write business logic in `lib/`.
5. Expose server functions in `api/`, one file per function.
6. Write hooks in `hooks/` that consume those server functions.
7. Build components in `ui/components/`, pages in `ui/views/`.
8. Register views as routes in TanStack Start.

---

## What Not To Do

- Do not put business logic directly in views or components.
- Do not call the database from client-side code.
- Do not create monolithic files — one server function per file, one component per file.
- Do not share mutable state between features — communicate via server functions or URL state.
- Do not bypass auth assertions in server functions.
- Do not create a form without a Zod validation schema — no exceptions.
- Do not use dot-notation route files (e.g. `dashboard.members.tsx`) — always use `folder/index.tsx`.
- Do not place authenticated routes under `__public/` or public routes under `__private/`.
