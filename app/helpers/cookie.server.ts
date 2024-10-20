import { createCookie } from '@remix-run/node'

export const cookieFavorite = createCookie('favorites', {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
})

export const cookieToken = createCookie('token', {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
})
