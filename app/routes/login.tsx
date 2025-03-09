import { ActionFunctionArgs, data, redirect } from 'react-router'
import { Login } from '~/components/Login'
import { createJwt } from '~/helpers/jwt.server'
import { jwtCookie } from '~/helpers/cookie.server'

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

export default function LoginPage() {
  return <Login />
}
