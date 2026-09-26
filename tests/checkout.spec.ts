import {test, expect} from '@playwright/test'
import { PDFParse } from 'pdf-parse'
import fs from 'node:fs'


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


test('user can complete the purchase', async ({ page }) => {

    await page.getByPlaceholder('First Name').fill('Iqra')
    await page.getByPlaceholder('Last Name').fill('Luqman')
    await page.getByPlaceholder('Zip/Postal Code').fill('12345')
    await page.getByRole('button', {name: 'Continue'}).click()

    await expect(page.getByText('Checkout: Overview')).toBeVisible()
    await expect(page).toHaveURL(/.*checkout-step-two.html/)

    await page.getByRole('button', {name: 'Finish'}).click()

    await expect(page.getByText('Thank you for your order!')).toBeVisible()
    await expect(page).toHaveURL(/.*checkout-complete.html/)
})


test('user can download the order receipt', async ({ page }) => {

    await page.getByPlaceholder('First Name').fill('Iqra')
    await page.getByPlaceholder('Last Name').fill('Luqman')
    await page.getByPlaceholder('Zip/Postal Code').fill('12345')
    await page.getByRole('button', {name: 'Continue'}).click()

    await expect(page.getByText('Checkout: Overview')).toBeVisible()
    await page.getByRole('button', {name: 'Finish'}).click()
    await expect(page.getByText('Thank you for your order!')).toBeVisible()


    const downloadPromise = page.waitForEvent('download') // Start waiting for the download
    await page.getByRole('button', { name: 'Generate PDF order' }).click()
    const download = await downloadPromise
    expect(download.suggestedFilename()).toMatch(/\.pdf$/)
    await download.saveAs('downloads/order-receipt.pdf')

    const pdfBuffer = fs.readFileSync('downloads/order-receipt.pdf')

    const parser = new PDFParse({ data: pdfBuffer })
    const result = await parser.getText()

    expect(result.text).toContain('Order Receipt')
    expect(result.text).toContain('Iqra Luqman')
    expect(result.text).toContain('12345')
    expect(result.text).toContain('Sauce Labs Backpack')
    expect(result.text).toContain('$29.99')
    expect(result.text).toContain('Item total $29.99')
    expect(result.text).toContain('Tax $2.40')
    expect(result.text).toContain('Total $32.39')
    expect(result.text).toContain('Thank you for your order!')

    await parser.destroy()

})