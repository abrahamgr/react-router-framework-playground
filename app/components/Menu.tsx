import { Link } from "@remix-run/react"

export const Menu = () => {
  return (
    <header>
      <nav className='flex w-full p-3 justify-around'>
        <Link to='/'>Home</Link>
        <Link to='/favorites'>Favorites</Link>
      </nav>
    </header>
  )
}