import { redirect, data } from 'react-router'
import { cookieToken } from '~/helpers/cookie.server'
import type { Route } from './+types/session'
import { pages } from '~/const/pages'

export const action = async ({ request }: Route.ActionArgs) => {
  console.log('/session', request.method)
  return data(null)
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')
  if (!token) {
    return redirect(pages.invalidSession, {
      headers: {
        'X-MyHeader': 'hello',
      },
    })
  }
  return redirect(pages.favorites, {
    headers: {
      'Set-Cookie': await cookieToken.serialize(token),
    },
  })
}
