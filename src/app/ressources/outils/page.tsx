'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Info, Download } from 'lucide-react';

export default function OutilsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Bouton retour */}
        <Link
          href="/ressources"
          className="inline-flex items-center gap-2 mb-8 text-slate-300 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 -ml-1 group-hover:-translate-x-1 transition-transform" />
          <span>Retour aux Ressources</span>
        </Link>

        {/* Titre et description courte */}
        <header className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Outils Horlogers</h1>
          <p className="mt-3 text-slate-300 max-w-2xl">
            Aperçu synthétique des outils fondamentaux utilisés en atelier: brucelles, tournevis,
            huiliers et instruments de contrôle pour l’assemblage et la maintenance des mouvements.
          </p>
        </header>

        {/* Encadré explicatif */}
        <section className="mb-10 bg-gradient-to-br from-blue-900/40 to-indigo-900/40 backdrop-blur-sm border border-blue-700/50 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <Info className="w-6 h-6 text-blue-300 mt-1 shrink-0" />
            <div>
              <h2 className="text-xl font-semibold text-blue-200">Objectif pédagogique</h2>
              <p className="mt-2 text-slate-200">
                Identifier le rôle de chaque outil, les bonnes pratiques de manipulation et les
                précautions de sécurité pour préserver les organes du mouvement et garantir la
                précision des interventions.
              </p>
            </div>
          </div>
        </section>

        {/* Image pédagogique */}
        <figure className="mb-8 rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50">
          <Image
            src="/images/outils-horlogers.jpg"
            alt="Planche pédagogique: outils horlogers (tournevis, brucelles, huiliers)"
            width={1600}
            height={900}
            className="w-full h-auto"
            priority
          />
          <figcaption className="sr-only">Planche pédagogique suisse des outils horlogers</figcaption>
        </figure>

        {/* Bouton de téléchargement PDF */}
        <div className="mt-6">
          <Link
            href="/pdf/outils.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 text-slate-900 font-medium hover:bg-amber-400 transition-colors"
          >
            <Download className="w-5 h-5" />
            Télécharger le PDF pédagogique
          </Link>
        </div>
      </div>
    </main>
  );
}
