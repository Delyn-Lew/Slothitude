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
    throw error;
  }
};

export const fetchUserBookings = async (userId) => {
  if (!userId) throw new Error("User ID is required to fetch bookings");
  try {
    log(`Fetching bookings for user: ${userId}`);
    const bookings = await bookingsAPI.getUserBookings(userId);
    log("Fetched user bookings: %o", bookings);
    return bookings;
  } catch (error) {
    log("Error fetching user bookings: %o", error);
    throw error;
  }
};

export const cancelBooking = async (classId, userId) => {
  try {
    log(`Canceling booking for classId: ${classId}, userId: ${userId}`);
    const response = await bookingsAPI.cancelBooking(classId, userId);
    log("Canceled booking: %o", response);
    return response;
  } catch (error) {
    log("Error canceling booking: %o", error);
    123;
    throw error;
  }
};
