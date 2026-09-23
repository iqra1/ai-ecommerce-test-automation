import {test, expect} from '@playwright/test'


test.beforeEach (async ({page})  => {
    await page.goto('/')
    await page.getByPlaceholder('Username').fill('standard_user')
    await page.getByPlaceholder('Password').fill('secret_sauce')
    await page.getByRole('button', {name: 'Login'}).click()

    await expect(page.getByText('Products')).toBeVisible()

    await page.locator('div.inventory_item').filter({hasText: 'Sauce Labs Backpack'}).getByRole('button', {name: 'Add to cart'}).click()
    await page.locator('[data-test="shopping-cart-link"]').click()

    await expect(page).toHaveURL(/.*cart.html/)
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible()

    await page.getByRole('button', {name: 'Checkout'}).click()

})

test('user can reach checkout', async({page}) => {

    await expect(page.getByText('Checkout: Your Information')).toBeVisible()
    await expect(page).toHaveURL(/.*checkout-step-one.html/)
})

test('user can complete checkout information', async ({ page }) => {

    await page.getByPlaceholder('First Name').fill('Iqra')
    await page.getByPlaceholder('Last Name').fill('Luqman')
    await page.getByPlaceholder('Zip/Postal Code').fill('12345')
    await page.getByRole('button', {name: 'Continue'}).click()

    await expect(page.getByText('Checkout: Overview')).toBeVisible()
    await expect(page).toHaveURL(/.*checkout-step-two.html/)

    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible()
    await expect(page.getByText('Payment Information:')).toBeVisible()
    await expect(page.getByText('Shipping Information:')).toBeVisible()
    await expect(page.getByText('Total: $32.39')).toBeVisible()
})

test('checkout requires first name', async ({ page }) => {

    await page.getByPlaceholder('Last Name').fill('Luqman')
    await page.getByPlaceholder('Zip/Postal Code').fill('12345')
    await page.getByRole('button', {name: 'Continue'}).click()

    await expect(page.getByRole('alert')).toHaveText('Error: First Name is required')
})

test('checkout requires last name', async ({ page }) => {

    await page.getByPlaceholder('First Name').fill('Iqra')
    await page.getByPlaceholder('Zip/Postal Code').fill('12345')
    await page.getByRole('button', {name: 'Continue'}).click()

    await expect(page.getByRole('alert')).toHaveText('Error: Last Name is required')
})

test('checkout requires postal code', async ({ page }) => {

    await page.getByPlaceholder('First Name').fill('Iqra')
    await page.getByPlaceholder('Last Name').fill('Luqman')
    await page.getByRole('button', {name: 'Continue'}).click()

    await expect(page.getByRole('alert')).toHaveText('Error: Postal Code is required')
})