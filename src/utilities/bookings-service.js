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

export const cancelBooking = async (classId, userId) => {
  try {
    const response = await fetch(`/api/bookings/${classId}/${userId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to cancel booking");
    }

    return await response.json();
  } catch (error) {
    throw new Error("Error canceling booking:", error);
  }
};
