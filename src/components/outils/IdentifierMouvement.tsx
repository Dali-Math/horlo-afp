'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Upload, RefreshCw, X, CheckCircle } from 'lucide-react';

export default function IdentifierMouvement() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [movementType, setMovementType] = useState<string>('');
  const [movementBrand, setMovementBrand] = useState<string>('');
  const [movementSize, setMovementSize] = useState<string>('');
  const [identificationResult, setIdentificationResult] = useState<any>(null);

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

    setIdentificationResult(matches.length > 0 ? matches[0] : mouvements[0]);
  };

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-cyan-100 p-3 rounded-xl">
          <Search className="w-6 h-6 text-cyan-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Identifier un Mouvement</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
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
  );
}
