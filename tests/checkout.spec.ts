import {test, expect} from '@playwright/test'
import { PDFParse } from 'pdf-parse'
import fs from 'node:fs'
import { LoginPage } from '../pages/LoginPage'
import { ProductsPage } from '../pages/ProductsPage'
import { CheckoutPage } from '../pages/CheckoutPage'


test.beforeEach (async ({page})  => {
    const loginPage = new LoginPage(page)
    const productsPage = new ProductsPage(page)

    await loginPage.goto()
    await loginPage.login('standard_user', 'secret_sauce')

    await expect(page.getByText('Products')).toBeVisible()

    await productsPage.addProductToCart('Sauce Labs Backpack')
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

    const checkoutPage = new CheckoutPage(page)
    await checkoutPage.fillCustomerInformation('Iqra', 'Luqman', '12345')
    await checkoutPage.continue()

    await expect(page.getByText('Checkout: Overview')).toBeVisible()
    await expect(page).toHaveURL(/.*checkout-step-two.html/)

    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible()
    await expect(page.getByText('Payment Information:')).toBeVisible()
    await expect(page.getByText('Shipping Information:')).toBeVisible()
    await expect(page.getByText('Total: $32.39')).toBeVisible()
})

test('checkout requires first name', async ({ page }) => {

    const checkoutPage = new CheckoutPage(page)
    await checkoutPage.fillCustomerInformation('', 'Luqman', '12345')
    await checkoutPage.continue()

    await expect(page.getByRole('alert')).toHaveText('Error: First Name is required')
})

test('checkout requires last name', async ({ page }) => {

    const checkoutPage = new CheckoutPage(page)
    await checkoutPage.fillCustomerInformation('Iqra', '', '12345')
    await checkoutPage.continue()

    await expect(page.getByRole('alert')).toHaveText('Error: Last Name is required')
})

test('checkout requires postal code', async ({ page }) => {

    const checkoutPage = new CheckoutPage(page)
    await checkoutPage.fillCustomerInformation('Iqra', 'Luqman', '')
    await checkoutPage.continue()

    await expect(page.getByRole('alert')).toHaveText('Error: Postal Code is required')
})


test('user can complete the purchase', async ({ page }) => {

    const checkoutPage = new CheckoutPage(page)
    await checkoutPage.fillCustomerInformation('Iqra', 'Luqman', '12345')
    await checkoutPage.continue()

    await expect(page.getByText('Checkout: Overview')).toBeVisible()
    await expect(page).toHaveURL(/.*checkout-step-two.html/)

    await checkoutPage.finishOrder()

    await expect(page.getByText('Thank you for your order!')).toBeVisible()
    await expect(page).toHaveURL(/.*checkout-complete.html/)
})


test('user can download the order receipt', async ({ page }) => {

    const checkoutPage = new CheckoutPage(page)
    await checkoutPage.fillCustomerInformation('Iqra', 'Luqman', '12345')
    await checkoutPage.continue()

    await expect(page.getByText('Checkout: Overview')).toBeVisible()
    await checkoutPage.finishOrder()
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