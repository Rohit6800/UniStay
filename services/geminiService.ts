
import { GoogleGenAI, Type } from "@google/genai";

// Strictly following Google GenAI SDK initialization guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIRentAdvice = async (budget: number, location: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `I am looking for a student room in ${location} with a budget of ${budget} INR per month. 
      What is the average market rent there? Give me 3 tips for negotiating with landlords in this area.
      Keep it brief and helpful for a student.`,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    // Accessing .text property directly as per guidelines
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Unable to get AI advice at the moment. Market average for students is usually 5000-8000 INR.";
  }
};

export const parseAIQuery = async (query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Extract search parameters from this student query: "${query}". 
      Return JSON with budget (number), roomType (Single/Sharing/PG), genderPref (Girls/Boys/Co-ed), and location (string).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            budget: { type: Type.NUMBER },
            roomType: { type: Type.STRING },
            genderPref: { type: Type.STRING },
            location: { type: Type.STRING }
          }
        }
      }
    });
    // Accessing .text property directly and trimming before parsing
    const jsonStr = response.text?.trim() || '{}';
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Parsing Query Error:", error);
    return null;
  }
};
