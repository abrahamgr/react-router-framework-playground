import { useSearchParams, data } from 'react-router'
import { CharacterList } from '~/components/CharacterList'
import { Pagination } from '~/components/Pagination'
import { cookieFavorite } from '~/helpers/cookie.server'
import { getCharacters } from '~/services/characters'
import type { Character, Info } from '~/types/rick-morty'
import type { Route } from './+types/search'

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Rick & Morty - Remix' },
    { name: 'Remix App', content: 'Welcome to Rick & Morty!' },
  ]
}

export const loader = async ({ request }: Route.LoaderArgs) => {
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
  // get cookies
  const favoritesValue: number[] = await cookieFavorite.parse(
    request.headers.get('Cookie')
  )

  return data({
    ...responseData,
    favorites: favoritesValue ?? [],
  })
}

export default function Search({ loaderData }: Route.ComponentProps) {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q')
  const { results, info, favorites } = loaderData
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
