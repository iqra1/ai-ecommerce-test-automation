import { Page } from '@playwright/test'

export class LoginPage {

    constructor(private page: Page) {}

    async login(username: string, password: string) {
        await this.page.getByPlaceholder('Username').fill(username)
        await this.page.getByPlaceholder('Password').fill(password)
        await this.page.getByRole('button', { name: 'Login' }).click()
    }
}