import { type ActionFunctionArgs, data, redirect } from 'react-router'
import { pages } from '~/const/pages'
import { Signup } from '~/components/Signup'
import { registerUser } from '~/db/drizzle/users'
import { hashPassword } from '~/helpers/password.server'
import type { Route } from './+types/signup'
import { signup } from '~/api-schemas/schemas'
import { isValidSession } from '~/helpers/jwt.server'

export const action = async ({ request }: ActionFunctionArgs) => {
  const { method } = request
  if (method !== 'POST') return new Response(null, { status: 405 })

  const formData = await request.formData()
  const name = String(formData.get('name'))
  const email = String(formData.get('email'))
  const password = String(formData.get('password'))
  const confirmPassword = String(formData.get('confirm-password'))

  const result = signup.safeParse({ name, email, password, confirmPassword })
  if (!result.success)
    return data({ error: 'invalid form data' }, { status: 400 })

  if (password !== confirmPassword)
    return data({ error: 'password should match' }, { status: 400 })

  // store in db
  const passwordWithHash = hashPassword(password)
  await registerUser({ name, email, password: passwordWithHash })
  return redirect(pages.login)
}

export async function loader({ request }: Route.LoaderArgs) {
  if (await isValidSession(request)) return redirect(pages.root)
  return undefined
}

export default function SignupPage({ actionData }: Route.ComponentProps) {
  return <Signup error={actionData?.error} />
}
