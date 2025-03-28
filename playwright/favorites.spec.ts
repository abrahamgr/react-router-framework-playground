import { type Page, expect, test } from '@playwright/test'
import { pages } from '~/const/pages'
import {
  fillLoginAndSubmit,
  getFirstCharacterNotFavorite,
  saveFavoriteCharacter,
} from './common'

test('user should save favorites from root', async ({ page }) => {
  // login
  await page.goto(pages.login)
  await fillLoginAndSubmit(page)
  await expect(page).toHaveURL('/')

  // get character id
  const characterId = await getFirstCharacterNotFavorite(page)

  // save favorite
  await saveFavoriteCharacter(page, characterId)

  // confirm it's visible on favorites page'
  await page.getByRole('link', { name: 'Favorites' }).click()
  await expect(page).toHaveURL(new RegExp(pages.favorites))
  expect(page.locator(`button[value="${characterId}"] img`)).toHaveAttribute(
    'aria-label',
    'unfavorite'
  )
})
test.skip('user should remove favorites', async ({ page }) => {
  // login
  await page.goto(pages.login)
  await fillLoginAndSubmit(page)
  await expect(page).toHaveURL('/')

  // get character id
  const characterId = await getFirstCharacterNotFavorite(page)
  await page
    .locator(`button[value="${characterId}"]`)
    .locator('xpath=..')
    .getByRole('link')
    .click()
  await expect(page).toHaveURL(new RegExp(`${pages.character}/${characterId}`))
})
