import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  LoaderFunctionArgs,
} from 'react-router'
import './tailwind.css'
import { LayoutComponent } from '~/components/LayoutComponent'
import { getThemeSession } from '~/helpers/session.server'
import type { Route } from './+types/root'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // theme session
  const { getTheme } = await getThemeSession(request)
  const theme = getTheme()

  return {
    theme,
  }
}

export default function App({ loaderData }: Route.ComponentProps) {
  const { theme } = loaderData
  const themeClass = theme === 'dark' ? 'dark' : 'light'
  return (
    <html lang='en' className={themeClass}>
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
