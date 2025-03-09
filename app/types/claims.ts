import type { JWTPayload } from 'jose'

export interface JWTClaims extends JWTPayload {
  email: string
}
