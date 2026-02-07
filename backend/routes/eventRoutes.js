const express = require("express");
const router = express.Router();

const {
  createEvent,
  getEvents,
  getEventById,
  deleteEvent,
} = require("../controllers/eventController");

const auth = require("../middleware/authMiddleware");

// Public
router.get("/", getEvents);
router.get("/:id", getEventById);

// Admin
router.post("/", auth, createEvent);
router.delete("/:id", auth, deleteEvent);

module.exports = router;
