import { GoogleGenerativeAI } from "@google/generative-ai";

// ⚠️ YOUR REAL KEY
const API_KEY = "AIzaSyAQGt_vCtA-kayQTgYlVvCiS0ZZ4quaTNs";

const genAI = new GoogleGenerativeAI(API_KEY);

export const generateJobDescription = async (formData) => {
  try {
    // FIX: Use "gemini-flash-latest" (Verified to work for you)
    // FIX: Use "application/json" (Forces strict data format)
    const model = genAI.getGenerativeModel({
      model: "gemini-flash-latest",
      generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `
      Act as a Senior HR Specialist. Write a modern Job Description.

      **CONTEXT:**
      - Role: ${formData.title} at ${formData.company}
      - Industry: ${formData.industry}
      - Experience: ${formData.experience}
      - Culture: ${formData.culture}
      - Key Skills: ${formData.skills.join(", ")}
      - Special Req: ${formData.requirements || "None"}

      **INSTRUCTIONS:**
      1. **Variation A (Quick Read):** Concise, punchy, under 300 words. Perfect for LinkedIn.
      2. **Variation B (Deep Dive):** Comprehensive, detailed, 800+ words. Perfect for the official career page.

      **FORMATTING RULES:**
      - Use '### ' (H3) for ALL section headers.
      - Use bullet points for lists.

      **REQUIRED OUTPUT STRUCTURE (JSON):**
      {
        "variationA": "Markdown string...",
        "variationB": "Markdown string...",
        "seoKeywords": ["Tag1", "Tag2", "Tag3", "Tag4", "Tag5"],
        "estimatedSalary": "$120k - $140k",
        "diversityScore": 95,
        "readabilityScore": "Grade 8 (Easy to Read)",
        "diversityNotes": "Positive, gender-neutral language used."
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    // Parse the JSON response
    return JSON.parse(response.text());

  } catch (error) {
    console.error("AI Error:", error);
    throw new Error("AI Generation failed. Please try again.");
  }
};