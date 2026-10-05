const express = require("express");
const courseRoutes = require("./routes/courseRoutes");

const app = express();
const PORT = 3000;

// Middleware for parsing JSON requests
app.use(express.json());

// Routes
app.use("/api/courses", courseRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: "Endpoint not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});