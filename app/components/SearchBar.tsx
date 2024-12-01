import { useSearchParams, useNavigate } from "@remix-run/react"
import { FormEvent } from "react"
import { Input } from "~/components/atoms/Input"

export function SearchBar() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const query = formData.get('q')
    if (query)
      navigate(`/search?q=${query}`)
  }

  return (
    <form className='w-[80%] mx-5' onSubmit={handleSubmit}>
      <Input
        type='text'
        name='q'
        placeholder='find a character'
        className='w-full border-slate-300 hover:border-slate-400 border-[1px]'
        defaultValue={query ?? ''}
      />
    </form>)
}