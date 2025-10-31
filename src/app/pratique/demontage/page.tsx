"use client";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import FlipBookViewer from "@/components/FlipBookViewer";
import Flashcards6497 from "@/components/Flashcards6497";
import VueAssemblage from "@/components/VueAssemblage";

export default function DemontagePage() {
  return (
    <section className="bg-[#0a0a0a] min-h-screen py-20 px-4 sm:px-6 lg:px-8 overflow-visible">
      <div className="max-w-6xl mx-auto">
        {/* Bouton retour */}
        <Link
          href="/pratique"
          className="inline-flex items-center gap-2 text-[#E2B44F] hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Retour
        </Link>

        {/* Titre principal */}
        <h1 className="text-4xl md:text-5xl font-bold text-[#E2B44F] mb-12 text-center">
          Démontage & Remontage — Mouvement ETA 6497
        </h1>

        {/* Bloc principal en deux colonnes */}
        <div className="grid lg:grid-cols-2 gap-10 mb-16">
          {/* Colonne gauche : vidéo + texte */}
          <div>
            <div className="aspect-video w-full bg-black rounded-lg shadow-lg mb-8">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/SlB9FukapN4"
                title="Démontage mouvement ETA 6497"
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-lg"
              ></iframe>
            </div>

            <div className="bg-[#1a1a1a] p-6 md:p-8 rounded-lg">
              <h2 className="text-2xl md:text-3xl font-bold text-[#E2B44F] mb-4">
                Maîtriser le Démontage d'un Mouvement Mécanique
              </h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>
                  Le démontage d'un mouvement horloger est une opération délicate qui nécessite
                  méthode et précision. Avant toute intervention, il est
                  <strong className="text-[#E2B44F]">
                    {" "}crucial de laisser le mouvement tourner
                  </strong>{" "}
                  jusqu'à épuisement complet du ressort moteur.
                </p>
                <p>
                  Commencez toujours par{" "}
                  <strong className="text-[#E2B44F]">retirer le balancier</strong>, la pièce la plus
                  fragile. Ensuite, démontez les aiguilles à l’aide d’un tire-aiguilles, puis le
                  cadran et le rouage.
                </p>
                <p>
                  Manipulez chaque pièce avec{" "}
                  <strong className="text-[#E2B44F]">des brucelles adaptées</strong> et rangez-les
                  dans des coupelles séparées. Le mouvement ETA 6497 est idéal pour l’apprentissage
                  grâce à sa conception claire et robuste.
                </p>
              </div>
            </div>
          </div>

          {/* Colonne droite : FlipBook */}
          <div className="bg-[#111827] p-6 rounded-2xl border border-yellow-500/30 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="text-yellow-400 w-6 h-6" />
              <h2 className="text-xl font-semibold text-yellow-400">
                Guide de Démontage ETA 6497
              </h2>
            </div>
            <FlipBookViewer file="/pdfs/demontage/ETA-6497-Demontage.pdf" />
            {/* 🔧 Lien vers la page Remontage */}
            <div className="text-center mt-6">
              <Link
                href="/pratique/remontage"
                className="inline-block bg-[#E2B44F] text-black font-semibold px-5 py-3 rounded-md hover:bg-yellow-300 transition"
              >
                🔧 Accéder au guide de Remontage ETA 6497
              </Link>
            </div>
          </div>
        </div>

        {/* Assemblage INTERACTIF EN REMPLACEMENT DU QUIZ */}
        <section className="bg-[#1a1a1a] p-6 md:p-8 rounded-lg mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#E2B44F] mb-6">
            Assemblage interactif : Mouvement ETA 6497
          </h2>
          <VueAssemblage />
        </section>

        {/* Flashcards interactives */}
        <section className="mt-12">
          <Flashcards6497 />
        </section>
      </div>
    </section>
  );
}
