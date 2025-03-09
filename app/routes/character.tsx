import { FullCharacter } from '~/components/FullCharacter'
import { cookieFavorite } from '~/helpers/cookie.server'
import { getCharacter } from '~/services/characters'
import { getMultipleEpisodes } from '~/services/episodes'
import type { Route } from './+types/character'

export const meta: Route.MetaFunction = ({ data }) => {
  return [{ title: `Rick & Morty - ${data?.character.name}` }]
}

export async function loader({ params: { id }, request }: Route.LoaderArgs) {
  if (!id) throw new Error('Parameter required')
  const character = await getCharacter(id!)
  const favorites: number[] =
    (await cookieFavorite.parse(request.headers.get('Cookie'))) ?? []
  const episodeIds = character.episode.map((item) => {
    const index = item.lastIndexOf('/')
    return item.slice(index + 1)
  })
  const episodes = await getMultipleEpisodes(episodeIds)
  const isFavorite = favorites.indexOf(Number(id)) > -1
  return {
    character,
    episodes,
    isFavorite,
  }
}

export default function CharacterPage({ loaderData }: Route.ComponentProps) {
  const { character, isFavorite, episodes } = loaderData
  return (
    <FullCharacter
      character={character}
      episodes={episodes}
      isFavorite={isFavorite}
    />
  )
}
