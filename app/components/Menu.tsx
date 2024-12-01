import { NavLink } from "@remix-run/react"
import logo from '~/icons/logo.svg'
import { SearchBar } from "./SearchBar"

export const Menu = () => {
  return (
    <header className='w-full'>
      <nav className='flex w-full p-3 border-y-[1px] border-slate-300 items-center'>
        <NavLink to='/'>
          <img src={logo} alt='logo' />
        </NavLink>
        <SearchBar />
        <NavLink to='/favorites' className='ml-auto mr-5'>Favorites</NavLink>
      </nav>
    </header>
  )
}