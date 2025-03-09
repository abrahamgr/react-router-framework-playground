import { useFetcher } from 'react-router'
import { Input } from './atoms/Input'
import { Button } from './atoms/Button'

export interface LoginProps {
  error?: string
}

export function Login() {
  const fetcher = useFetcher()
  // const error = fetcher.data.error

  return (
    <fetcher.Form method='POST' className='flex w-[500px] flex-col p-5'>
      <h2 className='bold'>Login</h2>
      <p>To use features you must login</p>
      <br />
      <label htmlFor='email'>Email</label>
      <Input id='email' name='email' type='email' required />
      <br />
      {/* {error ? <p className='text-red-500'>{error}</p> : null} */}
      <div className='flex justify-end'>
        <Button type='submit'>Submit</Button>
      </div>
    </fetcher.Form>
  )
}
