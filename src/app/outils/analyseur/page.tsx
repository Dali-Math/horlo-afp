'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// Import du composant principal en client-side only
const App = dynamic(() => import('./App'), { ssr: false });

export default function AnalyseurPage() {
  // Vérification de la clé Gemini uniquement au rendu client
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  // Message de sécurité si la clé n’est pas détectée
  if (!apiKey) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center bg-[#0a0a0a] text-gray-300 px-4">
        <p className="text-[#E2B44F] text-lg font-semibold mb-3">
          ⚠️ Clé Gemini API manquante
        </p>
        <p className="text-sm text-gray-400 max-w-md">
          Ajoute <code className="bg-gray-800 px-2 py-1 rounded">NEXT_PUBLIC_GEMINI_API_KEY</code>{' '}
          dans <strong>Vercel → Settings → Environment Variables</strong> pour Production, Preview et Development.
        </p>
      </div>
    );
  }

  // Rend le vrai composant une fois la clé prête
  return <App />;
}
