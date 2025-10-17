'use client';

import { ArrowLeftRight } from 'lucide-react';

const comparaison = {
  gauche: {
    nom: "ETA 2824-2",
    frequence: "28,800 A/h",
    reserve: "38h",
    rubis: "25",
    image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=300"
  },
  droite: {
    nom: "Sellita SW200",
    frequence: "28,800 A/h",
    reserve: "38h",
    rubis: "26",
    image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=300"
  }
};

export default function ComparaisonMouvements() {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200 mb-12">
      <div className="flex items-center justify-center gap-3 mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Comparaison : ETA vs Sellita</h2>
        <ArrowLeftRight className="w-6 h-6 text-blue-600" />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {[comparaison.gauche, comparaison.droite].map((mouv, idx) => (
          <div key={idx} className="text-center">
            <img src={mouv.image} alt={mouv.nom} className="w-full h-48 object-cover rounded-xl mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-4">{mouv.nom}</h3>
            <div className="space-y-2 text-left">
              <div className="flex justify-between bg-slate-50 p-3 rounded">
                <span className="text-slate-600">Fréquence</span>
                <span className="font-bold">{mouv.frequence}</span>
              </div>
              <div className="flex justify-between bg-slate-50 p-3 rounded">
                <span className="text-slate-600">Réserve</span>
                <span className="font-bold">{mouv.reserve}</span>
              </div>
              <div className="flex justify-between bg-slate-50 p-3 rounded">
                <span className="text-slate-600">Rubis</span>
                <span className="font-bold">{mouv.rubis}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
