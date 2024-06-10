const debug = require("debug")("slothitude:controllers:api:bookingsController");
const Booking = require("../../models/booking");
const Class = require("../../models/class");

const create = async (req, res) => {
  try {
    const bookingData = req.body;
    const { classId, userId } = bookingData;

    const classItem = await Class.findById(classId);
    if (!classItem) {
      return res.status(404).json({ error: "Class not found" });
    }

    const bookingCount = await Booking.countDocuments({ classId });
    if (bookingCount >= classItem.capacity) {
      return res.status(400).json({ error: "Class is fully booked" });
    }

    const existingBooking = await Booking.findOne({ classId, userId });
    if (existingBooking) {
      return res
        .status(400)
        .json({ error: "You have already booked this class" });
    }

    debug("Received booking data: %o", bookingData);
    const newBooking = await Booking.create(bookingData);
    res.status(201).json(newBooking);
  } catch (error) {
    debug("Error creating booking: %o", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getByUser = async (req, res) => {
  try {
    const { id: userId } = req.params;
    debug("Fetching bookings for user: %s", userId);
    const bookings = await Booking.find({ userId }).populate("classId");
    debug("Fetched bookings: %o", bookings);
    res.status(200).json(bookings);
  } catch (error) {
    debug("Error fetching bookings for user: %o", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getBookedClasses = async (req, res) => {
  try {
    const bookedClasses = await Class.find({ bookedCount: { $gt: 0 } });
    res.status(200).json(bookedClasses);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const { classId, userId } = req.params;
    debug("Canceling booking for classId: %s, userId: %s", classId, userId);
    const booking = await Booking.findOneAndDelete({ classId, userId });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ message: "Booking canceled successfully" });
  } catch (error) {
    debug("Error canceling booking: %o", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  create,
  getByUser,
  getBookedClasses,
  cancelBooking,
};
