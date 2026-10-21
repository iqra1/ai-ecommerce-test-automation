import {expect} from '@playwright/test'
import { test } from '../fixtures/fixtures'

test('Login with valid credentials', async({page, loginPage}) => {

    await loginPage.goto()
    await loginPage.login('standard_user', 'secret_sauce')

    //.* anything can appear before inventory.html URL must contain
    await expect(page).toHaveURL(/.*inventory.html/)
    await expect(page.getByText('Products')).toBeVisible()
    await expect(page.getByRole('alert')).toHaveCount(0)

    // TC-LOGIN-02: inventory page renders its key elements after login
    await expect(page).toHaveTitle('Swag Labs')
    await expect(page.getByRole('button', { name: 'Cart, empty' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Open Menu' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Add to cart' })).toHaveCount(6)

    // burger menu contains a Logout item
    await page.getByRole('button', { name: 'Open Menu' }).click()
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible()
})

test('Login with invalid password', async({page, loginPage}) => {

    await loginPage.goto()
    await loginPage.login('standard_user', 'wrong_password')

    await expect(page.getByRole('alert')).toHaveText(
    'Epic sadface: Username and password do not match any user in this service'
)
    await expect(page).toHaveURL('/')

})

test('Login with invalid username', async({page, loginPage}) => {

    await loginPage.goto()
    await loginPage.login('invalid_user', 'secret_sauce')

    await expect(page.getByRole('alert')).toHaveText(
    'Epic sadface: Username and password do not match any user in this service'
)
    await expect(page).toHaveURL('/')
    await expect(page.getByPlaceholder('Username')).toHaveValue('invalid_user')
    await expect(page.getByPlaceholder('Password')).toHaveValue('secret_sauce')
})

test('Login with empty credentials', async({page, loginPage}) => {

    await loginPage.goto()
    await loginPage.login('', '')

    await expect(page.getByRole('alert')).toHaveText(
    'Epic sadface: Username is required'
)
    await expect(page).toHaveURL('/')
})

test('Login with empty username', async({page, loginPage}) => {
    
    await loginPage.goto()
    await loginPage.login('', 'secret_sauce')

    await expect(page.getByRole('alert')).toHaveText(
    'Epic sadface: Username is required'
)
    await expect(page).toHaveURL('/')
})

test('Login with empty password', async({page, loginPage}) => {
    
    await loginPage.goto()
    await loginPage.login('standard_user', '')

    await expect(page.getByRole('alert')).toHaveText(
    'Epic sadface: Password is required'
)
    await expect(page).toHaveURL('/')
})

test('Login error alert can be dismissed and reappears on next failed attempt', async({page, loginPage}) => {

    await loginPage.goto()
    await loginPage.login('invalid_user', 'wrong_password')

    const alert = page.getByRole('alert')
    await expect(alert).toHaveText(
    'Epic sadface: Username and password do not match any user in this service'
)

    // dismiss the error alert and verify it disappears
    await alert.getByRole('button', { name: 'Dismiss error' }).click()
    await expect(alert).toBeHidden()

    // another failed attempt shows the alert again with the field-specific message
    await loginPage.login('', '')
    await expect(alert).toHaveText(
    'Epic sadface: Username is required'
)
    await expect(page).toHaveURL('/')
})
