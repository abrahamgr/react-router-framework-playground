import { drizzle } from 'drizzle-orm/node-postgres'
import { reset, seed } from 'drizzle-seed'
import { hashPassword } from '~/helpers/password.server'
import * as schema from './schema'
import 'dotenv/config'

export async function runResetSeed() {
  console.log('resetting...')
  console.time('reset seed')
  const db = drizzle(process.env.DATABASE_URL!)
  return reset(db, schema).finally(() => {
    console.timeEnd('reset seed')
  })
}

export async function runSeed() {
  console.log('seeding...')
  console.time('seed')
  const db = drizzle(process.env.DATABASE_URL!)
  const passwordHashed = hashPassword('Admin12345')
  // TODO insert at least one row with email 'user@email.com'
  return seed(db, schema)
    .refine(f => ({
      usersTable: {
        count: 2,
        columns: {
          password: f.default({
            defaultValue: passwordHashed,
          }),
        },
        with: {
          favoritesTable: 3,
        },
      },
      favoritesTable: {
        columns: {
          characterId: f.int({ minValue: 1, maxValue: 50 }),
          created: f.timestamp(),
        },
      },
    }))
    .finally(() => {
      console.timeEnd('seed')
    })
}
