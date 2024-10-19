import { type ActionFunction, json } from '@remix-run/node'
import { setCookieFavorite } from '~/data/favorites.server'

interface FavoriteRequest {
  characterId: number
}

export const action: ActionFunction = async ({ request }) => {
  // only POST allowed
  if (request.method !== 'POST') return json(null, { status: 400 })

  let characterId = 0

  // first check if if comes from a post for optimistic UI
  try {
    const formData = await request.formData()
    const formCharacterId = formData.get('characterId')
    if (formCharacterId) {
      characterId = Number(formCharacterId)
    }
  } catch {
    // otherwise it shpuld be JSON
    const payload: FavoriteRequest = await request.json()
    characterId = payload.characterId
  }

  if (isNaN(characterId) || characterId < 1) return json(null, { status: 400 })

  // set cookie
  const newFavoriteCookie = await setCookieFavorite(
    characterId,
    request.headers.get('Cookie')!
  )

  return json(null, {
    headers: {
      'Set-Cookie': newFavoriteCookie,
    },
  })
}
