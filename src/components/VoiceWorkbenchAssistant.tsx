"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Volume2, VolumeX, Sparkles, X, ChevronRight, Compass, ShieldAlert, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface KnowledgeItem {
  keywords: string[];
  title: string;
  category: "huilage" | "serrage" | "metrologie" | "usinage" | "navigation";
  answer: string;
  speechText: string;
  nihsStandard?: string;
  actionUrl?: string;
}

const WORKBENCH_KNOWLEDGE: KnowledgeItem[] = [
  // Huilage & Lubrification Moebius
  {
    keywords: ["palette", "palettes", "levée", "levées", "ancre", "impulsion"],
    title: "Lubrification des Palettes d'Ancre Suisse",
    category: "huilage",
    answer: "Huile Moebius 9415 (ou 941). Déposer une micro-goutte sur le plan d'impulsion d'une dent de la roue d'échappement toutes les 3 dents (soit 5 dents huilées pour 15 dents). RÈGLE D'OR : Les pivots de l'ancre, le dard et les cornes de la fourchette restent STRICTEMENT SECS !",
    speechText: "Pour les palettes d'ancre : huile Moebius 9415. Une micro-goutte sur le plan d'impulsion toutes les 3 dents de la roue d'échappement. Les pivots de l'ancre restent strictement secs.",
    nihsStandard: "Norme NIHS 95-15 • Huile synthétique thixotrope Moebius 9415"
  },
  {
    keywords: ["balancier", "incabloc", "antichoc", "contre-pivot", "choc"],
    title: "Lubrification des Antichocs Balancier (Incabloc)",
    category: "huilage",
    answer: "Huile Moebius 9010. Déposer la goutte au centre exact du contre-pivot démonté et nettoyé au One-Dip. La goutte d'huile doit occuper entre 1/2 et 2/3 du diamètre de la pierre (Ø ~0.60 mm). Aucun débordement sur la chatonnière !",
    speechText: "Pour les antichocs Incabloc du balancier : Moebius 9010. Déposer la goutte au centre du contre-pivot pour couvrir la moitié aux deux tiers du diamètre.",
    nihsStandard: "Norme NIHS 95-10 • Moebius 9010 Synt-A-Lube"
  },
  {
    keywords: ["barillet", "ressort", "bride", "glissante", "tambour", "arbre"],
    title: "Lubrification du Barillet & Ressort Moteur",
    category: "huilage",
    answer: "1. Paroi du tambour de barillet (bride traînante automatique) : Moebius 8217 (graisse graphitée spéciale freinage). 2. Portées et pivots de l'arbre de barillet : Moebius HP-1300 (fortes charges). 3. Lame de ressort manuel : Moebius 8200.",
    speechText: "Pour le barillet : Moebius 8217 sur les parois du tambour pour la bride glissante, et Moebius HP-1300 sur les portées de l'arbre de barillet.",
    nihsStandard: "Norme NIHS 95-20 • Moebius 8217 & HP-1300"
  },
  {
    keywords: ["rouage", "roues", "mobile", "moyenne", "seconde", "centre"],
    title: "Lubrification de la Chaîne de Rouage",
    category: "huilage",
    answer: "1. Roue de centre & Roue moyenne (vitesses lentes, fortes pressions) : Moebius HP-1300. 2. Roue des secondes & Roue d'échappement (vitesses rapides, faibles couples) : Moebius 9010. Remplir 1/3 de la creusure de pierre.",
    speechText: "Pour le rouage : Moebius HP-1300 pour la roue de centre et moyenne. Moebius 9010 pour la roue des secondes et d'échappement. Remplir un tiers de la creusure.",
    nihsStandard: "Norme NIHS 95-12 • Moebius HP-1300 / 9010"
  },
  {
    keywords: ["remontoir", "tirette", "coulant", "pignon", "bascule"],
    title: "Mécanisme de Remontoir & Mise à l'Heure",
    category: "huilage",
    answer: "Graisse Moebius 9504 (synthétique haute pression, bleue) ou Moebius 9501. À appliquer sur : gorge du pignon coulant, bec de bascule, plot de tirette, et dentures de renvoi.",
    speechText: "Pour le mécanisme de remontoir : graisse synthétique Moebius 9504 sur la gorge du pignon coulant, le bec de bascule et le plot de tirette.",
    nihsStandard: "Norme NIHS 95-30 • Moebius 9504"
  },

  // Couples de serrage (cNm)
  {
    keywords: ["couple", "serrage", "masse", "vis", "rotor", "cNm"],
    title: "Couple de Serrage Vis de Masse Oscillante",
    category: "serrage",
    answer: "Vis de masse oscillante (ETA 2824-2 / 7750) : Couple préconisé de 2.0 à 2.5 cNm (centi-Newton-mètre). Serrer au tournevis dynamométrique horloger pour éviter le dévissage sous chocs.",
    speechText: "Le couple de serrage de la vis de masse oscillante sur calibre ETA est de 2.0 à 2.5 centi-Newton-mètres.",
    nihsStandard: "Norme NIHS 06-02 • 2.0 - 2.5 cNm"
  },
  {
    keywords: ["coq", "pont", "ponts", "barillet vis"],
    title: "Couples de Serrage Vis de Ponts & Coq",
    category: "serrage",
    answer: "1. Vis de pont de barillet et pont de rouage : 1.5 à 1.8 cNm. 2. Vis de coq (balancier) : 1.5 cNm. 3. Vis de fixation bride de cadran : 0.8 à 1.0 cNm.",
    speechText: "Pour les vis de ponts et de coq : 1.5 à 1.8 centi-Newton-mètres. Pour les vis de cadran : 0.8 à 1.0 cNm.",
    nihsStandard: "Norme NIHS 06-02 • 1.5 - 1.8 cNm"
  },

  // Métrologie Witschi (ISO 3159 COSC)
  {
    keywords: ["witschi", "repere", "repère", "beat", "error", "ms"],
    title: "Tolérance d'Erreur de Repère (Beat Error)",
    category: "metrologie",
    answer: "Erreur de repère optimale : < 0.2 ms. Tolérance maximale admise en haute horlogerie : ≤ 0.4 ms (limite absolue d'acceptation SAV : 0.6 ms). Se règle en pivotant délicatement le porte-piton.",
    speechText: "L'erreur de repère Witschi doit être inférieure à 0.4 milliseconde, idéalement en dessous de 0.2 ms. Elle se règle en tournant le porte-piton.",
    nihsStandard: "Norme ISO 3159 • Repère ≤ 0.4 ms"
  },
  {
    keywords: ["amplitude", "degres", "degré", "angle"],
    title: "Plages d'Amplitude Horlogère Conformes",
    category: "metrologie",
    answer: "1. Positions horizontales (Cadran Haut CH / Cadran Bas CB) : 270° à 315°. 2. Positions verticales (6H, 9H, 3H) : 240° à 275°. Alerte si > 320° (rebutement/rebond de cheville) ou si < 220° (rouage gommé ou manque d'huile).",
    speechText: "L'amplitude normale est de 270 à 315 degrés à plat, et de 240 à 275 degrés aux positions verticales.",
    nihsStandard: "Norme ISO 3159 COSC • Amplitude 270°-315°"
  },
  {
    keywords: ["levee", "levée", "angle de levée", "lift"],
    title: "Angles de Levée des Calibres Standards",
    category: "metrologie",
    answer: "1. ETA 2824-2 / 2892-A2 : 50°. 2. ETA Valjoux 7750 : 52°. 3. ETA Unitash 6497-1 / 6498 : 49° (ou 44° selon version). 4. Rolex 3135 : 52°.",
    speechText: "L'angle de levée est de 50 degrés pour le 2824, 52 degrés pour le Valjoux 7750, et 49 degrés pour l'Unitas 6497.",
    nihsStandard: "Données techniques officielles fabricants suisses"
  },

  // Micromécanique & Avant-trous
  {
    keywords: ["avant-trou", "avant trou", "foret", "taraud", "s0.90", "0.90", "tige"],
    title: "Avant-Trou & Foret pour Tige de Remontoir S 0.90",
    category: "usinage",
    answer: "Pour filetage NIHS S 0.90 (tige 2824-2, pas P = 0.225 mm) : Foret avant-trou de Ø 0.68 mm (Formule : Ø = D − P = 0.90 − 0.225 ≈ 0.68 mm). Utiliser de l'huile de coupe soufrée sur acier 316L.",
    speechText: "Pour un filetage S 0.90 de tige de remontoir, le foret avant-trou est de zéro virgule 68 millimètres.",
    nihsStandard: "Norme NIHS 06-02 / ISO 1501 • Foret Ø 0.68 mm"
  },

  // Navigation
  {
    keywords: ["laboratoire", "labo", "banc"],
    title: "Navigation : Grand Laboratoire d'Établi",
    category: "navigation",
    answer: "Ouverture du Grand Laboratoire Horloger (11 bancs d'essais métrologiques et cinématiques).",
    speechText: "J'ouvre le Grand Laboratoire Horloger.",
    actionUrl: "/pratique/laboratoire"
  },
  {
    keywords: ["loupe", "inspection", "défaut", "defaut", "microscope"],
    title: "Navigation : Loupe Macro Interactive 20x",
    category: "navigation",
    answer: "Ouverture de l'Atelier d'Inspection Macro 20x des défauts réels d'établi.",
    speechText: "J'ouvre l'Atelier d'Inspection à la Loupe 20x.",
    actionUrl: "/pratique/inspection-loupe"
  },
  {
    keywords: ["defi", "défi", "duel", "chrono", "battre"],
    title: "Navigation : Défi Chronométré d'Atelier",
    category: "navigation",
    answer: "Lancement du Mode Duel & Défi Chronométré de Haute Horlogerie.",
    speechText: "Lancement du Défi Chronométré.",
    actionUrl: "/pratique/defi-chronometre"
  }
];

