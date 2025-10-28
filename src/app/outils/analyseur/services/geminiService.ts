import { GoogleGenAI } from "@google/genai";
import type { AnalysisResult } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const fileToGenerativePart = (base64Data: string, mimeType: string) => {
  return {
    inlineData: {
      data: base64Data,
      mimeType,
    },
  };
};

const PROMPT = `Vous êtes un expert en horlogerie de renommée mondiale avec des décennies d'expérience dans l'analyse de montres de luxe et vintage. Un utilisateur a téléchargé l'image d'une montre. Votre tâche est de fournir un rapport complet et détaillé sur la montre présente dans l'image.

Structurez votre rapport en utilisant le formatage Markdown. Couvrez les sections suivantes :

1.  **## Identification**
    *   **Marque :** [Identifiez la marque]
    *   **Modèle/Numéro de référence :** [Identifiez le modèle spécifique ou le numéro de référence, si possible. Sinon, décrivez-le.]
    *   **Époque/Année de production :** [Estimez l'époque ou l'année de production.]

2.  **## Détails de la montre**
    *   **Mouvement :** [Décrivez le type de mouvement (par ex., Automatique, Remontage manuel, Quartz) et tout détail connu sur le calibre.]
    *   **Matériau du boîtier :** [Identifiez le matériau du boîtier (par ex., Acier inoxydable, Or 18 carats, Titane, Céramique).]
    *   **Cadran :** [Décrivez la couleur du cadran, les index, les aiguilles et toutes les complications visibles (par ex., chronographe, date, phase de lune).]
    *   **Lunette :** [Décrivez le type et le matériau de la lunette (par ex., Cannelée, Céramique unidirectionnelle, Tachymètre).]
    *   **Bracelet :** [Décrivez le matériau et le style du bracelet (par ex., bracelet Oyster, bracelet Jubilee, bracelet en cuir).]

3.  **## Évaluation de l'état et de la valeur**
    *   **État :** [Fournissez une brève évaluation de l'état de la montre en fonction de l'image (par ex., Excellent, Bon, Usé). Mentionnez toute rayure ou usure visible.]
    *   **Valeur marchande estimée :** [Fournissez une fourchette de valeur marchande estimée. Faites précéder cette information d'un avertissement clair indiquant qu'il s'agit d'une estimation basée sur une seule photo et qu'une expertise professionnelle en personne est recommandée.]

4.  **## Histoire et faits intéressants**
    *   [Partagez une brève histoire de la marque ou du modèle, ou tout fait intéressant et toute signification associée à ce garde-temps.]

Veuillez être professionnel, détaillé et utiliser un langage clair et concis. Si un aspect ne peut être déterminé à partir de l'image, indiquez-le clairement.`;


export const analyzeWatchImage = async (base64Image: string, mimeType: string): Promise<AnalysisResult> => {
  try {
    const imagePart = fileToGenerativePart(base64Image, mimeType);
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, { text: PROMPT }] },
    });
    
    const text = response.text;
    if (!text) {
      throw new Error("API returned no text in response.");
    }
    return { report: text };

  } catch (error) {
    console.error("Error analyzing image with Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to analyze watch: ${error.message}`);
    }
    throw new Error("An unknown error occurred during analysis.");
  }
};