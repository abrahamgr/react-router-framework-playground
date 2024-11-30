import { internalEndpoints } from '~/const/endpoints'

export async function setFavorite(characterId: number): Promise<void> {
  await fetch(internalEndpoints.favorites, {
    method: 'POST',
    body: JSON.stringify({ characterId }),
  })
}
