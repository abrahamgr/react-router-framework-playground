import { and, eq } from 'drizzle-orm'
import { db } from './index'
import { usersTable } from './schema'
import type { InsertUser, SelectUser } from './typings'

export async function registerUser({ name, email, password }: InsertUser) {
  await db.insert(usersTable).values({ name, email, password })
}

export async function loginUser({
  email,
  password,
}: Pick<InsertUser, 'email' | 'password'>): Promise<SelectUser | undefined> {
  const users = await db
    .select()
    .from(usersTable)
    .where(and(eq(usersTable.email, email), eq(usersTable.password, password)))
    .limit(1)
  if (users.length) return users[0]
  return undefined
}
