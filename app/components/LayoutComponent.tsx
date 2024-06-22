import type { FC, PropsWithChildren } from 'react'

export const LayoutComponent: FC<PropsWithChildren> = ({ children }) => {
  return (
    <body className='flex justify-center'>
      <main className='flex w-full md:max-w-screen-xl'>{children}</main>
    </body>
  )
}
