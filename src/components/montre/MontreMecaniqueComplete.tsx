// src/components/montre/MontreMecaniqueComplete.tsx
import { Play, Pause } from 'lucide-react';
import { MontreProvider, useMontre } from './MontreMecaniqueProvider';
import { NavigationMontre } from './NavigationMontre';
import { AnimationMontre } from './AnimationMontre';
import { Card } from '@/components/ui/Card';

const IntroductionSection = () => (
  <Card gradient="from-slate-900 via-blue-900 to-purple-900 border-blue-500">
    <h2 className="text-3xl font-bold text-white mb-4">La Montre Mécanique</h2>
    <p className="text-slate-200 mb-4">
      Un chef-d'œuvre d'ingénierie sans électronique
    </p>
    <div className="grid md:grid-cols-3 gap-4">
      <div className="text-center">
        <h3 className="font-bold text-blue-300">Purement Mécanique</h3>
        <p className="text-sm text-slate-300">Ressorts, engrenages, leviers</p>
      </div>
      <div className="text-center">
        <h3 className="font-bold text-green-300">Précision</h3>
        <p className="text-sm text-slate-300">28'800 alternances/heure</p>
      </div>
      <div className="text-center">
        <h3 className="font-bold text-purple-300">Artisanal</h3>
        <p className="text-sm text-slate-300">Jusqu'à 300 pièces</p>
      </div>
    </div>
  </Card>
);

const OrganesSection = () => {
  const organes = [
    { nom: 'Barillet', desc: "Stocke l'énergie du ressort moteur", icon: '⚡' },
    { nom: 'Rouage', desc: "Transmet et démultiplie l'énergie", icon: '⚙️' },
    { nom: 'Échappement', desc: "Régule la libération d'énergie", icon: '💓' },
    { nom: 'Balancier', desc: 'Oscille à fréquence constante', icon: '🎯' },
    { nom: 'Remontoir', desc: 'Permet de remonter le ressort', icon: '🔄' },
    { nom: 'Affichage', desc: "Interface de lecture de l'heure", icon: '🕐' }
  ];

  return (
    <Card gradient="from-slate-800 to-slate-900 border-slate-700">
      <h2 className="text-3xl font-bold text-white mb-4">Les 6 Organes Essentiels</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {organes.map((organe, idx) => (
          <div key={idx} className="bg-slate-700/50 rounded-lg p-4 hover:bg-slate-700 transition-all">
            <div className="text-2xl mb-2">{organe.icon}</div>
            <h3 className="font-bold text-white mb-2">{organe.nom}</h3>
            <p className="text-sm text-slate-300">{organe.desc}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

function MontreContent() {
  const { activeTab, globalAnimation, setGlobalAnimation, progression } = useMontre();

  const sections = {
    introduction: <IntroductionSection />,
    organes: <OrganesSection />,
    animation: <AnimationMontre />
    // Ajouter d'autres sections au besoin
  };

  const completedCount = Object.values(progression).filter(Boolean).length;
  const totalCount = Object.keys(progression).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header avec progression */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white text-center mb-6">
            Introduction aux Montres Mécaniques
          </h1>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-300">Progression</span>
              <span className="text-slate-400">{completedCount}/{totalCount}</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all"
                style={{ width: `${(completedCount / totalCount) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <NavigationMontre />

        {/* Contrôle global */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setGlobalAnimation(!globalAnimation)}
            className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 ${
              globalAnimation
                ? 'bg-gradient-to-r from-red-500 to-red-600'
                : 'bg-gradient-to-r from-green-500 to-green-600'
            } text-white`}
          >
            {globalAnimation ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            {globalAnimation ? 'Pause' : 'Play'}
          </button>
        </div>

        {/* Contenu */}
        <div className="space-y-8">
          {sections[activeTab as keyof typeof sections]}
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6 text-center mt-12">
          <p className="text-slate-300">
            Visualisation interactive basée sur l'article de Bartosz Ciechanowski
          </p>
        </div>
      </div>
    </div>
  );
}

export default function MontreMecaniqueComplete() {
  return (
    <MontreProvider>
      <MontreContent />
    </MontreProvider>
  );
}
