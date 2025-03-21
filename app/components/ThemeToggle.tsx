import { getCookie, setCookie } from '~/helpers/cookie.client'
import darkIcon from '~/icons/darkTheme.svg'
import lightIcon from '~/icons/lightTheme.svg'

export function ThemeToggle() {
  const handleTheme = async () => {
    const currentTheme = (await getCookie('theme')) ?? 'dark'
    const theme = currentTheme === 'dark' ? 'light' : 'dark'
    // 1 year
    const expires = Date.now() + 365 * 24 * 60 * 60 * 1000
    await setCookie({ name: 'theme', value: theme, expires })
    // change theme
    document.documentElement.classList.toggle('dark')
    document
      .querySelector('meta[name="color-scheme"]')
      ?.setAttribute('content', theme)
  }
  return (
    <button type='button' className='cursor-pointer' onClick={handleTheme}>
      <img src={darkIcon} alt='theme-toggle' className='dark:hidden' />
      <img src={lightIcon} alt='theme-toggle' className='hidden dark:flex' />
    </button>
  )
}
