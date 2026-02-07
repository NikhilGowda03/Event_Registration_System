const mongoose = require("mongoose");

const RegistrationSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true
  },
  name: String,
  email: String,
  phone: String
});

RegistrationSchema.index({ eventId: 1, email: 1 }, { unique: true });

module.exports = mongoose.model("Registration", RegistrationSchema);
