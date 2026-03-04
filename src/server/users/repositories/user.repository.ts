import type { Database } from '#/server/db'
import { users } from '#/server/db/schemas'

export function createUserRepository(db: Database) {
  return {
    findAll: () => db.select().from(users),
  }
}
