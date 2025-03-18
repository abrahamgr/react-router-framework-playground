import { integer, pgTable, timestamp, index, uuid } from 'drizzle-orm/pg-core'
import { usersTable } from './users'

export const favoritesTable = pgTable(
  'favorites',
  {
    id: integer().primaryKey(),
    userId: uuid().references(() => usersTable.id),
    created: timestamp().defaultNow().notNull(),
  },
  (table) => [
    index('favorite_id_idx').on(table.id),
    index('user_id_idx').on(table.userId),
  ]
)
