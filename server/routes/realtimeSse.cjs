// server/routes/realtimeSse.cjs
const express = require("express");
const jwt = require("jsonwebtoken");
const realtime = require("../realtime/realtime.cjs");

const router = express.Router();

/**
 * GET /realtime/stream?token=JWT
 * EventSource can't set Authorization headers, so we pass JWT in query string.
 */
router.get("/stream", (req, res) => {
  try {
    const token = String(req.query.token || "").trim();
    if (!token) return res.status(401).end();

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const userId = payload?.userId;
    if (!userId) return res.status(401).end();

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders?.();

    realtime.addSubscriber(userId, res);

    // Initial event
    res.write(`event: connected\ndata: ${JSON.stringify({ ok: true })}\n\n`);

    // Keepalive ping
    const ping = setInterval(() => {
      res.write(`event: ping\ndata: ${JSON.stringify({ t: Date.now() })}\n\n`);
    }, 25000);

    req.on("close", () => {
      clearInterval(ping);
      realtime.removeSubscriber(userId, res);
    });
  } catch (e) {
    return res.status(401).end();
  }
});

module.exports = router;
