import { createContext } from 'react'

export interface UserContext {
  name: string
}

export interface UserContextValue {
  user?: UserContext
}

export const UserContext = createContext<UserContextValue>({})
