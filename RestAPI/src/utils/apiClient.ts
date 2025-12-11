import { APIRequestContext } from '@playwright/test';
export class ApiClient {
    private request: APIRequestContext;
    constructor(requestContext: APIRequestContext) {
        this.request = requestContext;
    }
    // Example: login via API (replace path/payload to match your real API)
    async loginApi(username: string, password: string) {
        // NOTE: Replace '/api/login' with the actual ParaBank API endpoint.
        const resp = await this.request.post('/api/login', {
            data: { username, password },
        });
        return resp;
    }
    // Example: get accounts
    async getAccounts() {
        // Replace '/api/accounts' with real endpoint
        return await this.request.get('/api/accounts');
    }
    // Example: fund transfer
    async transferFunds(payload: { fromAccountId: string; toAccountId: string; amount: number; }) {
        // Replace '/api/transfer' with real endpoint
        return await this.request.post('/api/transfer', { data: payload });
    }
}