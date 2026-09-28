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
}