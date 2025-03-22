import { type Page, expect, test } from '@playwright/test'

test.describe('navigation without login', () => {
  test('app started', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Rick & Morty/)
  })
  test('select character', async ({ page }) => {
    await page.goto('/')
    await clickOnRick(page)
    await expect(page).toHaveURL(/character/)
    await expect(page).toHaveTitle(/Rick & Morty - Rick Sanchez/)
  })
  test('should redirect to login - favorites', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: 'Favorites' }).click()
    await expect(page.locator('h2')).toHaveText(/Login/)
  })
  test('should redirect to login - save favorite', async ({ page }) => {
    await page.goto('/')
    await page.locator('form > .cursor-pointer').first().click()
    await expect(page.locator('h2')).toHaveText(/Login/)
  })
  test('should redirect to login - character page', async ({ page }) => {
    await page.goto('/')
    await clickOnRick(page)
    await page.getByRole('button', { name: 'favorite' }).click()
    await expect(page.locator('h2')).toHaveText(/Login/)
  })
  test('should go to signup from login', async ({ page }) => {
    await page.goto('/login')
    await page
      .getByRole('link', { name: "Register if you don't have an account" })
      .click()
    await expect(page).toHaveURL(/signup/)
  })
  test('should go to signup from register', async ({ page }) => {
    await page.goto('/signup')
    await page
      .getByRole('link', { name: 'Login if you already have an account' })
      .click()
    await expect(page).toHaveURL(/login/)
  })
})

async function clickOnRick(page: Page) {
  await page.getByRole('link', { name: 'Rick Sanchez' }).click()
}
