import { drizzle } from 'drizzle-orm/node-postgres'
import { reset, seed } from 'drizzle-seed'
import { hashPassword } from '~/helpers/password.server'
import * as schema from './schema'
import 'dotenv/config'
import { DEFAULT } from 'playwright/const'

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
  const passwordHashed = hashPassword(DEFAULT.password)
  return seed(db, schema, { seed: 1 })
    .refine(f => ({
      usersTable: {
        count: 1,
        columns: {
          email: f.default({
            defaultValue: DEFAULT.email,
          }),
          password: f.default({
            defaultValue: passwordHashed,
          }),
        },
        with: {
          favoritesTable: 1,
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
