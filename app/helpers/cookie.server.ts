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
