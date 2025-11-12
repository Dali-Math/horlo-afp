'use client';
import { useState } from 'react';

export default function MicrophoneAnalyzer() {
  const [isListening, setIsListening] = useState(false);

  const startAnalysis = () => {
    setIsListening(true);
    setTimeout(() => setIsListening(false), 3000);
  };

  return (
    <div className="param-group">
      <label>🎤 Analyse Acoustique</label>
      <button className="btn-secondary" onClick={startAnalysis}>
        {isListening ? 'ANALYSE EN COURS...' : 'DÉMARRER ANALYSE'}
      </button>
    </div>
  );
}
