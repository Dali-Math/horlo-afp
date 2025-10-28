"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function AnalyseurDeMontresIA() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // --- Limite quotidienne ---
  const DAILY_LIMIT = 3;
  const [analysesDone, setAnalysesDone] = useState(0);
  const [remaining, setRemaining] = useState(DAILY_LIMIT);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const savedData = JSON.parse(localStorage.getItem("analyseData") || "{}");

    if (savedData.date === today) {
      setAnalysesDone(savedData.count);
      setRemaining(DAILY_LIMIT - savedData.count);
    } else {
      localStorage.setItem(
        "analyseData",
        JSON.stringify({ date: today, count: 0 })
      );
    }
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyse = async () => {
    if (remaining <= 0) {
      alert("Vous avez atteint la limite de 3 analyses gratuites pour aujourd’hui.");
      return;
    }

    if (!selectedImage) {
      alert("Veuillez sélectionner une image avant de lancer l’analyse.");
      return;
    }

    setIsLoading(true);
    setAnalysisResult(null);

    try {
      const today = new Date().toISOString().split("T")[0];
      const newCount = analysesDone + 1;
      setAnalysesDone(newCount);
      setRemaining(DAILY_LIMIT - newCount);
      localStorage.setItem("analyseData", JSON.stringify({ date: today, count: newCount }));

      // 🔥 Appel de ton API existante (hébergée sur Google)
      const response = await fetch(
        "https://copy-of-analyseur-de-montres-ia-147602908955.us-west1.run.app/analyse",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: selectedImage }),
        }
      );

      const data = await response.json();
      setAnalysisResult(data.result || "Analyse terminée.");
    } catch (error) {
      console.error(error);
      setAnalysisResult("Erreur : impossible d’analyser l’image.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setAnalysisResult(null);
  };

  return (
    <div className="min-h-screen bg-[#0b1620] text-white flex flex-col items-center py-10 px-6">
      <h1 className="text-3xl font-bold mb-8 text-[#E2B44F]">
        Analyseur de Montres IA
      </h1>

      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8">
        {/* Zone upload */}
        <div className="bg-[#111a26] p-6 rounded-2xl shadow-xl flex flex-col items-center">
          {selectedImage ? (
            <Image
              src={selectedImage}
              alt="Montre importée"
              width={400}
              height={400}
              className="rounded-lg shadow-md mb-6"
            />
          ) : (
            <label className="w-full h-64 border-2 border-dashed border-[#E2B44F55] rounded-xl flex items-center justify-center text-gray-400 cursor-pointer hover:bg-[#E2B44F08] transition">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              Cliquez pour téléverser une image
            </label>
          )}

          {/* Compteur d’analyses */}
          <p className="text-sm text-gray-400 mt-3 mb-4">
            💡 Il vous reste{" "}
            <span className="text-[#E2B44F] font-semibold">{remaining}</span>{" "}
            analyse{remaining > 1 ? "s" : ""} gratuite{remaining > 1 ? "s" : ""} aujourd’hui.
          </p>

          <div className="flex gap-4 mt-2">
            <button
              onClick={handleAnalyse}
              disabled={!selectedImage || isLoading || remaining <= 0}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                remaining > 0
                  ? "bg-[#E2B44F] text-black hover:bg-[#f0cf70]"
                  : "bg-gray-600 text-gray-300 cursor-not-allowed"
              }`}
            >
              {isLoading ? "Analyse en cours..." : "Analyser la Montre"}
            </button>

            <button
              onClick={handleReset}
              className="px-6 py-2 rounded-lg font-medium bg-gray-800 hover:bg-gray-700 text-white"
            >
              Réinitialiser
            </button>
          </div>
        </div>

        {/* Résultat */}
        <div className="bg-[#111a26] p-6 rounded-2xl shadow-xl overflow-auto">
          <h2 className="text-xl font-semibold mb-4 text-[#E2B44F]">
            Rapport d’Analyse
          </h2>
          <div className="text-gray-300 whitespace-pre-line text-sm leading-relaxed">
            {analysisResult
              ? analysisResult
              : "Votre rapport d’analyse détaillé apparaîtra ici."}
          </div>
        </div>
      </div>
    </div>
  );
}
