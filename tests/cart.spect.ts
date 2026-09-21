import { test, expect } from '@playwright/test'

test('user can add backpack product to cart', async({page}) => {
    await page.goto('/')
    await page.getByPlaceholder('Username').fill('standard_user')
    await page.getByPlaceholder('Password').fill('secret_sauce')
    await page.getByRole('button', {name: 'Login'}).click()

    await expect(page.getByText('Products')).toBeVisible()

    await page.locator('div.inventory_item').filter({hasText: 'Sauce Labs Backpack'}).getByRole('button', {name: 'Add to cart'}).click()
    await page.locator('[data-test="shopping-cart-link"]').click()

    await expect(page).toHaveURL(/.*cart.html/)
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible()
   
})