import {
  boolean,
  index,
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'

export const usersTable = pgTable(
  'users',
  {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull(),
    enabled: boolean().default(true).notNull(),
    created: timestamp().defaultNow().notNull(),
  },
  table => [
    uniqueIndex('email_idx').on(table.email),
    index('id_idx').on(table.id),
  ]
)
