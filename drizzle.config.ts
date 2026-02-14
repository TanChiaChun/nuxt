import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'postgresql',
  schema: './server/db/schema',
  dbCredentials: {
    url: 'postgres://postgres:mypassword@localhost:5432/postgres',
  },
})
