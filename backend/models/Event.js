const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  date: {
    type: Date,
    required: true
  },
  time:{type:String,
    required:true
  },
  location: String
});

module.exports = mongoose.model("Event", EventSchema);
