import { useMemo, useState } from 'react'
import { NavLink, useLocation } from 'react-router'
import { pages } from '~/const/pages'
import { useUser } from '~/hooks/useUser'
import logo from '~/icons/logo.svg'
import logoDark from '~/icons/logoDark.svg'
import { SearchBar } from './SearchBar'
import { ThemeToggle } from './ThemeToggle'

export const Menu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const user = useUser()
  const userLetter = useMemo(
    () => user?.name.slice(0, 1).toUpperCase() ?? '',
    [user]
  )

  const handleClick = () => {
    setIsOpen(prevState => !prevState)
  }

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
        {user ? (
          <div>
            <button
              type='button'
              className='mr-5 flex h-[20px] w-[20px] cursor-pointer items-center justify-center rounded-[10px] border-[1px] p-1'
              onClick={handleClick}
              data-testid='user-menu'
            >
              {userLetter}
            </button>
            {isOpen ? (
              <ul className='absolute right-0 mt-2 border-[1px] border-gray-300 border-l bg-white dark:bg-black'>
                <li className='block border-b-[1px] p-2 pl-4'>
                  <span className='mr-3'>{user.name}</span>
                </li>
                <li className='block p-2 pl-4 hover:text-gray-400 dark:hover:text-gray-400'>
                  <NavLink
                    to={`${pages.logout}?url=${location.pathname}`}
                    className=''
                  >
                    Logout
                  </NavLink>
                </li>
              </ul>
            ) : null}
          </div>
        ) : (
          <NavLink to={pages.login} className='mr-5 ml-auto'>
            Login
          </NavLink>
        )}
        <ThemeToggle />
      </nav>
    </header>
  )
}
