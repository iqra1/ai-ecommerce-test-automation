import { test as base } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { ProductsPage } from '../pages/ProductsPage'
import { CartPage } from '../pages/CartPage'
import { CheckoutPage } from '../pages/CheckoutPage'

type Fixtures = {
    loginPage: LoginPage
    productsPage: ProductsPage
    cartPage: CartPage
    checkoutPage: CheckoutPage
    checkoutReady: void
}

export const test = base.extend<Fixtures>({
    
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page))
    },

    productsPage: async ({ page }, use) => {
        await use(new ProductsPage(page))
    },

    cartPage: async ({ page }, use) => {
        await use(new CartPage(page))
    },

    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page))
    },

    checkoutReady: async ({ loginPage, productsPage, cartPage }, use) => {
    
    await loginPage.goto()
    await loginPage.login('standard_user', 'secret_sauce')

    await productsPage.addProductToCart('Sauce Labs Backpack')

    await cartPage.openCart()

    await cartPage.checkout()

    await use()
}
})