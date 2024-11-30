import type { FC, PropsWithChildren } from 'react'
import { Menu } from './Menu'

export const LayoutComponent: FC<PropsWithChildren> = ({ children }) => {
  return (
    <body className='flex flex-col w-full'>
      <Menu />
      <main className='self-center max-w-screen-2xl md:max-w-screen-xl'>
        {children}
      </main>
    </body>
  )
}
