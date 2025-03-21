import { and, eq } from 'drizzle-orm'
import { db } from './index'
import { favoritesTable } from './schema'
import type { InsertFavorite, SelectFavorite } from './typings'

export function getUserFavorites(
  userId: string,
  characterId?: number
): Promise<SelectFavorite[]> {
  const userQuery = eq(favoritesTable.userId, userId)
  const characterQuery = eq(favoritesTable.characterId, characterId!)

  return db
    .select()
    .from(favoritesTable)
    .where(characterId ? and(userQuery, characterQuery) : userQuery)
}

export async function insertFavorite({ characterId, userId }: InsertFavorite) {
  await db.insert(favoritesTable).values({ characterId, userId })
}

export async function removeFavorite({ characterId, userId }: InsertFavorite) {
  await db
    .delete(favoritesTable)
    .where(
      and(
        eq(favoritesTable.characterId, characterId),
        eq(favoritesTable.userId, userId)
      )
    )
}
