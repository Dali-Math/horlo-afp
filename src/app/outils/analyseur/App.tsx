'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { analyzeWatchImage } from './services/geminiService';
import type { AnalyseResult } from './types';

// Convertit un fichier image en base64
const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = (err) => reject(err);
  });

// --- Icônes SVG ---
const WatchIcon = ({ className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className={className}>
    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
    <path d="M13 7h-2v5.414l3.293 3.293 1.414-1.414L13 11.586z"></path>
  </svg>
);

const UploadIcon = ({ className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l-3.75 3.75M12 9.75l3.75 3.75M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM21 21v-3.75L12 8.25 8.25 12 17.25 21H21z" />
  </svg>
);

const CheckIcon = ({ className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

// --- Barre de progression ---
const ProgressBarLoader = ({ progress }: { progress: number }) => (
  <div className="w-full max-w-md mx-auto px-4">
    <p className="text-lg font-medium text-slate-300 text-center">Génération du rapport...</p>
    <div className="w-full bg-slate-700 rounded-full h-2.5 mt-3">
      <div
        className="bg-sky-500 h-2.5 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  </div>
);

// --- Sélecteur d'image ---
const ImageUploader = ({ onImageSelect }: { onImageSelect: (file: File) => void }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) onImageSelect(e.target.files[0]);
  };
  return (
    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-slate-800 border-slate-600 hover:bg-slate-700 hover:border-sky-500 transition">
      <UploadIcon className="w-10 h-10 mb-3 text-slate-400" />
      <p className="text-slate-300 text-sm">Cliquez ou glissez une image ici</p>
      <p className="text-slate-500 text-xs">Formats : PNG, JPG, WEBP</p>
      <input type="file" accept="image/*" className="hidden" onChange={handleChange} />
    </label>
  );
};

// --- Rapport ---
const ReportDisplay = ({ report }: { report: string }) => {
  const formatted = useMemo(() => {
    return report
      .replace(/## (.*)/g, '<h2 class="text-sky-400 text-xl font-semibold mt-4 mb-2">$1</h2>')
      .replace(/\* \*\*([^*]+):\*\* (.*)/g, '<div class="mb-2"><b>$1 :</b> $2</div>')
      .replace(/\n/g, '<br/>');
  }, [report]);

  return (
    <div className="bg-slate-800/60 p-4 rounded-lg text-slate-300 mt-4 overflow-y-auto max-h-[70vh]" dangerouslySetInnerHTML={{ __html: formatted }} />
  );
};

// --- Application principale ---
export default function App() {
  const [state, setState] = useState<'initial' | 'loading' | 'result' | 'error'>('initial');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [result, setResult] = useState<AnalyseResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const handleImageSelect = (file: File) => {
    setImageFile(file);
    setImageUrl(URL.createObjectURL(file));
    setState('initial');
    setResult(null);
    setError(null);
  };

  const handleAnalyze = useCallback(async () => {
    if (!imageFile) return;
    setState('loading');
    setProgress(0);
    setError(null);

    const interval = setInterval(() => setProgress((p) => Math.min(p + 2, 95)), 150);

    try {
      const base64 = await fileToBase64(imageFile);
      const res = await analyzeWatchImage(base64, imageFile.type);
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        setResult(res);
        setState('result');
      }, 400);
    } catch (err: any) {
      clearInterval(interval);
      setError(err.message || 'Erreur inattendue.');
      setState('error');
    }
  }, [imageFile]);

  const handleReset = () => {
    setState('initial');
    setImageFile(null);
    setImageUrl(null);
    setResult(null);
    setError(null);
    setProgress(0);
  };

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Colonne gauche */}
        <div className="p-6 bg-slate-800 rounded-xl shadow-lg ring-1 ring-slate-700 flex flex-col items-center">
          <div className="flex items-center gap-3 mb-4">
            <WatchIcon className="w-8 h-8 text-sky-400" />
            <h1 className="text-2xl font-bold">Analyseur de Montres IA</h1>
          </div>

          {imageUrl ? (
            <>
              <img src={imageUrl} alt="Montre" className="w-full max-w-md rounded-lg mb-4" />
              <div className="flex gap-4">
                <button
                  onClick={handleAnalyze}
                  disabled={state === 'loading'}
                  className="px-5 py-2 bg-sky-600 rounded-lg hover:bg-sky-500 transition disabled:bg-slate-600"
                >
                  {state === 'loading' ? 'Analyse...' : 'Analyser'}
                </button>
                <button
                  onClick={handleReset}
                  className="px-5 py-2 bg-slate-600 rounded-lg hover:bg-slate-500 transition"
                >
                  Réinitialiser
                </button>
              </div>
            </>
          ) : (
            <ImageUploader onImageSelect={handleImageSelect} />
          )}
        </div>

        {/* Colonne droite */}
        <div className="p-6 bg-slate-800 rounded-xl shadow-lg ring-1 ring-slate-700">
          <h2 className="text-xl font-semibold mb-3">Rapport d’analyse</h2>
          {state === 'initial' && <p className="text-slate-400">Importez une image pour commencer.</p>}
          {state === 'loading' && <ProgressBarLoader progress={progress} />}
          {state === 'error' && <p className="text-red-400">{error}</p>}
          {state === 'result' && result && <ReportDisplay report={result.analysis} />}
        </div>
      </div>
    </main>
  );
}
