import { data, type ActionFunction } from 'react-router'
import { pages } from '~/const/pages'
import { insertFavorite, removeFavorite } from '~/db/drizzle/favorites'
import { getLoginSession, getUserSession } from '~/helpers/jwt.server'

interface FavoriteRequest {
  characterId: number
  isFavorite: number
}

export const action: ActionFunction = async ({ request }) => {
  const badRequest = new Response(null, { status: 400 })
  const loginRequest = await getLoginSession(request, pages.root)
  if (loginRequest) return loginRequest
  const user = await getUserSession(request)
  if (!user) return badRequest

  // only POST allowed
  if (request.method !== 'POST') return badRequest

  let characterId = 0,
    isFavorite = false
  const contentType = request.headers.get('Content-Type')

  // first check if if comes from a post for optimistic UI
  if (contentType?.includes('application/x-www-form-urlencoded')) {
    const formData = await request.formData()
    const formCharacterId = formData.get('characterId')
    isFavorite = Boolean(Number(formData.get('isFavorite')))
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
    isFavorite = Boolean(payload.isFavorite)
  } else return badRequest

  if (isNaN(characterId) || characterId < 1) return badRequest

  // set cookie
  console.log('adding/removing favorite', characterId)
  if (isFavorite) {
    await removeFavorite({ characterId, userId: user.payload.id })
  } else {
    await insertFavorite({ characterId, userId: user.payload.id })
  }

  return data(null)
}

export const loader = () =>
  new Response('Method Not Allowed', {
    status: 405,
  })
