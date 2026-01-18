require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.cjs");
const relationshipRoutes = require("./routes/relationship.cjs");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.get("/health", (req, res) => res.json({ status: "OK" }));

app.use("/auth", authRoutes);
app.use("/relationship", relationshipRoutes);

app.listen(3000, () => console.log("API running on http://localhost:3000"));
