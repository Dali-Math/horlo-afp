'use client';

import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { AnalyseResult } from './types';

export default function App() {
  const [image, setImage] = useState<File | null>(null);
  const [result, setResult] = useState<AnalyseResult | null>(null);
  const [loading, setLoading] = useState(false);

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImage(file);
  };

  const analyzeImage = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const imageData = await image.arrayBuffer();
      const result = await model.generateContent([
        {
          inlineData: {
            data: Buffer.from(imageData).toString('base64'),
            mimeType: image.type,
          },
        },
        { text: 'Analyse horlogère complète de la montre : type, mouvement, boîtier, cadran, style, estimation qualitative.' },
      ]);

      const text = await result.response.text();
      setResult({ analysis: text });
    } catch (error) {
      console.error('Erreur lors de l’analyse :', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-yellow-400">
        Analyseur de montres (IA)
      </h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-4"
      />

      <button
        onClick={analyzeImage}
        disabled={!image || loading}
        className="bg-yellow-500 text-black px-6 py-2 rounded hover:bg-yellow-400 transition disabled:opacity-50"
      >
        {loading ? 'Analyse en cours...' : 'Analyser la montre'}
      </button>

      {result && (
        <div className="mt-6 bg-neutral-900 p-4 rounded-xl max-w-2xl text-sm leading-relaxed">
          <h2 className="text-yellow-400 mb-2">Résultat de l’analyse :</h2>
          <p>{result.analysis}</p>
        </div>
      )}
    </div>
  );
}
