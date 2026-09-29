import { Page } from '@playwright/test'

export class CheckoutPage {

    constructor(private page: Page) {}

    async fillCustomerInformation(
        firstName: string,
        lastName: string,
        postalCode: string
    ) {
        await this.page.getByPlaceholder('First Name').fill(firstName)
        await this.page.getByPlaceholder('Last Name').fill(lastName)
        await this.page.getByPlaceholder('Zip/Postal Code').fill(postalCode)
    }

    async continue() {
        await this.page.getByRole('button', { name: 'Continue' }).click()
    }

    async finishOrder() {
        await this.page.getByRole('button', { name: 'Finish' }).click()
    }

    async downloadReceipt() {
        const downloadPromise = this.page.waitForEvent('download') // Start waiting for the download
        await this.page.getByRole('button', { name: 'Generate PDF order' }).click()
        const download = await downloadPromise
        await download.saveAs('downloads/order-receipt.pdf')
        return download

    }
}