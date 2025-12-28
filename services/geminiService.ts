
import { GoogleGenAI, Type } from "@google/genai";
import { Solution } from "../types";

export const solveLinearAlgebraProblem = async (
  base64Image: string,
  userPrompt: string
): Promise<Solution> => {
  // Initialize GoogleGenAI with apiKey from process.env.API_KEY directly
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `
    You are a meticulous Linear Algebra Professor and Computer Science researcher.
    Analyze the provided image containing a linear algebra problem.
    
    CRITICAL REQUIREMENT: Solve the problem in a rigorous mathematical way. 
    Do NOT just describe the steps (e.g., do not just say "find the determinant"). 
    Instead, you MUST show the actual calculations and derivations:
    - If performing Gaussian Elimination, show the specific row operations (e.g., R2 = R2 - 2R1) and the intermediate matrices.
    - If finding an Inverse, show the cofactor matrix or the augmented matrix steps.
    - If finding Eigenvalues, show the characteristic polynomial and the factoring process.
    - Use clear mathematical notation.
    
    1. Provide a detailed 'problemSummary'.
    2. In 'steps', include every mathematical derivation step with its numerical or algebraic result.
    3. Provide the 'finalResult' clearly.
    4. Provide a 'Computer Science Perspective' explaining how this specific topic is fundamental to AI/ML (e.g., Latent Semantic Analysis, Principal Component Analysis, or Graph Embeddings).
    
    Return the response strictly in JSON format matching the provided schema.
  `;

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      problemSummary: { type: Type.STRING, description: "Brief summary of what the problem is about." },
      steps: { 
        type: Type.ARRAY, 
        items: { type: Type.STRING },
        description: "List of logical, explicit mathematical steps with calculations."
      },
      finalResult: { type: Type.STRING, description: "The final numerical or algebraic answer." },
      csPerspective: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "Catchy title for the CS connection." },
          description: { type: Type.STRING, description: "Detailed explanation of the CS/AI relevance." },
          aiApplications: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "Specific AI use cases for this math concept."
          },
          algorithms: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "Famous algorithms that rely on this concept."
          }
        },
        required: ["title", "description", "aiApplications", "algorithms"]
      }
    },
    required: ["problemSummary", "steps", "finalResult", "csPerspective"]
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: {
        parts: [
          { text: userPrompt || "Solve the linear algebra problem in this image mathematically, showing all calculations and intermediate values." },
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Image.split(",")[1],
            },
          },
        ],
      },
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const result = JSON.parse(response.text || "{}");
    return result as Solution;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to solve the problem mathematically. Please ensure the image is clear.");
  }
};
