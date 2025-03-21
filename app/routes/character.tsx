import { FullCharacter } from '~/components/FullCharacter'
import { getCharacter } from '~/services/characters'
import { getMultipleEpisodes } from '~/services/episodes'
import type { Route } from './+types/character'
import { getUserFavorites } from '~/db/drizzle/favorites'
import { getUserSession } from '~/helpers/jwt.server'

export const meta: Route.MetaFunction = ({ data }) => {
  return [{ title: `Rick & Morty - ${data?.character.name}` }]
}

export async function loader({ params: { id }, request }: Route.LoaderArgs) {
  if (!id) throw new Error('Parameter required')
  const character = await getCharacter(id!)
  const episodeIds = character.episode.map((item) => {
    const index = item.lastIndexOf('/')
    return item.slice(index + 1)
  })
  const episodes = await getMultipleEpisodes(episodeIds)

  let isFavorite = false
  const user = await getUserSession(request)
  if (user) {
    const favorites = await getUserFavorites(user.payload.id, Number(id))
    isFavorite = favorites.length > 0
  }

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
