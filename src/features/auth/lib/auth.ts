import { betterAuth } from 'better-auth'
import { organization } from 'better-auth/plugins'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from '#/db'
import { ac } from './permissions'
import { resend } from '#/features/emails/lib/resend'
import { invitationEmailTemplate } from '#/features/emails/templates/invitation'

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
      sendInvitationEmail: async (data) => {
        await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: data.email,
          subject: `You've been invited to join ${data.organization.name}`,
          html: invitationEmailTemplate({
            organizationName: data.organization.name,
            inviterName: data.inviter.user.name,
            inviteUrl: `${process.env.BETTER_AUTH_URL}/invite/${data.invitation.id}`,
          }),
        })
      },
      dynamicAccessControl: {
        enabled: true,
        maximumRolesPerOrganization: async (organizationId) => {
          console.log(`Roles for ${organizationId}`)
          return 10
        },
      },
    }),
  ],
})
