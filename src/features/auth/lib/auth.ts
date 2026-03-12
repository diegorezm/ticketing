import { betterAuth } from 'better-auth'
import { organization } from 'better-auth/plugins'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from '#/db'
import { ac } from './permissions'
import { getRequestHeaders } from '@tanstack/react-start/server'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'sqlite',
    usePlural: true,
    transaction: false,
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    tanstackStartCookies(),
    organization({
      ac: ac,
      dynamicAccessControl: {
        enabled: true,
        maximumRolesPerOrganization: async (organizationId) => {
          console.log(`Roles for ${organizationId}`)
          return 10
        },
      },
      organizationHooks: {
        afterCreateOrganization: async ({ organization: org, user }) => {
          const headers = getRequestHeaders()

          // Create owner role
          await auth.api.createOrgRole({
            body: {
              organizationId: org.id,
              role: 'owner',
              permission: {
                all: ['all'],
              },
            },
            headers,
          })

          // Assign owner role to the current user
          await auth.api.updateMemberRole({
            body: {
              organizationId: org.id,
              memberId: user.id,
              role: 'owner',
            },
            headers,
          })
        },
      },
    }),
  ],
})
