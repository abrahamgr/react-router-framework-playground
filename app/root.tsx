import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  LoaderFunctionArgs,
} from 'react-router'
import './tailwind.css'
import { LayoutComponent } from '~/components/LayoutComponent'
import { getThemeSession } from '~/helpers/session.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // theme session
  const { getTheme } = await getThemeSession(request)
  const theme = getTheme()

  return {
    theme,
  }
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { theme } = useLoaderData<typeof loader>()
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
        {children}
        <ScrollRestoration />
        <Scripts />
      </LayoutComponent>
    </html>
  )
}

export default function App() {
  return <Outlet />
}
