import { ActionFunction, LoaderFunction, redirect } from '@remix-run/node'
import { cookieToken } from '~/helpers/cookie.server'

export const action: ActionFunction = async ({ request }) => {
  console.log('/session', request.method)
  return Response.json(null)
}

export const loader: LoaderFunction = async ({ request }) => {
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
