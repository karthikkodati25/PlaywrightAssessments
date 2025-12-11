import {test,expect} from '@playwright/test';

const BASE_URL = 'https://restful-booker.herokuapp.com';

test.describe('Sample API Tests', () => {
    test('GET /posts - should return a list of posts', async ({request}) => {           
        const response = await request.get(`${BASE_URL}/booking`);
      console.log(response.json);
        expect(response.status()).toBe(200);
        const posts = await response.json();
        expect(Array.isArray(posts)).toBe(true);
        expect(posts.length).toBeGreaterThan(0);
    }
)

test("Get API Call", async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts/1`);
    expect(response.status()).toBe(200);
    const post = await response.json();
    expect(post).toHaveProperty('id', 1);
})

});

