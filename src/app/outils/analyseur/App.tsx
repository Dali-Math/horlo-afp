'use client';

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { analyzeWatchImage } from './services/geminiService';
import type { AppState, AnalysisResult } from './types';

// Convertir un fichier image en Base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(',')[1]); // Supprime le préfixe data:mime;base64,
    };
    reader.onerror = reject;
  });
};

// --- Icônes SVG ---
const WatchIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
    <path d="M13 7h-2v5.414l3.293 3.293 1.414-1.414L13 11.586z" />
  </svg>
);

const UploadIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l-3.75 3.75M12 9.75l3.75 3.75M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM21 21v-3.75L12 8.25 8.25 12 17.25 21H21z" />
  </svg>
);

const ShareIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18 22a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-5v2h5v12H6V8h5V6H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12zM11 6.414V16h2V6.414l3.293 3.293 1.414-1.414L12 2.586l-5.707 5.707 1.414 1.414L11 6.414z" />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

// --- Barre de progression ---
const ProgressBarLoader = ({ progress }: { progress: number }) => (
  <div className="w-full max-w-md mx-auto px-4">
    <p className="text-lg font-medium text-slate-300 text-center">Génération du rapport...</p>
    <p className="text-sm text-slate-400 text-center mb-4">Notre horloger IA examine votre garde-temps...</p>
    <div className="w-full bg-slate-700 rounded-full h-2.5">
      <div
        className="bg-sky-500 h-2.5 rounded-full transition-all duration-500 ease-out"
        style={{
          width: `${progress}%`,
          backgroundImage:
            'linear-gradient(45deg, rgba(255,255,255,.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.15) 50%, rgba(255,255,255,.15) 75%, transparent 75%, transparent)',
          backgroundSize: '1rem 1rem',
        }}
      ></div>
    </div>
  </div>
);

// --- Composant upload image ---
interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
}
const ImageUploader = ({ onImageSelect }: ImageUploaderProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) onImageSelect(e.target.files[0]);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files?.[0]) onImageSelect(e.dataTransfer.files[0]);
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <label
        htmlFor="file-upload"
        className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-slate-800 border-slate-600 hover:bg-slate-700 hover:border-sky-500 transition-colors"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <UploadIcon className="w-10 h-10 mb-4 text-slate-400" />
          <p className="mb-2 text-sm text-slate-400">
            <span className="font-semibold text-sky-400">Cliquez pour télécharger</span> ou glissez-déposez
          </p>
          <p className="text-xs text-slate-500">PNG, JPG, ou WEBP</p>
        </div>
        <input id="file-upload" type="file" className="hidden" accept="image/png,image/jpeg,image/webp" onChange={handleFileChange} />
      </label>
    </div>
  );
};

// --- Affichage du rapport ---
const ReportDisplay = ({ report }: { report: string }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [copyFormat, setCopyFormat] = useState<'markdown' | 'text'>('markdown');

  const formattedReport = useMemo(() => {
    let processed = report.replace(/##/g, '<hr class="border-slate-700 my-8" />##');
    processed = processed
      .replace(/## (.*)/g, '<h2 class="font-lora text-3xl font-bold text-sky-300 mb-6">$1</h2>')
      .replace(/\* \*\*([^*]+):\*\* (.*)/g, (m, k, v) => {
        if (k.toLowerCase().includes('valeur marchande')) {
          return `<div class="mt-4 p-4 bg-amber-900/40 border-l-4 border-amber-500 rounded-r-md">
                    <strong class="font-semibold text-amber-300 text-base block mb-1">${k}:</strong>
                    <p class="text-amber-300/90 text-sm">${v}</p>
                  </div>`;
        }
        return `<div class="flex flex-col sm:flex-row items-start py-3 border-b border-slate-700/50">
                  <strong class="font-semibold text-slate-200 w-full sm:w-1/3 min-w-[180px] shrink-0 mb-1 sm:mb-0">${k}:</strong>
                  <span class="text-slate-300">${v}</span>
                </div>`;
      })
      .replace(/^\* (?!.*?\*\*.*\*\*.*$)(.*)/gm, '<li class="ml-5 list-disc marker:text-sky-400 text-slate-300 mb-2">$1</li>')
      .replace('<hr class="border-slate-700 my-8" />', '');
    return processed;
  }, [report]);

  const handleShare = useCallback(() => {
    const textToCopy =
      copyFormat === 'text'
        ? (() => {
            const temp = document.createElement('div');
            temp.innerHTML = formattedReport;
            return temp.innerText;
          })()
        : report;

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2500);
      })
      .catch(console.error);
  }, [report, copyFormat, formattedReport]);

  return (
    <div className="relative font-inter bg-slate-800/50 rounded-lg px-6 pb-6 pt-16 ring-1 ring-slate-700">
      <div className="absolute top-4 right-4 flex items-center gap-3">
        <div role="radiogroup" className="flex items-center rounded-md bg-slate-700 p-0.5 text-xs">
          {(['markdown', 'text'] as const).map((f) => (
            <button
              key={f}
              role="radio"
              aria-checked={copyFormat === f}
              onClick={() => setCopyFormat(f)}
              className={`px-2 py-1 rounded-sm font-semibold transition-colors ${
                copyFormat === f ? 'bg-sky-600 text-white' : 'text-slate-300 hover:bg-slate-600/50'
              }`}
            >
              {f === 'markdown' ? 'Markdown' : 'Texte'}
            </button>
          ))}
        </div>
        <button
          onClick={handleShare}
          className={`flex items-center gap-2 px-3 py-1.5 text-sm font-semibold rounded-md transition-all duration-200 ${
            isCopied ? 'bg-emerald-600 text-white cursor-default' : 'bg-slate-600 text-slate-100 hover:bg-slate-500'
          }`}
          disabled={isCopied}
        >
          {isCopied ? (
            <>
              <CheckIcon className="w-4 h-4" /> Copié !
            </>
          ) : (
            <>
              <ShareIcon className="w-4 h-4" /> Partager
            </>
          )}
        </button>
      </div>
      <div className="max-w-none text-base" dangerouslySetInnerHTML={{ __html: formattedReport }} />
    </div>
  );
};

