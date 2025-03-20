import { SignJWT, jwtVerify } from 'jose'
import { redirect } from 'react-router'
import { pages } from '~/const/pages'
import { jwtCookie } from './cookie.server'
import { JWTClaims } from '~/types/claims'

const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET)
const algorithm = 'HS256'

export function createJwt(request: Request, claims: JWTClaims) {
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
    return jwtVerify<JWTClaims>(jwt, jwtSecret, {
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
  if (!(await isValidSession(request))) return redirectResponse
  return undefined
}

export async function isValidSession(request: Request) {
  const currentCookies = request.headers.get('Cookie')
  const jwt = await jwtCookie.parse(currentCookies)
  if (!jwt) return false
  const claims = await verifyJtw(request, jwt)
  if (!claims) return false
  return true
}
