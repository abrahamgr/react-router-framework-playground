import { type FC } from 'react'
import starIcon from '~/icons/star.svg'
import starFilledIcon from '~/icons/star-filled.svg'
import { CharacterProps } from '~/components/CharacterItem'
import { useFavorite } from '~/hooks/useFavorite'

export const FullCharacter: FC<CharacterProps> = ({
  character: { id, name, status, image, gender, species, location },
  isFavorite,
}) => {
  const { handleFavorite } = useFavorite(id)

  return (
    <div className='flex justify-center w-full'>
      <div className='flex flex-col max-w-xl pt-10'>
        <h2 className='text-xl font-bold'>{name}</h2>
        <div className='relative'>
          <img src={image} alt={name} className='w-60 rounded-l-sm' />
          <button
            className='absolute top-3 right-3'
            onClick={handleFavorite}
          >
            <img src={isFavorite ? starFilledIcon : starIcon} alt='favorite' />
          </button>
        </div>
        <div className='flex w-full flex-col p-3'>
          <p className='text-sm'>Status - {status}</p>
          <p className='text-sm'>{`${species} - ${gender}`}</p>
          <p className='text-sm'>{location.name}</p>
        </div>
      </div>
    </div>
  )
}
