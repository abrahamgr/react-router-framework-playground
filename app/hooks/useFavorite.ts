import { useRevalidator } from '@remix-run/react'
import { setFavorite } from '~/services/favorites'

export const useFavorite = (id: number) => {
  const revalidator = useRevalidator()

  const handleFavorite = async () => {
    await setFavorite(id)
    revalidator.revalidate()
  }

  return {
    handleFavorite,
  }
}
