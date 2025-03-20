import {
  type ActionFunctionArgs,
  data,
  type LoaderFunction,
  redirect,
} from 'react-router'
import { Login } from '~/components/Login'
import { createJwt, isValidSession } from '~/helpers/jwt.server'
import { jwtCookie } from '~/helpers/cookie.server'
import { pages } from '~/const/pages'
import { login } from '~/api-schemas/schemas'
import { hashPassword } from '~/helpers/password.server'
import { loginUser } from '~/db/drizzle/users'

export const action = async ({ request }: ActionFunctionArgs) => {
  const { url } = request
  const { searchParams } = new URL(url)
  const redirectUrl = searchParams.get('url')
  const formData = await request.formData()
  const email = String(formData.get('email'))
  const password = String(formData.get('password'))

  const result = login.safeParse({ email, password })
  if (!result.success)
    return data({ error: 'invalid form data' }, { status: 400 })

  const passwordWithHash = hashPassword(password)
  const user = await loginUser({ email, password: passwordWithHash })
  if (!user) return data({ error: 'invalid credentials' }, { status: 400 })

  const jwt = await createJwt(request, { name: user.name, email, id: user.id })
  return redirect(redirectUrl ?? '/', {
    headers: {
      'Set-Cookie': await jwtCookie.serialize(jwt),
    },
  })
}

export const loader: LoaderFunction = async ({ request }) => {
  if (await isValidSession(request)) return redirect(pages.root)
  return undefined
}

export default function LoginPage() {
  return <Login />
}
