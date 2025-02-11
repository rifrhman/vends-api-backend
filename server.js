require("dotenv").config();
const express = require("express");
const db = require("./src/config/database");
const authRoute = require("./src/routes/authRoutes");
const machineRoute = require("./src/routes/machineRoutes");

const app = express();
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/machines", machineRoute);

const PORT = process.env.PORT || 3300;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
