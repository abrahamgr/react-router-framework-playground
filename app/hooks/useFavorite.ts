import { useNavigate, useRevalidator } from 'react-router'
import { pages } from '~/const/pages'
import { setFavorite } from '~/services/favorites'

export const useFavorite = (id: number, isFavorite: 0 | 1) => {
  const revalidator = useRevalidator()
  const navigate = useNavigate()

  const handleFavorite = async () => {
    const response = await setFavorite(id, isFavorite)
    if (response.type === 'opaqueredirect') {
      navigate(`${pages.login}?url=${window.location.pathname}`)
    } else revalidator.revalidate()
  }

  return {
    handleFavorite,
  }
}
