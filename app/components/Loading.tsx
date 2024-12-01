import { Spinner } from './Spinner'

export function Loading() {
  return (
    <div className='flex h-screen w-[300px] items-center justify-center'>
      <Spinner />
    </div>
  )
}
