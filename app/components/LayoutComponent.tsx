import type { FC, PropsWithChildren } from 'react'
import { useNavigation } from '@remix-run/react'
import { Menu } from './Menu'
import { Loading } from './Loading'

export const LayoutComponent: FC<PropsWithChildren> = ({ children }) => {
  const navigation = useNavigation()
  return (
    <body className='flex flex-col w-full'>
      <Menu />
      <main className='self-center max-w-screen-2xl md:max-w-screen-xl'>
        {navigation.state === 'loading' ? <Loading /> : children}
      </main>
    </body>
  )
}
