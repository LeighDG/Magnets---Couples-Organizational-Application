const jwt = require("jsonwebtoken");

module.exports = function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Missing or invalid Authorization header" });
    }

    const token = header.slice("Bearer ".length).trim();
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (!payload?.userId) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    req.user = { id: payload.userId };
    return next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
