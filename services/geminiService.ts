
import { GoogleGenAI, Type } from "@google/genai";
import { RiskIndicator, Language, AnalysisSummary } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || '' });
  }

  async analyzeRisk(indicators: RiskIndicator[], lang: Language = 'en', scenarioPrompt?: string): Promise<AnalysisSummary | null> {
    const langName = lang === 'ko' ? 'Korean' : 'English';
    const scenarioContext = scenarioPrompt
      ? `[BLACK SWAN SCENARIO TRIGGERED: ${scenarioPrompt}] - Re-calculate all risks assuming this event has just started.`
      : "Standard current market analysis.";

    const prompt = `
      Act as Michael Burry. Analyze these 7 unconventional global crisis indicators and the context below.
      Context: ${scenarioContext}
      Data: ${JSON.stringify(indicators.map(i => ({ title: i.title[lang], value: i.value, logic: i.logic[lang] })))}

      Requirements:
      1. Deep contrarian summary in ${langName}.
      2. Identify the 'Fracture Point' in ${langName}.
      3. Suggest 3-4 'Counter-Move Strategies' in ${langName}.
      4. "simpleStatus" - a high-impact sentence for non-experts in ${langName}.
      5. "simulationLog" - 5 short terminal-style log lines (e.g. "Liquidity drain detected in Tier-1 banks...") in ${langName}.
      6. "fractureHeatmap" - 4 sectors (e.g. Real Estate, Derivatives, Tech, Crypto) with risk (0-100) and status in ${langName}.
      
      Output MUST be JSON.
    `;

    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              overallRisk: { type: Type.STRING },
              score: { type: Type.NUMBER },
              simpleStatus: { type: Type.STRING },
              executiveSummary: { type: Type.STRING },
              topThreats: { type: Type.ARRAY, items: { type: Type.STRING } },
              contrarianInsight: { type: Type.STRING },
              strategies: { type: Type.ARRAY, items: { type: Type.STRING } },
              simulationLog: { type: Type.ARRAY, items: { type: Type.STRING } },
              fractureHeatmap: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    sector: { type: Type.STRING },
                    risk: { type: Type.NUMBER },
                    status: { type: Type.STRING }
                  }
                }
              }
            },
            required: ["overallRisk", "score", "simpleStatus", "executiveSummary", "topThreats", "contrarianInsight", "strategies", "simulationLog", "fractureHeatmap"]
          }
        }
      });

      return JSON.parse(response.text);
    } catch (error) {
      console.error("Gemini Analysis Error:", error);
      return null;
    }
  }
}
