import { type CookieOptions, createCookie } from '@remix-run/node'

const baseCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
}

export const cookieFavorite = createCookie('favorites', baseCookieOptions)

export const cookieToken = createCookie('token', baseCookieOptions)
