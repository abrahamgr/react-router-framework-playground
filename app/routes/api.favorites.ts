import { type ActionFunction, json } from '@remix-run/node'
import { cookieFavorite } from '~/helpers/cookie.server'

interface FavoriteRequest {
  characterId: number
}

export const action: ActionFunction = async ({ request }) => {
  // only POST allowed
  if (request.method !== 'POST') return json(null, { status: 400 })

  const payload: FavoriteRequest = await request.json()
  const { characterId } = payload
  const currentFavorites: number[] = await cookieFavorite.parse(
    request.headers.get('Cookie')
  )
  const favorites: number[] = currentFavorites ?? []
  const favoriteIndex = favorites.indexOf(characterId)

  // remove/add favorite
  if (favoriteIndex > -1) favorites.splice(favoriteIndex, 1)
  else favorites.push(characterId)

  return json(null, {
    headers: {
      'Set-Cookie': await cookieFavorite.serialize(favorites),
    },
  })
}
