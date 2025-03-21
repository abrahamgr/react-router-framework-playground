import { NavLink } from 'react-router'
import { pages } from '~/const/pages'
import logo from '~/icons/logo.svg'
import logoDark from '~/icons/logoDark.svg'
import { SearchBar } from './SearchBar'
import { ThemeToggle } from './ThemeToggle'

export const Menu = () => {
  return (
    <header className='w-full'>
      <nav className='flex w-full items-center border-slate-300 border-y-[1px] p-3'>
        <NavLink to='/'>
          <img src={logo} alt='logo' className='dark:hidden' />
          <img src={logoDark} alt='logo' className='hidden dark:flex' />
        </NavLink>
        <SearchBar />
        <NavLink to={pages.favorites} className='mr-5 ml-auto'>
          Favorites
        </NavLink>
        <ThemeToggle />
      </nav>
    </header>
  )
}
