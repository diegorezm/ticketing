import { betterAuth } from 'better-auth'
import { organization } from 'better-auth/plugins'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from '#/db'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'sqlite',
    usePlural: true,
    transaction: false,
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [tanstackStartCookies(), organization()],
})
