import type { Character, Info } from '~/types/rick-morty'

const apiBase = 'https://rickandmortyapi.com'

export async function getCharacters(page?: string): Promise<Info<Character[]>> {
  const pageParam = page ? '?page=' + page : ''
  const response = await fetch(new URL(`/api/character${pageParam}`, apiBase))
  if (!response.ok)
    throw new Error('Error getting characters', { cause: response })
  const data: Info<Character[]> = await response.json()
  return data
}

export async function getCharacter(id: string): Promise<Character> {
  const response = await fetch(new URL(`/api/character/${id}`, apiBase))
  if (!response.ok)
    throw new Error('Error getting character', { cause: response })
  return await response.json()
}
