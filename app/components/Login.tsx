import { Link, useFetcher } from 'react-router'
import { pages } from '~/const/pages'
import { Button } from './atoms/Button'
import { FormField } from './atoms/FormField'
import { Input } from './atoms/Input'

export interface LoginProps {
  error?: string
}

export function Login({ error }: LoginProps) {
  const fetcher = useFetcher()
  // const error = fetcher.data.error

  return (
    <fetcher.Form method='POST' className='flex w-[500px] flex-col p-5'>
      <h2 className='bold'>Login</h2>
      <p>To use features you must login</p>
      <FormField>
        <label htmlFor='email'>Email</label>
        <Input id='email' name='email' type='email' required />
      </FormField>
      <FormField>
        <label htmlFor='password'>Password</label>
        <Input id='password' name='password' type='password' required />
      </FormField>
      <p>
        <Link to={pages.signup}>
          Register if you don&apos;t have an account
        </Link>
      </p>
      {error ? <p className='text-red-500'>{error}</p> : null}
      <div className='flex justify-end'>
        <Button type='submit'>Sign in</Button>
      </div>
    </fetcher.Form>
  )
}
