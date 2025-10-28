"use client";

import React, { useState, useEffect } from "react";

export default function AnalyseurDeMontresIA() {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // --- Limite 3 analyses gratuites/jour ---
  const LIMIT = 3;
  const [used, setUsed] = useState(0);
  const [remaining, setRemaining] = useState(LIMIT);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const saved = JSON.parse(localStorage.getItem("analyseLimit") || "{}");
    if (saved.date === today) {
      setUsed(saved.count);
      setRemaining(LIMIT - saved.count);
    } else {
      localStorage.setItem("analyseLimit", JSON.stringify({ date: today, count: 0 }));
    }
  }, []);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyse = async () => {
    if (!image) {
      alert("Sélectionnez d’abord une image.");
      return;
    }
    if (remaining <= 0) {
      alert("Vous avez atteint la limite de 3 analyses gratuites pour aujourd’hui.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const today = new Date().toISOString().split("T")[0];
      const newCount = used + 1;
      setUsed(newCount);
      setRemaining(LIMIT - newCount);
      localStorage.setItem("analyseLimit", JSON.stringify({ date: today, count: newCount }));

      // 🔥 Appel à ton app Google
      const res = await fetch(
        "https://copy-of-analyseur-de-montres-ia-147602908955.us-west1.run.app/analyse",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image }),
        }
      );

      const data = await res.json();
      setResult(data.result || "Analyse terminée avec succès.");
    } catch {
      setResult("Erreur : impossible d’analyser l’image.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setImage(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-[#0B1620] text-white flex flex-col items-center py-10 px-6">
      <h1 className="text-3xl font-bold mb-10 text-[#E2B44F]">
        Analyseur de Montres IA
      </h1>

      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8">
        {/* Zone image */}
        <div className="bg-[#162230] p-6 rounded-2xl flex flex-col items-center shadow-lg">
          {image ? (
            <img
              src={image}
              alt="Montre"
              className="rounded-xl shadow-md w-[300px] mb-6"
            />
          ) : (
            <label className="w-full h-64 border-2 border-dashed border-[#E2B44F55] rounded-xl flex items-center justify-center text-gray-400 cursor-pointer hover:bg-[#E2B44F08] transition">
              <input
                type="file"
                accept="image/*"
                onChange={handleFile}
                className="hidden"
              />
              Cliquez pour téléverser une image
            </label>
          )}

          <p className="text-sm text-gray-400 mt-3 mb-4">
            💡 Il vous reste{" "}
            <span className="text-[#E2B44F] font-semibold">{remaining}</span>{" "}
            analyse{remaining > 1 ? "s" : ""} gratuite{remaining > 1 ? "s" : ""} aujourd’hui.
          </p>

          <div className="flex gap-3">
            <button
              onClick={handleAnalyse}
              disabled={loading || remaining <= 0}
              className={`px-6 py-2 rounded-lg font-medium ${
                remaining > 0
                  ? "bg-[#E2B44F] text-black hover:bg-[#f0cf70]"
                  : "bg-gray-600 text-gray-300 cursor-not-allowed"
              }`}
            >
              {loading ? "Analyse en cours..." : "Analyser la Montre"}
            </button>

            <button
              onClick={reset}
              className="px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg"
            >
              Réinitialiser
            </button>
          </div>
        </div>

        {/* Résultat */}
        <div className="bg-[#162230] p-6 rounded-2xl shadow-lg overflow-auto">
          <h2 className="text-xl font-semibold mb-4 text-[#E2B44F]">
            Rapport d’Analyse
          </h2>
          <div className="text-gray-300 whitespace-pre-line text-sm leading-relaxed">
            {result || "Votre rapport d’analyse détaillé apparaîtra ici."}
          </div>
        </div>
      </div>
    </div>
  );
}
