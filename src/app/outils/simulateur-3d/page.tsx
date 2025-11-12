// app/outils/simulateur-3d/page.tsx
import dynamic from 'next/dynamic';

const Watch3DSimulator = dynamic(() => import('@/components/3DWatch'), {
  ssr: false, // Important pour Three.js
  loading: () => <p className="text-center">Chargement du simulateur 3D...</p>
});

export default function Simulateur3DPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-8" style={{fontFamily: 'Playfair Display, serif'}}>
        Simulateur 3D de Complications
      </h1>
      <p className="text-center text-[#c0c0c0] mb-8 max-w-2xl mx-auto">
        Explorez les mécanismes les plus complexes de l'horlogerie suisse en temps réel. 
        Zoom, rotation et décomposition interactive.
      </p>
      
      <Watch3DSimulator />
      
      {/* Section explicative en dessous */}
      <div className="mt-12 grid md:grid-cols-2 gap-6">
        <div className="bg-[#2d2d2d]/50 p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-4">🌀 Tourbillon</h3>
          <p className="text-sm text-[#c0c0c0]">
            Visualisez la rotation de la cage qui compense la gravité. 
            Vitesse réglable : 1 tour/minute (typique).
          </p>
        </div>
        <div className="bg-[#2d2d2d]/50 p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-4">📅 Quantième Perpétuel</h3>
          <p className="text-sm text-[#c0c0c0]">
            Voir le saut instantané de la date à minuit. 
            Programme qui gère les 30/31 jours et les années bissextiles.
          </p>
        </div>
      </div>
    </div>
  );
}
