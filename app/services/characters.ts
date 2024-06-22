import type { Character, Info } from '~/types/rick-morty'

export async function getCharacters(page?: string): Promise<Character[]> {
  const pageParam = page ? 'page=' + page : ''
  const response = await fetch(
    `https://rickandmortyapi.com/api/character${pageParam}`
  )
  if (!response.ok)
    throw new Error('Error getting characters', { cause: response })
  const data: Info<Character[]> = await response.json()
  return data.results!
}
