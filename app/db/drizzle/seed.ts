import { drizzle } from 'drizzle-orm/node-postgres'
import { seed } from 'drizzle-seed'
import { hashPassword } from '~/helpers/password.server'
import * as schema from './schema'
import 'dotenv/config'

async function main() {
  const db = drizzle(process.env.DATABASE_URL!)
  const passwordHashed = hashPassword('Admin12345')
  return seed(db, schema).refine(f => ({
    usersTable: {
      count: 1,
      columns: {
        password: f.default({
          defaultValue: passwordHashed,
        }),
        email: f.default({
          defaultValue: 'user@email.com',
        }),
        created: f.timestamp(),
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
}

console.time('seed')
console.log('running seed...')
main()
  .then(() => {
    console.log('done')
  })
  .finally(() => {
    console.timeEnd('seed')
  })
