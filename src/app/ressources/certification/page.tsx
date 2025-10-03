"use client";
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Certification() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Bouton retour */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors cursor-pointer"
          >
            ← Retour
          </button>
        </div>

        {/* Encadré explicatif */}
        <section className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 sm:p-8 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-teal-400 mb-4">Certification horlogère suisse</h1>
          <p className="text-slate-300">
            Panorama des principaux parcours et certifications reconnus en Suisse: AFP (Attestation Fédérale de Formation Professionnelle), CFC (Certificat Fédéral de Capacité) et WOSTEP (Watchmakers of Switzerland Training and Educational Program).
          </p>
        </section>

        {/* Visuel */}
        <div className="flex justify-center mb-10">
          <div className="relative w-56 h-56 sm:w-64 sm:h-64">
            <Image
              src="/images/logo-certification.jpg"
              alt="Logo Certification Horlogerie Suisse"
              fill
              className="object-cover rounded-full border-4 border-teal-400 shadow-xl"
              priority
            />
          </div>
        </div>

        {/* Explications sur les parcours */}
        <section className="space-y-6 max-w-3xl mx-auto">
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
            <h2 className="text-xl font-semibold text-cyan-400 mb-2">AFP — Attestation Fédérale de Formation Professionnelle</h2>
            <p className="text-slate-300">Parcours de 2 ans axé sur les bases de l'horlogerie (démontage, remontage, outillage, contrôle qualité élémentaire). Idéal pour une entrée rapide et pratique dans le métier, avec accompagnement en entreprise.</p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
            <h2 className="text-xl font-semibold text-cyan-400 mb-2">CFC — Certificat Fédéral de Capacité</h2>
            <p className="text-slate-300">Formation complète sur 3 ans couvrant la production, le réglage, la maintenance et le contrôle qualité avancé. Référence pour exercer comme horloger·ère de production ou praticien·ne.</p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
            <h2 className="text-xl font-semibold text-cyan-400 mb-2">WOSTEP — Formations spécialisées</h2>
            <p className="text-slate-300">Modules avancés pour professionnels: complications, chronographes, tourbillons, échappements, ainsi que des volets gestion d'atelier et certification.</p>
          </div>
        </section>

        {/* Bouton téléchargement PDF */}
        <div className="text-center mt-10">
          <a
            href="/files/certification.pdf"
            download
            className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 font-medium shadow-lg"
          >
            Télécharger le guide PDF
          </a>
        </div>
      </div>
    </main>
  );
}
