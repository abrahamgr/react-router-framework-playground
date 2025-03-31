import { use } from 'react'
import { UserContext } from '~/context/UserContext'

export const useUser = () => {
  const context = use(UserContext)
  return context?.user
}
