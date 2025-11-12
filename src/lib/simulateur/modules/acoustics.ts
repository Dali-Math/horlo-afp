import { AcousticAnalysis } from '../types';

export async function analyzeAcoustics(audioBlob: Blob): Promise<AcousticAnalysis> {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const arrayBuffer = await audioBlob.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  
  const analyser = audioContext.createAnalyser();
  analyser.fftSize = 2048;
  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(analyser);
  
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  analyser.getByteFrequencyData(dataArray);
  
  // Détection rotor (500-2000Hz)
  const rotorFreq = dataArray.slice(50, 200);
  const rotorNoise = Math.max(...rotorFreq);
  
  // Coefficient de variation battements
  const tickIntervals = extractTickIntervals(dataArray);
  const beatCV = calculateCV(tickIntervals);
  
  return {
    rotorNoise,
    beatIrregularity: beatCV,
    tickingAmplitude: Math.max(...dataArray),
    anomalies: [
      ...(beatCV > 0.15 ? ['Battement irrégulier'] : []),
      ...(rotorNoise > 180 ? ['Bruit rotor usé'] : [])
    ]
  };
}

function extractTickIntervals(frequencies: Uint8Array): number[] {
  // Algorithme détection pics battements
  const threshold = 150;
  const intervals: number[] = [];
  let lastPeak = 0;
  
  for (let i = 10; i < frequencies.length - 10; i++) {
    if (frequencies[i] > threshold && frequencies[i] > frequencies[i-1] && frequencies[i] > frequencies[i+1]) {
      if (lastPeak > 0) intervals.push(i - lastPeak);
      lastPeak = i;
    }
  }
  return intervals;
}

function calculateCV(intervals: number[]): number {
  if (intervals.length < 2) return 0;
  const mean = intervals.reduce((a, b) => a + b, 0) / intervals.length;
  const variance = intervals.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / intervals.length;
  return Math.sqrt(variance) / mean;
}
