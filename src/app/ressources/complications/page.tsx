"use client";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Download } from 'lucide-react';

export default function Complications() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Bouton retour */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 mb-8 transition-colors cursor-pointer bg-transparent border-none"
        >
          <ArrowLeft className="w-5 h-5" />
          Retour
        </button>

        {/* Encadré explicatif */}
        <div className="bg-slate-800/50 rounded-lg p-6 sm:p-8 backdrop-blur-sm border border-slate-700 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-red-400 via-orange-500 to-red-600 bg-clip-text text-transparent">
            Complications Horlogères
          </h1>
          <p className="text-slate-300 leading-relaxed">
            Les complications horlogères représentent l'excellence de l'horlogerie suisse. 
            Elles désignent toutes les fonctions additionnelles à l'affichage simple de l'heure, 
            démontrant le savoir-faire technique et artistique des maîtres horlogers.
          </p>
        </div>

        {/* Visuel mouvement-chronographe */}
        <div className="mb-8 rounded-lg overflow-hidden shadow-2xl">
          <Image
            src="/images/mouvement-chronographe.jpg"
            alt="Mouvement de chronographe suisse"
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Description courte */}
        <div className="bg-slate-800/50 rounded-lg p-6 sm:p-8 backdrop-blur-sm border border-slate-700 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-red-400">
            Principales Complications
          </h2>
          <div className="space-y-4 text-slate-300">
            <div>
              <h3 className="font-semibold text-lg text-red-300 mb-2">Le Chronographe</h3>
              Fonction de chronométrage indépendante permettant de mesurer des intervalles de temps avec précision.
            </div>
            <div>
              <h3 className="font-semibold text-lg text-red-300 mb-2">Le Calendrier Perpétuel</h3>
              Affiche la date en tenant compte automatiquement des mois de différentes longueurs et des années bissextiles.
            </div>
            <div>
              <h3 className="font-semibold text-lg text-red-300 mb-2">La Répétition Minutes</h3>
              Complication sonore égrenant les heures, quarts et minutes sur demande par un système de marteaux et timbres.
            </div>
            <div>
              <h3 className="font-semibold text-lg text-red-300 mb-2">Le Tourbillon</h3>
              Mécanisme compensant les effets de la gravité sur la précision de la montre, inventé par Abraham-Louis Breguet.
            </div>
          </div>
        </div>

        {/* Bouton téléchargement PDF */}
        <div className="flex justify-center">
          <a
            href="/pdfs/complications.pdf"
            download
            className="inline-flex items-center gap-3 bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-4 rounded-lg transition-all transform hover:scale-105 shadow-lg"
          >
            <Download className="w-6 h-6" />
            Télécharger le guide PDF des complications
          </a>
        </div>
      </div>
    </div>
  );
}
