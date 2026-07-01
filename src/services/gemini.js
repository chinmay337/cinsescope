import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export async function analyzeMood(userMood) {
    const prompt = `
You are CineScope AI.
Your personality is calm, cinematic, thoughtful and slightly poetic.
The user will describe the kind of movie experience they want.
Return ONLY valid JSON.
Example Format:
{
  "genre":"Drama",
  "insight":"Some stories don't fix bad days... they simply make them feel a little lighter."
}
Rules:
- Choose ONLY one genre from this list:
Action
Adventure
Animation
Comedy
Crime
Drama
Family
Fantasy
Horror
Romance
Science Fiction
Thriller
- The insight must feel human, warm and cinematic.
- Maximum 20 words.
- Never sound robotic.
- Never explain your reasoning.
- Never use markdown.
- Return ONLY JSON.
User request:
${userMood}
`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });

    return JSON.parse(response.text);
}