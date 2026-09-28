import {Page} from '@playwright/test';

export class ProductsPage {

    constructor(private page: Page) {}

    async addProductToCart(productName: string) {
    await this.page.locator('div.inventory_item')
    .filter({ hasText: productName })
    .getByRole('button', { name: 'Add to cart' })
    .click()
    }

    async openProduct(productName: string) {
        await this.page.getByText(productName).click()
    }

}