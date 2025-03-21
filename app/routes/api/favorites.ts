import { type ActionFunction, data } from 'react-router'
import { favorite, favoriteForm } from '~/api-schemas/schemas'
import { pages } from '~/const/pages'
import { insertFavorite, removeFavorite } from '~/db/drizzle/favorites'
import { getLoginSession, getUserSession } from '~/helpers/jwt.server'

function getBadRequest(response?: object) {
  return data(response, { status: 400 })
}

export const action: ActionFunction = async ({ request }) => {
  const loginRequest = await getLoginSession(request, pages.root)
  if (loginRequest) return loginRequest
  const user = await getUserSession(request)
  if (!user) return getBadRequest()

  // only POST allowed
  if (request.method !== 'POST') return getBadRequest()

  let characterId = 0,
    isFavorite = false
  const contentType = request.headers.get('Content-Type')

  // first check if if comes from a post for optimistic UI
  if (contentType?.includes('application/x-www-form-urlencoded')) {
    const formData = await request.formData()
    const formParse = favoriteForm.safeParse({
      characterId: formData.get('characterId'),
      isFavorite: formData.get('isFavorite'),
    })
    if (!formParse.success) return getBadRequest(formParse.error)

    // set data
    isFavorite = Boolean(Number(formParse.data.isFavorite))
    characterId = Number(formParse.data.characterId)
  } else if (
    // otherwise it shpuld be JSON
    contentType?.includes('application/json') ||
    contentType?.includes('text/plain')
  ) {
    const payload = await request.json()
    const restParse = favorite.safeParse(payload)
    if (!restParse.success) return getBadRequest(restParse.error)

    // set data
    characterId = restParse.data.characterId
    isFavorite = restParse.data.isFavorite
  } else return getBadRequest()

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
