import { expect, test } from '@playwright/test'
import { pages } from '~/const/pages'
import { runResetSeed, runSeed } from '~/db/drizzle/helpers'
import { fillLoginAndSubmit } from './common'

test.beforeAll(async () => {
  await runSeed()
})

test.afterAll(async () => {
  await runResetSeed()
})

test('user should be able to login', async ({ page }) => {
  await page.goto(pages.login)
  await expect(page.locator('h2')).toHaveText(/Login/)
  await fillLoginAndSubmit(page)
  await expect(page).toHaveURL('/')
})

test('user should be able to register and login', async ({ page }) => {
  const email = 'new-user@mail.com'
  const password = 'Admin12345'
  await page.goto(pages.signup)
  await expect(page.locator('h2')).toHaveText(/Signup/)
  await page.getByRole('textbox', { name: 'Name' }).fill('New User')
  await page.getByRole('textbox', { name: 'Email' }).fill(email)
  await page.getByRole('textbox', { name: /Password/ }).fill(password)
  await page.getByRole('textbox', { name: 'Confirm password' }).fill(password)
  await page.getByRole('button', { name: 'Register' }).click()
  await expect(page).toHaveURL(new RegExp(pages.login))
  await fillLoginAndSubmit(page, { email, password })
  await expect(page).toHaveURL('/')
})
