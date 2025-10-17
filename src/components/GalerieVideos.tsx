'use client';

import { Video, Play } from 'lucide-react';

const videos = [
  { titre: "Démontage complet ETA 2824", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { titre: "Réglage de la raquette", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { titre: "Huilage du barillet", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
];

export default function GalerieVideos() {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-pink-600 p-2 rounded-lg">
          <Video className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900">Tutoriels Vidéo</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {videos.map((video, idx) => (
          <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-lg border border-slate-200">
            <div className="relative group">
              <iframe
                width="100%"
                height="200"
                src={video.url}
                title={video.titre}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-slate-900">{video.titre}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
