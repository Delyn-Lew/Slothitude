const express = require("express");
const router = express.Router();
const classesCtrl = require("../../controllers/api/classesController");
const bookingsCtrl = require("../../controllers/api/bookingsController");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

router.post("/", [ensureLoggedIn], classesCtrl.create);
router.get("/", [ensureLoggedIn], classesCtrl.getAll);
router.get("/booked", [ensureLoggedIn], classesCtrl.getBookedClasses);
router.get("/:id", [ensureLoggedIn], classesCtrl.getClassById);
router.delete("/:id", [ensureLoggedIn], classesCtrl.deleteClass);

router.post("/book/:classId", [ensureLoggedIn], bookingsCtrl.create);
router.get("/user/bookings", [ensureLoggedIn], bookingsCtrl.getByUser);
module.exports = router;
