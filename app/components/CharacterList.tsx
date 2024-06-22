import { type FC } from 'react'
import { Character } from '~/types/rick-morty'
import { CharacterComponent } from './CharacterComponent'

export interface CharacterListProps {
  characters: Character[]
}

export const CharacterList: FC<CharacterListProps> = ({ characters }) => {
  return (
    <div className='flex flex-row flex-wrap *:mb-2 *:mr-2'>
      {characters.map((character) => (
        <CharacterComponent key={character.id} character={character} />
      ))}
    </div>
  )
}
