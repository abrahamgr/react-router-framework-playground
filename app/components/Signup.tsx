import { Link, useFetcher } from 'react-router'
import { Input } from './atoms/Input'
import { Button } from './atoms/Button'
import { FormField } from './atoms/FormField'
import { pages } from '~/const/pages'

export interface Signup {
  error?: string
}

export function Signup() {
  const fetcher = useFetcher()
  // const error = fetcher.data.error

  return (
    <fetcher.Form method='POST' className='flex w-[500px] flex-col p-5'>
      <h2 className='bold'>Login</h2>
      <p>To use features you must login</p>
      <FormField>
        <label htmlFor='name'>Name</label>
        <Input id='name' name='name' type='text' required />
      </FormField>
      <FormField>
        <label htmlFor='email'>Email</label>
        <Input id='email' name='email' type='email' required />
      </FormField>
      <FormField>
        <label htmlFor='password'>Password</label>
        <Input id='password' name='password' type='password' required />
      </FormField>
      <FormField>
        <label htmlFor='confirm-password'>Confirm password</label>
        <Input
          id='confirm-password'
          name='confirm-password'
          type='password'
          required
        />
      </FormField>
      <p>
        <Link to={pages.login}>Login if you already have an account</Link>
      </p>
      {/* {error ? <p className='text-red-500'>{error}</p> : null} */}
      <div className='flex justify-end'>
        <Button type='submit'>Register</Button>
      </div>
    </fetcher.Form>
  )
}
