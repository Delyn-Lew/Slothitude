const debug = require("debug")("slothitude:controllers:api:classesController");
const Class = require("../../models/class");
const Booking = require("../../models/booking");

const create = async (req, res) => {
  try {
    const body = req.body;
    debug("body %o", body);
    const newClass = await Class.create(body);
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getAll = async (req, res) => {
  try {
    const classes = await Class.find();

    const populatedClasses = await Promise.all(
      classes.map(async (classItem) => {
        const bookings = await Booking.find({ classId: classItem._id }).select(
          "userId"
        );

        const bookedUsers = bookings.map((booking) => booking.userId);

        return {
          ...classItem.toJSON(),
          bookedUsers,
        };
      })
    );

    res.json(populatedClasses);
  } catch (error) {
    debug("Error fetching classes:", error);
    res.status(500).json({ error: "Server error" });
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

const deleteClass = async (req, res) => {
  try {
    const deletedClass = await Class.findByIdAndDelete(req.params.id);
    if (!deletedClass) {
      return res.status(404).json({ message: "Class not found" });
    }
    res
      .status(200)
      .json({ message: "Class deleted successfully", deletedClass });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getClassById = async (req, res) => {
  try {
    const classItem = await Class.findById(req.params.id);
    if (!classItem) {
      return res.status(404).json({ error: "Class not found" });
    }
    res.json(classItem);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  create,
  getAll,
  getBookedClasses,
  deleteClass,
  getClassById,
};
