import { internalEndpoints } from '~/const/endpoints'

export async function setFavorite(characterId: number, isFavorite: 0 | 1) {
  return fetch(internalEndpoints.favorites, {
    method: 'POST',
    body: JSON.stringify({ characterId, isFavorite }),
    redirect: 'manual',
  })
}
