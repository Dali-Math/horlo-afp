import { GoogleGenerativeAI } from '@google/generative-ai';
import type { AnalyseResult } from '../types';

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
if (!API_KEY) {
  throw new Error('NEXT_PUBLIC_GEMINI_API_KEY environment variable is not set.');
}

const ai = new GoogleGenerativeAI(API_KEY);

// On privilégie le modèle “latest” (plus tolérant côté API)
const MODEL_ID = 'gemini-1.5-flash-latest';

const PROMPT = `Vous êtes un expert en horlogerie de renommée mondiale... (texte identique à ta version)`;

export async function analyzeWatchImage(
  base64Image: string,
  mimeType: string
): Promise<AnalyseResult> {
  try {
    const model = ai.getGenerativeModel({ model: MODEL_ID });

    const result = await model.generateContent([
      {
        inlineData: {
          data: base64Image,
          mimeType,
        },
      },
      { text: PROMPT },
    ]);

    const text = result.response.text();
    if (!text) throw new Error('API returned no text in response.');
    return { analysis: text };
  } catch (err: any) {
    // Fallback propre si un modèle “latest” n’est pas dispos
    if (String(err?.message || '').includes('404') || String(err).includes('not found')) {
      const fallback = ai.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const res2 = await fallback.generateContent([
        { inlineData: { data: base64Image, mimeType } },
        { text: PROMPT },
      ]);
      const txt2 = res2.response.text();
      if (!txt2) throw new Error('API returned no text in response (fallback).');
      return { analysis: txt2 };
    }
    console.error('Erreur analyse IA :', err);
    throw new Error(`Failed to analyze watch: ${err?.message || 'Unknown error'}`);
  }
}
