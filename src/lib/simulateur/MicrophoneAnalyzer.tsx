'use client';
import { useState, useRef } from 'react';
import { analyzeAcoustics } from '@/lib/simulateur/modules/acoustics';

export default function MicrophoneAnalyzer() {
  const [isRecording, setIsRecording] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    const chunks: BlobPart[] = [];

    mediaRecorderRef.current.ondataavailable = (e) => chunks.push(e.data);
    mediaRecorderRef.current.onstop = async () => {
      const blob = new Blob(chunks, { type: 'audio/webm' });
      const result = await analyzeAcoustics(blob);
      setAnalysis(result);
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    mediaRecorderRef.current?.stream.getTracks().forEach(t => t.stop());
    setIsRecording(false);
  };

  return (
    <div className="param-group">
      <label>🎙️ Analyse Acoustique</label>
      <button 
        className="btn" 
        onClick={isRecording ? stopRecording : startRecording}
        style={{ backgroundColor: isRecording ? '#ff4757' : 'var(--accent)' }}
      >
        {isRecording ? '🔴 ARRÊTER' : '🎤 DÉMARRER'}
      </button>
      {analysis && (
        <div className="mt-2 text-xs">
          <div>Bruit rotor: {analysis.rotorNoise} dB</div>
          <div>Irregularité: {analysis.beatIrregularity.toFixed(2)}</div>
          {analysis.anomalies.map((a: string, i: number) => (
            <div key={i} className="text-yellow-400">⚠️ {a}</div>
          ))}
        </div>
      )}
    </div>
  );
}
