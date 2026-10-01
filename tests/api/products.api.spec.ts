import { test, expect } from '@playwright/test'

test('GET post by id', async ({ request }) => {
    
    const response = await request.get('/posts/1')
    expect(response.status()).toBe(200)
    const body = await response.json()
    expect(body.userId).toBe(1)
    expect(body.id).toBe(1)
})
test('POST create new post', async ({ request }) => {
    const response = await request.post('/posts', {
        data: {
            title: 'Playwright API Test - Iqra',
            body: 'First post created using Playwright API testing',
            userId: 1
        }
    })
    expect(response.status()).toBe(201)
    const body = await response.json()
    expect(body.title).toBe('Playwright API Test - Iqra')
    expect(body.body).toBe('First post created using Playwright API testing')
    expect(body.userId).toBe(1)
})

test('POST should handle missing title', async ({ request }) => {
    const response = await request.post('/posts', {
        data: {
            body: 'Post without a title',
            userId: 1
        }
    })
    expect(response.status()).toBe(201)
    const body = await response.json()
    expect(body.title).toBeUndefined()
    expect(body.body).toBe('Post without a title')
    expect(body.userId).toBe(1)
    expect(body.id).toBeDefined()

})

test('PUT: Update an existing post', async ({ request }) => {
    const response = await request.put('/posts/1', {
        data: {
            title: 'Updated Title',
            body: 'Updated body content',
            userId: 1
        }
    })
    expect(response.status()).toBe(200)
    const body = await response.json()
    expect(body.title).toBe('Updated Title')
    expect(body.body).toBe('Updated body content')
    expect(body.userId).toBe(1)
    expect(body.id).toBe(1)
})

test('DELETE: Delete a post', async ({ request }) => {
    const response = await request.delete('/posts/1')
    expect(response.status()).toBe(200)
    const body = await response.json()
    expect(body).toEqual({})
})  