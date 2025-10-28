import React, { useState, useCallback, useMemo } from 'react';
import { analyzeWatchImage } from './services/geminiService';
import type { AppState, AnalysisResult } from './types';

// Helper function to convert file to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // remove the `data:mimeType;base64,` prefix
      resolve(result.split(',')[1]);
    };
    reader.onerror = (error) => reject(error);
  });
};

// --- SVG Icons ---
const WatchIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
        <path d="M13 7h-2v5.414l3.293 3.293 1.414-1.414L13 11.586z"></path>
        <path d="M12.253 2.023A10.016 10.016 0 0 1 12 2a10.018 10.018 0 0 1 7.01 2.99l.243-.243L20 4v3h-3l.939-.939a8.003 8.003 0 0 0-11.878 0L7 7H4V4l.757.757.243-.243A10.016 10.016 0 0 1 11.747 2.023l.253.001zM4 17h3l-.939.939a8.003 8.003 0 0 0 11.878 0L17 17h3v3l-1.99-.99-.243-.243A10.018 10.018 0 0 1 12 22a10.016 10.016 0 0 1-6.747-2.78l-.253-.263z"></path>
    </svg>
);

const UploadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l-3.75 3.75M12 9.75l3.75 3.75M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM21 21v-3.75L12 8.25 8.25 12 17.25 21H21z" />
    </svg>
);

const ShareIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M18 22a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-5v2h5v12H6V8h5V6H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12zM11 6.414V16h2V6.414l3.293 3.293 1.414-1.414L12 2.586l-5.707 5.707 1.414 1.414L11 6.414z"></path>
    </svg>
);

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
);


const ProgressBarLoader: React.FC<{ progress: number }> = ({ progress }) => (
    <div className="w-full max-w-md mx-auto px-4">
      <p className="text-lg font-medium text-slate-300 text-center">Génération du rapport...</p>
      <p className="text-sm text-slate-400 text-center mb-4">Notre horloger IA examine votre garde-temps...</p>
      <div className="w-full bg-slate-700 rounded-full h-2.5">
        <div 
          className="bg-sky-500 h-2.5 rounded-full transition-all duration-500 ease-out" 
          style={{ 
            width: `${progress}%`,
            backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.15) 50%, rgba(255,255,255,.15) 75%, transparent 75%, transparent)',
            backgroundSize: '1rem 1rem'
          }}
        ></div>
      </div>
    </div>
);


// --- UI Components (Defined outside App to prevent re-renders) ---

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
}
const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onImageSelect(event.target.files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      onImageSelect(event.dataTransfer.files[0]);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <label
        htmlFor="file-upload"
        className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-slate-800 border-slate-600 hover:bg-slate-700 hover:border-sky-500 transition-colors"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <UploadIcon className="w-10 h-10 mb-4 text-slate-400" />
            <p className="mb-2 text-sm text-slate-400"><span className="font-semibold text-sky-400">Cliquez pour télécharger</span> ou glissez-déposez</p>
            <p className="text-xs text-slate-500">PNG, JPG, ou WEBP</p>
        </div>
        <input id="file-upload" type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleFileChange} />
      </label>
    </div>
  );
};


