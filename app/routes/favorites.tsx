import { data } from 'react-router'
import { CharacterList } from '~/components/CharacterList'
import { getUserFavorites } from '~/db/drizzle/favorites'
import { getLoginSession, getUserSession } from '~/helpers/jwt.server'
import { getMultipleCharacters } from '~/services/characters'
import type { Route } from './+types/favorites'

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Rick & Morty - Favorites' }]
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const loginRequest = await getLoginSession(request)
  if (loginRequest) return loginRequest

  const user = await getUserSession(request)
  if (!user) return new Response(null, { status: 401 })

  const userFavorites = await getUserFavorites(user.payload.id)

  // get cookies
  const favoriteIds = userFavorites.map(favorite => favorite.characterId)
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
      {favorites?.length ? (
        <CharacterList characters={favorites} favorites={favoriteIds} />
      ) : (
        <p>There are no favorites</p>
      )}
    </div>
  )
}
