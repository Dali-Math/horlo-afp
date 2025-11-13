// app/gallery/page.tsx
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/supabase';
import Link from 'next/link';

export const revalidate = 60; // Revalide toutes les 60 secondes

export default async function GalleryPage() {
  const { data: measurements } = await supabase
    .from('measurements')
    .select('*')
    .eq('is_public', true)
    .order('created_at', { ascending: false })
    .limit(100);

  return (
    <div className="min-h-screen bg-black text-green-400 p-4 font-mono">
      <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center gap-2">GALLERY COMMUNAUTAIRE</h1>
          <Link href="/outils/chronographe-banc-pro" className="bg-green-900 hover:bg-green-800 px-4 py-2 border border-green-700 flex items-center gap-2">
            ← Retour au chronographe
          </Link>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
        <p className="text-slate-400 mb-4">Dernières mesures publiées par la communauté</p>
        
        {measurements && measurements.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {measurements.map((meas: any) => (
              <div key={meas.id} className="bg-slate-800 border border-slate-700 rounded p-4 hover:border-green-700 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-green-400">{meas.calibre || 'Inconnu'}</h3>
                  <span className="text-xs text-slate-500">
                    {new Date(meas.created_at).toLocaleDateString('fr-CH')}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Position: <span className="text-green-300">{meas.position}</span></div>
                  <div>Amplitude: <span className="text-green-300">{meas.amplitude_avg?.toFixed(1)}°</span></div>
                  <div>Rate: <span className={`${Math.abs(meas.rate_avg) > 10 ? 'text-red-400' : 'text-green-400'}`}>
                    {meas.rate_avg > 0 ? '+' : ''}{meas.rate_avg?.toFixed(1)}s/j
                  </span></div>
                  <div>Status: {Math.abs(meas.rate_avg) <= 5 ? <span className="text-green-400">COSC</span> : <span className="text-yellow-400">Non-COSC</span>}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-slate-600">
            <p>Aucune mesure publique pour l'instant.</p>
            <p className="text-xs mt-2">Soyez le premier à publier une mesure !</p>
          </div>
        )}
      </div>
    </div>
  );
}
