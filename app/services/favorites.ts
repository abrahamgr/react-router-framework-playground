import { internalEndpoints } from '~/const/endpoints'

export async function setFavorite(characterId: number) {
  return fetch(internalEndpoints.favorites, {
    method: 'POST',
    body: JSON.stringify({ characterId }),
    redirect: 'manual',
  })
}
