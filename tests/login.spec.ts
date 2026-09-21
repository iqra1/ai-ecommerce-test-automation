import {test, expect} from '@playwright/test'

test('Login with valid credentials', async({page}) => {

    await page.goto('/')
    await page.getByPlaceholder('Username').fill('standard_user')
    await page.getByPlaceholder('Password').fill('secret_sauce')
    await page.getByRole('button', {name: 'Login'}).click()

    //.* anything can appear before inventory.html URL must contain
    await expect(page).toHaveURL(/.*inventory.html/)
    await expect(page.getByText('Products')).toBeVisible()
})

test('Login with invalid password', async({page}) => {

    await page.goto('/')
    await page.getByPlaceholder('Username').fill('standard_user')
    await page.getByPlaceholder('Password').fill('wrong_password')
    await page.getByRole('button', {name: 'Login'}).click()

    await expect(page.getByRole('alert')).toHaveText(
    'Epic sadface: Username and password do not match any user in this service'
)

})

test('Login with invalid username', async({page}) => {

    await page.goto('/')
    await page.getByPlaceholder('Username').fill('invalid_user')
    await page.getByPlaceholder('Password').fill('secret_sauce')
    await page.getByRole('button', {name: 'Login'}).click()

    await expect(page.getByRole('alert')).toHaveText(
    'Epic sadface: Username and password do not match any user in this service'
)
})

test('Login with empty credentials', async({page}) => {

    await page.goto('/')
    await page.getByRole('button', {name: 'Login'}).click()

    await expect(page.getByRole('alert')).toHaveText(
    'Epic sadface: Username is required'
)
})

test('Login with empty username', async({page}) => {
    
    await page.goto('/')
    await page.getByPlaceholder('Password').fill('secret_sauce')
    await page.getByRole('button', {name: 'Login'}).click()

    await expect(page.getByRole('alert')).toHaveText(
    'Epic sadface: Username is required'
)
})

test('Login with empty password', async({page}) => {
    
    await page.goto('/')
    await page.getByPlaceholder('Username').fill('standard_user')
    await page.getByRole('button', {name: 'Login'}).click()

    await expect(page.getByRole('alert')).toHaveText(
    'Epic sadface: Password is required'
)
})