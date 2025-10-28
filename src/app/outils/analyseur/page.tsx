'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { analyzeWatchImage } from './services/geminiService';
import type { AnalyseResult } from './types';
import { Upload, Watch, Share2, Loader2 } from 'lucide-react';

export default function App() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<AnalyseResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Convert image en base64
  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  // Analyse IA
  const handleAnalyze = useCallback(async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const base64 = await fileToBase64(file);
      const res = await analyzeWatchImage(base64, file.type);
      setResult(res);
    } catch (err: any) {
      setError(err.message || 'Erreur inconnue.');
    } finally {
      setLoading(false);
    }
  }, [file]);

  // Gestion du fichier
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files?.[0]) setFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => e.preventDefault();

  return (
    <section className="min-h-[80vh] bg-[#F5F7FB] px-4 py-10 flex justify-center items-center">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Bloc gauche : upload */}
        <div className="bg-[#1E2736] text-gray-100 rounded-2xl shadow-lg p-6 md:p-8 border border-[#2C3A4A] flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <Watch className="text-[#E2B44F]" size={24} />
            <h2 className="text-xl font-semibold">Analyseur de Montres IA</h2>
          </div>

          <label
            htmlFor="file-upload"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="flex flex-col justify-center items-center flex-1 border-2 border-dashed border-gray-500/50 rounded-xl cursor-pointer hover:border-[#E2B44F] transition-colors py-16"
          >
            <Upload className="text-gray-400 mb-3" size={40} />
            <p className="text-sm text-gray-300 mb-1">
              <span className="text-[#E2B44F] font-medium">Cliquez pour télécharger</span> ou glissez-déposez
            </p>
            <p className="text-xs text-gray-400">PNG, JPG, ou WEBP</p>
            <input
              id="file-upload"
              type="file"
              accept="image/png, image/jpeg, image/webp"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {file && (
            <div className="mt-6 text-sm text-gray-300 truncate">
              📁 <strong>Fichier sélectionné :</strong> {file.name}
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={!file || loading}
            className="mt-6 w-full bg-[#E2B44F] hover:bg-[#cda546] text-black font-semibold py-2.5 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={18} /> Analyse en cours...
              </>
            ) : (
              'Analyser la montre'
            )}
          </button>

          {error && (
            <p className="mt-4 text-red-400 bg-red-900/30 p-3 rounded-lg border border-red-700/40 text-sm">
              {error}
            </p>
          )}
        </div>

        {/* Bloc droit : résultat */}
        <div className="bg-[#1E2736] text-gray-100 rounded-2xl shadow-lg p-6 md:p-8 border border-[#2C3A4A] flex flex-col">
          <h2 className="text-xl font-semibold mb-4">Rapport d'Analyse</h2>

          <div className="flex-1 overflow-y-auto text-sm leading-relaxed text-gray-300 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
            {!result && !loading && !error && (
              <p className="text-center text-gray-500 mt-20">
                Votre rapport d'analyse détaillé apparaîtra ici.
              </p>
            )}

            {loading && (
              <div className="flex justify-center items-center h-full mt-20">
                <Loader2 className="animate-spin text-[#E2B44F]" size={32} />
              </div>
            )}

            {result && (
              <article
                className="prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: result.analysis }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
