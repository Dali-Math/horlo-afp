import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!API_KEY) {
  console.error("❌ Clé Gemini API manquante !");
}

const genAI = new GoogleGenerativeAI(API_KEY || "");

export async function analyzeWatchImage(imageBase64: string, mimeType: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
Tu es un expert horloger suisse. Analyse cette photo de montre et rédige un rapport structuré :
## Identification
* **Marque :** 
* **Modèle/Numéro de référence :**
* **Époque/Année de production :**

## Détails de la montre
* **Mouvement :**
* **Boîtier :**
* **Cadran :**
* **Bracelet :**
* **Valeur marchande estimée :**

Sois précis, utilise un vocabulaire horloger, et rédige de manière professionnelle.`;

    const result = await model.generateContent([
      {
        inlineData: {
          data: imageBase64,
          mimeType: mimeType,
        },
      },
      { text: prompt },
    ]);

    const text = await result.response.text();
    return { report: text };
  } catch (error: any) {
    console.error("Erreur analyse Gemini :", error);
    throw new Error(
      "Impossible d’analyser l’image. Vérifie la clé API ou réessaie plus tard."
    );
  }
}
