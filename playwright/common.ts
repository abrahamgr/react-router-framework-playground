import { type Page, expect } from '@playwright/test'
import { DEFAULT } from './const'

interface LoginParams {
  email?: string
  password?: string
}

export async function fillLoginAndSubmit(page: Page, options?: LoginParams) {
  const { email = DEFAULT.email, password = DEFAULT.password } = options ?? {}
  await page.getByRole('textbox', { name: 'Email' }).fill(email)
  await page.getByRole('textbox', { name: 'Password' }).fill(password)
  await page.getByRole('button', { name: 'Sign in' }).click()
}

export async function getFirstCharacterNotFavorite(page: Page) {
  return page
    .locator('input[name="isFavorite"][value="0"]')
    .first()
    .locator('xpath=..')
    .getByRole('button')
    .getAttribute('value')
}

export async function saveFavoriteCharacter(
  page: Page,
  characterId: string | null
) {
  await page.locator(`button[value="${characterId}"]`).click()
  expect(page.locator(`button[value="${characterId}"] img`)).toHaveAttribute(
    'aria-label',
    'unfavorite'
  )
}
