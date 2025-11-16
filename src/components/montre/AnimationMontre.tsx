'use client';

import { useState } from 'react';
import { Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { useMontre } from './MontreMecaniqueProvider';

export function AnimationMontre() {
  const { globalAnimation } = useMontre();
  const [isRunning, setIsRunning] = useState(true);
  const [vitesse, setVitesse] = useState(1);
  const [vue, setVue] = useState('face');

  const vitesses = [
    { label: 'Lent', value: 0.25 },
    { label: 'Normal', value: 1 },
    { label: 'Rapide', value: 5 }
  ];

  const vues = ['face', 'dos', 'profil'];

  return (
    <Card className="bg-gradient-to-br from-slate-900 to-blue-900 border-blue-700">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-white">
          Montre Mécanique en Action
        </h3>
        
        <div className="flex gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 flex items-center gap-2"
          >
            {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {isRunning ? 'Pause' : 'Play'}
          </button>
        </div>
      </div>

      {/* Contrôles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="text-slate-300 text-sm font-medium mb-2">Vitesse</label>
          <div className="flex gap-2">
            {vitesses.map(v => (
              <button
                key={v.value}
                onClick={() => setVitesse(v.value)}
                className={`px-3 py-1 rounded text-sm font-medium ${
                  vitesse === v.value 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-slate-300 text-sm font-medium mb-2">Vue</label>
          <div className="flex gap-2">
            {vues.map(v => (
              <button
                key={v}
                onClick={() => setVue(v)}
                className={`px-3 py-1 rounded text-sm capitalize ${
                  vue === v 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-slate-300 text-sm font-medium mb-2">Informations</label>
          <div className="bg-slate-900/50 rounded p-2 text-xs text-slate-400">
            <div>Fréquence: 4 Hz</div>
            <div>Réserve: 40h</div>
            <div>Vitesse: {vitesse}x</div>
          </div>
        </div>
      </div>

      {/* Zone d'animation */}
      <div className="relative h-[400px] flex items-center justify-center bg-gradient-to-b from-slate-800 to-slate-900 rounded-xl overflow-hidden">
        {vue === 'face' && (
          <div className="relative">
            <div className="w-64 h-64 bg-gradient-to-br from-white to-slate-100 rounded-full border-8 border-slate-800 shadow-2xl relative">
              {/* Marqueurs d'heures */}
              {[...Array(12)].map((_, i) => {
                const isMainHour = i % 3 === 0;
                return (
                  <div
                    key={i}
                    className="absolute left-1/2 top-0 origin-bottom"
                    style={{
                      height: '50%',
                      transform: `translateX(-50%) rotate(${i * 30}deg)`,
                    }}
                  >
                    <div 
                      className={`mx-auto ${isMainHour ? 'w-1 h-6 bg-slate-900' : 'w-0.5 h-4 bg-slate-700'} rounded-full`}
                      style={{ marginTop: '8px' }}
                    />
                  </div>
                );
              })}

              {/* Aiguilles animées */}
              <motion.div
                className="absolute left-1/2 top-1/2 w-1 bg-slate-900 origin-bottom"
                style={{ 
                  height: '60px',
                  transform: 'translateX(-50%) translateY(-100%)',
                }}
                animate={isRunning && globalAnimation ? { rotate: 360 } : {}}
                transition={{ duration: 43200 / vitesse, repeat: Infinity, ease: "linear" }}
              />

              <motion.div
                className="absolute left-1/2 top-1/2 w-0.5 bg-red-600 origin-bottom"
                style={{ 
                  height: '80px',
                  transform: 'translateX(-50%) translateY(-100%)',
                }}
                animate={isRunning && globalAnimation ? { rotate: 360 } : {}}
                transition={{ duration: 60 / vitesse, repeat: Infinity, ease: "linear" }}
              />

              {/* Centre */}
              <div className="absolute left-1/2 top-1/2 w-3 h-3 bg-slate-900 rounded-full -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
        )}

        {vue === 'dos' && (
          <div className="text-white text-center">
            <div className="w-48 h-48 bg-gradient-to-br from-slate-700 to-slate-900 rounded-full border-4 border-slate-600 mx-auto mb-4" />
            <p>Vue du mécanisme</p>
          </div>
        )}

        {vue === 'profil' && (
          <div className="text-white text-center">
            <p>Vue de profil</p>
            <p className="text-sm text-slate-400">Épaisseur: 12mm</p>
          </div>
        )}
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
        {[
          { label: 'Fréquence', value: '4 Hz' },
          { label: 'Alternances/h', value: "28'800" },
          { label: 'Réserve', value: '40h' },
          { label: 'Battements/s', value: '8' }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
            <p className="text-blue-300 text-xs">{stat.label}</p>
            <p className="text-white text-lg font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
