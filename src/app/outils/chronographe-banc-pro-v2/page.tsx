'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { jsPDF } from 'jspdf';
import { supabase } from '@/lib/supabase';
import { initDB, saveMeasurement, loadMeasurements } from '@/lib/db';
import { SIGNATURE_PROFILES, SignatureProfile } from '@/data/signatures';
import { CALIBRE_DB } from '@/data/calibres';
import { POSITIONS } from '@/data/positions';
import { TimingData } from '@/types';
import { 
  Timer, Activity, BarChart2, Download, Info, Play, Square, RotateCw, Volume2,
  CheckCircle, AlertTriangle, Cpu, FileText, TrendingUp, Thermometer, History, Split,
  Save, Share2, Maximize2, MessageCircle
} from 'lucide-react';
import Link from 'next/link';

export default function ChronographeBancPro() {
  const [isRunning, setIsRunning] = useState(false);
  const [currentPosition, setCurrentPosition] = useState('DU');
  const [selectedRate, setSelectedRate] = useState(28800);
  const [liftAngle, setLiftAngle] = useState(52);
  const [measurementDuration, setMeasurementDuration] = useState(20);
  const [audioFeedback, setAudioFeedback] = useState(false);
  const [selectedCalibre, setSelectedCalibre] = useState('');
  const [temperature, setTemperature] = useState(23);
  const [showGraph, setShowGraph] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState('eta-2824-neuf');
  const [data, setData] = useState<TimingData[]>([]);
  const [sessionResults, setSessionResults] = useState<Record<string, TimingData[]>>({});
  const [averages, setAverages] = useState<Record<string, any>>({});
  const [elapsed, setElapsed] = useState(0);
  const [movingAvg, setMovingAvg] = useState({ amplitude: 0, rate: 0 });
  const [tooltip, setTooltip] = useState({ show: false, text: '', x: 0, y: 0 });
  const [showSavedModal, setShowSavedModal] = useState(false);
  const [profileDescription, setProfileDescription] = useState('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const graphRef = useRef<HTMLDivElement>(null);
  const [graphSize, setGraphSize] = useState({ width: 0, height: 0 });
  const beatPeriod = 3600000 / selectedRate;

  useEffect(() => {
    if (selectedCalibre) {
      const calibre = CALIBRE_DB.find(c => c.id === selectedCalibre);
      if (calibre) {
        setLiftAngle(calibre.liftAngle);
        setSelectedRate(calibre.beatRate);
      }
    }
  }, [selectedCalibre]);

  useEffect(() => {
    const profile = SIGNATURE_PROFILES.find(p => p.id === selectedProfile);
    if (profile) {
      setSelectedRate(profile.beatRate);
      setLiftAngle(profile.liftAngle);
      setProfileDescription(profile.description);
    }
  }, [selectedProfile]);

  useEffect(() => {
    if (audioFeedback && !audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }, [audioFeedback]);

  useEffect(() => {
    const updateSize = () => {
      if (graphRef.current) {
        setGraphSize({
          width: graphRef.current.clientWidth,
          height: graphRef.current.clientHeight
        });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    const loadLastSession = async () => {
      const measurements = await loadMeasurements();
      if (measurements.length > 0) {
        const last = measurements[measurements.length - 1];
        setSessionResults(last.sessionResults);
        setAverages(last.averages);
        setSelectedCalibre(last.calibre);
      }
    };
    loadLastSession();
  }, []);

  useEffect(() => {
    if (!isRunning || !audioFeedback) return;
    const speak = (text: string) => {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'fr-FR';
        utterance.rate = 0.9;
        utterance.volume = 0.3;
        speechSynthesis.speak(utterance);
      }
    };
    const interval = setInterval(() => {
      const latest = data[data.length - 1];
      if (!latest) return;
      if (latest.amplitude < 200) {
        speak(`Alerte amplitude critique : ${latest.amplitude} degrés`);
      } else if (Math.abs(latest.rate) > 20) {
        speak(`Rate élevé : ${latest.rate.toFixed(1)} secondes par jour`);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [isRunning, audioFeedback, data]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        isRunning ? handleStop() : handleStart();
      } else if (e.code === 'KeyR' && e.ctrlKey) {
        e.preventDefault();
        handleReset();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRunning]);

  const playBeatSound = useCallback(() => {
    if (!audioFeedback || !audioContextRef.current) return;
    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.frequency.value = 800;
    gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.03);
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.03);
  }, [audioFeedback]);

  const generateSignal = useCallback((time: number): TimingData => {
    const profile = SIGNATURE_PROFILES.find(p => p.id === selectedProfile);
    const baseAmplitude = profile?.baseAmplitude || 290;
    const amplitudeDrift = Math.sin(time * 0.001) * 15;
    const thermalNoise = (Math.random() - 0.5) * 8;
    const tempEffect = (temperature - 23) * 0.1;
    const profileDrift = profile?.driftRate || 0;
    let jitter = 0.2;
    if (profile?.jitterPattern === 'sporadic') {
      jitter = Math.random() > 0.85 ? Math.random() * 1.5 : 0.2;
    } else if (profile?.jitterPattern === 'choppy') {
      jitter = Math.random() * 0.8;
    } else if (profile?.jitterPattern === 'drifting') {
      jitter = Math.sin(time * 0.0005) * 0.3 + Math.random() * 0.2;
    }
    const amplitude = Math.max(180, Math.min(320, baseAmplitude + amplitudeDrift + thermalNoise + tempEffect));
    const beatError = (Math.sin(time * 0.0005) * 0.3 + (Math.random() - 0.5) * 0.2);
    const periodError = (Math.random() - 0.5) * 0.0001 + tempEffect * 0.00001 + profileDrift * 0.00001157;
    const rate = periodError * 86400 * 1000;
    const qFactor = amplitude / (jitter + 0.1);
    return {
      timestamp: time, amplitude: Math.round(amplitude), beatError: parseFloat(beatError.toFixed(1)),
      rate: parseFloat(rate.toFixed(1)), period: beatPeriod + periodError,
      jitter: parseFloat(jitter.toFixed(2)), liftAngle: liftAngle, position: currentPosition,
      qFactor: parseFloat(qFactor.toFixed(0)), temperature: temperature, profileId: selectedProfile
    };
  }, [beatPeriod, liftAngle, currentPosition, temperature, selectedProfile]);

  useEffect(() => {
    if (isRunning) {
      if (!startTimeRef.current) startTimeRef.current = Date.now();
      intervalRef.current = setInterval(() => {
        const now = Date.now();
        const currentElapsed = (now - (startTimeRef.current || now)) / 1000;
        setElapsed(currentElapsed);
        if (currentElapsed >= measurementDuration) { handleStop(); return; }
        const newData = generateSignal(now);
        setData(prev => [...prev, newData]);
        setSessionResults(prev => ({ ...prev, [currentPosition]: [...(prev[currentPosition] || []), newData] }));
        const recentData = [...data.slice(-19), newData];
        const avgAmp = recentData.reduce((s, d) => s + d.amplitude, 0) / recentData.length;
        const avgRate = recentData.reduce((s, d) => s + d.rate, 0) / recentData.length;
        setMovingAvg({ amplitude: avgAmp, rate: avgRate });
        if (audioFeedback && Math.random() > 0.7) playBeatSound();
      }, 500);
    } else { if (intervalRef.current) clearInterval(intervalRef.current); }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isRunning, measurementDuration, generateSignal, currentPosition, audioFeedback, playBeatSound, data]);

  const diagnose = useCallback((stats: any, calibreId: string) => {
    const calibre = CALIBRE_DB.find(c => c.id === calibreId);
    const profile = SIGNATURE_PROFILES.find(p => p.id === selectedProfile);
    const issues: string[] = [];
    if (!calibre) return issues;
    if (stats.amplitude.avg < calibre.minAmplitude) issues.push(`Amplitude critique: ${stats.amplitude.avg.toFixed(0)}° < ${calibre.minAmplitude}°`);
    if (stats.jitter.avg > 0.5) issues.push("Signal irrégulier - vérifier escapement");
    if (stats.beatError.abs > calibre.maxBeatError) issues.push(`Beat error élevé: ${stats.beatError.abs.toFixed(1)}ms > ${calibre.maxBeatError}ms`);
    if (stats.qFactor.avg < 1500) issues.push(`Q factor faible: ${stats.qFactor.avg.toFixed(0)} - balancier usé?`);
    if (profile?.typicalIssues) issues.push(...profile.typicalIssues);
    return issues;
  }, [selectedProfile]);

  const handleStart = () => { setIsRunning(true); setElapsed(0); startTimeRef.current = Date.now(); };
  const handleStop = async () => {
    setIsRunning(false); startTimeRef.current = null; setElapsed(0);
    const newAverages: Record<string, any> = {};
    Object.entries(sessionResults).forEach(([pos, posData]) => {
      const n = posData.length; if (n === 0) return;
      const avgAmplitude = posData.reduce((sum, d) => sum + d.amplitude, 0) / n;
      const avgBeatError = posData.reduce((sum, d) => sum + d.beatError, 0) / n;
      const avgRate = posData.reduce((sum, d) => sum + d.rate, 0) / n;
      const avgJitter = posData.reduce((sum, d) => sum + d.jitter, 0) / n;
      const avgQFactor = posData.reduce((sum, d) => sum + (d.qFactor || 0), 0) / n;
      const amplitudes = posData.map(d => d.amplitude);
      const isochronism = (Math.max(...amplitudes) - Math.min(...amplitudes)) / Math.max(...amplitudes) * 100;
      const stats = {
        amplitude: { avg: avgAmplitude, std: Math.sqrt(posData.reduce((sum, d) => sum + Math.pow(d.amplitude - avgAmplitude, 2), 0) / n) },
        beatError: { avg: avgBeatError, abs: Math.abs(avgBeatError) },
        rate: { avg: avgRate, std: Math.sqrt(posData.reduce((s, d) => s + Math.pow(d.rate - avgRate, 2), 0) / n) },
        jitter: { avg: avgJitter }, qFactor: { avg: avgQFactor }, isochronism, count: n,
        isCOSC: Math.abs(avgRate) <= 5 && avgAmplitude >= 260 && Math.abs(avgBeatError) <= 0.3,
        diagnostics: diagnose({ amplitude: { avg: avgAmplitude }, jitter: { avg: avgJitter }, beatError: { abs: Math.abs(avgBeatError) }, qFactor: { avg: avgQFactor } }, selectedCalibre)
      };
      newAverages[pos] = stats;
    });
    setAverages(newAverages);
    await saveMeasurement({ sessionResults, averages: newAverages, calibre: selectedCalibre, duration: measurementDuration, notes: selectedProfile });
    setShowSavedModal(true); setTimeout(() => setShowSavedModal(false), 3000);
  };
  const handleReset = () => { setIsRunning(false); setData([]); setSessionResults({}); setAverages({}); setElapsed(0); setMovingAvg({ amplitude: 0, rate: 0 }); startTimeRef.current = null; };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFont('helvetica', 'bold'); doc.setFontSize(24); doc.text('HORLOLEARN', 105, 30, { align: 'center' });
    doc.setFontSize(16); doc.text('Rapport Chronographe de Banc Pro', 105, 45, { align: 'center' });
    doc.setFont('helvetica', 'normal'); doc.setFontSize(12);
    doc.text(`Généré le: ${new Date().toLocaleDateString('fr-CH', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}`, 20, 65);
    doc.text(`Calibre: ${selectedCalibre || 'Manuel'}`, 20, 75);
    doc.text(`Profil: ${SIGNATURE_PROFILES.find(p => p.id === selectedProfile)?.name || 'Standard'}`, 20, 85);
    doc.text(`Température: ${temperature}°C`, 20, 95); doc.text(`Durée: ${measurementDuration}s`, 20, 105);
    let yPos = 120; doc.setFont('helvetica', 'bold'); doc.text('RÉSULTATS PAR POSITION', 20, yPos); yPos += 10;
    doc.setFontSize(10); doc.text('Position', 20, yPos); doc.text('Amplitude', 70, yPos); doc.text('Rate', 110, yPos); doc.text('Beat Error', 150, yPos); doc.text('Q Factor', 190, yPos); yPos += 5;
    doc.setFont('helvetica', 'normal');
    Object.entries(averages).forEach(([pos, stats]: [string, any]) => {
      yPos += 8; doc.text(POSITIONS.find(p => p.id === pos)?.name || pos, 20, yPos);
      doc.text(`${stats.amplitude.avg.toFixed(1)}°`, 70, yPos);
      doc.text(`${stats.rate.avg > 0 ? '+' : ''}${stats.rate.avg.toFixed(1)}s/j`, 110, yPos);
      doc.text(`${stats.beatError.abs.toFixed(1)}ms`, 150, yPos); doc.text(`${stats.qFactor.avg.toFixed(0)}`, 190, yPos);
    });
    yPos += 15; const isCOSC = Object.values(averages).every((stats: any) => stats.isCOSC);
    if (isCOSC) { doc.setTextColor(0, 255, 0); doc.setFont('helvetica', 'bold'); doc.text('✓ COMPLIANT COSC', 105, yPos, { align: 'center' }); }
    else { doc.setTextColor(255, 0, 0); doc.text('✗ NON-COMPLIANT COSC', 105, yPos, { align: 'center' }); }
    doc.setTextColor(0, 0, 0); doc.setFontSize(8);
    doc.text('© HorloLearn.ch - Analyse horlogère collaborative', 105, 285, { align: 'center' });
    doc.text('Generated with HorloLearn Pro v4.1', 105, 290, { align: 'center' });
    doc.save(`horlolearn_${selectedCalibre || 'montre'}_${Date.now()}.pdf`);
  };

  const exportCSV = () => {
    const headers = ['Position', 'Amplitude Moy (°)', 'Ecart-type', 'Beat Error (ms)', 'Rate (s/j)', 'Jitter (ms)', 'Q Factor', 'Isochronisme (%)'];
    const rows = Object.entries(averages).map(([pos, stats]: [string, any]) => [
      POSITIONS.find(p => p.id === pos)?.name || pos,
      stats.amplitude.avg.toFixed(1), stats.amplitude.std.toFixed(2), stats.beatError.abs.toFixed(1),
      stats.rate.avg.toFixed(1), stats.jitter.avg.toFixed(2), stats.qFactor.avg.toFixed(0), stats.isochronism.toFixed(1)
    ]);
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url;
    a.download = `horlolearn_${Date.now()}.csv`; a.click();
  };

  const publishToGallery = async () => {
    try {
      const inserts = Object.entries(averages).map(([pos, stats]: [string, any]) => ({
        calibre: selectedCalibre || 'Inconnu', position: POSITIONS.find(p => p.id === pos)?.name || pos,
        amplitude_avg: stats.amplitude.avg, rate_avg: stats.rate.avg,
        user_id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, is_public: true
      }));
      const { error } = await supabase.from('measurements').insert(inserts);
      if (error) throw error;
      alert('✅ Mesures publiées dans la gallery !\nhttps://horlolearn.ch/gallery');
    } catch (err) {
      alert('❌ Erreur de publication. Vérifiez votre connexion.'); console.error(err);
    }
  };

  const latest = data[data.length - 1];
  const showTooltip = (text: string) => (e: React.MouseEvent) => {
    setTooltip({ show: true, text, x: e.clientX, y: e.clientY - 30 });
  };
  const hideTooltip = () => setTooltip({ show: false, text: '', x: 0, y: 0 });

  return (
    <div className="min-h-screen bg-black text-green-400 p-4 font-mono select-none">
      {tooltip.show && (<div className="fixed bg-slate-800 border border-green-500 text-green-300 px-3 py-2 rounded text-xs z-50 shadow-lg pointer-events-none" style={{ left: tooltip.x, top: tooltip.y }}>{tooltip.text}</div>)}
      {showSavedModal && (<div className="fixed top-4 right-4 bg-green-900 border border-green-700 px-4 py-2 rounded shadow-lg z-50"><CheckCircle className="w-4 h-4 inline mr-2" />Session sauvegardée</div>)}
      <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 mb-4"><div className="flex items-center justify-between"><div className="flex items-center gap-3"><Timer className="w-6 h-6 text-green-400" /><h1 className="text-xl font-bold">CHRONOGRAPHE PRO v4.1</h1><span className="text-xs bg-green-900 px-2 py-1 rounded">LIVE</span></div><div className="text-xs text-slate-500">Mode: <span className="font-bold">{isRunning ? 'ACQUISITION' : 'VEILLE'}</span>{isRunning && <span className="ml-2">[{elapsed.toFixed(0)}s/{measurementDuration}s]</span>}</div></div></div>
      <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div><label className="block text-slate-400 text-xs mb-1 flex items-center gap-1">CALIBRE <Info className="w-3 h-3 cursor-help" onMouseEnter={showTooltip("Sélection auto-configure les paramètres")} onMouseLeave={hideTooltip} /></label><select value={selectedCalibre} onChange={(e) => setSelectedCalibre(e.target.value)} disabled={isRunning} className="w-full bg-black border border-slate-700 p-2 text-green-400 focus:border-green-500 focus:outline-none"><option value="">-- Sélectionner --</option>{CALIBRE_DB.map(cal => <option key={cal.id} value={cal.id}>{cal.name}</option>)}</select></div>
          <div><label className="block text-slate-400 text-xs mb-1 flex items-center gap-1">TEMPÉRATURE <Info className="w-3 h-3 cursor-help" onMouseEnter={showTooltip("COSC: Test à 8°C, 23°C, 38°C")} onMouseLeave={hideTooltip} /></label><input type="number" value={temperature} onChange={(e) => setTemperature(Number(e.target.value))} disabled={isRunning} className="w-full bg-black border border-slate-700 p-2 text-green-400 focus:border-green-500 focus:outline-none" min="0" max="50" /></div>
          <div><label className="block text-slate-400 text-xs mb-1 flex items-center gap-1">DURÉE (s) <Info className="w-3 h-3 cursor-help" onMouseEnter={showTooltip("Durée minimale 20-30s")} onMouseLeave={hideTooltip} /></label><input type="number" value={measurementDuration} onChange={(e) => setMeasurementDuration(Number(e.target.value))} disabled={isRunning} className="w-full bg-black border border-slate-700 p-2 text-green-400 focus:border-green-500 focus:outline-none" min="10" max="180" /></div>
        </div>
        <div className="mb-4 p-3 bg-slate-800/50 rounded border border-slate-700"><label className="block text-slate-400 text-xs mb-2 flex items-center gap-1 font-bold"><Activity className="w-3 h-3" />PROFIL DE SIGNATURE <Info className="w-3 h-3 cursor-help" onMouseEnter={showTooltip("Simule le comportement réel d'un mouvement")} onMouseLeave={hideTooltip} /></label><select value={selectedProfile} onChange={(e) => setSelectedProfile(e.target.value)} disabled={isRunning} className="w-full bg-black border border-slate-700 p-2 text-green-400 focus:border-green-500 focus:outline-none mb-2">{SIGNATURE_PROFILES.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select><p className="text-xs text-slate-500">{profileDescription}</p></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div><label className="block text-slate-400 text-xs mb-1">POSITION</label><select value={currentPosition} onChange={(e) => setCurrentPosition(e.target.value)} disabled={isRunning} className="w-full bg-black border border-slate-700 p-2 text-green-400 focus:border-green-500 focus:outline-none">{POSITIONS.map(pos => <option key={pos.id} value={pos.id}>{pos.name} ({pos.rotation})</option>)}</select></div>
          <div><label className="block text-slate-400 text-xs mb-1">BEAT RATE</label><select value={selectedRate} onChange={(e) => setSelectedRate(Number(e.target.value))} disabled={isRunning} className="w-full bg-black border border-slate-700 p-2 text-green-400 focus:border-green-500 focus:outline-none"><option value="18000">18,000 A/h | 2.5 Hz</option><option value="21600">21,600 A/h | 3 Hz</option><option value="25200">25,200 A/h | 3.5 Hz</option><option value="28800">28,800 A/h | 4 Hz</option><option value="36000">36,000 A/h | 5 Hz</option><option value="43200">43,200 A/h | 6 Hz</option><option value="57600">57,600 A/h | 8 Hz</option><option value="72000">72,000 A/h | 10 Hz</option></select></div>
          <div><label className="block text-slate-400 text-xs mb-1">LIFT ANGLE</label><input type="number" value={liftAngle} onChange={(e) => setLiftAngle(Number(e.target.value))} disabled={isRunning} className="w-full bg-black border border-slate-700 p-2 text-green-400 focus:border-green-500 focus:outline-none" min="48" max="58" /></div>
        </div>
        <div className="flex gap-2 mt-4 flex-wrap">
          <button onClick={handleStart} disabled={isRunning} className="bg-green-900 hover:bg-green-800 disabled:bg-slate-800 px-4 py-2 border border-green-700 flex items-center gap-2 transition-colors touch-friendly"><Play className="w-4 h-4" /> START [Space]</button>
          <button onClick={handleStop} disabled={!isRunning} className="bg-red-900 hover:bg-red-800 disabled:bg-slate-800 px-4 py-2 border border-red-700 flex items-center gap-2 transition-colors touch-friendly"><Square className="w-4 h-4" /> STOP [Space]</button>
          <button onClick={handleReset} className="bg-slate-700 hover:bg-slate-600 px-4 py-2 border border-slate-600 flex items-center gap-2 transition-colors touch-friendly"><RotateCw className="w-4 h-4" /> RESET [Ctrl+R]</button>
          <div className="border-l border-slate-700 mx-2"></div>
          <button onClick={() => setAudioFeedback(!audioFeedback)} className={`px-4 py-2 border flex items-center gap-2 transition-colors touch-friendly ${audioFeedback ? 'bg-blue-900 hover:bg-blue-800 border-blue-700' : 'bg-slate-700 hover:bg-slate-600 border-slate-600'}`}><Volume2 className="w-4 h-4" /> AUDIO {audioFeedback ? 'ON' : 'OFF'}</button>
          <button onClick={() => setShowGraph(!showGraph)} className={`px-4 py-2 border flex items-center gap-2 transition-colors touch-friendly ${showGraph ? 'bg-purple-900 hover:bg-purple-800 border-purple-700' : 'bg-slate-700 hover:bg-slate-600 border-slate-600'}`}><BarChart2 className="w-4 h-4" /> GRAPHIQUE</button>
          <button onClick={() => document.documentElement.requestFullscreen()} className="bg-slate-700 hover:bg-slate-600 px-4 py-2 border border-slate-600 flex items-center gap-2 transition-colors touch-friendly"><Maximize2 className="w-4 h-4" /> PLEIN ÉCRAN</button>
          <div className="border-l border-slate-700 mx-2"></div>
          <button onClick={exportPDF} disabled={Object.keys(averages).length === 0} className="bg-purple-900 hover:bg-purple-800 disabled:bg-slate-800 px-4 py-2 border border-purple-700 flex items-center gap-2 transition-colors touch-friendly"><FileText className="w-4 h-4" /> PDF</button>
          <button onClick={exportCSV} disabled={Object.keys(averages).length === 0} className="bg-blue-900 hover:bg-blue-800 disabled:bg-slate-800 px-4 py-2 border border-blue-700 flex items-center gap-2 transition-colors touch-friendly"><Download className="w-4 h-4" /> CSV</button>
          <button onClick={publishToGallery} disabled={Object.keys(averages).length === 0} className="bg-green-700 hover:bg-green-600 disabled:bg-slate-800 px-4 py-2 border border-green-600 flex items-center gap-2 transition-colors touch-friendly"><Share2 className="w-4 h-4" /> PUBLIER</button>
        </div>
      </div>
      {isRunning && latest && (
        <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 mb-4">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="bg-black p-3 rounded border border-slate-800"><div className="text-slate-500 text-xs">AMPLITUDE</div><div className={`text-2xl font-bold ${latest.amplitude >= 270 && latest.amplitude <= 310 ? 'text-green-400' : 'text-yellow-400'}`}>{latest.amplitude}°</div><div className="text-xs text-slate-600 mt-1">Moy: {movingAvg.amplitude.toFixed(1)}°</div></div>
            <div className="bg-black p-3 rounded border border-slate-800"><div className="text-slate-500 text-xs">BEAT ERROR</div><div className={`text-2xl font-bold ${Math.abs(latest.beatError) <= 0.3 ? 'text-green-400' : 'text-red-400'}`}>{Math.abs(latest.beatError).toFixed(1)} ms</div></div>
            <div className="bg-black p-3 rounded border border-slate-800"><div className="text-slate-500 text-xs">RATE</div><div className={`text-2xl font-bold ${Math.abs(latest.rate) <= 5 ? 'text-green-400' : Math.abs(latest.rate) <= 10 ? 'text-yellow-400' : 'text-red-400'}`}>{latest.rate > 0 ? '+' : ''}{latest.rate.toFixed(1)} s/j</div><div className="text-xs text-slate-600 mt-1">Moy: {movingAvg.rate.toFixed(1)}s/j</div></div>
            <div className="bg-black p-3 rounded border border-slate-800"><div className="text-slate-500 text-xs">Q FACTOR</div><div className={`text-2xl font-bold ${latest.qFactor && latest.qFactor > 2000 ? 'text-green-400' : 'text-yellow-400'}`}>{latest.qFactor || 0}</div></div>
            <div className="bg-black p-3 rounded border border-slate-800"><div className="text-slate-500 text-xs">JITTER</div><div className={`text-2xl font-bold ${latest.jitter < 0.3 ? 'text-green-400' : 'text-yellow-400'}`}>{latest.jitter.toFixed(2)} ms</div></div>
            <div className="bg-black p-3 rounded border border-slate-800"><div className="text-slate-500 text-xs">SIGNAL</div><div className={`text-2xl font-bold flex items-center gap-1 ${latest.jitter < 0.3 ? 'text-green-400' : 'text-yellow-400'}`}>{latest.jitter < 0.3 ? <CheckCircle className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}{latest.jitter < 0.3 ? 'STABLE' : 'IRRÉGULIER'}</div></div>
          </div>
        </div>
      )}
      {Object.keys(averages).length > 0 && (
        <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold flex items-center gap-2"><BarChart2 className="w-5 h-5" />RÉSULTATS PAR POSITION</h2>
            {Object.values(averages).some((a: any) => a?.isCOSC) && <div className="bg-green-900 text-green-400 px-3 py-1 rounded text-sm flex items-center gap-1 font-bold"><CheckCircle className="w-4 h-4" />COSC COMPLIANT</div>}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead><tr className="border-b border-slate-700"><th className="text-left py-2 text-slate-400">POSITION</th><th className="text-right py-2 text-slate-400">AMPL. MOY</th><th className="text-right py-2 text-slate-400">ÉCART-TYPE</th><th className="text-right py-2 text-slate-400">BEAT ERR</th><th className="text-right py-2 text-slate-400">RATE</th><th className="text-right py-2 text-slate-400">Q FACTOR</th><th className="text-right py-2 text-slate-400">JITTER</th><th className="text-right py-2 text-slate-400">ISOCHR</th><th className="text-center py-2 text-slate-400">STATUT</th></tr></thead>
              <tbody>
                {Object.entries(averages).map(([pos, stats]: [string, any]) => (
                  <tr key={pos} className="border-b border-slate-800 hover:bg-slate-800/30">
                    <td className="py-2 font-semibold">{POSITIONS.find(p => p.id === pos)?.name}</td>
                    <td className="text-right py-2">{stats.amplitude.avg.toFixed(1)}°</td>
                    <td className={`text-right py-2 ${stats.amplitude.std > 15 ? 'text-yellow-400' : 'text-slate-500'}`}>{stats.amplitude.std.toFixed(1)}</td>
                    <td className={`text-right py-2 ${stats.beatError.abs > 0.5 ? 'text-red-400' : 'text-green-400'}`}>{stats.beatError.abs.toFixed(1)}</td>
                    <td className={`text-right py-2 font-semibold ${Math.abs(stats.rate.avg) > 10 ? 'text-red-400' : Math.abs(stats.rate.avg) > 5 ? 'text-yellow-400' : 'text-green-400'}`}>{stats.rate.avg > 0 ? '+' : ''}{stats.rate.avg.toFixed(1)}</td>
                    <td className={`text-right py-2 ${stats.qFactor.avg > 2000 ? 'text-green-400' : 'text-yellow-400'}`}>{stats.qFactor.avg.toFixed(0)}</td>
                    <td className={`text-right py-2 ${stats.jitter.avg > 0.4 ? 'text-red-400' : 'text-slate-400'}`}>{stats.jitter.avg.toFixed(2)}</td>
                    <td className={`text-right py-2 ${stats.isochronism > 10 ? 'text-yellow-400' : 'text-green-400'}`}>{stats.isochronism.toFixed(1)}%</td>
                    <td className="text-center py-2">{stats.isCOSC ? <CheckCircle className="w-4 h-4 text-green-400 inline" /> : <AlertTriangle className="w-4 h-4 text-yellow-400 inline" />}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {Object.values(averages).map((stats: any, idx) => stats.diagnostics && stats.diagnostics.length > 0 && (
            <div key={idx} className="mt-4 bg-red-900/20 border border-red-700 rounded p-3"><div className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-red-400 mt-1" /><div><h3 className="text-red-400 font-bold text-sm">DIAGNOSTIC IA</h3><ul className="text-red-300 text-xs mt-1 list-disc list-inside">{stats.diagnostics.map((issue: string, i: number) => <li key={i}>{issue}</li>)}</ul></div></div></div>
          ))}
        </div>
      )}
      {!isRunning && Object.keys(averages).length === 0 && (
        <div className="text-center py-16 text-slate-600"><Activity className="w-16 h-16 mx-auto mb-4 opacity-30" /><p className="text-sm">Aucune mesure effectuée. Configurez les paramètres et lancez une acquisition.</p><p className="text-xs mt-2 text-slate-700">Conseil: mesurez chaque position 30s minimum</p></div>
      )}
      {showGraph && isRunning && (
        <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 mb-4">
          <h3 className="text-lg font-bold mb-2 flex items-center gap-2"><TrendingUp className="w-5 h-5" /> Graphique temps réel</h3>
          <div ref={graphRef} className="h-64 bg-black rounded border border-slate-800 p-2 overflow-hidden">
            <svg className="w-full h-full">
              {[...Array(5)].map((_, i) => (<line key={`h-${i}`} x1="0" y1={`${i * 25}%`} x2="100%" y2={`${i * 25}%`} stroke="#1f2937" strokeWidth="1" />))}
              <polyline fill="none" stroke="#10b981" strokeWidth="2" points={data.slice(-50).map((d, i) => { const x = (i / Math.min(49, data.length - 1)) * 100; const y = 100 - ((d.amplitude - 180) / 140) * 100; return `${x}%,${y}%`; }).join(' ')} />
            </svg>
          </div>
          <div className="flex gap-4 mt-2 text-xs text-slate-400">
            <div className="flex items-center gap-1"><div className="w-3 h-1 bg-green-500 rounded"></div> Amplitude (180-320°)</div>
            <div className="flex items-center gap-1"><div className="w-3 h-1 bg-blue-500 rounded"></div> Rate (-30/+30 s/j)</div>
          </div>
        </div>
      )}
      <div className="mt-4 text-xs text-slate-600 flex justify-between items-center">
        <div className="flex gap-4"><span>Beat: {(selectedRate / 7200).toFixed(3)} Hz</span><span>Période: {(3600 / (selectedRate / 7200)).toFixed(4)} s</span><span>Échantillonnage: 2 Hz</span><span>Profile: {selectedProfile}</span></div>
        <div className="flex gap-2 items-center"><Cpu className="w-4 h-4" /><span>Algorithm v4.1 - Swiss Timing Compatible</span></div>
      </div>
    </div>
  );
}
