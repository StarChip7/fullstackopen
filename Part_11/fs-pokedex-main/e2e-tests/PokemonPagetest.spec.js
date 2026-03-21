import { test, describe, expect } from '@playwright/test'

describe('Pokedex', () => {
  test('Pokemon page can be opened, and details displayed', async ({ page }) => {
    await page.goto('')
    await page.getByText('ivysaur').click()
    await expect(page.getByText('ivysaur')).toBeVisible()
    await expect(page.getByText('chlorophyll')).toBeVisible()
  })
})