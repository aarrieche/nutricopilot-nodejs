const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./config/db");

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

const API_PREFIX = "/api/v1";

const patientsRoutes = require("./routes/patientsRoutes");
const dietsRoutes = require("./routes/dietsRoutes");
const mealsRoutes = require("./routes/mealsRoutes");
const aiRoutes = require("./routes/aiRoutes");
const pdfRoutes = require("./routes/pdfRoutes");

app.use(`${API_PREFIX}/patients`, patientsRoutes);
app.use(`${API_PREFIX}/diets`, dietsRoutes);
app.use(`${API_PREFIX}/meals`, mealsRoutes);
app.use(`${API_PREFIX}/ai`, aiRoutes);
app.use(`${API_PREFIX}/pdf`, pdfRoutes);

app.get("/", (req, res) => {
  res.json({ message: "NutriCopilot API is running" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
