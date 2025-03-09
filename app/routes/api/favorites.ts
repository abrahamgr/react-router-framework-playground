import { type ActionFunction } from 'react-router'
import { pages } from '~/const/pages'
import { setCookieFavorite } from '~/data/favorites.server'
import { isValidAuthRequest } from '~/helpers/jwt.server'

interface FavoriteRequest {
  characterId: number
}

export const action: ActionFunction = async ({ request }) => {
  const badRequest = new Response(null, { status: 400 })
  const loginRequest = await isValidAuthRequest(request, pages.root)
  if (loginRequest) return loginRequest

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
  console.log('adding/removing favorite', characterId)
  const newFavoriteCookie = await setCookieFavorite(
    characterId,
    request.headers.get('Cookie')!
  )

  return new Response(null, {
    headers: {
      'Set-Cookie': newFavoriteCookie,
    },
  })
}

export const loader = () =>
  new Response('Method Not Allowed', {
    status: 405,
  })
