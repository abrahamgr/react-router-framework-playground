import { json, type LoaderFunction, type MetaFunction } from '@remix-run/node'
import { useLoaderData, useSearchParams } from '@remix-run/react'
import { CharacterList } from '~/components/CharacterList'
import { Pagination } from '~/components/Pagination'
import { cookieFavorite } from '~/helpers/cookie.server'
import { getCharacters } from '~/services/characters'

export const meta: MetaFunction = () => {
  return [
    { title: 'Rick & Morty - Remix' },
    { name: 'Remix App', content: 'Welcome to Rick & Morty!' },
  ]
}

export const loader: LoaderFunction = async ({ request }) => {
  const { searchParams } = new URL(request.url)

  // get data from API
  const data = await getCharacters(searchParams.get('page') ?? undefined)
  // get cookies
  const favoritesValue: number[] = await cookieFavorite.parse(
    request.headers.get('Cookie')
  )

  return json({
    ...data,
    favorites: favoritesValue ?? [],
  })
}

export default function Index() {
  const [searchParams] = useSearchParams()
  const { results, info, favorites } = useLoaderData<typeof loader>()

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
