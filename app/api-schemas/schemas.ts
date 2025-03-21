import { z } from 'zod'
import {
  name,
  email,
  password,
  confirmPassword,
  characterId,
  isFavorite,
  isFavoriteForm,
  characterIdForm,
} from './fields'

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

export const favoriteForm = z.object({
  characterId: characterIdForm,
  isFavorite: isFavoriteForm,
})

export const favorite = z.object({
  characterId,
  isFavorite,
})
