import { NavLink, useSearchParams } from "@remix-run/react"
import logo from '~/icons/logo.svg'
import { Input } from "~/components/atoms/Input"

export const Menu = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q')
  return (
    <header className='w-full'>
      <nav className='flex w-full p-3 border-y-[1px] border-slate-300 items-center'>
        <NavLink to='/'>
          <img src={logo} alt='logo' />
        </NavLink>
        <form className='w-[80%] mx-5' action='/search'>
          <Input
            type='text'
            name='q'
            placeholder='find a character'
            className='w-full border-slate-300 hover:border-slate-400 border-[1px]'
            defaultValue={query ?? ''}
          />
        </form>
        <NavLink to='/favorites' className='ml-auto mr-5'>Favorites</NavLink>
      </nav>
    </header>
  )
}