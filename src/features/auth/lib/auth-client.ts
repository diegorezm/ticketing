import { createAuthClient } from 'better-auth/react'
import { organizationClient } from 'better-auth/client/plugins'
import { ac } from './permissions'

export const authClient = createAuthClient({
  plugins: [
    organizationClient({
      ac: ac,
      dynamicAccessControl: {
        enabled: true,
      },
    }),
  ],
})
