export const ENDPOINTS = {
 AUTH: "/auth",
 BOOKINGS: "/booking",
 BOOKING_BY_ID: (id: number | string) => `/booking/${id}`,
};