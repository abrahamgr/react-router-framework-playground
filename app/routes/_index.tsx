import type { MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { CharacterList } from '~/components/CharacterList'
import { getCharacters } from '~/services/characters'

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export async function loader() {
  return json(await getCharacters())
}

export default function Index() {
  const characters = useLoaderData<typeof loader>()

  return (
    <div className='p-4 font-sans'>
      <CharacterList characters={characters} />
    </div>
  )
}
