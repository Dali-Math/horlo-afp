"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, Settings, Clock, Wrench, Target, Zap, Award, ChevronRight, PlayCircle } from "lucide-react";
import { useState, useEffect } from "react";

export default function ReglagePage() {
  const [activeSection, setActiveSection] = useState<string>("introduction");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0.1 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-white">
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-amber-500/20">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link
            href="/pratique"
            className="inline-flex items-center gap-2 text-amber-400 hover:text-white transition-all duration-300 group"
            aria-label="Retour à la page pratique"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span className="font-medium">Retour à la pratique</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <header className="text-center mb-16 md:mb-20">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent mb-6">
            Réglage & Précision
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Maîtrisez l'art subtil de la régulation horlogère et comprenez les secrets de la précision mécanique
          </p>
          <div className="mt-8 flex justify-center">
            <div className="h-1 w-32 bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full"></div>
          </div>
        </header>

        <aside className="mb-12 md:mb-16 bg-neutral-800/50 backdrop-blur-sm rounded-2xl p-6 border border-amber-500/20">
          <h2 className="text-2xl font-bold text-amber-400 mb-6 flex items-center gap-3">
            <BookOpen className="w-6 h-6" />
            Table des matières
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { id: "introduction", label: "Introduction", icon: "📖" },
              { id: "principes", label: "Principes fondamentaux", icon: "⚙️" },
              { id: "outils", label: "Outils du réglage", icon: "🛠️" },
              { id: "techniques", label: "Techniques avancées", icon: "🎯" },
              { id: "conseils", label: "Conseils pratiques", icon: "💡" },
              { id: "glossaire", label: "Glossaire", icon: "📚" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center gap-3 text-left p-3 rounded-lg transition-all duration-300 ${
                  activeSection === item.id
                    ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                    : "bg-neutral-900/50 text-gray-300 hover:bg-amber-500/10 hover:text-amber-300 border border-transparent"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
                {activeSection === item.id && <ChevronRight className="w-5 h-5 ml-auto" />}
              </button>
            ))}
          </div>
        </aside>

        <section id="introduction" className="mb-16 md:mb-20 scroll-mt-24">
          <div className="bg-black rounded-2xl overflow-hidden shadow-2xl border border-amber-500/30">
            <div className="relative" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/HVxT1kQ99kg"
                title="Tutoriel Horlogerie : Comment régler la marche d'un mouvement"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 p-6">
              <div className="flex items-center gap-3 text-amber-400 mb-2">
                <PlayCircle className="w-6 h-6" />
                <span className="font-semibold">Guide vidéo complet</span>
              </div>
              <p className="text-gray-300">
                Plongez dans les mécanismes subtiles du réglage de précision avec un maître horloger
              </p>
              <p className="text-gray-400 text-sm mt-2 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Durée : 15 minutes • 🎧 Audio : Français • 📺 Sous-titres disponibles
              </p>
            </div>
          </div>
        </section>

        <section id="principes" className="mb-16 md:mb-20 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-400 mb-8 flex items-center gap-4">
            <Settings className="w-8 h-8" />
            Principes fondamentaux du réglage
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-neutral-800/60 rounded-xl p-6 border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-7 h-7 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Le Balancier-Spiral</h3>
              <p className="text-gray-300 leading-relaxed">
                Cœur du régulateur, ce système oscille à une fréquence précise (2,5 à 5 Hz). 
                Sa période détermine la marche de la montre. Le spiral, en alliage spécial 
                (Nivarox), résiste aux variations de température et aux champs magnétiques.
              </p>
              <div className="mt-4 text-sm text-amber-300 bg-amber-500/10 rounded-lg p-3">
                <strong>Fréquence typique :</strong> 28 800 alternances/heure (4 Hz)
              </div>
            </div>

            <div className="bg-neutral-800/60 rounded-xl p-6 border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-7 h-7 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">La Raquette d'Ajustement</h3>
              <p className="text-gray-300 leading-relaxed">
                Petit levier qui modifie la longueur active du spiral. Déplacer la raquette 
                vers <strong className="text-amber-400">A (Avance)</strong> raccourcit le spiral 
                (montre plus rapide). Vers <strong className="text-amber-400">R (Retard)</strong>, 
                on l'allonge et elle ralentit.
              </p>
              <div className="mt-4 text-sm text-amber-300 bg-amber-500/10 rounded-lg p-3">
                <strong>Précision :</strong> 1/4 de tour ≈ 10 secondes/jour
              </div>
            </div>

            <div className="bg-neutral-800/60 rounded-xl p-6 border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-7 h-7 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">L'Amplitude</h3>
              <p className="text-gray-300 leading-relaxed">
                Angle de rotation du balancier (idéalement 270-320°). Une amplitude trop faible 
                indique un problème de lubrification ou d'usure. Le chronocomparateur mesure 
                cette valeur en temps réel.
              </p>
              <div className="mt-4 text-sm text-amber-300 bg-amber-500/10 rounded-lg p-3">
                <strong>Optimal :</strong> 280-300° en position horizontale
              </div>
            </div>
          </div>
        </section>

        <section id="outils" className="mb-16 md:mb-20 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-400 mb-8 flex items-center gap-4">
            <Wrench className="w-8 h-8" />
            Outils essentiels du réglage
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: "Chronocomparateur",
                description: "Mesure la fréquence, l'amplitude et l'erreur de marche avec une précision de 0,1 seconde/jour.",
                specs: "Microphone à contact • Affichage graphique • 6 positions"
              },
              {
                name: "Loupe binoculaire",
                description: "Grossissement 10x à 20x pour observer le spiral et la raquette sans fatigue oculaire.",
                specs: "Éclairage LED • Réglage dioptrique • Confort prolongé"
              },
              {
                name: "Tourne-raquette",
                description: "Outil fin pour déplacer la raquette sans endommager le spiral.",
                specs: "Acier inoxydable • Pointe diamantée • Poignée ergonomique"
              },
              {
                name: "Dé-magnétiseur",
                description: "Élimine l'aimantation qui perturbe le spiral et fausse la marche.",
                specs: "Champ pulsé • 5 cycles automatiques • Compatible tous mouvements"
              }
            ].map((tool, index) => (
              <div key={index} className="bg-neutral-800/60 rounded-xl p-6 border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 hover:translate-x-2">
                <h3 className="text-xl font-bold text-amber-400 mb-2">{tool.name}</h3>
                <p className="text-gray-300 mb-3">{tool.description}</p>
                <div className="text-sm text-gray-400 bg-neutral-900/50 rounded-lg p-3 border border-amber-500/10">
                  <strong className="text-amber-300">Caractéristiques :</strong> {tool.specs}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="techniques" className="mb-16 md:mb-20 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-400 mb-8">
            Techniques de réglage avancées
          </h2>
          
          <div className="space-y-6">
            {[
              {
                step: "1. Diagnostic initial",
                content: "Mesurer la marche sur 24h dans 3 positions (cadran haut, couronne haut, couronne bas). Noter les écarts et l'amplitude."
              },
              {
                step: "2. Dépose du mouvement",
                content: "Extraire délicatement le mouvement du boîtier. Vérifier l'état du spiral (pas de touches, pas d'oxydation)."
              },
              {
                step: "3. Ajustement fin",
                content: "Utiliser le tourne-raquette. Un clic = ~5 sec/jour. Toujours agir par petites incréments."
              },
              {
                step: "4. Validation",
                content: "Re-mesurer après chaque ajustement. Un réglage optimal nécessite 3-5 cycles d'ajustement."
              }
            ].map((technique, index) => (
              <div key={index} className="bg-neutral-800/60 rounded-xl p-6 border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300">
                <h3 className="text-xl font-bold text-amber-400 mb-3 flex items-center gap-3">
                  <span className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-black font-bold text-sm">
                    {index + 1}
                  </span>
                  {technique.step}
                </h3>
                <p className="text-gray-300 leading-relaxed ml-11">{technique.content}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="conseils" className="mb-16 md:mb-20 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-400 mb-8">
            Conseils pratiques pour horlogers amateurs
          </h2>
          
          <div className="bg-gradient-to-r from-amber-500/10 to-amber-600/10 rounded-2xl p-8 border border-amber-500/30">
            <ul className="space-y-4">
              {[
                "🎯 **Ne jamais forcer** : La raquette est fragile. Un mouvement doux est préférable à un réglage brutal.",
                "🌡️ **Température stable** : Régler à 20°C ±2°C. Les variations thermiques affectent le spiral.",
                "🧲 **Dé-magnétiser systématiquement** : Avant tout réglage, vérifiez l'aimantation.",
                "💧 **Lubrification contrôlée** : Trop de lubrifiant ralentit la montre, trop peu l'use prématurément.",
                "📊 **Documenter chaque étape** : Notez les mesures initiales et les ajustements effectués.",
                "⏱️ **Patience est mère de précision** : Un réglage parfait peut prendre plusieurs jours."
              ].map((tip, index) => (
                <li key={index} className="text-gray-300 leading-relaxed flex gap-3">
                  <span className="text-amber-400 mt-1">•</span>
                  <span dangerouslySetInnerHTML={{ __html: tip }}></span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="glossaire" className="mb-16 md:mb-20 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-400 mb-8 flex items-center gap-4">
            <Award className="w-8 h-8" />
            Glossaire technique
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { term: "Isochronisme", def: "Capacité du spiral à osciller à la même fréquence quel que soit l'amplitude." },
              { term: "Béat", def: "Chaque oscillation du balancier (un aller-retour). 28 800 alternances = 14 400 béats." },
              { term: "Position", def: "Orientation de la montre (cadran haut, bas, gauche, droite, couronne haut/bas)." },
              { term: "Chronomètre", def: "Montre certifiée ayant passé avec succès des tests de précision au COSC." },
              { term: "Échappement", def: "Mécanisme qui transmet l'énergie du ressort au balancier par impulsions." },
              { term: "Inertie", def: "Propriété du balancier à résister aux changements de vitesse de rotation." }
            ].map((item, index) => (
              <div key={index} className="bg-neutral-800/60 rounded-lg p-5 border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300">
                <h3 className="text-lg font-bold text-amber-400 mb-2">{item.term}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{item.def}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center bg-gradient-to-r from-amber-500/20 to-amber-600/20 rounded-2xl p-10 md:p-12 border border-amber-500/30">
          <h2 className="text-3xl font-bold text-amber-400 mb-4">
            Prêt à maîtriser le réglage ?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            La précision horlogère est un art qui s'acquiert avec la pratique, la patience et la compréhension des principes fondamentaux.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pratique"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold px-8 py-3 rounded-full hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300 group"
            >
              <span>Passer à la pratique</span>
              <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/theorie/mouvements"
              className="inline-flex items-center gap-2 border-2 border-amber-400 text-amber-400 font-bold px-8 py-3 rounded-full hover:bg-amber-400 hover:text-black transition-all duration-300"
            >
              <BookOpen className="w-5 h-5" />
              <span>Approfondir la théorie</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
