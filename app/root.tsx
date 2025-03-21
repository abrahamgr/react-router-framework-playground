import {
  Links,
  LoaderFunctionArgs,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router'
import './tailwind.css'
import { LayoutComponent } from '~/components/LayoutComponent'
import type { Route } from './+types/root'
import { getAllCookies } from './helpers/cookie.server'

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Rick & Morty',
      description: 'View charaters',
    },
  ]
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const cookies = request.headers.get('cookie') ?? ''
  const theme = getAllCookies(cookies)['theme'] ?? 'dark'

  return {
    theme,
  }
}

export default function App({ loaderData }: Route.ComponentProps) {
  const { theme } = loaderData
  return (
    <html lang='en' className={theme}>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='color-scheme' content={theme} />
        <Meta />
        <Links />
      </head>
      <LayoutComponent>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </LayoutComponent>
    </html>
  )
}
