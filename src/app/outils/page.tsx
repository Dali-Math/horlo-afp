'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  ChevronLeft,
  Calculator,
  Settings,
  RefreshCw,
  Download,
  Info,
  CheckCircle,
  AlertCircle,
  Search,
  Upload,
  Play,
  Square,
  RotateCcw,
  ArrowLeftRight,
  Zap,
  Cog,
  Database,
  FileText,
  Clock,
  Eye
} from 'lucide-react';

export default function OutilsPage() {
  // États pour Calculateur de rapport d'engrenages
  const [dentsRoue, setDentsRoue] = useState<number>(80);
  const [dentsPignon, setDentsPignon] = useState<number>(10);
  const [rapportEngrenage, setRapportEngrenage] = useState<number | null>(null);

  // États pour Convertisseur fréquence
  const [alternances, setAlternances] = useState<number>(28800);
  const [frequenceHz, setFrequenceHz] = useState<number | null>(null);

  // États pour Calculateur réserve de marche
  const [toursBarillet, setToursBarillet] = useState<number>(6.5);
  const [dureeParTour, setDureeParTour] = useState<number>(6);
  const [reserveMarche, setReserveMarche] = useState<number | null>(null);

  // États pour Convertisseur diamètre spiral
  const [diamExterieur, setDiamExterieur] = useState<number>(12);
  const [diamInterieur, setDiamInterieur] = useState<number>(3);
  const [epaisseur, setEpaisseur] = useState<number>(0.12);
  const [longueurSpiral, setLongueurSpiral] = useState<number | null>(null);

  // États pour Chronomètre
  const [chronometerTime, setChronometerTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<number[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // États pour Convertisseur d'unités
  const [diamMm, setDiamMm] = useState<number>(28.5);
  const [diamLignes, setDiamLignes] = useState<number>(12.6);
  const [coupleNcm, setCoupleNcm] = useState<number>(10);
  const [coupleGcm, setCoupleGcm] = useState<number>(102);

  // Calcul rapport engrenage
  const calculerRapport = () => {
    if (dentsRoue > 0 && dentsPignon > 0) {
      setRapportEngrenage(dentsRoue / dentsPignon);
    }
  };

  // Conversion fréquence
  const convertirFrequence = (type: 'ah' | 'hz', value: number) => {
    if (type === 'ah') {
      setAlternances(value);
      setFrequenceHz(value / 7200);
    } else {
      setFrequenceHz(value);
      setAlternances(value * 7200);
    }
  };

  // Calcul réserve de marche
  const calculerReserve = () => {
    setReserveMarche(toursBarillet * dureeParTour);
  };

  // Calcul longueur spiral
  const calculerLongueurSpiral = () => {
    const rayonMoyen = (diamExterieur + diamInterieur) / 2;
    const nombreSpires = (diamExterieur - diamInterieur) / (2 * epaisseur);
    const longueur = 2 * Math.PI * rayonMoyen * nombreSpires;
    setLongueurSpiral(longueur);
  };

  // Chronomètre
  const startChronometer = () => {
    setIsRunning(true);
  };

  const stopChronometer = () => {
    setIsRunning(false);
  };

  const resetChronometer = () => {
    setIsRunning(false);
    setChronometerTime(0);
    setLaps([]);
  };

  const addLap = () => {
    setLaps([...laps, chronometerTime]);
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setChronometerTime(prev => prev + 10);
      }, 10);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const formatTime = (ms: number) => {
    const centiseconds = Math.floor(ms / 10) % 100;
    const seconds = Math.floor(ms / 1000) % 60;
    const minutes = Math.floor(ms / 60000) % 60;
    const hours = Math.floor(ms / 3600000);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  // Convertisseur d'unités
  const convertMmToLignes = (mm: number) => {
    setDiamMm(mm);
    setDiamLignes(mm / 2.2558);
  };

  const convertLignesToMm = (lignes: number) => {
    setDiamLignes(lignes);
    setDiamMm(lignes * 2.2558);
  };

  const convertNcmToGcm = (ncm: number) => {
    setCoupleNcm(ncm);
    setCoupleGcm(ncm * 10.2);
  };

  const convertGcmToNcm = (gcm: number) => {
    setCoupleGcm(gcm);
    setCoupleNcm(gcm / 10.2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Retour à l'accueil
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <Calculator className="w-12 h-12" />
            <div>
              <h1 className="text-4xl font-bold">Outils de Calcul Horloger</h1>
              <p className="text-xl text-blue-100 mt-2">
                12 calculateurs et simulateurs professionnels pour l'horlogerie de précision
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Grid de calculateurs */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* 1. Calculateur de rapport d'engrenages */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-3 rounded-xl">
                <Settings className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Rapport d'Engrenages</h2>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Nombre de dents de la roue
                </label>
                <input
                  type="number"
                  value={dentsRoue}
                  onChange={(e) => setDentsRoue(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                  placeholder="Ex: 80"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Nombre de dents du pignon
                </label>
                <input
                  type="number"
                  value={dentsPignon}
                  onChange={(e) => setDentsPignon(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                  placeholder="Ex: 10"
                />
              </div>

              <button
                onClick={calculerRapport}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                Calculer le rapport
              </button>
            </div>

            {rapportEngrenage !== null && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <p className="font-semibold text-green-900">Résultat :</p>
                </div>
                <p className="text-3xl font-bold text-green-700 mb-2">
                  {rapportEngrenage.toFixed(2)} : 1
                </p>
                <p className="text-sm text-green-700">
                  Le pignon fait <strong>{rapportEngrenage.toFixed(2)} tours</strong> pendant que la roue fait 1 tour.
                </p>
              </div>
            )}

            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start gap-2">
                <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <p className="font-semibold mb-1">💡 Formule :</p>
                  <p>Rapport = Dents roue ÷ Dents pignon</p>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Convertisseur de fréquence */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-purple-100 p-3 rounded-xl">
                <RefreshCw className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Convertisseur Fréquence</h2>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Alternances/heure (A/h)
                </label>
                <input
                  type="number"
                  value={alternances}
                  onChange={(e) => convertirFrequence('ah', Number(e.target.value))}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                  placeholder="Ex: 28800"
                />
              </div>

              <div className="text-center py-2">
                <RefreshCw className="w-6 h-6 text-slate-400 mx-auto" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Fréquence (Hz)
                </label>
                <input
                  type="number"
                  value={frequenceHz || ''}
                  onChange={(e) => convertirFrequence('hz', Number(e.target.value))}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                  placeholder="Ex: 4"
                  step="0.1"
                />
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
              <p className="font-semibold text-purple-900 mb-3">Fréquences courantes :</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-purple-700">18,000 A/h</span>
                  <span className="font-semibold text-purple-900">2.5 Hz</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-700">21,600 A/h</span>
                  <span className="font-semibold text-purple-900">3 Hz</span>
                </div>
                <div className="flex justify-between bg-purple-100 px-2 py-1 rounded">
                  <span className="text-purple-700">28,800 A/h</span>
                  <span className="font-semibold text-purple-900">4 Hz ⭐</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-700">36,000 A/h</span>
                  <span className="font-semibold text-purple-900">5 Hz</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-purple-50 rounded-lg">
              <div className="flex items-start gap-2">
                <Info className="w-5 h-5 text-purple-600 mt-0.5" />
                <div className="text-sm text-purple-900">
                  <p className="font-semibold mb-1">💡 Formule :</p>
                  <p>Hz = A/h ÷ 7200</p>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Calculateur de réserve de marche */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-orange-100 p-3 rounded-xl">
                <Calculator className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Réserve de Marche</h2>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Nombre de tours du barillet
                </label>
                <input
                  type="number"
                  value={toursBarillet}
                  onChange={(e) => setToursBarillet(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-600"
                  placeholder="Ex: 6.5"
                  step="0.5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Durée par tour (heures)
                </label>
                <input
                  type="number"
                  value={dureeParTour}
                  onChange={(e) => setDureeParTour(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-600"
                  placeholder="Ex: 6"
                  step="0.5"
                />
              </div>

              <button
                onClick={calculerReserve}
                className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                Calculer la réserve
              </button>
            </div>

            {reserveMarche !== null && (
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-orange-600" />
                  <p className="font-semibold text-orange-900">Résultat :</p>
                </div>
                <p className="text-3xl font-bold text-orange-700 mb-2">
                  {reserveMarche} heures
                </p>
                <p className="text-sm text-orange-700">
                  Soit environ <strong>{(reserveMarche / 24).toFixed(1)} jours</strong>
                </p>
              </div>
            )}

            <div className="mt-4 p-4 bg-orange-50 rounded-lg">
              <p className="font-semibold text-orange-900 mb-2">Exemples réels :</p>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• ETA 2824-2 : <strong>38h</strong></li>
                <li>• Rolex 3135 : <strong>48h</strong></li>
                <li>• IWC 5000 : <strong>168h (7 jours)</strong></li>
              </ul>
            </div>
          </div>

          {/* 4. Convertisseur diamètre spiral */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-100 p-3 rounded-xl">
                <Settings className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Longueur Spiral</h2>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Diamètre extérieur (mm)
                </label>
                <input
                  type="number"
                  value={diamExterieur}
                  onChange={(e) => setDiamExterieur(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-600"
                  placeholder="Ex: 12"
                  step="0.1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Diamètre intérieur (mm)
                </label>
                <input
                  type="number"
                  value={diamInterieur}
                  onChange={(e) => setDiamInterieur(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-600"
                  placeholder="Ex: 3"
                  step="0.1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Épaisseur du fil (mm)
                </label>
                <input
                  type="number"
                  value={epaisseur}
                  onChange={(e) => setEpaisseur(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-600"
                  placeholder="Ex: 0.12"
                  step="0.01"
                />
              </div>

              <button
                onClick={calculerLongueurSpiral}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                Calculer la longueur
              </button>
            </div>

            {longueurSpiral !== null && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <p className="font-semibold text-green-900">Résultat :</p>
                </div>
                <p className="text-3xl font-bold text-green-700 mb-2">
                  {longueurSpiral.toFixed(1)} mm
                </p>
                <p className="text-sm text-green-700">
                  Soit environ <strong>{(longueurSpiral / 10).toFixed(1)} cm</strong>
                </p>
              </div>
            )}
          </div>

        </div>

        {/* Suite du code dans PARTIE 2... */}
        {/* Tableau de couples de serrage */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-red-100 p-3 rounded-xl">
              <Settings className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Tableau de Couples de Serrage</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-100">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Composant</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Couple (N·cm)</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Remarques</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm text-slate-900 font-medium">Pont de balancier</td>
                  <td className="px-6 py-4 text-sm text-slate-700">8-12</td>
                  <td className="px-6 py-4 text-sm text-slate-600">Serrage en croix</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm text-slate-900 font-medium">Coq</td>
                  <td className="px-6 py-4 text-sm text-slate-700">15-20</td>
                  <td className="px-6 py-4 text-sm text-slate-600">Important pour stabilité</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm text-slate-900 font-medium">Barillet (couvercle)</td>
                  <td className="px-6 py-4 text-sm text-slate-700">10-15</td>
                  <td className="px-6 py-4 text-sm text-slate-600">Ne pas forcer</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm text-slate-900 font-medium">Vis de cadran</td>
                  <td className="px-6 py-4 text-sm text-slate-700">2-4</td>
                  <td className="px-6 py-4 text-sm text-slate-600">Très fragiles</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm text-slate-900 font-medium">Fond de boîte</td>
                  <td className="px-6 py-4 text-sm text-slate-700">50-80</td>
                  <td className="px-6 py-4 text-sm text-slate-600">Selon diamètre</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
              <div className="text-sm text-red-900">
                <p className="font-semibold mb-1">⚠️ Important :</p>
                <p>Ces valeurs sont indicatives. Consultez toujours la documentation technique du mouvement pour les couples exacts.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Guide amplitude */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-indigo-100 p-3 rounded-xl">
              <RefreshCw className="w-6 h-6 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Guide d'Amplitude du Balancier</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6">
              <h3 className="font-bold text-green-900 mb-3">✅ Amplitude Bonne</h3>
              <p className="text-3xl font-bold text-green-700 mb-2">270° - 315°</p>
              <p className="text-sm text-green-700">
                Cadran horizontal, mouvement en bon état
              </p>
            </div>

            <div className="bg-orange-50 border-2 border-orange-300 rounded-xl p-6">
              <h3 className="font-bold text-orange-900 mb-3">⚠️ Amplitude Moyenne</h3>
              <p className="text-3xl font-bold text-orange-700 mb-2">220° - 270°</p>
              <p className="text-sm text-orange-700">
                Acceptable, révision recommandée
              </p>
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6">
              <h3 className="font-bold text-red-900 mb-3">❌ Amplitude Faible</h3>
              <p className="text-3xl font-bold text-red-700 mb-2">&lt; 220°</p>
              <p className="text-sm text-red-700">
                Problème détecté, révision urgente
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
            <p className="text-sm text-indigo-900">
              <strong>💡 Mesure :</strong> L'amplitude se mesure avec un appareil de contrôle (Witschi, Timegrapher) 
              en observant l'oscillation du balancier en degrés.
            </p>
          </div>
        </div>

        {/* 7. Identifier un mouvement */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-cyan-100 p-3 rounded-xl">
              <Search className="w-6 h-6 text-cyan-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Identifier un Mouvement</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-cyan-500 transition-colors cursor-pointer">
                <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600 mb-2">
                  Glissez une photo du mouvement ici
                </p>
                <p className="text-sm text-slate-500">
                  ou cliquez pour sélectionner
                </p>
                <input type="file" accept="image/*" className="hidden" />
              </div>
            </div>

            <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-6">
              <h3 className="font-bold text-cyan-900 mb-4">🔍 Comment identifier :</h3>
              <ul className="space-y-3 text-sm text-cyan-800">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-600">1.</span>
                  <span>Prenez une photo nette du mouvement (côté cadran)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-600">2.</span>
                  <span>Cherchez les marquages (ETA, AS, Valjoux, etc.)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-600">3.</span>
                  <span>Notez le nombre de rubis visible</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-600">4.</span>
                  <span>Mesurez le diamètre (en mm ou lignes)</span>
                </li>
              </ul>

              <div className="mt-4 pt-4 border-t border-cyan-300">
                <p className="font-semibold text-cyan-900 mb-2">Mouvements les plus courants :</p>
                <div className="flex flex-wrap gap-2">
                  {['ETA 2824-2', 'ETA 6497', 'ETA 7750', 'Sellita SW200', 'Miyota 9015'].map(mvt => (
                    <span key={mvt} className="px-3 py-1 bg-white border border-cyan-300 rounded-full text-xs font-medium text-cyan-700">
                      {mvt}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 8. Chronomètre de précision */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-rose-100 p-3 rounded-xl">
              <Clock className="w-6 h-6 text-rose-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Chronomètre de Précision</h2>
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-br from-slate-900 to-slate-700 rounded-2xl p-12 mb-6">
              <p className="text-6xl font-mono font-bold text-white mb-4">
                {formatTime(chronometerTime)}
              </p>
              <div className="flex items-center justify-center gap-4">
                {!isRunning ? (
                  <button 
                    onClick={startChronometer}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors flex items-center gap-2"
                  >
                    <Play className="w-5 h-5" />
                    Démarrer
                  </button>
                ) : (
                  <button 
                    onClick={stopChronometer}
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors flex items-center gap-2"
                  >
                    <Square className="w-5 h-5" />
                    Arrêter
                  </button>
                )}
                <button 
                  onClick={addLap}
                  disabled={!isRunning}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:opacity-50 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors"
                >
                  Inter
                </button>
                <button 
                  onClick={resetChronometer}
                  className="bg-slate-600 hover:bg-slate-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors flex items-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  RAZ
                </button>
              </div>
            </div>

            {laps.length > 0 && (
              <div className="bg-slate-100 rounded-xl p-4 mb-6">
                <h3 className="font-bold text-slate-900 mb-3">Temps intermédiaires :</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {laps.map((lap, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-white px-4 py-2 rounded-lg">
                      <span className="text-sm text-slate-600">Inter {idx + 1}</span>
                      <span className="font-mono font-semibold text-slate-900">{formatTime(lap)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm text-blue-600 mb-1">Précision</p>
                <p className="text-2xl font-bold text-blue-900">1/100s</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="text-sm text-green-600 mb-1">Temps intermédiaires</p>
                <p className="text-2xl font-bold text-green-900">{laps.length}</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                <p className="text-sm text-purple-600 mb-1">Mode</p>
                <p className="text-2xl font-bold text-purple-900">Standard</p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-rose-50 rounded-lg">
            <p className="text-sm text-rose-900">
              <strong>💡 Utilisation :</strong> Comparez la précision de votre montre en mesurant le temps réel vs le temps affiché. 
              Une montre mécanique de qualité varie de ±5 à ±15 secondes par jour.
            </p>
          </div>
        </div>

        {/* 9. Convertisseur d'unités */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-amber-100 p-3 rounded-xl">
              <ArrowLeftRight className="w-6 h-6 text-amber-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Convertisseur d'Unités</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 mb-4">Diamètre de mouvement</h3>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Millimètres (mm)
                </label>
                <input
                  type="number"
                  value={diamMm}
                  onChange={(e) => convertMmToLignes(Number(e.target.value))}
                  placeholder="Ex: 28.5"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-600"
                  step="0.1"
                />
              </div>

              <div className="text-center py-2">
                <ArrowLeftRight className="w-6 h-6 text-slate-400 mx-auto" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Lignes (''')
                </label>
                <input
                  type="number"
                  value={diamLignes.toFixed(2)}
                  onChange={(e) => convertLignesToMm(Number(e.target.value))}
                  placeholder="Ex: 12.5"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-600"
                  step="0.5"
                />
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-900">
                  <strong>💡 Formule :</strong> 1 ligne (''') = 2.2558 mm
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 mb-4">Couples de serrage</h3>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Newton-centimètre (N·cm)
                </label>
                <input
                  type="number"
                  value={coupleNcm}
                  onChange={(e) => convertNcmToGcm(Number(e.target.value))}
                  placeholder="Ex: 10"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-600"
                  step="0.1"
                />
              </div>

              <div className="text-center py-2">
                <ArrowLeftRight className="w-6 h-6 text-slate-400 mx-auto" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Gramme-centimètre (g·cm)
                </label>
                <input
                  type="number"
                  value={coupleGcm.toFixed(1)}
                  onChange={(e) => convertGcmToNcm(Number(e.target.value))}
                  placeholder="Ex: 102"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-600"
                />
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-900">
                  <strong>💡 Formule :</strong> 1 N·cm ≈ 10.2 g·cm
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-bold text-slate-900 mb-4">Conversions rapides</h3>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { de: '10.5 lignes', vers: '23.7 mm' },
                { de: '11.5 lignes', vers: '25.9 mm' },
                { de: '12.5 lignes', vers: '28.2 mm' },
                { de: '13 lignes', vers: '29.3 mm' }
              ].map((conv, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
                  <p className="text-sm text-slate-600 mb-1">{conv.de}</p>
                  <p className="text-sm text-slate-400">↓</p>
                  <p className="text-sm font-bold text-slate-900">{conv.vers}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 10. Simulateur d'échappement */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-violet-100 p-3 rounded-xl">
              <Zap className="w-6 h-6 text-violet-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Simulateur d'Échappement Suisse</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="bg-gradient-to-br from-slate-900 to-slate-700 rounded-2xl p-8 aspect-square flex items-center justify-center">
                <div className="text-center text-white">
                  <Cog className="w-24 h-24 mx-auto mb-4 animate-spin" style={{animationDuration: '2s'}} />
                  <p className="text-sm opacity-75">Animation interactive</p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-center gap-4">
                <button className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Démarrer
                </button>
                <button className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                  Pause
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 mb-4">Paramètres de simulation</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Fréquence (Hz)
                  </label>
                  <input
                    type="range"
                    min="2"
                    max="5"
                    step="0.5"
                    defaultValue="4"
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-600 mt-1">
                    <span>2 Hz (Lent)</span>
                    <span className="font-semibold">4 Hz</span>
                    <span>5 Hz (Rapide)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Angle de levée
                  </label>
                  <input
                    type="range"
                    min="8"
                    max="12"
                    step="0.5"
                    defaultValue="10"
                    className="w-full"
                  />
                  <p className="text-sm text-slate-600 mt-1">10°</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Vitesse d'animation
                  </label>
                  <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-600">
                    <option>Temps réel</option>
                    <option>Ralenti (0.5x)</option>
                    <option>Très lent (0.1x)</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 bg-violet-50 border border-violet-200 rounded-lg p-4">
                <h4 className="font-semibold text-violet-900 mb-2">📚 Composants visibles :</h4>
                <ul className="text-sm text-violet-800 space-y-1">
                  <li>• Roue d'échappement (15 dents)</li>
                  <li>• Ancre suisse</li>
                  <li>• Palettes d'entrée/sortie (rubis)</li>
                  <li>• Ellipse du balancier</li>
                  <li>• Fourchette et dard</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 11. Générateur de fiches techniques */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-emerald-100 p-3 rounded-xl">
              <FileText className="w-6 h-6 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Générateur de Fiches Techniques</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Calibre du mouvement
                </label>
                <input
                  type="text"
                  placeholder="Ex: ETA 2824-2"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Type de montre
                </label>
                <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600">
                  <option>Automatique</option>
                  <option>Remontage manuel</option>
                  <option>Quartz</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Diamètre (mm)
                </label>
                <input
                  type="number"
                  placeholder="Ex: 25.6"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                  step="0.1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Hauteur (mm)
                </label>
                <input
                  type="number"
                  placeholder="Ex: 4.6"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                  step="0.1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Fréquence (A/h)
                </label>
                <input
                  type="number"
                  placeholder="Ex: 28800"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Réserve de marche (heures)
                </label>
                <input
                  type="number"
                  placeholder="Ex: 38"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Nombre de rubis
                </label>
                <input
                  type="number"
                  placeholder="Ex: 25"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <button className="w-full bg-emerald-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                Générer la fiche PDF
              </button>
            </div>

            <div>
              <div className="bg-slate-100 border-2 border-slate-300 rounded-xl p-8 h-full">
                <h3 className="font-bold text-slate-900 mb-4 text-center">Aperçu de la fiche</h3>
                <div className="bg-white rounded-lg p-6 shadow-inner">
                  <div className="text-center mb-6">
                    <h4 className="text-2xl font-bold text-slate-900 mb-2">ETA 2824-2</h4>
                    <p className="text-sm text-slate-600">Mouvement Automatique</p>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between border-b border-slate-200 pb-2">
                      <span className="text-slate-600">Diamètre :</span>
                      <span className="font-semibold">25.6 mm (11.5''')</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-2">
                      <span className="text-slate-600">Hauteur :</span>
                      <span className="font-semibold">4.6 mm</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-2">
                      <span className="text-slate-600">Fréquence :</span>
                      <span className="font-semibold">28,800 A/h (4 Hz)</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-2">
                      <span className="text-slate-600">Réserve :</span>
                      <span className="font-semibold">38 heures</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-2">
                      <span className="text-slate-600">Rubis :</span>
                      <span className="font-semibold">25 jewels</span>
                    </div>
                  </div>

                  <div className="mt-6 text-center">
                    <p className="text-xs text-slate-500">Généré par HorloLearn</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 12. Base de données de pièces */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-sky-100 p-3 rounded-xl">
              <Database className="w-6 h-6 text-sky-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Base de Données de Pièces</h2>
          </div>

          <div className="mb-6">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Rechercher une pièce (ex: spiral, barillet, rubis...)"
                className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-600"
              />
              <button className="bg-sky-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-sky-700 transition-colors flex items-center gap-2">
                <Search className="w-5 h-5" />
                Rechercher
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-100">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Pièce</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Référence</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Mouvement</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Prix indicatif</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {[
                  { piece: 'Spiral Nivarox', ref: 'N-2824-SP', mouvement: 'ETA 2824-2', prix: '15-25 CHF' },
                  { piece: 'Balancier complet', ref: 'B-2824-BA', mouvement: 'ETA 2824-2', prix: '45-60 CHF' },
                  { piece: 'Ancre', ref: 'A-2824-AN', mouvement: 'ETA 2824-2', prix: '12-18 CHF' },
                  { piece: 'Roue d\'échappement', ref: 'R-2824-EC', mouvement: 'ETA 2824-2', prix: '18-25 CHF' },
                  { piece: 'Ressort de barillet', ref: 'RS-2824-BR', mouvement: 'ETA 2824-2', prix: '8-12 CHF' }
                ].map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{item.piece}</td>
                    <td className="px-6 py-4 text-sm text-slate-700 font-mono">{item.ref}</td>
                    <td className="px-6 py-4 text-sm text-slate-700">{item.mouvement}</td>
                    <td className="px-6 py-4 text-sm text-sky-600 font-semibold">{item.prix}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 bg-sky-50 border border-sky-200 rounded-lg">
            <p className="text-sm text-sky-900">
              <strong>💡 Note :</strong> Les prix sont indicatifs et peuvent varier selon les fournisseurs. 
              Base de données mise à jour mensuellement avec les références officielles ETA, Sellita, Miyota.
            </p>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400">© 2025 HorloLearn - Outils Professionnels d'Horlogerie</p>
        </div>
      </footer>
    </div>
  );
}
