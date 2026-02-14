import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'

export const productivitiesTable = pgTable('productivities', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 256 }).notNull(),
  lastCheck: timestamp('last_check').defaultNow().notNull(),
})
