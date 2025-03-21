import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100, // 100 requests per 15 min
  message: "Too many requests from this IP, please try again later.",
});
