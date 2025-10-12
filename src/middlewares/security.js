import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const ALLOWED_ORIGINS = [
  "https://auexamweb.netlify.app",
  "http://localhost:5173",
  "https://auexamapp.tech"
];

export const securityMiddleware = (req, res, next) => {
  const origin = req.headers.origin || "";
  const referer = req.headers.referer || "";
  const ua = (req.headers["user-agent"] || "").toLowerCase();
  const token = req.headers["x-app-token"];

  if (req.path === "/" || req.path === "/health") {
    return next();
  }

  if (
    ALLOWED_ORIGINS.includes(origin) ||
    ALLOWED_ORIGINS.some(o => referer.startsWith(o))
  ) {
    return next();
  }

  if (!origin && ua.includes("okhttp")) {
    return next();
  }

  if (ua.includes("postman") || ua.includes("curl")) {
    if (!token) {
      return res.status(403).json({ error: "Missing token" });
    }
    try {
      jwt.verify(token, process.env.APP_SECRET);
      return next();
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
  }

  return res.status(403).json({ error: "Access denied" });
};
