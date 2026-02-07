const Event = require("../models/Event");
const Registration = require("../models/Registration");

exports.createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getEvents = async (req, res) => {
  const events = await Event.find();
  res.json(events);
};

exports.getEventById = async (req, res) => {
  const event = await Event.findById(req.params.id);
  res.json(event);
};
// DELETE /api/events/:id

exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    //  delete all registrations linked to this event
    await Registration.deleteMany({ eventId: id });

    //  delete the event itself
    await Event.findByIdAndDelete(id);

    res.json({ message: "Event and related registrations deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};