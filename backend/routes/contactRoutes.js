const express = require("express");
const { sendMessage } = require("../controllers/contactController");;
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/send", protect, sendMessage);

module.exports = router;
