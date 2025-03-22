import { Page, expect, test } from '@playwright/test'

test('should change theme', async ({ page }) => {
  await page.goto('/')
  page.locator('meta[name="color-scheme"]')
  await clickToggle(page)
  await expect(await getMetaTagTheme(page)).toHaveAttribute('content', 'light')
  await clickToggle(page)
  await expect(await getMetaTagTheme(page)).toHaveAttribute('content', 'dark')
})

async function clickToggle(page: Page) {
  await page.getByRole('button', { name: 'theme-toggle' }).click()
}

async function getMetaTagTheme(page: Page) {
  return page.locator('meta[name="color-scheme"]')
}