export default function VoiceWorkbenchAssistant() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [activeItem, setActiveItem] = useState<KnowledgeItem | null>(null);
  const [speechSupported, setSpeechSupported] = useState(false);

  const recognitionRef = useRef<any>(null);

  // Initialize Web Speech API
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        setSpeechSupported(true);
        const recognition = new SpeechRecognition();
        recognition.lang = "fr-CH";
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => {
          setIsListening(true);
        };

        recognition.onresult = (event: any) => {
          const text = event.results[0][0].transcript;
          setTranscript(text);
          processVoiceQuery(text);
        };

        recognition.onerror = (event: any) => {
          console.warn("[Voice Assistant] Erreur reconnaissance :", event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  const toggleListening = () => {
    if (!speechSupported) {
      setIsOpen(true);
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setIsOpen(true);
      setTranscript("Écoute en cours... Parlez clairement à l'établi.");
      try {
        recognitionRef.current?.start();
      } catch (e) {
        console.warn("Speech recognition already active:", e);
      }
    }
  };

  const speakText = (text: string) => {
    if (!voiceEnabled || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "fr-CH";
    utterance.rate = 1.05;
    window.speechSynthesis.speak(utterance);
  };

  const processVoiceQuery = (query: string) => {
    const q = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    let bestMatch: KnowledgeItem | null = null;
    let maxMatches = 0;

    for (const item of WORKBENCH_KNOWLEDGE) {
      let matches = 0;
      for (const kw of item.keywords) {
        const cleanKw = kw.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (q.includes(cleanKw)) {
          matches++;
        }
      }
      if (matches > maxMatches) {
        maxMatches = matches;
        bestMatch = item;
      }
    }

    if (bestMatch && maxMatches > 0) {
      setActiveItem(bestMatch);
      speakText(bestMatch.speechText);
      if (bestMatch.actionUrl) {
        setTimeout(() => {
          router.push(bestMatch.actionUrl!);
          setIsOpen(false);
        }, 1200);
      }
    } else {
      const fallback: KnowledgeItem = {
        keywords: [],
        title: "Recherche d'Établi",
        category: "huilage",
        answer: `Consigne reçue : « ${query} ». Essayez des questions directes comme : « Quelle huile pour les palettes ? », « Couple de serrage vis de masse », « Tolérance repère Witschi » ou « Foret pour tige S 0.90 ».`,
        speechText: "Question non reconnue. Vous pouvez demander quelle huile pour les palettes ou le couple de serrage.",
        nihsStandard: "Règles d'établi HorloLearn"
      };
      setActiveItem(fallback);
      speakText(fallback.speechText);
    }
  };

  const handleChipClick = (item: KnowledgeItem) => {
    setActiveItem(item);
    setTranscript(`« ${item.keywords[0]} »`);
    speakText(item.speechText);
    if (item.actionUrl) {
      router.push(item.actionUrl);
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Floating Workbench Mic Button (Bottom-Right, beside search) */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
        <button
          onClick={toggleListening}
          className={`group flex items-center gap-2.5 px-4 py-3 rounded-full font-mono text-xs font-bold shadow-2xl transition-all duration-300 backdrop-blur-md border ${
            isListening
              ? "bg-rose-500 text-white border-rose-400 ring-4 ring-rose-500/40 animate-pulse scale-105"
              : "bg-slate-900/90 dark:bg-black/90 text-amber-400 border-amber-500/50 hover:border-amber-400 hover:scale-105 shadow-amber-950/20"
          }`}
          title="Mode Établi Mains Prises (Assistant Vocal)"
        >
          {isListening ? (
            <Mic className="w-4 h-4 text-white animate-bounce" />
          ) : (
            <Mic className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
          )}
          <span className="hidden sm:inline">
            {isListening ? "Écoute en cours..." : "Mode Mains Prises"}
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
        </button>
      </div>

      {/* Voice Assistant Modal Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-md">
          <div className="max-w-xl w-full bg-slate-900 dark:bg-[#080C14] border border-amber-500/40 rounded-3xl p-6 shadow-2xl text-slate-200 font-mono text-xs space-y-5 animate-in fade-in slide-in-from-bottom-6 duration-300">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  <Mic className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    Assistant d&apos;Établi Mains Prises
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Vocal 100% Hors-Ligne
                    </span>
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    Posez vos questions pendant vos opérations d&apos;huilage ou de réglage
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                  className={`p-2 rounded-xl border transition-colors ${
                    voiceEnabled
                      ? "bg-amber-500/15 border-amber-500/40 text-amber-300"
                      : "bg-slate-800 border-slate-700 text-slate-400"
                  }`}
                  title={voiceEnabled ? "Synthèse vocale active" : "Synthèse vocale coupée"}
                >
                  {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    if (isListening) recognitionRef.current?.stop();
                    if (typeof window !== "undefined") window.speechSynthesis.cancel();
                  }}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mic Pulse Center */}
            <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-3">
              <button
                onClick={toggleListening}
                className={`p-5 rounded-full transition-all duration-300 ${
                  isListening
                    ? "bg-rose-500 text-white ring-8 ring-rose-500/30 scale-110"
                    : "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20 hover:scale-105"
                }`}
              >
                {isListening ? <Mic className="w-6 h-6 animate-pulse" /> : <Mic className="w-6 h-6" />}
              </button>

              <div className="space-y-1">
                <div className="text-white font-bold text-xs">
                  {isListening ? "Je vous écoute..." : "Touchez le micro pour parler"}
                </div>
                <div className="text-[11px] text-slate-400 italic">
                  {transcript || "« Quelle huile pour les palettes d'ancre ? »"}
                </div>
              </div>
            </div>

            {/* Active Answer Card */}
            {activeItem && (
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-amber-500/40 space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-amber-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {activeItem.title}
                  </span>
                  {activeItem.nihsStandard && (
                    <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      {activeItem.nihsStandard}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {activeItem.answer}
                </p>
                {activeItem.actionUrl && (
                  <button
                    onClick={() => {
                      router.push(activeItem.actionUrl!);
                      setIsOpen(false);
                    }}
                    className="inline-flex items-center gap-1 text-[11px] text-cyan-400 hover:underline pt-1"
                  >
                    <span>Ouvrir l&apos;atelier directement</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            )}

            {/* Quick Suggestions Chips (Doigtiers-friendly tap) */}
            <div className="space-y-2">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                Questions d&apos;Établi Rapides (Un clic si micro coupé) :
              </span>
              <div className="flex flex-wrap gap-1.5">
                {WORKBENCH_KNOWLEDGE.slice(0, 6).map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleChipClick(item)}
                    className="px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-amber-500/50 text-[11px] text-slate-300 hover:text-amber-300 transition-all text-left"
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
