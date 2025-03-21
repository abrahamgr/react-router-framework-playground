import { favoritesTable, usersTable } from './schema'

export type InsertUser = typeof usersTable.$inferInsert
export type SelectUser = typeof usersTable.$inferSelect
export type InsertFavorite = typeof favoritesTable.$inferInsert
export type SelectFavorite = typeof favoritesTable.$inferSelect
