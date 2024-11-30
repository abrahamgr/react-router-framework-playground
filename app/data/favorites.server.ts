import { cookieFavorite } from '~/helpers/cookie.server'

export async function setCookieFavorite(id: number, cookie: string) {
  const currentFavorites: number[] = await cookieFavorite.parse(cookie)
  const favorites: number[] = currentFavorites ?? []
  const favoriteIndex = favorites.indexOf(id)

  // remove/add favorite
  if (favoriteIndex > -1) favorites.splice(favoriteIndex, 1)
  else favorites.push(id)

  return cookieFavorite.serialize(favorites)
}
