import { z } from 'zod'
import { name, email, password, confirmPassword } from './fields'

export const signup = z.object({
  name,
  email,
  password,
  confirmPassword,
})

export const login = z.object({
  email,
  password,
})
