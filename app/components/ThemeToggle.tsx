import lightIcon from '~/icons/lightTheme.svg'
import darkIcon from '~/icons/darkTheme.svg'
import { useFetcher } from 'react-router'

export function ThemeToggle() {
  const { Form } = useFetcher()
  return (
    <Form method='post' action='/api/theme'>
      <button type='submit'>
        <img src={darkIcon} alt='theme-toggle' className='dark:hidden' />
        <img src={lightIcon} alt='theme-toggle' className='hidden dark:flex' />
      </button>
    </Form>
  )
}
