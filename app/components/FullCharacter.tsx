import { type FC } from 'react'
import { CharacterProps } from '~/components/CharacterItem'
import { EpisodeList } from '~/components/EpisodeList'
import { useFavorite } from '~/hooks/useFavorite'
import starFilledIcon from '~/icons/star-filled.svg'
import starIcon from '~/icons/star.svg'
import { Episode } from '~/types/rick-morty'

interface FullCharacterProps extends CharacterProps {
  episodes: Episode[]
}

export const FullCharacter: FC<FullCharacterProps> = ({
  character: { id, name, status, image, gender, species, location },
  episodes,
  isFavorite,
}) => {
  const { handleFavorite } = useFavorite(id, isFavorite)

  return (
    <div className='flex w-full justify-center'>
      <div className='flex max-w-xl flex-col pt-10'>
        <h2 className='font-bold text-xl'>{name}</h2>
        <div className='relative'>
          <img src={image} alt={name} className='w-60 rounded-l-sm' />
          <button className='absolute top-3 right-3' onClick={handleFavorite}>
            <img
              src={isFavorite ? starFilledIcon : starIcon}
              alt='favorite'
              aria-label={isFavorite ? 'unfavorite' : 'favorite'}
            />
          </button>
        </div>
        <div className='flex w-full flex-col p-3'>
          <p className='text-sm'>Status - {status}</p>
          <p className='text-sm'>{`${species} - ${gender}`}</p>
          <p className='text-sm'>{location.name}</p>
        </div>
        {episodes ? (
          <section>
            <EpisodeList episodes={episodes} />
          </section>
        ) : null}
      </div>
    </div>
  )
}
