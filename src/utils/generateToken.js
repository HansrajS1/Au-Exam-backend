import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const payload = { app: "postman" };
const token = jwt.sign(payload, process.env.APP_SECRET, { expiresIn: "365d" });

console.log("Your JWT token is:\n");
console.log(token);