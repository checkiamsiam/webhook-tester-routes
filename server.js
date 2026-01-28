const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to enable CORS from everywhere
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// GET route
app.get("/webhook", (req, res) => {
  console.log("=== GET Request ===");
  console.log("Query Params:", req.query);
  console.log("Headers:", req.headers);
  console.log("==================\n");

  const response = {
    success: true,
    message: "GET webhook received",
    timestamp: new Date().toISOString(),
    query: req.query,
  };

  console.log("Response:", response);
  console.log("==================\n");

  res.json(response);
});

// POST route
app.post("/webhook", (req, res) => {
  console.log("=== POST Request ===");
  console.log("Request Body:", req.body);
  console.log("Headers:", req.headers);
  console.log("===================\n");

  const response = {
    success: true,
    message: "POST webhook received",
    timestamp: new Date().toISOString(),
    receivedData: req.body,
  };

  console.log("Response:", response);
  console.log("===================\n");

  res.json(response);
});

// Start server (only when running locally, not on Vercel)

app.listen(PORT, () => {
  console.log(`🚀 Webhook test server running on http://localhost:${PORT}`);
  console.log(`GET endpoint: http://localhost:${PORT}/webhook`);
  console.log(`POST endpoint: http://localhost:${PORT}/webhook`);
});

// Export for Vercel
module.exports = app;
