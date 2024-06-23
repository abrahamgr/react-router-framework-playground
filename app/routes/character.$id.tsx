import { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { CharacterComponent } from '~/components/CharacterComponent'
import { getCharacter } from '~/services/characters'

export async function loader({ params: { id } }: LoaderFunctionArgs) {
  return await getCharacter(id!)
}

export default function CharacterPage() {
  const character = useLoaderData<typeof loader>()
  return <CharacterComponent character={character} isFavorite />
}
