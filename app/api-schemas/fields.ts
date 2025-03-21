import { z } from 'zod'

export const name = z.string().nonempty()
export const email = z.string().email()
export const password = z.string().min(8)
export const confirmPassword = z.string().min(8)
export const characterId = z.number().int().positive()
export const characterIdForm = z.string().nonempty()
export const isFavoriteForm = z.enum(['0', '1'])
export const isFavorite = z.boolean()
