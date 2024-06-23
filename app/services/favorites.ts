export async function setFavorite(characterId: number): Promise<void> {
  await fetch('/api/favorites', {
    method: 'POST',
    body: JSON.stringify({ characterId }),
  })
}
