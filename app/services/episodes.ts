import { apiBase } from '~/const/config'
import { Episode } from '~/types/rick-morty'

export async function getMultipleEpisodes(ids: string[]): Promise<Episode[]> {
  // return empty value
  if (!Array.isArray(ids) || ids.length === 0) return []
  const url = `/api/episode/[${ids.join(',')}]`
  const response = await fetch(
    // setting as [ids] always will return an array
    new URL(url, apiBase)
  )
  if (!response.ok)
    throw new Error(`Error getting episode ${url}`, { cause: response })
  return await response.json()
}
