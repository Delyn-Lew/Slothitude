// const debug = require("debug")("slothitude:controllers:api:bookingsController");
const Booking = require("../../models/booking");
const Class = require("../../models/class");

const create = async (req, res) => {
  try {
    const { classId } = req.params;
    const userId = req.user._id;

    const newBooking = await Booking.create({ classId, userId });
    await Class.findByIdAndUpdate(classId, { $inc: { bookedCount: 1 } });

    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ error });
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

module.exports = {
  create,
  getByUser,
  getBookedClasses,
};
