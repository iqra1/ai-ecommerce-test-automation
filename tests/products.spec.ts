import {test, expect} from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { ProductsPage } from '../pages/ProductsPage'

test('products page should display products', async({page}) => {

    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login('standard_user', 'secret_sauce')
    await expect(page.getByText('Products')).toBeVisible()

})

test('user can view backpack product details', async ({ page }) => {

    const loginPage = new LoginPage(page)
    const productsPage = new ProductsPage(page)

    await loginPage.goto()
    await loginPage.login('standard_user', 'secret_sauce')
    await productsPage.openProduct('Sauce Labs Backpack')
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible()
    await expect(page.getByText('carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.')).toBeVisible()
    await expect(page.getByText('$29.99')).toBeVisible()
    await expect(page).toHaveURL(/.*inventory-item.html\?id=4/)
})