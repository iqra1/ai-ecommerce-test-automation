import { Page } from '@playwright/test'

export class CartPage {

    constructor(private page: Page) {}

    async removeProduct(productName: string) {
        await this.page
            .locator('div.cart_item')
            .filter({ hasText: productName })
            .getByRole('button', { name: 'Remove' })
            .click()
    }

    async openCart() {
        await this.page.locator('[data-test="shopping-cart-link"]').click()
    }

    async checkout(){
        await this.page.getByRole('button', {name: 'Checkout'}).click()
    }
}