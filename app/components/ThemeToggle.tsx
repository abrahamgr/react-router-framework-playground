import lightIcon from '~/icons/lightTheme.svg'
import darkIcon from '~/icons/darkTheme.svg'

interface CookieProps {
  name: string
  value: string
  expires: number
}
declare global {
  interface Window {
    cookieStore?: {
      set: (cookieptions: CookieProps) => Promise<void>
      get: (name: string) => Promise<CookieProps>
    }
  }
}

export function ThemeToggle() {
  const handleTheme = async () => {
    if (!window?.cookieStore) return

    const currentTheme =
      (await window.cookieStore.get('theme'))?.value ?? 'dark'
    const theme = currentTheme === 'dark' ? 'light' : 'dark'
    document.documentElement.classList.toggle('dark')
    document
      .querySelector('meta[name="color-scheme"]')
      ?.setAttribute('content', theme)
    window.cookieStore.set({
      name: 'theme',
      value: theme,
      // 1 year
      expires: Date.now() + 365 * 24 * 60 * 60 * 1000,
    })
  }
  return (
    <button type='button' className='cursor-pointer' onClick={handleTheme}>
      <img src={darkIcon} alt='theme-toggle' className='dark:hidden' />
      <img src={lightIcon} alt='theme-toggle' className='hidden dark:flex' />
    </button>
  )
}
