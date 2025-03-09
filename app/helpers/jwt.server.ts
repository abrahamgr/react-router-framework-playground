import { SignJWT, jwtVerify } from 'jose'
import { redirect } from 'react-router'
import { pages } from '~/const/pages'
import { jwtCookie } from './cookie.server'

const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET)

const algorithm = 'HS256'

export function createJwt(request: Request, email: string) {
  const { url } = request
  const { origin } = new URL(url)
  return new SignJWT({
    email,
    jwti: crypto.randomUUID(),
  })
    .setProtectedHeader({ alg: algorithm })
    .setIssuedAt()
    .setIssuer(origin)
    .setExpirationTime('1w')
    .sign(jwtSecret)
}

export function verifyJtw(request: Request, jwt: string) {
  try {
    const { url } = request
    const { origin } = new URL(url)
    return jwtVerify(jwt, jwtSecret, {
      issuer: origin,
      algorithms: [algorithm],
    })
  } catch (error) {
    console.error('JWT verification failed', error)
    return undefined
  }
}

export async function isValidAuthRequest(
  request: Request,
  redirectUrl?: string
) {
  const { url } = request
  const { pathname } = new URL(url)
  // redirect if not logged in
  const redirectResponse = redirect(
    `${pages.login}?url=${redirectUrl ?? pathname}`
  )
  const currentCookies = request.headers.get('Cookie')

  // validate jwt
  const jwt = await jwtCookie.parse(currentCookies)
  if (!jwt) return redirectResponse
  const claims = await verifyJtw(request, jwt)
  if (!claims) return redirectResponse
  return undefined
}
