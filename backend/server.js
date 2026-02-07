const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load env variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api", require("./routes/registrationRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

// Root test route (VERY IMPORTANT for Render)
app.get("/", (req, res) => {
  res.send("Event Registration Backend is running 🚀");
});

// Port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
