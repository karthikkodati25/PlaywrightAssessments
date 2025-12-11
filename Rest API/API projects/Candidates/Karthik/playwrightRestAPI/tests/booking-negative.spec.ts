import { test, expect } from "@playwright/test";
import { createApiContext, createBooking, updateBooking } from "../../../Karthik/playwrightRestAPI/src/api/client";
test.describe("Negative Tests", () => {
    test("Create booking with invalid payload", async () => {
        const api = await createApiContext();
        const payload = { firstname: "OnlyName" }; // Missing required fields
        const resp = await createBooking(api, payload as any);
        expect(resp.status()).not.toBe(200);
        await api.dispose();
    });
    test("Update booking without token must fail", async () => {
        const api = await createApiContext();
        const resp = await updateBooking(api, 1, {
            firstname: "Test",
            lastname: "User",
            totalprice: 100,
            depositpaid: false,
            bookingdates: { checkin: "2025-01-01", checkout: "2025-01-02" }
        });
        expect([401, 403]).toContain(resp.status());
        await api.dispose();
    });
});