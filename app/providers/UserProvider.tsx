import { PropsWithChildren } from 'react'
import { UserContext, UserContextValue } from '~/context/UserContext'

export function UserProvider({
  children,
  user,
}: PropsWithChildren<UserContextValue>) {
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  )
}
