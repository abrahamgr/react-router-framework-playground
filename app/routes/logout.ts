import { redirect } from 'react-router'
import { pages } from '~/const/pages'
import { jwtCookie } from '~/helpers/cookie.server'
import { Route } from './+types/logout'

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url)
  return redirect(`${pages.login}?${url.searchParams.toString()}`, {
    headers: {
      'Set-Cookie': await jwtCookie.serialize('', {
        expires: new Date(),
      }),
    },
  })
}