interface ReportDisplayProps {
  report: string;
}
const ReportDisplay: React.FC<ReportDisplayProps> = ({ report }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [copyFormat, setCopyFormat] = useState<'markdown' | 'text'>('markdown');

  const formattedReport = useMemo(() => {
    // Add a divider before every H2, then remove the first one at the end.
    let processedReport = report.replace(/##/g, '<hr class="border-slate-700 my-8" />##');

    processedReport = processedReport
      // Style H2 Headings with Lora font
      .replace(/## (.*)/g, '<h2 class="font-lora text-3xl font-bold text-sky-300 mb-6">$1</h2>')
      
      // Style key-value list items with a clean, row-based layout
      .replace(/\* \*\*([^*]+):\*\* (.*)/g, (match, key, value) => {
        // Special, highlighted style for the estimated value disclaimer
        if (key.toLowerCase().includes('valeur marchande estimée')) {
          return `<div class="mt-4 p-4 bg-amber-900/40 border-l-4 border-amber-500 rounded-r-md">
                      <strong class="font-semibold text-amber-300 text-base block mb-1">${key}:</strong>
                      <p class="text-amber-300/90 text-sm">${value}</p>
                  </div>`;
        }
        // Standard row for other details
        return `<div class="flex flex-col sm:flex-row items-start py-3 border-b border-slate-700/50">
                    <strong class="font-semibold text-slate-200 w-full sm:w-1/3 min-w-[180px] shrink-0 mb-1 sm:mb-0">${key}:</strong>
                    <span class="text-slate-300">${value}</span>
                </div>`;
      })
      
      // Style simple list items (for the "History and Fun Facts" section)
      // Uses a negative lookahead to match list items that are NOT key-value pairs.
      .replace(/^\* (?!.*?\*\*.*\*\*.*$)(.*)/gm, '<li class="ml-5 list-disc marker:text-sky-400 text-slate-300 mb-2">$1</li>')
      
      // Remove the very first HR tag added at the beginning
      .replace('<hr class="border-slate-700 my-8" />', '');

      return processedReport;
  }, [report]);
  
  const handleShare = useCallback(() => {
    let textToCopy: string;

    if (copyFormat === 'text') {
        const tempElement = document.createElement('div');
        tempElement.innerHTML = formattedReport;
        textToCopy = tempElement.innerText;
    } else { // 'markdown'
        textToCopy = report;
    }

    navigator.clipboard.writeText(textToCopy).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }).catch(err => {
      console.error('Failed to copy report to clipboard:', err);
    });
  }, [report, copyFormat, formattedReport]);

  return (
    <div className="relative font-inter bg-slate-800/50 rounded-lg px-6 pb-6 pt-16 ring-1 ring-slate-700">
        <div className="absolute top-4 right-4 flex items-center gap-3">
            <div role="radiogroup" className="flex items-center rounded-md bg-slate-700 p-0.5 text-xs">
                <button
                    role="radio"
                    aria-checked={copyFormat === 'markdown'}
                    onClick={() => setCopyFormat('markdown')}
                    className={`px-2 py-1 rounded-sm font-semibold transition-colors ${
                        copyFormat === 'markdown'
                        ? 'bg-sky-600 text-white'
                        : 'text-slate-300 hover:bg-slate-600/50'
                    }`}
                >
                    Markdown
                </button>
                <button
                    role="radio"
                    aria-checked={copyFormat === 'text'}
                    onClick={() => setCopyFormat('text')}
                    className={`px-2 py-1 rounded-sm font-semibold transition-colors ${
                        copyFormat === 'text'
                        ? 'bg-sky-600 text-white'
                        : 'text-slate-300 hover:bg-slate-600/50'
                    }`}
                >
                    Texte
                </button>
            </div>
            <button
                onClick={handleShare}
                className={`flex items-center gap-2 px-3 py-1.5 text-sm font-semibold rounded-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 ${
                    isCopied
                    ? 'bg-emerald-600 text-white cursor-default'
                    : 'bg-slate-600 text-slate-100 hover:bg-slate-500'
                }`}
                disabled={isCopied}
                aria-live="polite"
            >
            {isCopied ? (
                <>
                <CheckIcon className="w-4 h-4" />
                Copié !
                </>
            ) : (
                <>
                <ShareIcon className="w-4 h-4" />
                Partager
                </>
            )}
            </button>
        </div>
      <div className="max-w-none text-base" 
           dangerouslySetInnerHTML={{ __html: formattedReport }} />
    </div>
  );
};

// --- Main App Component ---

function App() {
  const [appState, setAppState] = useState<AppState>('initial');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const handleImageSelect = (file: File) => {
    setImageFile(file);
    setImageUrl(URL.createObjectURL(file));
    setAppState('initial'); // Reset state if a new image is selected
    setAnalysisResult(null);
    setError(null);
  };

  const handleAnalyzeClick = useCallback(async () => {
    if (!imageFile) return;

    setAppState('loading');
    setError(null);
    setAnalysisResult(null);
    setProgress(0);

    // Simulate progress bar filling up to 95% over 10 seconds
    const interval = setInterval(() => {
        setProgress(prev => Math.min(prev + 1, 95));
    }, 100);

    try {
      const base64Image = await fileToBase64(imageFile);
      const result = await analyzeWatchImage(base64Image, imageFile.type);
      
      clearInterval(interval); // Stop the slow progression
      setProgress(100); // Complete the progress bar

      setTimeout(() => {
        setAnalysisResult(result);
        setAppState('result');
      }, 500); // Short delay to show 100% before switching view
      
    } catch (err: any) {
      clearInterval(interval);
      setError(err.message || 'An unexpected error occurred.');
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
    <main className="w-full h-full bg-slate-900 text-slate-100 font-sans p-4 md:p-8 box-border">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
        
        {/* Left Column: Uploader and Image Preview */}
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

        {/* Right Column: Results */}
        <div className="flex flex-col p-6 bg-slate-800 rounded-xl shadow-lg ring-1 ring-slate-700 min-h-[300px] lg:min-h-0 lg:max-h-[85vh]">
          <h2 className="text-xl font-semibold text-slate-200 mb-4">Rapport d'Analyse</h2>
          <div className="flex-grow flex items-center justify-center overflow-y-auto">
            {appState === 'initial' && !analysisResult && (
              <div className="text-center text-slate-400">
                <p>Votre rapport d'analyse détaillé apparaîtra ici.</p>
              </div>
            )}
            {appState === 'loading' && <ProgressBarLoader progress={progress} />}
            {appState === 'error' && (
              <div className="text-center text-red-400 bg-red-900/30 p-4 rounded-lg">
                <h3 className="font-bold mb-2">L'analyse a échoué</h3>
                <p>{error}</p>
              </div>
            )}
            {appState === 'result' && analysisResult && (
              <div className="w-full self-start">
                  <ReportDisplay report={analysisResult.report} />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
