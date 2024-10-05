import { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { FullCharacter } from '~/components/FullCharacter'
import { cookieFavorite } from '~/helpers/cookie.server'
import { getCharacter } from '~/services/characters'

export async function loader({ params: { id }, request }: LoaderFunctionArgs) {
  if (!id)
    throw new Error('Parameter required')
  const character = await getCharacter(id!)
  const favorites: number[] = await cookieFavorite.parse(request.headers.get('Cookie')) ?? []
  const isFavorite = favorites.indexOf(Number(id)) > -1
  return { character, isFavorite }
}

export default function CharacterPage() {
  const { character, isFavorite } = useLoaderData<typeof loader>()
  return <FullCharacter character={character} isFavorite={isFavorite} />
}
