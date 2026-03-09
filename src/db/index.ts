import { drizzle } from 'drizzle-orm/d1'
import * as schema from './schemas'
import { env } from 'cloudflare:workers'

export function getDB(d1: D1Database) {
  return drizzle(d1, { schema })
}

export const db = getDB(env.DB)
export type Database = ReturnType<typeof getDB>
