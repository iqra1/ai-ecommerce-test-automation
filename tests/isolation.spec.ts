
import { test, expect } from '@playwright/test'

test('create, verify and clean up a product', async ({ request }) => {
    let productId: number | undefined

    try {
        const uniqueName = `Isolation Product ${Date.now()}`

        // 1. Create a product
        const response = await request.post('/products', {
            data: {
                name: uniqueName,
                price: 10
            }
        })

        expect(response.status()).toBe(201)

        const product = await response.json()
        productId = product.id

        // 2. Verify the created product
        const getResponse = await request.get(`/products/${productId}`)

        expect(getResponse.status()).toBe(200)

        const savedProduct = await getResponse.json()
        expect(savedProduct.name).toBe(uniqueName)

    } finally {
        if (productId !== undefined) {
            // 3. Clean up
            const deleteResponse = await request.delete(`/products/${productId}`)
            expect(deleteResponse.status()).toBe(200)

            // 4. Verify deletion
            const verifyDeleteResponse = await request.get(`/products/${productId}`)
            expect(verifyDeleteResponse.status()).toBe(404)
        }
    }
})
