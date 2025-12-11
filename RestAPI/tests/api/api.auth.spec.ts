import { test, expect } from '@playwright/test';
import { ApiClient } from '../../src/utils/apiClient';
import { testUser } from '../../src/utils/testData';
test.describe('API - Auth', () => {
    test('login via API', async ({ request }) => {
        const api = new ApiClient(request);
        const res = await api.loginApi(testUser.username, testUser.password);
        expect(res.ok()).toBeTruthy();
        // If the response returns JSON token:
        const json = await res.json().catch(() => null);
        if (json) {
            console.log('login response:', json);
        }
    });
});