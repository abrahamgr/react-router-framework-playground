import { redirect } from 'react-router'
import { cookieToken } from '~/helpers/cookie.server'
import type { Route } from './+types/session'

export const action = async ({ request }: Route.ActionArgs) => {
  console.log('/session', request.method)
  return Response.json(null)
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')
  if (!token) {
    return redirect('/invalid-session', {
      headers: {
        'X-MyHeader': 'hello',
      },
    })
  }
  return redirect('/favorites', {
    status: 302,
    headers: {
      'Set-Cookie': await cookieToken.serialize(token),
    },
  })
}
