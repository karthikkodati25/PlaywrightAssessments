import { request } from "@playwright/test";
import { ENDPOINTS } from "./endpoints";
export type Booking = {
    firstname: string;
    lastname: string;
    totalprice: number;
    depositpaid: boolean;
    bookingdates: { checkin: string; checkout: string };
    additionalneeds?: string;
};
export async function createApiContext() {
    return request.newContext({
        baseURL: "https://restful-booker.herokuapp.com",
        extraHTTPHeaders: { "Content-Type": "application/json" },
    });
}
export async function createAuthToken(apiContext: any, username = "admin", password = "password123") {
    const resp = await apiContext.post(ENDPOINTS.AUTH, {
        data: { username, password },
    });
    const body = await resp.json();
    return { resp, body };
}
export async function createBooking(apiContext: any, booking: Booking) {
    return apiContext.post(ENDPOINTS.BOOKINGS, { data: booking });
}
export async function getBookingById(apiContext: any, id: number) {
    return apiContext.get(ENDPOINTS.BOOKING_BY_ID(id));
}
export async function updateBooking(apiContext: any, id: number, booking: Booking, token?: string) {
    const headers: any = {};
    if (token) headers["Cookie"] = `token=${token}`;
    return apiContext.put(ENDPOINTS.BOOKING_BY_ID(id), { data: booking, headers });
}
export async function partialUpdateBooking(apiContext: any, id: number, partial: Partial<Booking>, token?: string) {
    const headers: any = {};
    if (token) headers["Cookie"] = `token=${token}`;
    return apiContext.patch(ENDPOINTS.BOOKING_BY_ID(id), { data: partial, headers });
}
export async function deleteBooking(apiContext: any, id: number, token?: string) {
    const headers: any = {};
    if (token) headers["Cookie"] = `token=${token}`;
    return apiContext.delete(ENDPOINTS.BOOKING_BY_ID(id), { headers });
}