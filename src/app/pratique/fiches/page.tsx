"use client";
import Link from "next/link";
import { BookOpen, ArrowLeft } from "lucide-react";

export default function FichesPage() {
  const fiches = [
    {
      title: "ETA 6497-1",
      description:
        "Communication technique officielle ETA – Détails complets du calibre 6497-1.",
      link: "/pratique/fiches/eta6497",
      date: "28 novembre 2016",
    },
    {
      title: "ETA 2824-2",
      description:
        "Communication technique officielle ETA – Détails complets du calibre 2824-2, mouvement automatique à remontage unidirectionnel.",
      link: "/pratique/fiches/eta2824",
      date: "7 mars 2018",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b1220] text-white py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/pratique"
          className="inline-flex items-center gap-2 text-yellow-400 hover:text-white transition mb-8"
        >
          <ArrowLeft className="w-5 h-5" /> Retour
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="text-yellow-400 w-7 h-7" />
          <h1 className="text-3xl font-bold text-yellow-400">
            Fiches Techniques
          </h1>
        </div>

        <p className="text-gray-300 text-lg leading-relaxed mb-10">
          Consultez et visualisez directement les fiches techniques de chaque
          mouvement horloger. Idéal pour la révision et la formation.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {fiches.map((fiche, i) => (
            <div
              key={i}
              className="bg-[#111827] border border-yellow-500/30 p-6 rounded-2xl shadow-lg hover:shadow-yellow-500/20 transition-all"
            >
              <h3 className="text-yellow-400 text-2xl font-semibold mb-2">
                {fiche.title}
              </h3>
              <p className="text-gray-400 mb-4">{fiche.description}</p>
              <p className="text-sm text-gray-500 mb-6">{fiche.date}</p>

              <Link
                href={fiche.link}
                className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded-md hover:bg-yellow-300 transition"
              >
                📖 Ouvrir
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
