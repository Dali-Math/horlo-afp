'use client';

import { ArrowLeftRight } from 'lucide-react';

const comparaison = {
  gauche: {
    nom: "ETA 2824-2",
    frequence: "28,800 A/h",
    reserve: "38h",
    rubis: "25",
    image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=400&h=300&fit=crop"
  },
  droite: {
    nom: "Sellita SW200",
    frequence: "28,800 A/h",
    reserve: "38h",
    rubis: "26",
    image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=400&h=300&fit=crop"
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
        {/* ETA 2824-2 */}
        <div className="text-center">
          <img 
            src={comparaison.gauche.image} 
            alt={comparaison.gauche.nom} 
            className="w-full h-48 object-cover rounded-xl mb-4"
          />
          <h3 className="text-xl font-bold text-slate-900 mb-4">{comparaison.gauche.nom}</h3>
          <div className="space-y-2 text-left">
            <div className="flex justify-between bg-slate-50 p-3 rounded-lg">
              <span className="text-slate-600 font-medium">Fréquence</span>
              <span className="font-bold text-slate-900">{comparaison.gauche.frequence}</span>
            </div>
            <div className="flex justify-between bg-slate-50 p-3 rounded-lg">
              <span className="text-slate-600 font-medium">Réserve</span>
              <span className="font-bold text-slate-900">{comparaison.gauche.reserve}</span>
            </div>
            <div className="flex justify-between bg-slate-50 p-3 rounded-lg">
              <span className="text-slate-600 font-medium">Rubis</span>
              <span className="font-bold text-slate-900">{comparaison.gauche.rubis}</span>
            </div>
          </div>
        </div>

        {/* Sellita SW200 */}
        <div className="text-center">
          <img 
            src={comparaison.droite.image} 
            alt={comparaison.droite.nom} 
            className="w-full h-48 object-cover rounded-xl mb-4"
          />
          <h3 className="text-xl font-bold text-slate-900 mb-4">{comparaison.droite.nom}</h3>
          <div className="space-y-2 text-left">
            <div className="flex justify-between bg-slate-50 p-3 rounded-lg">
              <span className="text-slate-600 font-medium">Fréquence</span>
              <span className="font-bold text-slate-900">{comparaison.droite.frequence}</span>
            </div>
            <div className="flex justify-between bg-slate-50 p-3 rounded-lg">
              <span className="text-slate-600 font-medium">Réserve</span>
              <span className="font-bold text-slate-900">{comparaison.droite.reserve}</span>
            </div>
            <div className="flex justify-between bg-slate-50 p-3 rounded-lg">
              <span className="text-slate-600 font-medium">Rubis</span>
              <span className="font-bold text-slate-900">{comparaison.droite.rubis}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Note comparative */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h4 className="font-bold text-blue-900 mb-2">💡 Note comparative</h4>
        <p className="text-sm text-blue-800">
          L'ETA 2824-2 et le Sellita SW200 sont des calibres quasi-identiques. Le SW200 est conçu comme une alternative compatible, 
          avec une qualité équivalente. La principale différence : le SW200 possède 26 rubis au lieu de 25.
        </p>
      </div>
    </div>
  );
}
