import { createCookieSessionStorage } from 'react-router' // or cloudflare/deno

const THEME_KEY = 'theme'

const cookieSessionStorage = createCookieSessionStorage({
  // a Cookie from `createCookie` or the same CookieOptions to create one
  cookie: {
    name: 'session',
    sameSite: 'strict',
    secrets:
      process.env.NODE_ENV === 'production'
        ? [process.env.SESSION_SECRET as string]
        : undefined,
  },
})

export async function getThemeSession(request: Request) {
  const session = await cookieSessionStorage.getSession(
    request.headers.get('Cookie')
  )
  return {
    getTheme: () => {
      const themeValue = session.get(THEME_KEY)
      return themeValue ?? 'light'
    },
    setTheme: (theme: string) => session.set(THEME_KEY, theme),
    commitSession: () => cookieSessionStorage.commitSession(session),
  }
}
