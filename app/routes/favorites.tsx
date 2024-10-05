import { json, type LoaderFunction, type MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { CharacterList } from '~/components/CharacterList'
import { cookieFavorite } from '~/helpers/cookie.server'
import { getMultipleCharacters } from '~/services/characters'

export const meta: MetaFunction = () => {
  return [
    { title: 'Rick & Morty - Favorites' },
  ]
}

export const loader: LoaderFunction = async ({ request }) => {

  // get cookies
  const favoriteIds: string[] = await cookieFavorite.parse(
    request.headers.get('Cookie')
  )
  // get data from API
  const favorites = await getMultipleCharacters(favoriteIds)

  return json({
    favorites: favorites,
    favoriteIds,
  })
}

export default function Index() {
  const { favorites, favoriteIds } = useLoaderData<typeof loader>()

  return (
    <div className='flex flex-col items-center p-4 font-sans'>
      <CharacterList characters={favorites} favorites={favoriteIds} />
    </div>
  )
}
