require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000"
}));
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Smart Startup Builder API is running" });
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/startups", require("./routes/startups"));

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    if (!process.env.MONGODB_URI || !process.env.JWT_SECRET ||
        process.env.JWT_SECRET.length < 32) {
      throw new Error("Set MONGODB_URI and a JWT_SECRET of at least 32 characters in backend/.env");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Backend running at http://localhost:${PORT}`);
      console.log("Health check: http://localhost:5000/api/health");
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
}

startServer();
