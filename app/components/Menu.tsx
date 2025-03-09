import { NavLink } from 'react-router'
import logo from '~/icons/logo.svg'
import logoDark from '~/icons/logoDark.svg'
import { SearchBar } from './SearchBar'
import { ThemeToggle } from './ThemeToggle'
import { pages } from '~/const/pages'

export const Menu = () => {
  return (
    <header className='w-full'>
      <nav className='flex w-full items-center border-y-[1px] border-slate-300 p-3'>
        <NavLink to='/'>
          <img src={logo} alt='logo' className='dark:hidden' />
          <img src={logoDark} alt='logo' className='hidden dark:flex' />
        </NavLink>
        <SearchBar />
        <NavLink to={pages.favorites} className='ml-auto mr-5'>
          Favorites
        </NavLink>
        <ThemeToggle />
      </nav>
    </header>
  )
}
