import { Link, useRevalidator } from '@remix-run/react'
import { type FC } from 'react'
import type { Character } from '~/types/rick-morty'
import starIcon from '~/icons/star.svg'
import starFilledIcon from '~/icons/star-filled.svg'
import { setFavorite } from '~/services/favorites'

export interface CharacterProps {
  character: Character
  isFavorite: boolean
}

export const CharacterComponent: FC<CharacterProps> = ({
  character: { id, name, status, image, gender, species, location },
  isFavorite,
}) => {
  const revalidator = useRevalidator()
  const handleFavorite = async (characterId: number) => {
    await setFavorite(characterId)
    revalidator.revalidate()
  }
  return (
    <div className='flex w-[350px] rounded-md border-2 border-slate-300'>
      <img src={image} alt={name} className='w-40 rounded-l-sm' />
      <div className='flex w-full flex-col p-3'>
        <button
          className='cursor-pointer self-end'
          onClick={() => handleFavorite(id)}
        >
          <img src={isFavorite ? starFilledIcon : starIcon} alt='favorite' />
        </button>
        <Link to={`/character/${id}`} className='hover:underline'>
          {name}
        </Link>
        <p className='text-sm'>{status}</p>
        <p className='text-sm'>{`${species} - ${gender}`}</p>
        <p className='text-sm'>{location.name}</p>
      </div>
    </div>
  )
}
