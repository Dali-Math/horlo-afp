import { NextRequest, NextResponse } from "next/server";

// Clé Google Gemini AI Studio (Tier Gratuit Officiel)
const DEFAULT_API_KEY = "AQ.Ab8RN6K8ZEMOodzLb4SH8fRumRRvfaXUfoo1KEgV2q6w-Eh0XQ";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { imageBase64, mimeType = "image/jpeg", prompt } = body;

    if (!imageBase64) {
      return NextResponse.json(
        { error: "Image requise pour l'analyse horlogère." },
        { status: 400 }
      );
    }

    // Nettoyage de l'entête data URL si présent
    const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z+]+;base64,/, "");

    const apiKey = process.env.GEMINI_API_KEY || DEFAULT_API_KEY;

    const horologyPrompt =
      prompt ||
      `Tu es un Maître Horloger suisse expert en diagnostic et expertise horlogère (Haute Horlogerie genevoise, COSC, normes NIHS).
Analyse cette montre ou ce composant en détail et fournis une fiche d'expertise technique complète en Markdown soigné avec ces sections obligatoires :

# 🇨🇭 FICHE D'EXPERTISE TECHNIQUE HORLOGÈRE

## 1. ⌚ Identification & Style
* **Maison / Marque estimée :** 
* **Modèle / Référence probable :** 
* **Style & Catégorie :** (Chronographe de pilote, Plongeuse 300m, Habillée classique, Sport chic...)
* **Période stylistique :** 

## 2. 🛡️ Boîtier & Habillage
* **Matériau :** (Acier 316L/904L, Or 18ct, Titane grade 5, Céramique...)
* **Lunette :** (Fixe, cannelée, tachymétrique, céramique Cerachrom, tournante unidirectionnelle...)
* **Couronne & Poussoirs :** (Protège-couronne, système vissé étanche...)
* **Glace & Étanchéité estimée :** 

## 3. 🎯 Cadran, Index & Aiguillage
* **Finition du cadran :** (Soleillé, guilloché, laqué profond, squelette...)
* **Index & Lisibilité :** (Appliques facettées, chiffres arabes, luminescence Super-LumiNova/Chromalight...)
* **Aiguillage :** (Type bâton, glaive, dauphine, Breguet, Mercedes, flèche...)
* **Complications / Guichets :** (Date, petite seconde, compteurs chronographe...)

## 4. ⚙️ Mouvement & Calibre Estimé
* **Type de calibre probable :** (Automatique de manufacture, Mécanique manuel, Calibre suisse haute fréquence, Quartz haute précision...)
* **Fréquence probable :** (28'800 alt/h / 4 Hz ou 21'600 alt/h)
* **Standards & Certifications :** (Critères COSC, Poinçon de Genève, Superlative Chronometer...)

## 5. 🔍 Remarques d'Atelier & Conseils d'Entretien
* **État esthétique perçu :** (Alignement, arêtes, finitions brossées/polies)
* **Points de vigilance horlogère :** (Contrôle d'étanchéité NIHS, état des joints, lubrification, affleurement des aiguilles).

Sois précis, professionnel, avec le vocabulaire noble de l'horlogerie suisse.`;

    // Modèles Gemini compatibles Vision (par ordre de rapidité)
    const models = [
      "gemini-flash-lite-latest",
      "gemini-3.5-flash",
      "gemini-3-flash-preview",
      "gemini-flash-latest",
    ];

    let lastError: any = null;

    for (const model of models) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const payload = {
          contents: [
            {
              parts: [
                { text: horologyPrompt },
                {
                  inline_data: {
                    mime_type: mimeType,
                    data: cleanBase64,
                  },
                },
              ],
            },
          ],
        };

        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const errText = await res.text();
          lastError = new Error(`Gemini ${model} HTTP ${res.status}: ${errText}`);
          continue;
        }

        const data = await res.json();
        const analysis = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (analysis) {
          return NextResponse.json({
            success: true,
            analysis,
            model,
          });
        }
      } catch (e: any) {
        lastError = e;
      }
    }

    return NextResponse.json(
      {
        error: "L'analyse IA n'a pas pu aboutir. Veuillez réessayer.",
        details: lastError?.message,
      },
      { status: 502 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Erreur serveur lors du traitement de l'image.", details: error?.message },
      { status: 500 }
    );
  }
}
