"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft, Download } from "lucide-react";
import { useEffect } from "react";

export default function PrecisionBalance() {
  const router = useRouter();

  // ✨ Animation d’apparition au scroll
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in-scroll");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              "opacity-100",
              "translate-y-0",
              "scale-100"
            );
          }
        });
      },
      { threshold: 0.2 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const sections = [
    {
      titre: "1. Vérification du spiral",
      texte:
        "Le spiral doit être parfaitement centré, parallèle au balancier et exempt de toute déformation. Sa planéité garantit un battement régulier et précis.",
      image: "/images/balance-spiral.jpg",
    },
    {
      titre: "2. Ajustement des vis du balancier",
      texte:
        "Les vis de réglage situées sur la serge du balancier permettent d’équilibrer sa rotation. Tournez-les par paires opposées pour corriger les déséquilibres.",
      image: "/images/balance-vis.jpg",
    },
    {
      titre: "3. Réglage thermique",
      texte:
        "Les variations de température affectent la marche. Certains balanciers bimétalliques compensent ces effets grâce à une conception spécifique.",
      image: "/images/balance-thermique.jpg",
    },
    {
      titre: "4. Contrôle final sur vibrographe",
      texte:
        "Placez le mouvement sur le vibrographe et mesurez l’amplitude, la dérive et la symétrie du tic-tac. Ajustez jusqu’à atteindre les tolérances établies.",
      image: "/images/balance-vibrographe.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-16 space-y-12">

        {/* Navigation haut */}
        <div className="flex justify-between items-center fade-in-scroll opacity-0 translate-y-8 scale-95 transition-all duration-700 ease-out">
          <button
            onClick={() => router.push("/precision")}
            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Précision et réglage
          </button>
        </div>

        {/* Titre principal */}
        <div className="text-center fade-in-scroll opacity-0 translate-y-8 scale-95 transition-all duration-700 ease-out">
          <h1 className="text-4xl font-bold mb-4 text-amber-400">
            Ajustement de la précision — Réglage du balancier
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Étape finale du réglage horloger : assurer une marche constante et
            régulière du mouvement à travers la maîtrise du balancier et du spiral.
          </p>
        </div>

        {/* Sections pédagogiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {sections.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-800/40 border border-slate-700 rounded-xl overflow-hidden shadow-lg fade-in-scroll opacity-0 translate-y-8 scale-95 transition-all duration-700 ease-out"
            >
              <img
                src={item.image}
                alt={item.titre}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-amber-300 mb-3">
                  {item.titre}
                </h2>
                <p className="text-slate-300 leading-relaxed">{item.texte}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bloc final + PDF */}
        <div className="text-center bg-slate-800/50 border border-slate-700 rounded-lg p-6 fade-in-scroll opacity-0 translate-y-8 scale-95 transition-all duration-700 ease-out">
          <h3 className="text-amber-400 text-2xl font-bold mb-4">
            Fin du module de réglage
          </h3>
          <p className="text-slate-300 max-w-3xl mx-auto mb-6">
            Le balancier est le cœur battant de la montre. Sa justesse dépend de
            l’équilibre, de la tension du spiral et du soin apporté à chaque
            ajustement. Une régulation parfaite demande patience et expérience.
          </p>

          <a
            href="/pdfs/precision-balance.pdf"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-4 rounded-lg transition-all transform hover:scale-105 shadow-lg"
          >
            <Download className="w-6 h-6" />
            Télécharger la fiche PDF
          </a>
        </div>

        {/* Navigation bas */}
        <div className="flex justify-between items-center pt-8 border-t border-slate-700 fade-in-scroll opacity-0 translate-y-8 scale-95 transition-all duration-700 ease-out">
          <button
            onClick={() => router.push("/precision")}
            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Précision et réglage
          </button>
        </div>
      </div>
    </div>
  );
}
