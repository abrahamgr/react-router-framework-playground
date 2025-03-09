import {
  type ActionFunctionArgs,
  data,
  type LoaderFunction,
  redirect,
} from 'react-router'
import { Login } from '~/components/Login'
import { createJwt, isValidAuthRequest } from '~/helpers/jwt.server'
import { jwtCookie } from '~/helpers/cookie.server'
import { pages } from '~/const/pages'

export const action = async ({ request }: ActionFunctionArgs) => {
  const { url } = request
  const { searchParams } = new URL(url)
  const redirectUrl = searchParams.get('url')
  const formData = await request.formData()
  const email = String(formData.get('email'))
  if (!email) return data({ error: 'email is required' })

  const jwt = await createJwt(request, email)
  console.log('jwt', jwt)
  return redirect(redirectUrl ?? '/', {
    headers: {
      'Set-Cookie': await jwtCookie.serialize(jwt),
    },
  })
}

export const loader: LoaderFunction = async ({ request }) => {
  const { url } = request
  const { searchParams } = new URL(url)
  const redirectUrl = searchParams.get('url') ?? pages.root
  const redirectSession = await isValidAuthRequest(request, redirectUrl)
  // if undefined is a valid session
  if (!redirectSession) return redirect(redirectUrl)
  return data(null)
}

export default function LoginPage() {
  return <Login />
}
