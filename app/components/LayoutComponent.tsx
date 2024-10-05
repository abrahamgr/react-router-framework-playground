import type { FC, PropsWithChildren } from 'react'

export const LayoutComponent: FC<PropsWithChildren> = ({ children }) => {
  return (
    <body className='flex justify-center'>
      <main className='flex w-full flex-col md:max-w-screen-xl'>{children}</main>
    </body>
  )
}
