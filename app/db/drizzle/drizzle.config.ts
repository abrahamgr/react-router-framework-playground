import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

const drizzleBasePath = './app/db/drizzle'

export default defineConfig({
  out: `${drizzleBasePath}/migrations`,
  schema: `${drizzleBasePath}/schema/index.ts`,
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  migrations: {
    schema: 'public',
  },
})
