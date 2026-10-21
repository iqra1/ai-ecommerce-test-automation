import { expect, test } from '@playwright/test'

// Healer exercise: the original expected title ("Definitely Not SauceDemo")
// was intentionally incorrect. The page at https://www.saucedemo.com/
// actually sets its title to "Swag Labs" (confirmed via failure output:
// Expected: "Definitely Not SauceDemo", Received: "Swag Labs").
// Healed by correcting the expected value to the real application title.
test('healer practice - diagnose an intentionally incorrect title assertion', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')

    await expect(page).toHaveTitle('Swag Labs')
})
