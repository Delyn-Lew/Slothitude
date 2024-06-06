const express = require("express");
const router = express.Router();
const classesCtrl = require("../../controllers/api/classesController");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

router.post("/", [ensureLoggedIn], classesCtrl.create);
router.get("/", [ensureLoggedIn], classesCtrl.getAll);
router.get("/booked", [ensureLoggedIn], classesCtrl.getBookedClasses);
router.delete("/:id", [ensureLoggedIn], classesCtrl.deleteClass);

module.exports = router;
