// routes/auth.cjs
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const requireAuth = require("../middleware/requireAuth.cjs");

const prisma = new PrismaClient();
const router = express.Router();

function signToken(userId) {
  // userId will be a UUID string in the new schema
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

function normalizeEmail(email) {
  return String(email || "").toLowerCase().trim();
}

router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body || {};

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const normalizedEmail = normalizeEmail(email);

    const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (existing) return res.status(409).json({ message: "Email already in use" });

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        firstName: String(firstName).trim(),
        lastName: String(lastName).trim(),
        email: normalizedEmail,
        passwordHash,
      },
      select: { id: true, firstName: true, lastName: true, email: true, createdAt: true },
    });

    const token = signToken(user.id);
    return res.status(201).json({ token, user });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Signup failed" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const normalizedEmail = normalizeEmail(email);

    const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: "Invalid email or password" });

    const token = signToken(user.id);
    return res.json({
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Login failed" });
  }
});

// Optional but very useful for frontend:
// GET /auth/me
router.get("/me", requireAuth, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, firstName: true, lastName: true, email: true, createdAt: true },
    });

    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json({ user });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Failed to fetch user" });
  }
});

module.exports = router;
