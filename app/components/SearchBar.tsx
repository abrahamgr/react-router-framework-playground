import { FormEvent, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { Input } from '~/components/atoms/Input'

export function SearchBar() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q')

  useEffect(() => {
    const input = document.querySelector<HTMLInputElement>('input[name=q]')
    if (input) input.value = query ?? ''
  }, [query])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const query = formData.get('q')
    if (query) navigate(`/search?q=${query}`)
  }

  return (
    <form id='search-form' className='mx-5 w-[80%]' onSubmit={handleSubmit}>
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
