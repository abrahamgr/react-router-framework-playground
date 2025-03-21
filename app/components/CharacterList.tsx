import type { FC } from 'react'
import type { Character } from '~/types/rick-morty'
import { CharacterItem } from './CharacterItem'

export interface CharacterListProps {
  characters: Character[]
  favorites: number[]
}

export const CharacterList: FC<CharacterListProps> = ({
  characters,
  favorites,
}) => {
  return (
    <div className='flex flex-row flex-wrap *:mr-2 *:mb-2'>
      {characters.map(character => (
        <CharacterItem
          key={character.id}
          character={character}
          isFavorite={favorites.indexOf(character.id) > -1}
        />
      ))}
    </div>
  )
}
