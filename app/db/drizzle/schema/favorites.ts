import { index, integer, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'
import { usersTable } from './users'

export const favoritesTable = pgTable(
  'favorites',
  {
    characterId: integer().notNull(),
    userId: uuid()
      .references(() => usersTable.id)
      .notNull(),
    created: timestamp().defaultNow().notNull(),
  },
  table => [index('user_id_idx').on(table.userId)]
)
