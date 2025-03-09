import { CharacterList } from '~/components/CharacterList'
import { cookieFavorite } from '~/helpers/cookie.server'
import { getMultipleCharacters } from '~/services/characters'
import type { Route } from './+types/favorites'

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Rick & Morty - Favorites' }]
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  // get cookies
  const favoriteIds: number[] = await cookieFavorite.parse(
    request.headers.get('Cookie')
  )
  // get data from API
  const favorites = await getMultipleCharacters(favoriteIds)

  return {
    favorites: favorites,
    favoriteIds,
  }
}

export default function Index({ loaderData }: Route.ComponentProps) {
  const { favorites, favoriteIds } = loaderData

  return (
    <div className='flex flex-col items-center p-4 font-sans'>
      <CharacterList characters={favorites} favorites={favoriteIds} />
    </div>
  )
}
