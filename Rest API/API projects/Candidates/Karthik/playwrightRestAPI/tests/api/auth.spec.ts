import { test, expect } from "@playwright/test";
import { createApiContext, createAuthToken } from "../../src/api/client";
test.describe("Auth API", () => {
    test("Generate token using valid credentials", async () => {
        const api = await createApiContext();
        const { resp, body } = await createAuthToken(api);
        expect(resp.status()).toBe(200);
        expect(body.token).toBeTruthy();
        await api.dispose();
    });
    test("Token generation fails for invalid credentials", async () => {
        const api = await createApiContext();
        const { resp, body } = await createAuthToken(api, "wrong", "wrong");
        expect(body.token).toBeUndefined();
        await api.dispose();
    });
});