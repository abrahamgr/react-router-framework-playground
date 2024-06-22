import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node'
import { useLoaderData, useSearchParams } from '@remix-run/react'
import { CharacterList } from '~/components/CharacterList'
import { Pagination } from '~/components/Pagination'
import { getCharacters } from '~/services/characters'

export const meta: MetaFunction = () => {
  return [
    { title: 'Rick & Morty - Remix' },
    { name: 'Remix App', content: 'Welcome to Rick & Morty!' },
  ]
}

export async function loader({ request }: LoaderFunctionArgs) {
  const { searchParams } = new URL(request.url)
  console.log('request.url', request.url)
  return json(await getCharacters(searchParams.get('page') ?? undefined))
}

export default function Index() {
  const [searchParams] = useSearchParams()
  const { results, info } = useLoaderData<typeof loader>()

  return (
    <div className='flex flex-col items-center p-4 font-sans'>
      <CharacterList characters={results!} />
      <Pagination
        currentPage={searchParams.get('page') ?? '1'}
        lastPage={`${info?.pages}`}
        path={'/'}
      />
    </div>
  )
}
