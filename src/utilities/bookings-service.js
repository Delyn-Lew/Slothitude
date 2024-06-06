import debug from "debug";
import * as bookingsAPI from "./bookings-api";

const log = debug("slothitude:utilities:bookings-service");

export const createBooking = async (bookingData) => {
  try {
    log("Creating booking with data: %o", bookingData);
    const createdBooking = await bookingsAPI.createBooking(bookingData);
    log("Created booking: %o", createdBooking);
    return createdBooking;
  } catch (error) {
    log("Error creating booking: %o", error);
    throw error;
  }
};

export const getBookings = async () => {
  try {
    log("Fetching bookings");
    const bookings = await bookingsAPI.getBookings();
    log("Fetched bookings: %o", bookings);
    return bookings;
  } catch (error) {
    log("Error fetching bookings: %o", error);
  }
};
