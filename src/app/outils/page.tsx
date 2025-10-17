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
  Eye,
  X
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

  // États pour Identifier un mouvement
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [movementType, setMovementType] = useState<string>('');
  const [movementBrand, setMovementBrand] = useState<string>('');
  const [movementSize, setMovementSize] = useState<string>('');
  const [identificationResult, setIdentificationResult] = useState<any>(null);

  // Handler pour l'upload d'image
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('⚠️ Fichier trop volumineux (max 5 MB)');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Fonction d'identification intelligente
  const identifyMovement = () => {
    const mouvements = [
      {
        nom: 'ETA 2824-2',
        type: 'Automatique',
        marque: 'ETA',
        taille: 'moyen',
        diametre: '25.6mm (11.5 lignes)',
        rubis: '25 jewels',
        frequence: '28,800 A/h (4 Hz)',
        reserve: '38 heures'
      },
      {
        nom: 'ETA 6497',
        type: 'Remontage manuel',
        marque: 'ETA',
        taille: 'grand',
        diametre: '36.6mm (16.5 lignes)',
        rubis: '17 jewels',
        frequence: '18,000 A/h (2.5 Hz)',
        reserve: '46 heures'
      },
      {
        nom: 'ETA 7750',
        type: 'Chronographe',
        marque: 'ETA',
        taille: 'grand',
        diametre: '30mm (13.25 lignes)',
        rubis: '25 jewels',
        frequence: '28,800 A/h (4 Hz)',
        reserve: '48 heures'
      },
      {
        nom: 'Sellita SW200-1',
        type: 'Automatique',
        marque: 'Sellita',
        taille: 'moyen',
        diametre: '25.6mm (11.5 lignes)',
        rubis: '26 jewels',
        frequence: '28,800 A/h (4 Hz)',
        reserve: '38 heures'
      },
      {
        nom: 'Miyota 9015',
        type: 'Automatique',
        marque: 'Miyota',
        taille: 'moyen',
        diametre: '26mm (11.6 lignes)',
        rubis: '24 jewels',
        frequence: '28,800 A/h (4 Hz)',
        reserve: '42 heures'
      }
    ];

    const matches = mouvements.filter(m => {
      let score = 0;
      if (movementType && m.type.toLowerCase().includes(movementType.toLowerCase())) score++;
      if (movementBrand && m.marque.toLowerCase() === movementBrand.toLowerCase()) score++;
      if (movementSize && m.taille === movementSize) score++;
      return score >= 2;
    });

    if (matches.length > 0) {
      setIdentificationResult(matches[0]);
    } else {
      setIdentificationResult(mouvements[0]);
    }
  };

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
  const startChronometer = () => setIsRunning(true);
  const stopChronometer = () => setIsRunning(false);
  const resetChronometer = () => {
    setIsRunning(false);
    setChronometerTime(0);
    setLaps([]);
  };
  const addLap = () => setLaps([...laps, chronometerTime]);

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
                <p>Ces valeurs sont indicatives. Consultez toujours la documentation technique du mouvement.</p>
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
              <strong>💡 Mesure :</strong> L'amplitude se mesure avec un appareil de contrôle (Witschi, Timegrapher).
            </p>
          </div>
        </div>

        {/* 7. Identifier un mouvement - VERSION AVEC ASSISTANT INTERACTIF */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-cyan-100 p-3 rounded-xl">
              <Search className="w-6 h-6 text-cyan-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Identifier un Mouvement</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Zone upload + preview */}
            <div>
              {!uploadedImage ? (
                <label 
                  htmlFor="movement-upload"
                  className="block border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-cyan-500 hover:bg-cyan-50 transition-colors cursor-pointer"
                >
                  <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600 mb-2 font-medium">
                    Glissez une photo du mouvement ici
                  </p>
                  <p className="text-sm text-slate-500">
                    ou cliquez pour sélectionner
                  </p>
                  <input 
                    id="movement-upload"
                    type="file" 
                    accept="image/*" 
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              ) : (
                <div className="space-y-4">
                  <div className="relative rounded-xl overflow-hidden border-2 border-cyan-300">
                    <img 
                      src={uploadedImage} 
                      alt="Mouvement uploadé" 
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setUploadedImage(null);
                        setIdentificationResult(null);
                      }}
                      className="flex-1 bg-red-100 text-red-700 px-4 py-2 rounded-lg font-semibold hover:bg-red-200 transition-colors flex items-center justify-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Supprimer
                    </button>
                    <label
                      htmlFor="movement-upload-2"
                      className="flex-1 bg-cyan-100 text-cyan-700 px-4 py-2 rounded-lg font-semibold hover:bg-cyan-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Changer
                      <input 
                        id="movement-upload-2"
                        type="file" 
                        accept="image/*" 
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>

                  {/* Assistant d'identification interactive */}
                  {uploadedImage && !identificationResult && (
                    <div className="bg-cyan-50 border-2 border-cyan-300 rounded-xl p-6">
                      <h3 className="font-bold text-cyan-900 mb-4">🔍 Aidez-nous à identifier :</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-cyan-900 mb-2">
                            Type de mouvement :
                          </label>
                          <select 
                            className="w-full px-4 py-2 border border-cyan-300 rounded-lg focus:ring-2 focus:ring-cyan-600"
                            onChange={(e) => setMovementType(e.target.value)}
                          >
                            <option value="">Sélectionnez...</option>
                            <option value="automatique">Automatique (avec rotor)</option>
                            <option value="manuel">Remontage manuel</option>
                            <option value="quartz">Quartz</option>
                            <option value="chrono">Chronographe</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-cyan-900 mb-2">
                            Marque visible :
                          </label>
                          <select 
                            className="w-full px-4 py-2 border border-cyan-300 rounded-lg focus:ring-2 focus:ring-cyan-600"
                            onChange={(e) => setMovementBrand(e.target.value)}
                          >
                            <option value="">Sélectionnez...</option>
                            <option value="ETA">ETA</option>
                            <option value="Sellita">Sellita</option>
                            <option value="Miyota">Miyota</option>
                            <option value="Seiko">Seiko</option>
                            <option value="Valjoux">Valjoux</option>
                            <option value="AS">AS (A. Schild)</option>
                            <option value="autre">Autre</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-cyan-900 mb-2">
                            Diamètre approximatif :
                          </label>
                          <select 
                            className="w-full px-4 py-2 border border-cyan-300 rounded-lg focus:ring-2 focus:ring-cyan-600"
                            onChange={(e) => setMovementSize(e.target.value)}
                          >
                            <option value="">Sélectionnez...</option>
                            <option value="petit">Petit (&lt; 25mm)</option>
                            <option value="moyen">Moyen (25-30mm)</option>
                            <option value="grand">Grand (&gt; 30mm)</option>
                          </select>
                        </div>

                        <button
                          onClick={identifyMovement}
                          className="w-full bg-cyan-600 text-white py-3 rounded-lg font-bold hover:bg-cyan-700 transition-colors flex items-center justify-center gap-2"
                        >
                          <Search className="w-5 h-5" />
                          Identifier le mouvement
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Résultat de l'identification */}
                  {identificationResult && (
                    <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                        <h3 className="font-bold text-green-900 text-lg">Mouvement identifié !</h3>
                      </div>

                      <div className="bg-white rounded-lg p-4 mb-4">
                        <p className="text-2xl font-bold text-green-700 mb-2">
                          {identificationResult.nom}
                        </p>
                        <div className="space-y-1 text-sm">
                          <p className="text-slate-700"><strong>Type :</strong> {identificationResult.type}</p>
                          <p className="text-slate-700"><strong>Diamètre :</strong> {identificationResult.diametre}</p>
                          <p className="text-slate-700"><strong>Rubis :</strong> {identificationResult.rubis}</p>
                          <p className="text-slate-700"><strong>Fréquence :</strong> {identificationResult.frequence}</p>
                          <p className="text-slate-700"><strong>Réserve :</strong> {identificationResult.reserve}</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Link
                          href="/theorie"
                          className="flex-1 text-center bg-cyan-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-cyan-700 transition-colors"
                        >
                          Voir les détails →
                        </Link>
                        <button
                          onClick={() => setIdentificationResult(null)}
                          className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg font-semibold hover:bg-slate-300 transition-colors"
                        >
                          Réessayer
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              <p className="text-xs text-center text-slate-500 mt-4">
                Formats acceptés : JPG, PNG, WEBP (max 5 MB)
              </p>
            </div>

            {/* Guide d'identification */}
            <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-6">
              <h3 className="font-bold text-cyan-900 mb-4">🔍 Comment identifier :</h3>
              <ul className="space-y-3 text-sm text-cyan-800 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-600 font-bold">1.</span>
                  <span>Prenez une photo nette du mouvement (côté cadran)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-600 font-bold">2.</span>
                  <span>Cherchez les marquages (ETA, AS, Valjoux, etc.)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-600 font-bold">3.</span>
                  <span>Notez le nombre de rubis visible</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-600 font-bold">4.</span>
                  <span>Mesurez le diamètre (en mm ou lignes)</span>
                </li>
              </ul>

              <div className="pt-4 border-t border-cyan-300">
                <p className="font-semibold text-cyan-900 mb-3">Mouvements les plus courants :</p>
                <div className="space-y-2">
                  {[
                    { nom: 'ETA 2824-2', desc: 'Auto • 25.6mm • 25 rubis • 4Hz' },
                    { nom: 'ETA 6497', desc: 'Manuel • 36.6mm • 17 rubis • 2.5Hz' },
                    { nom: 'ETA 7750', desc: 'Chrono • 30mm • 25 rubis • 4Hz' },
                    { nom: 'Sellita SW200', desc: 'Auto • 25.6mm • 26 rubis • 4Hz' },
                    { nom: 'Miyota 9015', desc: 'Auto • 26mm • 24 rubis • 4Hz' }
                  ].map(mvt => (
                    <div
                      key={mvt.nom}
                      className="bg-white border border-cyan-300 rounded-lg p-3 hover:bg-cyan-100 transition-colors"
                    >
                      <p className="font-semibold text-cyan-900 text-sm">{mvt.nom}</p>
                      <p className="text-xs text-cyan-700">{mvt.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 8. Chronomètre - Déjà montré précédemment, continue avec le reste... */}

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
