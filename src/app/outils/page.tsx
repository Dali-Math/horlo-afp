'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Calculator } from 'lucide-react';
import RapportEngrenages from '@/components/outils/RapportEngrenages';
import ConvertisseurFrequence from '@/components/outils/ConvertisseurFrequence';
import ReserveMarche from '@/components/outils/ReserveMarche';
import LongueurSpiral from '@/components/outils/LongueurSpiral';
import TableauCouples from '@/components/outils/TableauCouples';
import GuideAmplitude from '@/components/outils/GuideAmplitude';
import IdentifierMouvement from '@/components/outils/IdentifierMouvement';
import Chronometre from '@/components/outils/Chronometre';
import ConvertisseurUnites from '@/components/outils/ConvertisseurUnites';

export default function OutilsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Retour à l'accueil
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <Calculator className="w-12 h-12" />
            <div>
              <h1 className="text-4xl font-bold">Outils de Calcul Horloger</h1>
              <p className="text-xl text-blue-100 mt-2">
                9 calculateurs professionnels pour l'horlogerie de précision
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <RapportEngrenages />
          <ConvertisseurFrequence />
          <ReserveMarche />
          <LongueurSpiral />
        </div>

        <TableauCouples />
        <GuideAmplitude />
        <IdentifierMouvement />
        <Chronometre />
        <ConvertisseurUnites />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400">© 2025 HorloLearn - Outils Professionnels</p>
        </div>
      </footer>
    </div>
  );
}
