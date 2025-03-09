import { useNavigate, useRevalidator } from 'react-router'
import { pages } from '~/const/pages'
import { setFavorite } from '~/services/favorites'

export const useFavorite = (id: number) => {
  const revalidator = useRevalidator()
  const navigate = useNavigate()

  const handleFavorite = async () => {
    const response = await setFavorite(id)
    if (response.type === 'opaqueredirect') {
      navigate(`${pages.login}?url=${window.location.pathname}`)
    } else revalidator.revalidate()
  }

  return {
    handleFavorite,
  }
}
