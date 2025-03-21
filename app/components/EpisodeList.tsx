import { type FC } from 'react'
import { Episode } from '~/types/rick-morty'

interface EpisodeListProps {
  episodes: Episode[]
}

export const EpisodeList: FC<EpisodeListProps> = ({ episodes }) => {
  return (
    <ul className='list-none'>
      {episodes.map(episode => (
        <li key={episode.id} className='border border-gray-100 p-2'>
          <p className='font-bold'>{episode.name}</p>
          <p>Date: {episode.air_date}</p>
        </li>
      ))}
    </ul>
  )
}
