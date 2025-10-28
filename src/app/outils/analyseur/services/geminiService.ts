import { GoogleGenerativeAI } from '@google/generative-ai';
import type { AnalysisResult } from '../types';

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn('⚠️ Aucune clé NEXT_PUBLIC_GEMINI_API_KEY trouvée dans les variables d’environnement.');
}

const genAI = new GoogleGenerativeAI(API_KEY || '');

/**
 * Analyse une image de montre avec Gemini.
 * @param base64Image - L'image encodée en Base64
 * @param mimeType - Le type MIME du fichier (ex: image/jpeg)
 * @returns Un objet contenant le rapport d'analyse
 */
export async function analyzeWatchImage(base64Image: string, mimeType: string): Promise<AnalysisResult> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
Tu es un expert horloger suisse. Analyse cette montre et décris :
- le type de montre (mécanique, automatique, quartz)
- le style (classique, sportif, habillé, vintage, etc.)
- les matériaux visibles (boîtier, cadran, bracelet)
- les complications (date, chronographe, réserve de marche, etc.)
- les indices d’authenticité ou de contrefaçon
- une estimation de la valeur marchande approximative
- un résumé culturel ou historique s’il est identifiable
`;

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType,
          data: base64Image,
        },
      },
      { text: prompt },
    ]);

    const report = result.response?.text?.() || 'Aucun résultat reçu.';

    return { report };
  } catch (error: any) {
    console.error('Erreur Gemini:', error);
    throw new Error(error?.message || 'Erreur pendant l’analyse de la montre.');
  }
}
