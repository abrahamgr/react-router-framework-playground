import { CharacterList } from '~/components/CharacterList'
import { cookieFavorite } from '~/helpers/cookie.server'
import { getMultipleCharacters } from '~/services/characters'
import type { Route } from './+types/favorites'
import { data } from 'react-router'
import { getLoginSession } from '~/helpers/jwt.server'

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Rick & Morty - Favorites' }]
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const loginRequest = await getLoginSession(request)
  if (loginRequest) return loginRequest
  const currentCookies = request.headers.get('Cookie')

  // get cookies
  const favoriteIds: number[] = await cookieFavorite.parse(currentCookies)
  // get data from API
  const favorites = await getMultipleCharacters(favoriteIds)

  return data({
    favorites: favorites,
    favoriteIds,
  })
}

export default function Index({ loaderData }: Route.ComponentProps) {
  const { favorites, favoriteIds } = loaderData

  return (
    <div className='flex flex-col items-center p-4 font-sans'>
      {favorites.length ? (
        <CharacterList characters={favorites} favorites={favoriteIds} />
      ) : (
        <p>There are no favorites</p>
      )}
    </div>
  )
}
