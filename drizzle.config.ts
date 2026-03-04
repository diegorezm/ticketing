import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './drizzle',
  schema: './src/server/db/schemas/index.ts',
  dialect: 'sqlite',
  driver: 'd1-http',
})
