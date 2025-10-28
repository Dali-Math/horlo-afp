import { GoogleGenerativeAI } from '@google/generative-ai';
import type { AnalyseResult } from '../types';

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error('❌ NEXT_PUBLIC_GEMINI_API_KEY environment variable is not set.');
}

const ai = new GoogleGenerativeAI(API_KEY);

// Ordre de priorité des modèles compatibles
const MODELS = [
  'gemini-1.5-flash',
  'gemini-1.5-pro-latest',
  'gemini-pro-vision',
  'gemini-1.5-pro',
];

const PROMPT = `
Vous êtes un expert en horlogerie de renommée mondiale avec des décennies d'expérience 
dans l'analyse de montres de luxe et vintage. 
Un utilisateur a téléchargé l'image d'une montre. 
Votre tâche est de fournir un rapport complet et détaillé sur la montre présente dans l'image.

Structurez votre rapport en utilisant le formatage Markdown. 
Couvrez les sections suivantes :

1. **## Identification**
   * **Marque :** [Identifiez la marque]
   * **Modèle / Référence :** [Identifiez le modèle ou décrivez-le]
   * **Époque / Année de production :** [Estimez l'époque]

2. **## Détails de la montre**
   * **Mouvement :** [Type (automatique, manuel, quartz, etc.)]
   * **Boîtier :** [Matériau, taille, forme, lunette]
   * **Cadran :** [Couleur, index, aiguilles, complications visibles]
   * **Bracelet :** [Matériau et style]

3. **## État et valeur estimée**
   * **État :** [Décrivez les rayures ou usures visibles]
   * **Valeur marchande estimée :** [Donnez une fourchette réaliste avec avertissement]

4. **## Histoire et faits intéressants**
   * [Ajoutez un bref historique du modèle ou de la marque]

Soyez professionnel, clair et concis. Si un aspect ne peut être déterminé, indiquez-le explicitement.
`;

export async function analyzeWatchImage(
  base64Image: string,
  mimeType: string
): Promise<AnalyseResult> {
  for (const MODEL_ID of MODELS) {
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
      
      if (!text) {
        throw new Error('⚠️ Réponse vide reçue du modèle.');
      }
      
      console.log(`✅ Analyse réussie avec le modèle : ${MODEL_ID}`);
      
      return { analysis: text };
    } catch (err: any) {
      const message = err?.message || 'Erreur inconnue';
      console.warn(`⚠️ Échec avec le modèle ${MODEL_ID}: ${message}`);
      continue;
    }
  }

  // Si tous échouent :
  throw new Error(
    '❌ Aucun modèle Gemini compatible n\'a pu être utilisé. Vérifie ta clé API ou les permissions AI Studio.'
  );
}
