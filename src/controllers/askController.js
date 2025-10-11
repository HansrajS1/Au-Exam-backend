import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY
});

export async function askAI(req, res) {
  const { messages } = req.body;
  const completion = await openai.chat.completions.create({
    model: "openai/gpt-4o",
    messages,
  });
  res.json(completion);
}
