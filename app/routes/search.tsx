import { useSearchParams } from 'react-router'
import { CharacterList } from '~/components/CharacterList'
import { Loading } from '~/components/Loading'
import { Pagination } from '~/components/Pagination'
import { getUserFavorites } from '~/db/drizzle/favorites'
import { getUserSession } from '~/helpers/jwt.server'
import { getCharacters } from '~/services/characters'
import type { Character, Info } from '~/types/rick-morty'
import type { Route } from './+types/search'

export const clientLoader = async ({
  request,
  serverLoader,
}: Route.ClientLoaderArgs) => {
  const { searchParams } = new URL(request.url)

  // filter from API
  const name = searchParams.get('q') ?? undefined
  const page = searchParams.get('page') ?? '1'
  let responseData: Info<Character[]> = {
    info: {
      count: 0,
      next: '',
      pages: 0,
      prev: '',
    },
    results: [],
  }
  if (name) responseData = await getCharacters({ name, page })
  const { favorites } = await serverLoader()
  return {
    favorites,
    ...responseData,
  }
}

// force the client loader to run during hydration
clientLoader.hydrate = true as const // `as const` for type inference

export function HydrateFallback() {
  return <Loading />
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  let favoriteIds: number[] = []
  const user = await getUserSession(request)
  if (user) {
    const userFavorites = await getUserFavorites(user.payload.id)
    // get cookies
    favoriteIds = userFavorites.map(favorite => favorite.characterId)
  }

  return {
    favorites: favoriteIds,
  }
}

export default function Search({ loaderData }: Route.ComponentProps) {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q')
  const { results, info, favorites } = loaderData as Info<Character[]> & {
    favorites: number[]
  }
  const component = query ? (
    results?.length ? (
      <>
        <CharacterList characters={results!} favorites={favorites} />
        <Pagination
          currentPage={searchParams.get('page') ?? '1'}
          lastPage={`${info?.pages}`}
          path={'/search'}
        />
      </>
    ) : (
      <p>No characters found</p>
    )
  ) : (
    <p>Search a character</p>
  )

  return (
    <div className='flex flex-col items-center p-4 font-sans'>{component}</div>
  )
}
