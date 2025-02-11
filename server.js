// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/bookstore");

const buyerSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: String,
  bookTitle: String,
});

const Buyer = mongoose.model("Buyer", buyerSchema);

// API route to save buyer data
app.post("/submit", async (req, res) => {
  try {
    const newBuyer = new Buyer(req.body);
    await newBuyer.save();
    res.status(201).json({ message: "Data saved successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error saving data", error });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
