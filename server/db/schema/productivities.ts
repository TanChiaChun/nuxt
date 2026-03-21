import {
  integer,
  pgEnum,
  pgTable,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'
import { PRODUCTIVITY_FREQUENCIES } from '../../../shared/constants'

export const frequencyEnum = pgEnum('frequency', PRODUCTIVITY_FREQUENCIES)

export const productivitiesTable = pgTable('productivities', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 256 }).notNull(),
  lastCheck: timestamp('last_check', { withTimezone: true })
    .defaultNow()
    .notNull(),
  previousLastCheck: timestamp('previous_last_check', { withTimezone: true })
    .defaultNow()
    .notNull(),
  frequency: frequencyEnum().notNull(),
})
