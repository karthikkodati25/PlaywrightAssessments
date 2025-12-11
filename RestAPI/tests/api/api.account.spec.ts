import { test, expect } from '@playwright/test';
import { ApiClient } from '../../src/utils/apiClient';
test('get accounts via API', async ({ request }) => {
    const api = new ApiClient(request);
    const res = await api.getAccounts();
    expect(res.ok()).toBeTruthy();
    const body = await res.json().catch(() => null);
    console.log('accounts:', body);
});