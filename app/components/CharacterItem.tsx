import { Link } from '@remix-run/react'
import { type FC } from 'react'
import type { Character } from '~/types/rick-morty'
import starIcon from '~/icons/star.svg'
import starFilledIcon from '~/icons/star-filled.svg'
import { useFavorite } from '~/hooks/useFavorite'

export interface CharacterProps {
  character: Character
  isFavorite: boolean
}

export const CharacterItem: FC<CharacterProps> = ({
  character: { id, name, status, image, gender, species, location },
  isFavorite,
}) => {
  const { handleFavorite } = useFavorite(id)
  return (
    <div className='flex w-[350px] rounded-md border-2 border-slate-300'>
      <img src={image} alt={name} className='w-40 rounded-l-sm' />
      <div className='flex w-full flex-col p-3'>
        <button
          className='cursor-pointer self-end'
          onClick={handleFavorite}
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
