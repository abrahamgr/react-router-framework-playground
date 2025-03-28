import { type LoaderFunctionArgs } from 'react-router'
import { useSearchParams } from 'react-router'
import { CharacterList } from '~/components/CharacterList'
import { Pagination } from '~/components/Pagination'
import { getUserFavorites } from '~/db/drizzle/favorites'
import { getUserSession } from '~/helpers/jwt.server'
import { getCharacters } from '~/services/characters'
import type { Route } from './+types/index'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { searchParams } = new URL(request.url)

  // get data from API
  const page = searchParams.get('page') ?? undefined
  const data = await getCharacters(page ? { page } : undefined)
  // get cookies

  let favoriteIds: number[] = []
  const user = await getUserSession(request)
  if (user) {
    const userFavorites = await getUserFavorites(user.payload.id)
    // get cookies
    favoriteIds = userFavorites.map(favorite => favorite.characterId)
  }

  return {
    ...data,
    favorites: favoriteIds,
  }
}

export default function Index({ loaderData }: Route.ComponentProps) {
  const [searchParams] = useSearchParams()
  const { results, info, favorites } = loaderData

  return (
    <div className='flex flex-col items-center p-4 font-sans'>
      <CharacterList characters={results!} favorites={favorites} />
      <Pagination
        currentPage={searchParams.get('page') ?? '1'}
        lastPage={`${info?.pages}`}
        path={'/'}
      />
    </div>
  )
}
