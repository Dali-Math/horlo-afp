"use client";

import React, { useState, useCallback, useMemo } from "react";
import { analyzeWatchImage } from "./services/geminiService";
import type { AppState, AnalysisResult } from "./types";

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(",")[1]);
    reader.onerror = (error) => reject(error);
  });

export default function Analyseur() {
  const [appState, setAppState] = useState<AppState>("initial");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const handleImageSelect = (file: File) => {
    setImageFile(file);
    setImageUrl(URL.createObjectURL(file));
    setAppState("initial");
    setAnalysisResult(null);
    setError(null);
  };

  const handleAnalyzeClick = useCallback(async () => {
    if (!imageFile) return;

    setAppState("loading");
    setError(null);
    setAnalysisResult(null);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 1, 95));
    }, 100);

    try {
      const base64Image = await fileToBase64(imageFile);
      const result = await analyzeWatchImage(base64Image, imageFile.type);

      clearInterval(interval);
      setProgress(100);

      setTimeout(() => {
        setAnalysisResult(result);
        setAppState("result");
      }, 500);
    } catch (err: any) {
      clearInterval(interval);
      setError(err.message || "Une erreur inattendue s'est produite.");
      setAppState("error");
    }
  }, [imageFile]);

  const handleReset = () => {
    setAppState("initial");
    setImageFile(null);
    setImageUrl(null);
    setAnalysisResult(null);
    setError(null);
    setProgress(0);
  };

  const formattedReport = useMemo(() => {
    if (!analysisResult?.report) return "";
    let r = analysisResult.report
      .replace(/## (.*)/g, "<h2 class='text-xl font-semibold mb-2'>$1</h2>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(?!\*)(.*?)\*/g, "<em>$1</em>")
      .replace(/\n/g, "<br />");
    return r;
  }, [analysisResult]);

  return (
    <main className="min-h-screen bg-[#0f172a] text-slate-100 font-sans py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT */}
        <div className="bg-[#1e293b] rounded-lg shadow-lg p-6">
          <h1 className="flex items-center text-xl font-semibold mb-4 text-sky-400">
            <span className="mr-2">⏱️</span> Analyseur de Montres IA
          </h1>

          {imageUrl ? (
            <div className="flex flex-col items-center">
              <div className="w-full max-w-sm aspect-square mb-4 rounded-lg overflow-hidden shadow-md">
                <img
                  src={imageUrl}
                  alt="Montre téléchargée"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleAnalyzeClick}
                  disabled={appState === "loading"}
                  className="bg-sky-600 hover:bg-sky-500 px-5 py-2 rounded-md font-semibold transition"
                >
                  {appState === "loading"
                    ? "Analyse en cours..."
                    : "Analyser la Montre"}
                </button>
                <button
                  onClick={handleReset}
                  className="bg-slate-600 hover:bg-slate-500 px-5 py-2 rounded-md font-semibold transition"
                >
                  Réinitialiser
                </button>
              </div>
            </div>
          ) : (
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-slate-500 rounded-lg cursor-pointer bg-[#0f172a] hover:bg-slate-800 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 mb-3 text-sky-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0L8.25 13.5M12 9.75l3.75 3.75M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"
                />
              </svg>
              <p className="text-sm text-slate-400">
                <span className="font-semibold text-sky-400">
                  Cliquez pour télécharger
                </span>{" "}
                ou glissez-déposez
              </p>
              <p className="text-xs text-slate-500 mt-1">PNG, JPG, ou WEBP</p>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept="image/png, image/jpeg, image/webp"
                onChange={(e) => {
                  if (e.target.files?.[0]) handleImageSelect(e.target.files[0]);
                }}
              />
            </label>
          )}
        </div>

        {/* RIGHT */}
        <div className="bg-[#1e293b] rounded-lg shadow-lg p-6 overflow-y-auto">
          <h2 className="text-lg font-semibold text-slate-200 mb-3">
            Rapport d’Analyse
          </h2>

          {appState === "initial" && (
            <p className="text-slate-400 text-center mt-16">
              Votre rapport d’analyse détaillé apparaîtra ici.
            </p>
          )}

          {appState === "loading" && (
            <div className="w-full max-w-md mx-auto mt-16">
              <p className="text-center text-slate-400 mb-2">
                Génération du rapport...
              </p>
              <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-sky-500 h-2 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {appState === "error" && (
            <div className="text-center text-red-400 bg-red-900/30 p-4 rounded-lg mt-10">
              <h3 className="font-bold mb-2">Erreur</h3>
              <p>{error}</p>
            </div>
          )}

          {appState === "result" && analysisResult && (
            <div
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: formattedReport }}
            />
          )}
        </div>
      </div>
    </main>
  );
}
