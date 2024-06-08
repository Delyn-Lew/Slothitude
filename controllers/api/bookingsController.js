const debug = require("debug")("slothitude:controllers:api:bookingsController");
const Booking = require("../../models/booking");
const Class = require("../../models/class");

const create = async (req, res) => {
  try {
    const bookingData = req.body;
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
    const bookings = await Booking.find({ userId: req.user._id }).populate(
      "classId"
    );
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getBookedClasses = async (req, res) => {
  try {
    const bookedClasses = await Class.find({ bookedCount: { $gt: 0 } });
    res.status(200).json(bookedClasses);
  } catch (error) {
    res.status(500).json({ error });
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
