import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const getGeminiAPIResponse = async (message) => {
  try {
    const result = await model.generateContent(message);
    // Extract text safely
    return result.response.text();
  } catch (err) {
    console.error("Gemini API Error:", err);
    return "Sorry, I couldn't generate a response.";
  }
};

export default getGeminiAPIResponse;