// --- Composant principal ---
export default function App() {
  const [appState, setAppState] = useState<AppState>('initial');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const handleImageSelect = (file: File) => {
    setImageFile(file);
    setImageUrl(URL.createObjectURL(file));
    setAppState('initial');
    setAnalysisResult(null);
    setError(null);
  };

  const handleAnalyzeClick = useCallback(async () => {
    if (!imageFile) return;
    setAppState('loading');
    setError(null);
    setProgress(0);

    const interval = setInterval(() => setProgress((p) => Math.min(p + 1, 95)), 100);

    try {
      const b64 = await fileToBase64(imageFile);
      const res = await analyzeWatchImage(b64, imageFile.type);
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        setAnalysisResult(res);
        setAppState('result');
      }, 500);
    } catch (err: any) {
      clearInterval(interval);
      setError(err.message || 'Erreur inconnue.');
      setAppState('error');
    }
  }, [imageFile]);

  const handleReset = () => {
    setAppState('initial');
    setImageFile(null);
    setImageUrl(null);
    setAnalysisResult(null);
    setError(null);
    setProgress(0);
  };

  return (
    <main className="w-full h-full bg-[#F5F7FB] text-[#1E2736] font-sans p-4 md:p-8 box-border">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
        {/* Colonne gauche */}
        <div className="flex flex-col items-center p-6 bg-slate-800 rounded-xl shadow-lg ring-1 ring-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <WatchIcon className="w-8 h-8 text-sky-400" />
            <h1 className="text-xl md:text-2xl font-bold text-slate-100 tracking-tight">Analyseur de Montres IA</h1>
          </div>
          {imageUrl ? (
            <div className="w-full">
              <div className="relative aspect-square w-full max-w-md mx-auto mb-4 overflow-hidden rounded-lg shadow-inner">
                <img src={imageUrl} alt="Montre téléchargée" className="object-contain w-full h-full" />
              </div>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleAnalyzeClick}
                  disabled={appState === 'loading'}
                  className="px-6 py-2 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
                >
                  {appState === 'loading' ? 'Analyse en cours...' : 'Analyser la Montre'}
                </button>
                <button
                  onClick={handleReset}
                  className="px-6 py-2 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-500 transition-colors"
                >
                  Réinitialiser
                </button>
              </div>
            </div>
          ) : (
            <ImageUploader onImageSelect={handleImageSelect} />
          )}
        </div>

        {/* Colonne droite */}
        <div className="flex flex-col p-6 bg-slate-800 rounded-xl shadow-lg ring-1 ring-slate-700 min-h-[300px] lg:min-h-0 lg:max-h-[85vh]">
          <h2 className="text-xl font-semibold text-slate-200 mb-4">Rapport d'Analyse</h2>
          <div className="flex-grow flex items-center justify-center overflow-y-auto">
            {appState === 'initial' && !analysisResult && (
              <p className="text-center text-slate-400">Votre rapport d'analyse détaillé apparaîtra ici.</p>
            )}
            {appState === 'loading' && <ProgressBarLoader progress={progress} />}
            {appState === 'error' && (
              <div className="text-center text-red-400 bg-red-900/30 p-4 rounded-lg">
                <h3 className="font-bold mb-2">L'analyse a échoué</h3>
                <p>{error}</p>
              </div>
            )}
            {appState === 'result' && analysisResult && <ReportDisplay report={analysisResult.report} />}
          </div>
        </div>
      </div>
    </main>
  );
}
