import { type ActionFunction, data } from 'react-router'
import { getThemeSession } from '~/helpers/session.server'

export const action: ActionFunction = async ({ request }) => {
  const { getTheme, setTheme, commitSession } = await getThemeSession(request)
  const currentTheme = await getTheme()
  await setTheme(currentTheme === 'dark' ? 'light' : 'dark')

  return data(null, {
    headers: {
      'Set-Cookie': await commitSession(),
    },
  })
}
