'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { analyzeWatchImage } from './services/geminiService';
import type { AnalyseResult } from './types';
import { Upload, Watch, Loader2, RefreshCcw } from 'lucide-react';

// Ces lignes doivent être juste après les imports :


export default function App() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<AnalyseResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiReady, setApiReady] = useState(false);

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!key) {
      console.error('❌ Clé API Gemini non détectée.');
      setError('Clé API Gemini non détectée. Vérifie ta configuration sur Vercel.');
    } else {
      console.log('✅ Clé API détectée côté client.');
      setApiReady(true);
    }
  }, []);

  const fileToBase64 = (f: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(f);
    });

  const onPicked = (f: File) => {
    setFile(f);
    setPreviewUrl(URL.createObjectURL(f));
    setResult(null);
    setError(null);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) onPicked(e.target.files[0]);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files?.[0]) onPicked(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => e.preventDefault();

  const handleAnalyze = useCallback(async () => {
    if (!file) return;
    if (!apiReady) {
      setError('Clé API manquante ou invalide.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const b64 = await fileToBase64(file);
      const res = await analyzeWatchImage(b64, file.type);
      setResult(res);
    } catch (err: any) {
      console.error('Erreur analyse:', err);
      setError(err?.message || 'Erreur inconnue pendant l’analyse.');
    } finally {
      setLoading(false);
    }
  }, [file, apiReady]);

  const handleReset = () => {
    setFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
  };

  const formatMarkdown = (text: string): string => {
    return text
      .replace(/^## (.*?)$/gm, '<h2 class="text-[#E2B44F] text-xl font-bold mt-6 mb-3">$1</h2>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#E2B44F] font-semibold">$1</strong>')
      .replace(/^\* (.*?)$/gm, '<li class="ml-5 mb-2">• $1</li>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <section className="min-h-[80vh] bg-[#F5F7FB] px-4 py-10 flex justify-center items-start">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Zone gauche */}
        <div className="bg-[#1E2736] text-gray-100 rounded-2xl shadow-lg p-6 md:p-8 border border-[#2C3A4A]">
          <div className="flex items-center gap-3 mb-6">
            <Watch className="text-[#E2B44F]" size={22} />
            <h2 className="text-lg md:text-xl font-semibold">Analyseur de Montres IA</h2>
          </div>

          {!previewUrl ? (
            <label
              htmlFor="file-upload"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="flex flex-col justify-center items-center border-2 border-dashed border-gray-500/50 rounded-xl cursor-pointer hover:border-[#E2B44F] transition-colors py-14"
            >
              <Upload className="text-gray-400 mb-3" size={38} />
              <p className="text-sm text-gray-300 mb-1">
                <span className="text-[#E2B44F] font-medium">Cliquez pour télécharger</span> ou glissez-déposez
              </p>
              <p className="text-xs text-gray-400">PNG, JPG, ou WEBP</p>
              <input
                id="file-upload"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleInput}
                className="hidden"
              />
            </label>
          ) : (
            <div className="w-full">
              <div className="relative w-full aspect-square bg-black/10 rounded-lg overflow-hidden mb-4">
                <img src={previewUrl} alt="Aperçu montre" className="object-contain w-full h-full" />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAnalyze}
                  disabled={!file || loading || !apiReady}
                  className="px-5 py-2 bg-[#E2B44F] hover:bg-[#cda546] text-black font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={18} />
                      Analyse en cours...
                    </>
                  ) : (
                    'Analyser la Montre'
                  )}
                </button>

                <button
                  onClick={handleReset}
                  className="px-5 py-2 bg-[#2C3A4A] hover:bg-[#34465a] text-gray-100 rounded-lg transition flex items-center gap-2"
                >
                  <RefreshCcw size={16} />
                  Réinitialiser
                </button>
              </div>
            </div>
          )}

          {error && (
            <p className="mt-5 text-red-300 bg-red-900/30 p-3 rounded-lg border border-red-700/40 text-sm">
              {error}
            </p>
          )}
        </div>

        {/* Zone droite */}
        <div className="bg-[#1E2736] text-gray-100 rounded-2xl shadow-lg p-6 md:p-8 border border-[#2C3A4A]">
          <h2 className="text-lg md:text-xl font-semibold mb-4">Rapport d&apos;Analyse</h2>

          {!result && !loading && (
            <p className="text-center text-gray-400 mt-24">
              Votre rapport d&apos;analyse détaillé apparaîtra ici.
            </p>
          )}

          {loading && (
            <div className="flex justify-center items-center h-[200px]">
              <Loader2 className="animate-spin text-[#E2B44F]" size={30} />
            </div>
          )}

          {result && (
            <article
              className="prose prose-invert max-w-none text-gray-100 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: formatMarkdown(result.analysis) }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
