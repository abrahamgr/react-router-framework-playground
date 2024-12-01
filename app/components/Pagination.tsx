import { useNavigate, useSearchParams } from '@remix-run/react'
import { Button } from '~/components/atoms/Button'

export interface PaginationProps {
  currentPage: string
  lastPage: string
  path: string
}

export function Pagination({ currentPage, lastPage, path }: PaginationProps) {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const query = searchParams.get('q')

  const getQueryparams = (pageNumber: number) => {
    const params = new URLSearchParams({ page: `${pageNumber}` })
    // keep current query if provided
    if (query)
      params.append('q', query)
    return `${path}?${params.toString()}`
  }

  const onPrev = () => {
    const pageNumber = Number(currentPage)
    navigate(getQueryparams(pageNumber - 1))
  }
  const onNext = () => {
    const pageNumber = Number(currentPage)
    if (pageNumber > 0)
      navigate(getQueryparams(pageNumber + 1))
  }
  return (
    <div className='flex w-[200px] justify-between'>
      <Button type='button' disabled={currentPage === '1'} onClick={onPrev}>
        Prev
      </Button>
      <span className='flex items-center'>{currentPage}</span>
      <Button type='button' disabled={currentPage === lastPage} onClick={onNext}>
        Next
      </Button>
    </div>
  )
}
