import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { ProductsPage } from '../pages/ProductsPage'
import { CartPage } from '../pages/CartPage'

test('user can add backpack product to cart', async({page}) => {
    const loginPage = new LoginPage(page)
    const productsPage = new ProductsPage(page)

    await loginPage.goto()
    await loginPage.login('standard_user', 'secret_sauce')

    await expect(page.getByText('Products')).toBeVisible()

    await productsPage.addProductToCart('Sauce Labs Backpack')
    await page.locator('[data-test="shopping-cart-link"]').click()

    await expect(page).toHaveURL(/.*cart.html/)
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible()
   
})

test('user can remove backpack product from the cart', async({page}) => {
    const loginPage = new LoginPage(page)
    const productsPage = new ProductsPage(page)
    const cartPage = new CartPage(page)

    await loginPage.goto()
    await loginPage.login('standard_user', 'secret_sauce')
    await expect(page.getByText('Products')).toBeVisible()

    await productsPage.addProductToCart('Sauce Labs Backpack')
    await page.locator('[data-test="shopping-cart-link"]').click()

    await expect(page).toHaveURL(/.*cart.html/)
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible()

    await cartPage.removeProduct('Sauce Labs Backpack')
    await expect(page.getByText('Sauce Labs Backpack')).not.toBeVisible()
    
   
}) 