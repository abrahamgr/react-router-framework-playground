import { Link, useFetcher } from '@remix-run/react'
import { type FC } from 'react'
import type { Character } from '~/types/rick-morty'
import starIcon from '~/icons/star.svg'
import starFilledIcon from '~/icons/star-filled.svg'
import { internalEndpoints } from '~/const/endpoints'

export interface CharacterProps {
  character: Character
  isFavorite: boolean
}

export const CharacterItem: FC<CharacterProps> = ({
  character: { id, name, status, image, gender, species, location },
  isFavorite,
}) => {
  const fetcher = useFetcher()
  const isFavoriteOptimistic = fetcher.formData
    ? fetcher.formData.get('characterId')
    : isFavorite
  return (
    <div className='flex w-full rounded-md border-2 border-slate-300 md:w-[350px]'>
      <img src={image} alt={name} className='w-40 rounded-l-sm' />
      <div className='flex w-full flex-col p-3'>
        <fetcher.Form method='POST' action={internalEndpoints.favorites}>
          <button
            className='cursor-pointer self-end'
            name='characterId'
            value={id}
          >
            <img
              src={isFavoriteOptimistic ? starFilledIcon : starIcon}
              alt='favorite'
            />
          </button>
        </fetcher.Form>
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
