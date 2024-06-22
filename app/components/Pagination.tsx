import { useNavigate } from '@remix-run/react'
import { Button } from '~/components/atoms/Button'

export interface PaginationProps {
  currentPage: string
  lastPage: string
  path: string
}

export function Pagination({ currentPage, lastPage, path }: PaginationProps) {
  const navigate = useNavigate()
  const onPrev = () => {
    const pageNumber = Number(currentPage)
    navigate(`${path}?page=${pageNumber - 1}`)
  }
  const onNext = () => {
    const pageNumber = Number(currentPage)
    if (pageNumber > 0) navigate(`${path}?page=${pageNumber + 1}`)
  }
  return (
    <div className='flex w-[200px] justify-between'>
      <Button disabled={currentPage === '1'} onClick={onPrev}>
        Prev
      </Button>
      <span className='flex items-center'>{currentPage}</span>
      <Button disabled={currentPage === lastPage} onClick={onNext}>
        Next
      </Button>
    </div>
  )
}
