import { apiBase } from '~/const/config'
import type { Character, Info } from '~/types/rick-morty'

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

export async function getMultipleCharacters(
  ids: string[]
): Promise<Character[]> {
  // return empty value
  if (!Array.isArray(ids) || ids.length === 0) return []
  const response = await fetch(
    // setting as [ids] always will return an array
    new URL(`/api/character/[${ids.join(',')}]`, apiBase)
  )
  if (!response.ok)
    throw new Error('Error getting character', { cause: response })
  return await response.json()
}
