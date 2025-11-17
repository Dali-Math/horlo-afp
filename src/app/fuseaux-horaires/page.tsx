'use client';

import React, { useState } from 'react';
import { ChevronLeft, Clock, Watch, Calendar, Sun, Moon } from 'lucide-react';
import Link from 'next/link';

interface CorrectionType {
  id: string;
  name: string;
  description: string;
  examples: string[];
  displayType: 'analog' | 'digital' | '24h';
  features: string[];
}

const corrections: CorrectionType[] = [
  {
    id: 'central-12h',
    name: 'AIGUILLE 12H AU CENTRE',
    description: 'Correction par poussoirs (incrémentation et décrémentation)',
    examples: ['23', '24', '22', '21', '12', '12', '12', '12', '11', '11'],
    displayType: 'analog',
    features: ['EP', 'P', 'P', '10', '10', '10', '18', '9', '3', '3', '16', '5', '6', '6', '15', '14', '13', '11']
  },
  {
    id: 'excentric-hm',
    name: 'AIGUILLES H+M /12H EXCENTRÉES',
    description: 'Aiguilles des heures et minutes excentrées sur cadran 12H',
    examples: [],
    displayType: 'analog',
    features: ['Quantieme']
  },
  {
    id: 'digital',
    name: 'AFFICHAGE NUMÉRIQUE',
    description: 'Affichage numérique des heures, minutes et secondes',
    examples: [],
    displayType: 'digital',
    features: ['6', '6']
  },
  {
    id: 'central-24h',
    name: 'AIGUILLE 24H AU CENTRE & INDICATEUR JOUR/NUIT',
    description: 'Aiguille centrale sur cadran 24H avec indicateur jour/nuit',
    examples: [],
    displayType: '24h',
    features: ['24h', 'Jour/Nuit']
  },
  {
    id: 'day-night-disc',
    name: 'INDICATEUR JOUR/NUIT SUR DISQUE 24H',
    description: 'Indication du jour et de la nuit sur disque tournant 24H',
    examples: [],
    displayType: '24h',
    features: ['Disque 24H', 'Rotation continue']
  }
];

export default function CorrectionsMontresPage() {
  return (
    <main className="min-h-screen bg-white font-sans">
      <header className="max-w-5xl mx-auto px-6 py-8">
        <Link href="/" className="text-sm text-black flex items-center gap-1 hover:opacity-70 transition-opacity">
          <ChevronLeft className="w-4 h-4" /> retour
        </Link>
      </header>

      <div className="max-w-5xl mx-auto px-6 pb-16">
        <h1 className="text-5xl font-bold text-black mb-12 tracking-tight">CORRECTIONS MONTRES</h1>
        
        <div className="space-y-0 divide-y divide-slate-200">
          {corrections.map((correction) => (
            <div key={correction.id} className="py-8 hover:bg-slate-50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-black tracking-tight mb-2">
                    {correction.name}
                  </h2>
                  <p className="text-sm text-slate-600 font-mono">
                    {correction.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  {correction.displayType === 'analog' && <Watch className="w-5 h-5 text-slate-400" />}
                  {correction.displayType === 'digital' && <Clock className="w-5 h-5 text-slate-400" />}
                  {correction.displayType === '24h' && (
                    <div className="flex">
                      <Sun className="w-5 h-5 text-yellow-400" />
                      <Moon className="w-5 h-5 text-indigo-400" />
                    </div>
                  )}
                </div>
              </div>

              {correction.examples.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {correction.examples.map((ex, idx) => (
                      <span key={idx} className="px-2 py-1 bg-slate-100 text-xs font-mono text-slate-700 rounded">
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
                {correction.features.map((feature, idx) => (
                  <div key={idx} className="text-center">
                    <span className="text-xs font-mono text-slate-500">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 text-sm text-black opacity-50">
          @ 2024 • Documentation technique horlogère
        </div>
      </div>
    </main>
  );
}
