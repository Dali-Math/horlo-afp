'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronLeft,
  Calculator,
  Settings,
  RefreshCw,
  Download,
  Info,
  CheckCircle,
  AlertCircle
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
                Calculateurs professionnels pour l'horlogerie de précision
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
                <p>Ces valeurs sont indicatives. Consultez toujours la documentation technique du mouvement pour les couples exacts.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Outil amplitude */}
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
