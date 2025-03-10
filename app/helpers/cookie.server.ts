import { type CookieOptions, createCookie } from 'react-router'

const isProd = process.env.NODE_ENV === 'production'

const baseCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: 'strict',
}

export const cookieFavorite = createCookie('favorites', baseCookieOptions)

export const cookieToken = createCookie('token', baseCookieOptions)

export const jwtCookie = createCookie('jwt', baseCookieOptions)

/**
 * get plain cookie value
 * @returns
 */
export function getAllCookies(plainCookie: string): Record<string, string> {
  const initialCookies: Record<string, string> = {}
  const cookies = plainCookie.split(';').reduce((acc, cookie) => {
    const [name, value] = cookie.trim().split('=')
    acc[name] = value
    return acc
  }, initialCookies)

  return cookies
}
