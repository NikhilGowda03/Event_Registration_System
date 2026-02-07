const express = require("express");
const router = express.Router();

const {
  registerUser,
  getRegistrationsByEvent,
  exportRegistrationsCSV,
  deleteRegistration
} = require("../controllers/registrationController");

const auth = require("../middleware/authMiddleware");

//  PUBLIC: User registers for event
router.post("/register", registerUser);

// 🔒 ADMIN ONLY: Export registrations CSV
router.get("/registrations/export/:eventId",auth,exportRegistrationsCSV);

// 🔒 ADMIN ONLY: View registrations
router.get("/registrations/:eventId",auth,getRegistrationsByEvent);

// 🔒 ADMIN ONLY: Delete registration
router.delete(
  "/registrations/delete/:id",auth,deleteRegistration);

module.exports = router;
