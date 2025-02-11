require("dotenv").config();
const express = require("express");
const db = require("./src/config/database");
const authRoute = require("./src/routes/authRoutes");

const app = express();
app.use(express.json());

app.use("/api/auth", authRoute);

const PORT = process.env.PORT || 3300;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
