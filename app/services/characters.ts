import { apiBase } from '~/const/config'
import type { Character, Info } from '~/types/rick-morty'

// interface GetCharacterOptions {
//   page?: string
//   name?: string
// }

type GetCharacterOptions = Record<'page' | 'name', string>

export async function getCharacters(
  options: Partial<GetCharacterOptions> | undefined
): Promise<Info<Character[]>> {
  const query = options ? new URLSearchParams(options).toString() : ''
  const response = await fetch(
    new URL(`/api/character${query ? `?${query}` : ''}`, apiBase)
  )

  if (response.ok) {
    const data: Info<Character[]> = await response.json()
    return data
  }

  if (response.status === 404) {
    console.log(`no data found for ${query}`)
    return {
      info: {
        count: 0,
        next: '',
        pages: 0,
        prev: '',
      },
      results: [],
    }
  }
  throw new Error('Error getting characters', { cause: response })
}

export async function getCharacter(id: string): Promise<Character> {
  const response = await fetch(new URL(`/api/character/${id}`, apiBase))
  if (!response.ok)
    throw new Error('Error getting character', { cause: response })
  return await response.json()
}

export async function getMultipleCharacters(
  ids: number[]
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
