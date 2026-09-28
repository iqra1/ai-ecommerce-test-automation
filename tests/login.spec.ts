import {test, expect} from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'

test('Login with valid credentials', async({page}) => {

    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login('standard_user', 'secret_sauce')

    //.* anything can appear before inventory.html URL must contain
    await expect(page).toHaveURL(/.*inventory.html/)
    await expect(page.getByText('Products')).toBeVisible()
})

test('Login with invalid password', async({page}) => {

    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login('standard_user', 'wrong_password')

    await expect(page.getByRole('alert')).toHaveText(
    'Epic sadface: Username and password do not match any user in this service'
)

})

test('Login with invalid username', async({page}) => {

    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login('invalid_user', 'secret_sauce')

    await expect(page.getByRole('alert')).toHaveText(
    'Epic sadface: Username and password do not match any user in this service'
)
})

test('Login with empty credentials', async({page}) => {

    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login('', '')

    await expect(page.getByRole('alert')).toHaveText(
    'Epic sadface: Username is required'
)
})

test('Login with empty username', async({page}) => {
    
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login('', 'secret_sauce')

    await expect(page.getByRole('alert')).toHaveText(
    'Epic sadface: Username is required'
)
})

test('Login with empty password', async({page}) => {
    
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login('standard_user', '')

    await expect(page.getByRole('alert')).toHaveText(
    'Epic sadface: Password is required'
)
})