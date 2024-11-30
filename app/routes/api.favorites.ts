import { type ActionFunction } from '@remix-run/node'
import { setCookieFavorite } from '~/data/favorites.server'

interface FavoriteRequest {
  characterId: number
}

export const action: ActionFunction = async ({ request }) => {
  const badRequest = Response.json(null, { status: 400 })

  // only POST allowed
  if (request.method !== 'POST') return badRequest

  let characterId = 0
  const contentType = request.headers.get('Content-Type')

  // first check if if comes from a post for optimistic UI
  if (contentType?.includes('application/x-www-form-urlencoded')) {
    const formData = await request.formData()
    const formCharacterId = formData.get('characterId')
    if (formCharacterId) {
      characterId = Number(formCharacterId)
    }
  } else if (
    contentType?.includes('application/json') ||
    contentType?.includes('text/plain')
  ) {
    // otherwise it shpuld be JSON
    const payload: FavoriteRequest = await request.json()
    characterId = payload.characterId
  } else return badRequest

  if (isNaN(characterId) || characterId < 1) return badRequest

  // set cookie
  const newFavoriteCookie = await setCookieFavorite(
    characterId,
    request.headers.get('Cookie')!
  )

  return Response.json(null, {
    headers: {
      'Set-Cookie': newFavoriteCookie,
    },
  })
}
