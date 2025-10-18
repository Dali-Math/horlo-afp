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
import SimulateurEchappement from '@/components/outils/SimulateurEchappement';
import GenerateurFiches from '@/components/outils/GenerateurFiches';
import BaseDonneesPieces from '@/components/outils/BaseDonneesPieces';

export default function OutilsPage() {
  return (
    <div className="min-h-screen bg-light-100 dark:bg-dark-900 text-slate-900 dark:text-light-100 transition-colors duration-500">
      {/* Header */}
      <header className="bg-white dark:bg-dark-900 shadow-sm border-b border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="inline-flex items-center text-gold hover:text-gold-light transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Retour à l’accueil
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gold-dark to-gold text-dark-900 dark:text-dark-900 py-12 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-dark-900 text-gold p-3 rounded-xl shadow-lg">
              <Calculator className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Outils de Calcul Horloger</h1>
              <p className="text-lg mt-2 text-dark-800/80 dark:text-dark-800">
                12 calculateurs professionnels pour l’horlogerie de précision
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
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
        <SimulateurEchappement />
        <GenerateurFiches />
        <BaseDonneesPieces />
      </main>

      {/* Footer */}
      <footer className="bg-dark-900 text-light-200 py-8 mt-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-light-400">
            © 2025 HorloLearn – Outils Professionnels Horlogers
          </p>
        </div>
      </footer>
    </div>
  );
}
