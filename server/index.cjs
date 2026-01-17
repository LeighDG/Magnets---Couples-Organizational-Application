require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.cjs");

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/health", (req, res) => res.json({ status: "OK" }));

app.use("/auth", authRoutes);

app.listen(3000, () => console.log("API running on http://localhost:3000"));