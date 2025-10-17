'use client';

import React, { useState } from 'react';
import { Database, Search } from 'lucide-react';

interface Piece {
  piece: string;
  ref: string;
  mouvement: string;
  prix: string;
  categorie: string;
}

const piecesDatabase: Piece[] = [
  // ETA 2824-2
  { piece: 'Spiral Nivarox', ref: 'N-2824-SP', mouvement: 'ETA 2824-2', prix: '15-25 CHF', categorie: 'Balancier' },
  { piece: 'Balancier complet', ref: 'B-2824-BA', mouvement: 'ETA 2824-2', prix: '45-60 CHF', categorie: 'Balancier' },
  { piece: 'Ancre', ref: 'A-2824-AN', mouvement: 'ETA 2824-2', prix: '12-18 CHF', categorie: 'Échappement' },
  { piece: 'Roue d\'échappement', ref: 'R-2824-EC', mouvement: 'ETA 2824-2', prix: '18-25 CHF', categorie: 'Échappement' },
  { piece: 'Ressort de barillet', ref: 'RS-2824-BR', mouvement: 'ETA 2824-2', prix: '8-12 CHF', categorie: 'Barillet' },
  { piece: 'Rotor automatique', ref: 'ROT-2824', mouvement: 'ETA 2824-2', prix: '35-50 CHF', categorie: 'Remontage' },
  { piece: 'Pont de balancier', ref: 'PB-2824', mouvement: 'ETA 2824-2', prix: '25-35 CHF', categorie: 'Ponts' },
  { piece: 'Coq', ref: 'COQ-2824', mouvement: 'ETA 2824-2', prix: '30-45 CHF', categorie: 'Ponts' },
  
  // ETA 6497
  { piece: 'Spiral plat', ref: 'SP-6497', mouvement: 'ETA 6497', prix: '20-30 CHF', categorie: 'Balancier' },
  { piece: 'Balancier laiton', ref: 'BAL-6497', mouvement: 'ETA 6497', prix: '40-55 CHF', categorie: 'Balancier' },
  { piece: 'Ancre suisse', ref: 'AN-6497', mouvement: 'ETA 6497', prix: '15-22 CHF', categorie: 'Échappement' },
  { piece: 'Grande roue échappement', ref: 'RE-6497', mouvement: 'ETA 6497', prix: '22-32 CHF', categorie: 'Échappement' },
  { piece: 'Ressort barillet renforcé', ref: 'RBR-6497', mouvement: 'ETA 6497', prix: '12-18 CHF', categorie: 'Barillet' },
  
  // ETA 7750
  { piece: 'Spiral chronographe', ref: 'SP-7750', mouvement: 'ETA 7750', prix: '25-40 CHF', categorie: 'Balancier' },
  { piece: 'Roue à colonnes', ref: 'RC-7750', mouvement: 'ETA 7750', prix: '80-120 CHF', categorie: 'Chronographe' },
  { piece: 'Embrayage vertical', ref: 'EMB-7750', mouvement: 'ETA 7750', prix: '45-65 CHF', categorie: 'Chronographe' },
  { piece: 'Rotor masse oscillante', ref: 'ROT-7750', mouvement: 'ETA 7750', prix: '60-90 CHF', categorie: 'Remontage' },
  
  // Pièces universelles
  { piece: 'Huile Moebius 9010', ref: 'HUI-9010', mouvement: 'Universel', prix: '18-25 CHF', categorie: 'Lubrification' },
  { piece: 'Graisse Moebius 8200', ref: 'GRA-8200', mouvement: 'Universel', prix: '15-22 CHF', categorie: 'Lubrification' },
  { piece: 'Rubis palette 1.4mm', ref: 'RUB-14', mouvement: 'Universel', prix: '5-8 CHF', categorie: 'Rubis' },
  { piece: 'Rubis chatons assortis', ref: 'RUB-ASS', mouvement: 'Universel', prix: '12-20 CHF', categorie: 'Rubis' },
];

export default function BaseDonneesPieces() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategorie, setSelectedCategorie] = useState('Toutes');
  const [selectedMouvement, setSelectedMouvement] = useState('Tous');

  const categories = ['Toutes', ...Array.from(new Set(piecesDatabase.map(p => p.categorie)))];
  const mouvements = ['Tous', ...Array.from(new Set(piecesDatabase.map(p => p.mouvement)))];

  const filteredPieces = piecesDatabase.filter(piece => {
    const matchSearch = piece.piece.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       piece.ref.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategorie = selectedCategorie === 'Toutes' || piece.categorie === selectedCategorie;
    const matchMouvement = selectedMouvement === 'Tous' || piece.mouvement === selectedMouvement;
    
    return matchSearch && matchCategorie && matchMouvement;
  });

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-sky-100 p-3 rounded-xl">
          <Database className="w-6 h-6 text-sky-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Base de Données de Pièces</h2>
      </div>

      <div className="mb-6 space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher une pièce (ex: spiral, barillet, rubis...)"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-600"
            />
          </div>
          <button className="bg-sky-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-sky-700 transition-colors flex items-center gap-2">
            <Search className="w-5 h-5" />
            Rechercher
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Filtrer par catégorie
            </label>
            <select
              value={selectedCategorie}
              onChange={(e) => setSelectedCategorie(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-600"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Filtrer par mouvement
            </label>
            <select
              value={selectedMouvement}
              onChange={(e) => setSelectedMouvement(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-600"
            >
              {mouvements.map(mvt => (
                <option key={mvt} value={mvt}>{mvt}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-slate-600">
          <strong>{filteredPieces.length}</strong> pièce(s) trouvée(s)
        </p>
        <div className="flex gap-2">
          {selectedCategorie !== 'Toutes' && (
            <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm">
              {selectedCategorie}
            </span>
          )}
          {selectedMouvement !== 'Tous' && (
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              {selectedMouvement}
            </span>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-100">
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Pièce</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Référence</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Catégorie</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Mouvement</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Prix indicatif</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredPieces.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-50">
                <td className="px-6 py-4 text-sm font-medium text-slate-900">{item.piece}</td>
                <td className="px-6 py-4 text-sm text-slate-700 font-mono">{item.ref}</td>
                <td className="px-6 py-4 text-sm">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                    {item.categorie}
                  </span>
                </td>
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
          Base de données contenant {piecesDatabase.length} références ETA, Sellita, et pièces universelles.
        </p>
      </div>
    </div>
  );
}
