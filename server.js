const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

// Basic Auth credentials (use environment variables in production)
const AUTH_USERNAME = process.env.AUTH_USERNAME || "admin";
const AUTH_PASSWORD = process.env.AUTH_PASSWORD || "password123";

// Middleware to enable CORS from everywhere
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Basic Authentication Middleware
const basicAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    res.set("WWW-Authenticate", 'Basic realm="Webhook API"');
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  // Extract and decode credentials
  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "utf-8",
  );
  const [username, password] = credentials.split(":");

  // Verify credentials
  if (username === AUTH_USERNAME && password === AUTH_PASSWORD) {
    next(); // Authentication successful, proceed to route
  } else {
    res.set("WWW-Authenticate", 'Basic realm="Webhook API"');
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }
};

// GET route (protected with basic auth)
app.get("/webhook", basicAuth, (req, res) => {
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

// POST route (protected with basic auth)
app.post("/webhook", basicAuth, (req, res) => {
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
