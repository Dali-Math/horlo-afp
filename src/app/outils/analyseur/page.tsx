"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Upload,
  Sparkles,
  ShieldCheck,
  Check,
  Copy,
  RotateCcw,
  Clock,
  ChevronLeft,
  Eye,
  Sliders,
  AlertCircle,
} from "lucide-react";

// Clé Gemini Gratuite de secours (si la route API n'est pas encore déployée)
const FALLBACK_GEMINI_KEY = "AQ.Ab8RN6K8ZEMOodzLb4SH8fRumRRvfaXUfoo1KEgV2q6w-Eh0XQ";

interface SampleWatch {
  name: string;
  subtitle: string;
  image: string;
}

const SAMPLE_WATCHES: SampleWatch[] = [
  {
    name: "Rolex Daytona",
    subtitle: "Chronographe Oystersteel 116500LN",
    image: "/images/rolex-daytona-black-dial-steel-luxury-watch-hand-box.jpg",
  },
  {
    name: "Patek Philippe Nautilus",
    subtitle: "Sport Chic Cadran Bleu Guilloché",
    image: "/images/patek_philippe_nautilus_steel_blue_dial_luxury_watch.jpg",
  },
  {
    name: "IWC Portugieser",
    subtitle: "Chronographe Automatique Classic",
    image: "/images/IWC_Portugieser_Chronograph_Automatic_Blue_Dial_Luxury_Watch.jpg",
  },
];

const LOADING_STEPS = [
  "Numérisation haute définition du boîtier et de la lunette...",
  "Analyse de la typographie, des index et de la matière luminescente...",
  "Vérification de l'aiguillage, des guichets et des finitions du cadran...",
  "Estimation du calibre mécanique et des complications...",
  "Rédaction de la fiche technique selon les standards NIHS...",
];

