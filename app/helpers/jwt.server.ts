import { SignJWT, jwtVerify } from 'jose'
import { redirect } from 'react-router'
import { pages } from '~/const/pages'
import { JWTPayload } from '~/types/claims'
import { jwtCookie } from './cookie.server'

const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET)
const algorithm = 'HS256'

export function createJwt(request: Request, claims: JWTPayload) {
  const { url } = request
  const { origin } = new URL(url)
  return new SignJWT({ ...claims, jwti: crypto.randomUUID() })
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
    return jwtVerify<JWTPayload>(jwt, jwtSecret, {
      issuer: origin,
      algorithms: [algorithm],
    })
  } catch (error) {
    console.error('JWT verification failed', error)
    return undefined
  }
}

export async function getLoginSession(request: Request, redirectUrl?: string) {
  const { url } = request
  const { pathname } = new URL(url)
  // redirect if not logged in
  const redirectResponse = redirect(
    `${pages.login}?url=${redirectUrl ?? pathname}`
  )
  const isValid = await isValidSession(request)
  return isValid ? undefined : redirectResponse
}

export async function getUserSession(request: Request) {
  const currentCookies = request.headers.get('Cookie')
  const jwt = await jwtCookie.parse(currentCookies)
  if (!jwt) return undefined
  return verifyJtw(request, jwt)
}

export async function isValidSession(request: Request) {
  const claims = await getUserSession(request)
  if (!claims) return false
  return true
}
