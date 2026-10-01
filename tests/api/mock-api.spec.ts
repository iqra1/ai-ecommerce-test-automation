import { test, expect } from '@playwright/test'

test('create product through API', async ({ request }) => {

    const response = await request.post('http://localhost:3001/products', {
        data: {
            name: 'API Test Product 2',
            price: 80.99
        }
    })

    expect(response.status()).toBe(201)

    const body = await response.json()

    expect(body.name).toBe('API Test Product 2')
    expect(body.price).toBe(80.99)

    console.log(body)
})