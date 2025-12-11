import { test, expect } from "@playwright/test";
import {
    createApiContext,
    createAuthToken,
    createBooking,
    getBookingById,
    updateBooking,
    partialUpdateBooking,
    deleteBooking,
} from "../../src/api/client";
test.describe("Booking CRUD Flow", () => {
    let api: any;
    let bookingId: number;
    let token: string;
    test.beforeAll(async () => {
        api = await createApiContext();
        const { body } = await createAuthToken(api);
        token = body.token;
    });
    test.afterAll(async () => {
        await api.dispose();
    });
    test("1️⃣ Create Booking (POST)", async () => {
        const bookingPayload = {
            firstname: "John",
            lastname: "Doe",
            totalprice: 150,
            depositpaid: true,
            bookingdates: {
                checkin: "2025-01-01",
                checkout: "2025-01-05",
            },
            additionalneeds: "Breakfast",
        };
        const resp = await createBooking(api, bookingPayload);
        const body = await resp.json();
        expect(resp.status()).toBe(200);
        bookingId = body.bookingid;
    });
    test("2️⃣ Get Booking by ID (GET)", async () => {
        const resp = await getBookingById(api, bookingId);
        expect(resp.status()).toBe(200);
    });
    test("3️⃣ Update Booking (PUT)", async () => {
        const updated = {
            firstname: "Jane",
            lastname: "Smith",
            totalprice: 200,
            depositpaid: false,
            bookingdates: {
                checkin: "2025-02-01",
                checkout: "2025-02-10",
            },
        };
        const resp = await updateBooking(api, bookingId, updated, token);
        expect(resp.status()).toBe(200);
    });
    test("4️⃣ Partial Update (PATCH)", async () => {
        const partial = { firstname: "Pat" };
        const resp = await partialUpdateBooking(api, bookingId, partial, token);
        expect(resp.status()).toBe(200);
    });
    test("5️⃣ Delete Booking (DELETE)", async () => {
        const resp = await deleteBooking(api, bookingId, token);
        expect([200, 201, 204]).toContain(resp.status());
    });
});