"use client";
import { BookOpen } from "lucide-react";

export default function LectureDePlan() {
  return (
    <section className="min-h-screen bg-[#0b1220] text-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Titre principal */}
        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="text-[#E2B44F] w-8 h-8" />
          <h1 className="text-4xl font-bold text-[#E2B44F]">Lecture de Plan</h1>
        </div>

        {/* Introduction */}
        <p className="text-gray-300 mb-10 max-w-3xl">
          Cette section regroupe les principales normes et références officielles liées à la
          lecture de plan en horlogerie. Les documents ci-dessous renvoient directement vers
          les sources ISO et NIHS, garantissant l’accès aux informations authentiques et à jour.
        </p>

        {/* Liste de liens */}
        <div className="space-y-6">
          {/* Vues techniques */}
          <div className="p-6 bg-[#111827] rounded-xl border border-[#E2B44F]/30 hover:border-[#E2B44F] transition-all">
            <h2 className="text-xl font-semibold text-[#E2B44F] mb-2">📐 Vues Techniques (Projection orthogonale)</h2>
            <p className="text-gray-400 mb-3">
              Représentation des objets mécaniques selon la norme ISO 128-3.
              Ces principes permettent de comprendre les différentes vues d’une pièce horlogère.
            </p>
            <a
              href="https://www.iso.org/standard/74376.html"
              target="_blank"
              className="text-[#E2B44F] hover:underline"
            >
              → Consulter la norme ISO 128-3 sur le site officiel
            </a>
          </div>

          {/* Types de lignes */}
          <div className="p-6 bg-[#111827] rounded-xl border border-[#E2B44F]/30 hover:border-[#E2B44F] transition-all">
            <h2 className="text-xl font-semibold text-[#E2B44F] mb-2">✏️ Types de Lignes (ISO 128-2)</h2>
            <p className="text-gray-400 mb-3">
              Cette norme définit les différents types de lignes utilisés dans les dessins techniques
              (contours, axes, lignes de coupe, etc.).
            </p>
            <a
              href="https://www.iso.org/standard/74375.html"
              target="_blank"
              className="text-[#E2B44F] hover:underline"
            >
              → Consulter la norme ISO 128-2 sur le site officiel
            </a>
          </div>

          {/* Cotes et tolérances */}
          <div className="p-6 bg-[#111827] rounded-xl border border-[#E2B44F]/30 hover:border-[#E2B44F] transition-all">
            <h2 className="text-xl font-semibold text-[#E2B44F] mb-2">📏 Cotes et Tolérances (ISO 129-1 & ISO 1101)</h2>
            <p className="text-gray-400 mb-3">
              Ces normes précisent les règles de cotation et les tolérances dimensionnelles
              pour garantir la compatibilité et la précision des assemblages horlogers.
            </p>
            <ul className="list-disc pl-6 text-gray-400 space-y-1">
              <li>
                <a href="https://www.iso.org/standard/70174.html" target="_blank" className="text-[#E2B44F] hover:underline">
                  ISO 129-1 : Indication des dimensions
                </a>
              </li>
              <li>
                <a href="https://www.iso.org/standard/55765.html" target="_blank" className="text-[#E2B44F] hover:underline">
                  ISO 1101 : Tolérances géométriques
                </a>
              </li>
            </ul>
          </div>

          {/* Symboles normalisés */}
          <div className="p-6 bg-[#111827] rounded-xl border border-[#E2B44F]/30 hover:border-[#E2B44F] transition-all">
            <h2 className="text-xl font-semibold text-[#E2B44F] mb-2">🔣 Symboles Normalisés (ISO 1302 & ISO 13715)</h2>
            <p className="text-gray-400 mb-3">
              Les symboles de finition, d’état de surface et de chanfrein assurent
              la qualité et la fonctionnalité des pièces mécaniques.
            </p>
            <ul className="list-disc pl-6 text-gray-400 space-y-1">
              <li>
                <a href="https://www.iso.org/standard/10778.html" target="_blank" className="text-[#E2B44F] hover:underline">
                  ISO 1302 : Rugosité de surface
                </a>
              </li>
              <li>
                <a href="https://www.iso.org/standard/23135.html" target="_blank" className="text-[#E2B44F] hover:underline">
                  ISO 13715 : Arêtes et chanfreins
                </a>
              </li>
            </ul>
          </div>

          {/* Cartouche horloger */}
          <div className="p-6 bg-[#111827] rounded-xl border border-[#E2B44F]/30 hover:border-[#E2B44F] transition-all">
            <h2 className="text-xl font-semibold text-[#E2B44F] mb-2">📄 Cartouche Horloger (NIHS 7200 / 7201)</h2>
            <p className="text-gray-400 mb-3">
              Le cartouche regroupe les informations essentielles d’un dessin horloger :
              titre, échelle, matière, nom du dessinateur et révision.
            </p>
            <a
              href="https://nihs.ch/normes/nihs-7200"
              target="_blank"
              className="text-[#E2B44F] hover:underline"
            >
              → Consulter la norme NIHS 7200 sur le site officiel
            </a>
          </div>

          {/* Éléments spécifiques à l’horlogerie */}
          <div className="p-6 bg-[#111827] rounded-xl border border-[#E2B44F]/30 hover:border-[#E2B44F] transition-all">
            <h2 className="text-xl font-semibold text-[#E2B44F] mb-2">⚙️ Éléments Spécifiques à l’Horlogerie</h2>
            <p className="text-gray-400 mb-3">
              Les composants horlogers (roues, ponts, vis, axes) obéissent à des normes et tolérances spécifiques.
              Leur représentation suit les standards NIHS.
            </p>
            <a
              href="https://nihs.ch/normes"
              target="_blank"
              className="text-[#E2B44F] hover:underline"
            >
              → Voir l’ensemble des normes NIHS horlogères
            </a>
          </div>
        </div>

        {/* Mention légale */}
        <p className="text-gray-500 text-sm mt-12 border-t border-gray-700 pt-6">
          © HorloLearn 2025 – Liens officiels vers les normes ISO & NIHS.
          Ces références sont fournies à titre pédagogique pour faciliter la formation et la culture horlogère.
        </p>
      </div>
    </section>
  );
}
