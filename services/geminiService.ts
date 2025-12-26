
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const analyzeAccidentBatch = async (descriptions: string[]) => {
  if (!API_KEY) {
    console.error("Gemini API key is missing");
    return null;
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analisar a seguinte lista de relatos de acidentes e retornar um JSON com a classificação (Motivo), uma justificativa curta para a IA ter escolhido essa categoria e um score de confiança (0-1).
      
      Relatos:
      ${descriptions.join("\n")}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              motivo: { type: Type.STRING },
              justificativa: { type: Type.STRING },
              score: { type: Type.NUMBER },
              validity: { type: Type.STRING, description: "Válido, Atenção ou Inválido" }
            },
            required: ["motivo", "justificativa", "score", "validity"]
          }
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini analysis failed:", error);
    return null;
  }
};
