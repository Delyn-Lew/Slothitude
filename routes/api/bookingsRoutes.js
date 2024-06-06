const express = require("express");
const router = express.Router();
const bookingsCtrl = require("../../controllers/api/bookingsController");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

router.post("/", [ensureLoggedIn], bookingsCtrl.create);
router.get("/user/:id", [ensureLoggedIn], bookingsCtrl.getByUser);

module.exports = router;
