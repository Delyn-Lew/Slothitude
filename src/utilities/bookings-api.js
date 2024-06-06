import sendRequest from "./send-request";

const BASE_URL = "/api/bookings";

export function createBooking(bookingData) {
  return sendRequest(`${BASE_URL}`, "POST", bookingData);
}

export function getBookings() {
  return sendRequest(BASE_URL);
}
