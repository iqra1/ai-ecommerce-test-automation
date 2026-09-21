import {test, expect} from '@playwright/test'

test('products page should display products', async({page}) => {

    await page.goto('/')
    await page.getByPlaceholder('Username').fill('standard_user')
    await page.getByPlaceholder('Password').fill('secret_sauce')
    await page.getByRole('button', {name: 'Login'}).click()

    await expect(page.getByText('Products')).toBeVisible()

})

test('user can view backpack product details', async ({ page }) => {
    
    await page.goto('/')
    await page.getByPlaceholder('Username').fill('standard_user')
    await page.getByPlaceholder('Password').fill('secret_sauce')
    await page.getByRole('button', {name: 'Login'}).click()
    await page.getByText('Sauce Labs Backpack').click()

    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible()
    await expect(page.getByText('carry.allTheThings()...')).toBeVisible()
    await expect(page.getByText('$29.99')).toBeVisible()
    await expect(page).toHaveURL(/.*inventory-item.html\?id=4/)
})