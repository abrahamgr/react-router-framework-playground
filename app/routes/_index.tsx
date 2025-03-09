import { type LoaderFunctionArgs, type MetaFunction } from 'react-router'
import { useSearchParams } from 'react-router'
import { CharacterList } from '~/components/CharacterList'
import { Pagination } from '~/components/Pagination'
import { cookieFavorite } from '~/helpers/cookie.server'
import { getCharacters } from '~/services/characters'
import type { Route } from './+types/_index'

export const meta: MetaFunction = () => {
  return [
    { title: 'Rick & Morty - Remix' },
    { name: 'Remix App', content: 'Welcome to Rick & Morty!' },
  ]
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { searchParams } = new URL(request.url)

  // get data from API
  const page = searchParams.get('page') ?? undefined
  const data = await getCharacters(page ? { page } : undefined)
  // get cookies
  const favoritesValue: number[] = await cookieFavorite.parse(
    request.headers.get('Cookie')
  )

  return {
    ...data,
    favorites: favoritesValue ?? [],
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
