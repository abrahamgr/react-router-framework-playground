import { Link } from '@remix-run/react'
import { type FC } from 'react'
import type { Character } from '~/types/rick-morty'

export interface CharacterProps {
  character: Character
}

export const CharacterComponent: FC<CharacterProps> = ({
  character: { id, name, status, image, gender, species, location },
}) => {
  return (
    <div className='flex w-[350px] rounded-md border-2 border-slate-300'>
      <img src={image} alt={name} className='w-40 rounded-l-sm' />
      <div className='p-3'>
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
