'use client';

import { Newspaper, ExternalLink, TrendingUp } from 'lucide-react';

const actualites = [
  {
    titre: "Baselworld 2025 : Les 5 innovations majeures",
    source: "Revue Horlogère Suisse",
    date: "15 oct 2025",
    url: "https://example.com",
    tag: "Événement",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400"
  },
  {
    titre: "Sellita lance un nouveau calibre haute fréquence",
    source: "WatchPro",
    date: "12 oct 2025",
    url: "https://example.com",
    tag: "Innovation",
    image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=400"
  },
  {
    titre: "Formation CFC horloger : nouveaux programmes 2026",
    source: "SSC Suisse",
    date: "10 oct 2025",
    url: "https://example.com",
    tag: "Formation",
    image: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=400"
  }
];

export default function ActualitesHorlogeres() {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-red-600 p-2 rounded-lg">
          <Newspaper className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900">Actualités Horlogères</h2>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {actualites.map((actu, idx) => (
          <a
            key={idx}
            href={actu.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-slate-200"
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={actu.image} 
                alt={actu.titre}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3">
                <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full">
                  {actu.tag}
                </span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                {actu.titre}
              </h3>
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>{actu.source}</span>
                <span className="flex items-center gap-1">
                  {actu.date} <ExternalLink className="w-4 h-4" />
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
