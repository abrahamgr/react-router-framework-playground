import type { FC, PropsWithChildren } from 'react'
import { useNavigation } from 'react-router'
import { Menu } from './Menu'
import { Loading } from './Loading'

export const LayoutComponent: FC<PropsWithChildren> = ({ children }) => {
  const navigation = useNavigation()
  return (
    <body className='flex w-full flex-col'>
      <Menu />
      <main className='max-w-screen-2xl self-center md:max-w-screen-xl'>
        {navigation.state === 'loading' ? <Loading /> : children}
      </main>
    </body>
  )
}
