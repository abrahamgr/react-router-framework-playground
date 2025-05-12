import {
  Links,
  type LoaderFunctionArgs,
  Meta,
  type MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
  data,
} from 'react-router'
import './tailwind.css'
import { LayoutComponent } from '~/components/LayoutComponent'
import type { Route } from './+types/root'
import type { UserContext } from './context/UserContext'
import { getAllCookies } from './helpers/cookie.server'
import { getUserSession } from './helpers/jwt.server'
import { UserProvider } from './providers/UserProvider'

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Rick & Morty',
      description: 'View charaters',
    },
  ]
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const headerCookie = request.headers.get('cookie') ?? ''
  const allCookies = getAllCookies(headerCookie)
  const theme = allCookies?.theme ?? 'dark'
  const userData = await getUserSession(request)
  const user = userData
    ? ({ name: userData.payload.name } satisfies UserContext)
    : undefined

  const headers = new Headers()
  // expire cookie if jwt exists and session is invalid
  if (allCookies?.jwt && !userData) {
    headers.append(
      'Set-Cookie',
      `jwt=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${process.env.NODE_ENV === 'development' ? '' : '; Secure'}`
    )
  }

  return data(
    {
      theme,
      user,
    },
    {
      headers,
    }
  )
}

export default function App({ loaderData }: Route.ComponentProps) {
  const { theme, user } = loaderData
  return (
    <html lang='en' className={theme}>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='color-scheme' content={theme} />
        <Meta />
        <Links />
      </head>
      <UserProvider user={user}>
        <LayoutComponent>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
        </LayoutComponent>
      </UserProvider>
    </html>
  )
}
