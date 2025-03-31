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
            <div
              className='mr-5 flex h-[20px] w-[20px] cursor-pointer items-center justify-center rounded-[10px] border-[1px] border-b-blue-50'
              onClick={handleClick}
            >
              {userLetter}
            </div>
            {isOpen ? (
              <ul className='mt-2 space-y-2 border-gray-300 border-l pl-4'>
                <li className='block p-2'>
                  <span className='mr-3'>{user.name}</span>
                </li>
                <li className='block p-2 hover:text-gray-400 dark:hover:text-gray-800'>
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