export default function AnalyseurPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedMimeType, setSelectedMimeType] = useState<string>("image/jpeg");
  const [imageName, setImageName] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [loadingStepIndex, setLoadingStepIndex] = useState<number>(0);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Animation des étapes d'analyse
  useEffect(() => {
    let interval: any;
    if (isAnalyzing) {
      interval = setInterval(() => {
        setLoadingStepIndex((prev) => (prev + 1) % LOADING_STEPS.length);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isAnalyzing]);

  // Conversion fichier en base64
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrorMsg("Veuillez sélectionner un fichier image valide (JPG, PNG, WebP).");
        return;
      }
      setSelectedMimeType(file.type);
      setImageName(file.name);
      setErrorMsg(null);
      setAnalysisResult(null);

      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Chargement d'une montre d'exemple
  const handleSelectSample = async (sample: SampleWatch) => {
    setErrorMsg(null);
    setAnalysisResult(null);
    setImageName(sample.name);
    try {
      const response = await fetch(sample.image);
      const blob = await response.blob();
      setSelectedMimeType(blob.type || "image/jpeg");
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
      };
      reader.readAsDataURL(blob);
    } catch {
      // Fallback si l'image locale met du temps à répondre
      setSelectedImage(sample.image);
    }
  };

  // Lancement de l'analyse avec double sécurité (Route API + Fallback Direct Gemini)
  const runAnalysis = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setErrorMsg(null);
    setAnalysisResult(null);
    setLoadingStepIndex(0);

    try {
      // Tentative 1 : via la route API Next.js locale
      let response: Response | null = null;
      try {
        response = await fetch("/api/analyse-montre", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            imageBase64: selectedImage,
            mimeType: selectedMimeType,
          }),
        });
      } catch {
        response = null;
      }

      if (response && response.ok) {
        const data = await response.json();
        if (data.analysis) {
          setAnalysisResult(data.analysis);
          setIsAnalyzing(false);
          return;
        }
      }

      // Tentative 2 (Fallback direct gratuit Google Gemini Studio)
      const cleanBase64 = selectedImage.replace(/^data:image\/[a-zA-Z+]+;base64,/, "");
      const prompt = `Tu es un Maître Horloger suisse expert en diagnostic et expertise horlogère (Haute Horlogerie genevoise, COSC, normes NIHS).
Analyse cette montre en détail et fournis une fiche d'expertise technique complète en Markdown soigné avec ces sections :
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
* **Points de vigilance horlogère :** (Contrôle d'étanchéité NIHS, état des joints, lubrification, affleurement des aiguilles).`;

      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key=${FALLBACK_GEMINI_KEY}`;
      const geminiRes = await fetch(geminiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt },
                {
                  inline_data: {
                    mime_type: selectedMimeType || "image/jpeg",
                    data: cleanBase64,
                  },
                },
              ],
            },
          ],
        }),
      });

      if (!geminiRes.ok) {
        throw new Error(`Erreur Gemini (${geminiRes.status}).`);
      }

      const geminiData = await geminiRes.json();
      const outputText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!outputText) {
        throw new Error("Réponse vide du modèle de vision horlogère.");
      }

      setAnalysisResult(outputText);
    } catch (err: any) {
      setErrorMsg(
        err?.message || "Impossible de compléter l'analyse. Veuillez vérifier l'image et réessayer."
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopy = () => {
    if (analysisResult) {
      navigator.clipboard.writeText(analysisResult);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setAnalysisResult(null);
    setErrorMsg(null);
    setImageName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 selection:bg-amber-500/20 selection:text-amber-300">
      <div className="max-w-5xl mx-auto">
        {/* Navigation retour */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/outils"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-amber-400 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Retour aux Outils Horlogers
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            IA Horlogère Active • 100% Gratuit
          </div>
        </div>

        {/* En-tête */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mb-4 shadow-lg shadow-amber-500/5">
            <Clock className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            Analyseur & Diagnostic Horloger IA
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
            Photographiez ou importez n'importe quelle montre. Notre modèle d'intelligence
            artificielle multimodale analyse l'habillage, le cadran, l'aiguillage et estime le
            calibre selon les standards de la Haute Horlogerie suisse.
          </p>
        </div>

        {/* Zone de travail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Colonne gauche : Upload & Aperçu */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
              <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                <Eye className="w-4 h-4 text-amber-400" />
                Pièce à expertiser
              </h2>

              {/* Input fichier caché */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              {!selectedImage ? (
                /* Zone Drop / Click */
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-700 hover:border-amber-500/50 rounded-xl p-8 text-center cursor-pointer transition-all duration-300 bg-slate-950/40 hover:bg-slate-900/60 group"
                >
                  <div className="w-14 h-14 mx-auto rounded-full bg-slate-800/80 group-hover:bg-amber-500/10 border border-slate-700 group-hover:border-amber-500/30 flex items-center justify-center text-slate-400 group-hover:text-amber-400 transition-colors mb-4">
                    <Upload className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-medium text-slate-200 mb-1">
                    Déposer une photo de montre
                  </p>
                  <p className="text-xs text-slate-500">
                    JPG, PNG ou WebP (face avant, cadran ou mouvement)
                  </p>
                  <button
                    type="button"
                    className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 rounded-lg transition-colors border border-slate-700"
                  >
                    Parcourir les fichiers
                  </button>
                </div>
              ) : (
                /* Aperçu Image sélectionnée */
                <div className="space-y-4">
                  <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-black/40 aspect-square flex items-center justify-center group">
                    <img
                      src={selectedImage}
                      alt="Montre à analyser"
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 rounded-lg transition-colors border border-slate-600"
                      >
                        Changer
                      </button>
                      <button
                        onClick={handleReset}
                        className="px-3 py-1.5 bg-rose-950/80 hover:bg-rose-900 border border-rose-800/50 text-xs font-medium text-rose-300 rounded-lg transition-colors"
                      >
                        Effacer
                      </button>
                    </div>
                  </div>
                  {imageName && (
                    <p className="text-xs text-slate-400 truncate text-center">
                      Fichier : <span className="text-slate-200">{imageName}</span>
                    </p>
                  )}
                </div>
              )}

              {/* Bouton d'action */}
              <button
                onClick={runAnalysis}
                disabled={!selectedImage || isAnalyzing}
                className={`w-full mt-6 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg ${
                  !selectedImage || isAnalyzing
                    ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50"
                    : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold shadow-amber-500/20 active:scale-[0.98]"
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    Expertise en cours...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-slate-950" />
                    Lancer l'Expertise Horlogère IA
                  </>
                )}
              </button>
            </div>

            {/* Montres d'exemple pour tester en 1 clic */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
                Ou tester en 1 clic sur un exemple
              </h3>
              <div className="space-y-2">
                {SAMPLE_WATCHES.map((sample) => (
                  <button
                    key={sample.name}
                    onClick={() => handleSelectSample(sample)}
                    disabled={isAnalyzing}
                    className="w-full text-left p-2.5 rounded-lg bg-slate-950/40 hover:bg-slate-800/60 border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <p className="text-xs font-medium text-slate-200 group-hover:text-amber-400 transition-colors">
                        {sample.name}
                      </p>
                      <p className="text-[11px] text-slate-500">{sample.subtitle}</p>
                    </div>
                    <span className="text-[11px] font-medium text-amber-500/80 group-hover:text-amber-400">
                      Charger →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Colonne droite : Résultats & Fiche d'Expertise */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl min-h-[500px] flex flex-col justify-between">
              {/* État 1 : Chargement en cours */}
              {isAnalyzing && (
                <div className="my-auto py-12 flex flex-col items-center justify-center text-center">
                  <div className="relative mb-6">
                    {/* SVG Mécanisme d'horloge qui tourne */}
                    <svg
                      className="w-20 h-20 text-amber-400 animate-spin"
                      style={{ animationDuration: "8s" }}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.2" />
                      <path d="M12 6v6l4 2" />
                      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-amber-300 animate-pulse" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Expertise Horlogère en cours
                  </h3>
                  <p className="text-xs sm:text-sm text-amber-400 font-mono transition-all duration-300 max-w-md">
                    {LOADING_STEPS[loadingStepIndex]}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-4">
                    Propulsé par Google Gemini Vision & Standards Suisses NIHS
                  </p>
                </div>
              )}

              {/* État 2 : Erreur */}
              {errorMsg && !isAnalyzing && (
                <div className="my-auto p-5 rounded-xl bg-rose-950/30 border border-rose-800/50 text-rose-300 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-rose-200 mb-1">
                      Analyse interrompue
                    </h4>
                    <p className="text-xs text-rose-300/80">{errorMsg}</p>
                    <button
                      onClick={runAnalysis}
                      className="mt-3 px-3 py-1.5 rounded-lg bg-rose-900/60 hover:bg-rose-900 border border-rose-700 text-xs font-medium text-rose-200 transition-colors"
                    >
                      Réessayer
                    </button>
                  </div>
                </div>
              )}

              {/* État 3 : Aucun résultat (Attente) */}
              {!isAnalyzing && !analysisResult && !errorMsg && (
                <div className="my-auto py-16 flex flex-col items-center justify-center text-center text-slate-500">
                  <div className="w-16 h-16 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-center mb-4 text-slate-600">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-300 mb-1">
                    En attente de pièce d'horlogerie
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm">
                    Sélectionnez une image à gauche ou cliquez sur un des exemples pour lancer
                    l'expertise automatisée.
                  </p>
                </div>
              )}

              {/* État 4 : Rapport d'expertise complet */}
              {!isAnalyzing && analysisResult && (
                <div className="space-y-6">
                  {/* Barre d'action supérieure */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                      <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                        Rapport Certifié IA
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCopy}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 hover:text-white transition-colors border border-slate-700"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            Copié !
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            Copier
                          </>
                        )}
                      </button>
                      <button
                        onClick={handleReset}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 hover:text-white transition-colors border border-slate-700"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Nouvelle pièce
                      </button>
                    </div>
                  </div>

                  {/* Corps du rapport formaté */}
                  <div className="prose prose-invert prose-amber max-w-none text-slate-300 text-xs sm:text-sm leading-relaxed space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                    {analysisResult.split("\n\n").map((paragraph, idx) => {
                      if (paragraph.startsWith("# ")) {
                        return (
                          <h1
                            key={idx}
                            className="text-lg sm:text-xl font-bold text-amber-400 pb-2 border-b border-amber-500/20"
                          >
                            {paragraph.replace("# ", "")}
                          </h1>
                        );
                      }
                      if (paragraph.startsWith("## ")) {
                        return (
                          <h2
                            key={idx}
                            className="text-sm sm:text-base font-semibold text-white mt-4 mb-2 flex items-center gap-2"
                          >
                            {paragraph.replace("## ", "")}
                          </h2>
                        );
                      }
                      if (paragraph.startsWith("* ") || paragraph.startsWith("- ")) {
                        return (
                          <ul key={idx} className="list-disc pl-5 space-y-1">
                            {paragraph.split("\n").map((line, lidx) => (
                              <li key={lidx} className="text-slate-300">
                                {line.replace(/^(\*|-)\s+/, "")}
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      return (
                        <p key={idx} className="text-slate-300 whitespace-pre-line">
                          {paragraph}
                        </p>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
