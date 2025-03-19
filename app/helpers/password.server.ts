import { createHmac } from 'node:crypto'

export function hashPassword(password: string) {
  return createHmac('sha256', process.env.PASSWORD_KEY!)
    .update(password)
    .digest('hex')
}
