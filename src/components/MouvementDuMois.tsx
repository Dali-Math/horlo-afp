'use client';

import { Award, Info, Video, FileText } from 'lucide-react';

const mouvementDuMois = {
  nom: "ETA 2824-2",
  image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=600",
  description: "Le calibre automatique le plus produit au monde, base de milliers de montres suisses.",
  specs: {
    diametre: "25.6 mm",
    epaisseur: "4.6 mm",
    frequence: "28,800 A/h",
    rubis: "25 rubis",
    reserve: "38h"
  },
  videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  pdfUrl: "/docs/eta-2824-plan.pdf"
};

export default function MouvementDuMois() {
  return (
    <div className="mb-12 bg-gradient-to-r from-purple-900 to-indigo-900 rounded-2xl p-8 shadow-2xl text-white">
      <div className="flex items-center gap-3 mb-6">
        <Award className="w-8 h-8 text-yellow-400" />
        <h2 className="text-3xl font-bold">🏆 Mouvement du Mois : {mouvementDuMois.nom}</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Image + Description */}
        <div>
          <img 
            src={mouvementDuMois.image} 
            alt={mouvementDuMois.nom}
            className="w-full h-64 object-cover rounded-xl mb-4 shadow-lg"
          />
          <p className="text-purple-100 leading-relaxed">{mouvementDuMois.description}</p>
          
          {/* Specs */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            {Object.entries(mouvementDuMois.specs).map(([key, value]) => (
              <div key={key} className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                <p className="text-xs text-purple-200 uppercase">{key}</p>
                <p className="font-bold text-lg">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Vidéo + Ressources */}
        <div className="space-y-4">
          <div className="bg-black/30 rounded-xl overflow-hidden">
            <iframe
              width="100%"
              height="300"
              src={mouvementDuMois.videoUrl}
              title="Vidéo du mouvement"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full"
            ></iframe>
          </div>

          <div className="flex gap-3">
            <a
              href={mouvementDuMois.pdfUrl}
              download
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-lg font-semibold transition-colors"
            >
              <FileText className="w-5 h-5" />
              Plan technique PDF
            </a>
            <button className="flex-1 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-3 rounded-lg font-semibold transition-colors">
              <Info className="w-5 h-5" />
              Voir les détails
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
