// const apiKey = "AQ.Ab8RN6KXiY-MXU1ihQtZ7uL9r00k9Bc_3OJxw2jSeBow-897Kw";

import { GoogleGenAI } from "@google/genai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL_NAME = "gemini-3.6-flash";

const ai = new GoogleGenAI({
    apiKey: API_KEY,
});

async function runChat(prompt) {
     try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);

    if (error?.status === 503 || error?.code === 503) {
      return "Gemini is temporarily busy. Please try again in a few seconds.";
    }

    return "Something went wrong while contacting Gemini.";
  }
}

export default runChat;
