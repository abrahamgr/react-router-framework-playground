import { useSearchParams, useNavigate } from 'react-router'
import { FormEvent } from 'react'
import { Input } from '~/components/atoms/Input'

export function SearchBar() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const query = formData.get('q')
    if (query) navigate(`/search?q=${query}`)
  }

  return (
    <form className='mx-5 w-[80%]' onSubmit={handleSubmit}>
      <Input
        type='text'
        name='q'
        placeholder='find a character'
        className='w-full'
        defaultValue={query ?? ''}
      />
    </form>
  )
}
