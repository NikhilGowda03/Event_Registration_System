const Registration = require("../models/Registration");
const { Parser } = require("json2csv");

// POST /api/register
exports.registerUser = async (req, res) => {
  try {
    const { eventId, name, email, phone } = req.body;

    // 1️⃣ Required field validation
    if (!eventId || !name || !email || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2️⃣ Name validation (letters + spaces, min 2 chars)
    if (!/^[A-Za-z ]{2,}$/.test(name)) {
      return res.status(400).json({
        message: "Name must contain only letters and spaces",
      });
    }

    // 3️⃣ Email validation
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({
        message: "Invalid email address",
      });
    }

    // 4️⃣ Phone validation (exactly 10 digits)
    if (!/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({
        message: "Phone number must be exactly 10 digits",
      });
    }

    // 5️⃣ Prevent duplicate registration for same event
    const alreadyRegistered = await Registration.findOne({
      eventId,
      email,
    });

    if (alreadyRegistered) {
      return res.status(409).json({
        message: "You are already registered for this event",
      });
    }

    // 6️⃣ Create registration
    await Registration.create({
      eventId,
      name,
      email,
      phone,
    });

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/registrations/:eventId
exports.getRegistrationsByEvent = async (req, res) => {
  try {
    const registrations = await Registration.find({
      eventId: req.params.eventId,
    });

    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/registrations/export/:eventId
exports.exportRegistrationsCSV = async (req, res) => {
  try {
    const { eventId } = req.params;

    const registrations = await Registration.find({ eventId }).lean();

    if (!registrations.length) {
      return res.status(404).json({ message: "No registrations found" });
    }

    const fields = ["name", "email", "phone"];
    const parser = new Parser({ fields });
    const csv = parser.parse(registrations);

    res.header("Content-Type", "text/csv");
    res.attachment("registrations.csv");
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/registrations/delete/:id
exports.deleteRegistration = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Registration.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Registration not found" });
    }

    res.json({ message: "Registration deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
