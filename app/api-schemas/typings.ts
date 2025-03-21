import { z } from 'zod'
import { favorite } from './schemas'

export type FavoriteSchema = z.infer<typeof favorite>
