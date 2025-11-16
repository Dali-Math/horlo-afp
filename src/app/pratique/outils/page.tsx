"use client";

import Link from "next/link";
import { 
  ArrowLeft, 
  ChevronRight, 
  Wrench, 
  Eye, 
  Shield, 
  DollarSign, 
  Award, 
  Zap, 
  BookOpen, 
  Package, 
  Heart, 
  Settings,
  Sun,
  Moon
} from "lucide-react";
import { useState, useEffect } from "react";

export default function OutilsPage() {
  const [activeSection, setActiveSection] = useState<string>("introduction");
  const [darkMode, setDarkMode] = useState<boolean>(true);

  const sections = [
    { id: "introduction", title: "Introduction", icon: BookOpen },
    { id: "essentiels", title: "Les 5 outils essentiels", icon: Wrench },
    { id: "types-brucelles", title: "Les brucelles", icon: Eye },
    { id: "tournevis", title: "Tournevis horlogers", icon: Settings },
    { id: "bergeron", title: "Porte-pièces & Bergeron", icon: Package },
    { id: "mesure", title: "Mesure & contrôle", icon: Shield },
    { id: "achat", title: "Conseils d'achat", icon: DollarSign },
    { id: "entretien", title: "Entretien des outils", icon: Heart },
    { id: "checklist", title: "Checklist débutant", icon: Award },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(s => document.getElementById(s.id));
      const scrollPosition = window.scrollY + 200;
      for (let i = 0; i < sectionElements.length; i++) {
        const element = sectionElements[i];
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionElements[i]?.id || "");
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen py-8 px-4 ${
      darkMode 
        ? "bg-[#0a0a0a] text-white" 
        : "bg-gradient-to-br from-slate-50 to-blue-50 text-slate-900"
    }`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link 
            href="/pratique" 
            className={`inline-flex items-center gap-2 transition-all duration-300 group ${
              darkMode 
                ? "text-[#E2B44F] hover:text-white" 
                : "text-amber-600 hover:text-amber-800"
            }`}
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Retour à la pratique
          </Link>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg transition-all duration-300 ${
              darkMode
                ? "bg-[#1a1a1a] border border-gray-700 text-[#E2B44F] hover:bg-[#2a2a2a]"
                : "bg-white border border-slate-200 text-amber-600 hover:bg-amber-50"
            }`}
            aria-label="Basculer le mode sombre"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        <h1 className={`text-4xl md:text-6xl font-bold mb-12 text-center font-serif tracking-tight ${
          darkMode ? "text-[#E2B44F]" : "text-amber-600"
        }`}>
          Outils & Équipement Horlogers
        </h1>

        <nav className={`mb-12 p-6 sticky top-4 z-10 rounded-xl shadow-xl ${
          darkMode
            ? "bg-[#1a1a1a] border border-gray-800"
            : "bg-white/60 backdrop-blur-xl border border-slate-200"
        }`}>
          <h2 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${
            darkMode ? "text-[#E2B44F]" : "text-amber-600"
          }`}>
            <BookOpen className="w-5 h-5" />
            Plan du cours
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`flex items-center gap-2 text-left p-3 rounded-lg transition-all duration-300 ${
                    darkMode
                      ? `hover:bg-[#2a2a2a] ${
                          activeSection === section.id
                            ? "bg-[#2a2a2a] text-[#E2B44F]"
                            : "text-gray-300"
                        }`
                      : `hover:bg-amber-100 ${
                          activeSection === section.id
                            ? "bg-amber-100 text-amber-600"
                            : "text-slate-700"
                        }`
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{section.title}</span>
                </button>
              );
            })}
          </div>
        </nav>

        <section id="introduction" className="mb-12 scroll-mt-24">
          <div className={`aspect-video w-full overflow-hidden shadow-2xl rounded-2xl transition-all duration-300 ${
            darkMode
              ? "bg-black border border-[#E2B44F]/30 hover:border-[#E2B44F]"
              : "bg-white border border-slate-200 hover:border-amber-500/60"
          }`}>
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/4tl7xNPvmyM?start=573" 
              title="Présentation des outils horlogers" 
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen 
              className="w-full h-full"
            ></iframe>
          </div>
          <p className={`text-sm mt-3 italic text-center ${
            darkMode ? "text-gray-400" : "text-slate-600"
          }`}>
            🎧 Langue audio : anglais — sous-titres français disponibles dans les paramètres YouTube
          </p>
        </section>

        <section id="essentiels" className={`mb-12 p-6 md:p-8 rounded-xl border scroll-mt-24 ${
          darkMode
            ? "bg-[#1a1a1a] border-gray-800"
            : "bg-white border-slate-200"
        }`}>
          <h2 className={`text-3xl font-bold mb-6 flex items-center gap-3 font-serif ${
            darkMode ? "text-[#E2B44F]" : "text-amber-600"
          }`}>
            <Wrench className="w-7 h-7" />
            Les 5 outils essentiels pour débuter
          </h2>
          <div className={`leading-relaxed space-y-6 ${
            darkMode ? "text-gray-300" : "text-slate-700"
          }`}>
            <p className="text-lg">
              Un horloger débutant peut commencer avec seulement{" "}
              <strong className={`${
                darkMode ? "text-[#E2B44F]" : "text-amber-600"
              }`}>
                5 outils de qualité
              </strong>{" "}
              plutôt qu'une mallette complète de mauvaise qualité. L'investissement initial pour des outils professionnels se rentabilise en évitant la casse de pièces.
            </p>
            <div className={`p-5 rounded-lg border-l-4 my-6 ${
              darkMode
                ? "bg-[#0a0a0a] border-[#E2B44F]"
                : "bg-neutral-100 border-amber-600"
            }`}>
              <h3 className={`font-bold mb-2 flex items-center gap-2 ${
                darkMode ? "text-white" : "text-slate-900"
              }`}>
                <Zap className={`w-5 h-5 ${
                  darkMode ? "text-[#E2B44F]" : "text-amber-600"
                }`} />
                Le meilleur conseil
              </h3>
              <p className={darkMode ? "text-gray-300" : "text-slate-700"}>
                "Mieux vaut 3 outils de qualité professionnelle que 30 outils de mauvaise qualité qui abîmeront vos pièces." - <em>Proverbe horloger suisse</em>
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <div className={`p-6 rounded-lg border transition-all ${
              darkMode
                ? "bg-[#0a0a0a] border-gray-700 hover:border-[#E2B44F]/30"
                : "bg-neutral-100 border-slate-200 hover:border-amber-500/40"
            }`}>
              <h3 className={`text-xl font-bold mb-3 ${
                darkMode ? "text-[#E2B44F]" : "text-amber-600"
              }`}>1. Brucelles n°3 et n°5</h3>
              <p className={`text-sm ${
                darkMode ? "text-gray-400" : "text-slate-600"
              }`}>Bouts pointus et plats. INDISPENSABLES pour 90% des manipulations. Budget : 25-40€ pour une paire de qualité.</p>
            </div>
            <div className={`p-6 rounded-lg border transition-all ${
              darkMode
                ? "bg-[#0a0a0a] border-gray-700 hover:border-[#E2B44F]/30"
                : "bg-neutral-100 border-slate-200 hover:border-amber-500/40"
            }`}>
              <h3 className={`text-xl font-bold mb-3 ${
                darkMode ? "text-[#E2B44F]" : "text-amber-600"
              }`}>2. Tournevis 0.80mm et 1.00mm</h3>
              <p className={`text-sm ${
                darkMode ? "text-gray-400" : "text-slate-600"
              }`}>Lames parfaitement ajustées. Évitez les kits cheap. Budget : 15-25€ par tournevis.</p>
            </div>
            <div className={`p-6 rounded-lg border transition-all ${
              darkMode
                ? "bg-[#0a0a0a] border-gray-700 hover:border-[#E2B44F]/30"
                : "bg-neutral-100 border-slate-200 hover:border-amber-500/40"
            }`}>
              <h3 className={`text-xl font-bold mb-3 ${
                darkMode ? "text-[#E2B44F]" : "text-amber-600"
              }`}>3. Loupe monoculaire x10</h3>
              <p className={`text-sm ${
                darkMode ? "text-gray-400" : "text-slate-600"
              }`}>Grossissement optique, pas plastique. Budget : 30-50€ pour une loupe Zeiss ou Bergeon.</p>
            </div>
            <div className={`p-6 rounded-lg border transition-all ${
              darkMode
                ? "bg-[#0a0a0a] border-gray-700 hover:border-[#E2B44F]/30"
                : "bg-neutral-100 border-slate-200 hover:border-amber-500/40"
            }`}>
              <h3 className={`text-xl font-bold mb-3 ${
                darkMode ? "text-[#E2B44F]" : "text-amber-600"
              }`}>4. Porte-pièces simple</h3>
              <p className={`text-sm ${
                darkMode ? "text-gray-400" : "text-slate-600"
              }`}>Pour maintenir les pièces sans les serrer trop fort. Budget : 20-35€.</p>
            </div>
            <div className={`p-6 rounded-lg border transition-all ${
              darkMode
                ? "bg-[#0a0a0a] border-gray-700 hover:border-[#E2B44F]/30"
                : "bg-neutral-100 border-slate-200 hover:border-amber-500/40"
            }`}>
              <h3 className={`text-xl font-bold mb-3 ${
                darkMode ? "text-[#E2B44F]" : "text-amber-600"
              }`}>5. Chasse-goupille</h3>
              <p className={`text-sm ${
                darkMode ? "text-gray-400" : "text-slate-600"
              }`}>Pour retirer les axes de balancier. Budget : 10-20€.</p>
            </div>
            <div className={`p-6 rounded-lg border ${
              darkMode
                ? "bg-yellow-900/20 border-yellow-700/30"
                : "bg-yellow-100 border-yellow-500/30"
            }`}>
              <h3 className={`text-xl font-bold mb-3 ${
                darkMode ? "text-yellow-400" : "text-yellow-700"
              }`}>Budget total : 100-170€</h3>
              <p className={`text-sm ${
                darkMode ? "text-gray-400" : "text-slate-600"
              }`}>Investissement rentable dès la première pièce sauvée !</p>
            </div>
          </div>
        </section>

        <section id="types-brucelles" className="mb-12 scroll-mt-24">
          <h2 className={`text-3xl font-bold mb-6 font-serif flex items-center gap-3 ${
            darkMode ? "text-[#E2B44F]" : "text-amber-600"
          }`}>
            <Eye className="w-7 h-7" />
            Les brucelles : extension de vos doigts
          </h2>
          <div className={`p-6 rounded-xl border ${
            darkMode
              ? "bg-[#1a1a1a] border-gray-800"
              : "bg-white border-slate-200"
          }`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className={`font-bold mb-3 ${
                  darkMode ? "text-[#E2B44F]" : "text-amber-600"
                }`}>Types de brucelles</h3>
                <ul className={`space-y-2 text-sm ${
                  darkMode ? "text-gray-300" : "text-slate-700"
                }`}>
                  <li><strong>N°1 (0.10mm) :</strong> Pour les micro-pièces, les ressorts minuscules</li>
                  <li><strong>N°3 (0.17mm) :</strong> <strong className={darkMode ? "text-white" : "text-slate-900"}>Usage général</strong>, 80% des manipulations</li>
                  <li><strong>N°5 (0.25mm) :</strong> Pour les pièces robustes, les roues</li>
                  <li><strong>Courbées :</strong> Pour accéder aux endroits difficiles</li>
                  <li><strong>À plat :</strong> Pour saisir sans marquer</li>
                </ul>
              </div>
              <div className={`p-4 rounded-lg border ${
                darkMode
                  ? "bg-[#0a0a0a] border-gray-700"
                  : "bg-neutral-100 border-slate-200"
              }`}>
                <h3 className={`font-bold mb-2 ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}>Conseils d'utilisation</h3>
                <ul className={`space-y-1 text-xs ${
                  darkMode ? "text-gray-400" : "text-slate-500"
                }`}>
                  <li>• Jamais de tension excessive → doigts fatigués</li>
                  <li>• Nettoyer à l'alcool après chaque utilisation</li>
                  <li>• Stocker dans un étui → pointes protégées</li>
                  <li>• Remplacer dès que les pointes sont usées</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="tournevis" className="mb-12 scroll-mt-24">
          <h2 className={`text-3xl font-bold mb-6 font-serif flex items-center gap-3 ${
            darkMode ? "text-[#E2B44F]" : "text-amber-600"
          }`}>
            <Settings className="w-7 h-7" />
            Tournevis horlogers : la précision avant tout
          </h2>
          <div className={`p-6 rounded-xl border ${
            darkMode
              ? "bg-[#1a1a1a] border-gray-800"
              : "bg-white border-slate-200"
          }`}>
            <h3 className={`text-xl font-bold mb-4 ${
              darkMode ? "text-[#E2B44F]" : "text-amber-600"
            }`}>Dimensions standard (Bergeon)</h3>
            <div className="overflow-x-auto">
              <table className={`w-full text-sm text-left ${
                darkMode ? "text-gray-300" : "text-slate-700"
              }`}>
                <thead className={`text-xs uppercase ${
                  darkMode
                    ? "text-[#E2B44F] bg-[#0a0a0a]"
                    : "text-amber-600 bg-neutral-100"
                }`}>
                  <tr>
                    <th className="px-4 py-3">Taille</th>
                    <th className="px-4 py-3">Utilisation</th>
                    <th className="px-4 py-3">Montres concernées</th>
                    <th className="px-4 py-3">Risque si mal ajusté</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={`border-b ${
                    darkMode ? "border-gray-800" : "border-slate-200"
                  }`}>
                    <td className={`px-4 py-3 font-medium ${
                      darkMode ? "text-white" : "text-slate-900"
                    }`}>0.60mm</td>
                    <td className="px-4 py-3">Vis très fines</td>
                    <td className="px-4 py-3">Montres dames vintage</td>
                    <td className={darkMode ? "px-4 py-3 text-red-400" : "px-4 py-3 text-red-600"}>
                      Casse de la tête garantie
                    </td>
                  </tr>
                  <tr className={`border-b ${
                    darkMode ? "border-gray-800" : "border-slate-200"
                  }`}>
                    <td className={`px-4 py-3 font-medium ${
                      darkMode ? "text-white" : "text-slate-900"
                    }`}>0.80mm</td>
                    <td className="px-4 py-3"><strong>Usage général</strong></td>
                    <td className="px-4 py-3">ETA 2824, Rolex 3135</td>
                    <td className="px-4 py-3">Usure prématurée du trait</td>
                  </tr>
                  <tr className={`border-b ${
                    darkMode ? "border-gray-800" : "border-slate-200"
                  }`}>
                    <td className={`px-4 py-3 font-medium ${
                      darkMode ? "text-white" : "text-slate-900"
                    }`}>1.00mm</td>
                    <td className="px-4 py-3">Vis robustes</td>
                    <td className="px-4 py-3">Bridges, barillets</td>
                    <td className="px-4 py-3">Fente évasée</td>
                  </tr>
                  <tr className={`border-b ${
                    darkMode ? "border-gray-800" : "border-slate-200"
                  }`}>
                    <td className={`px-4 py-3 font-medium ${
                      darkMode ? "text-white" : "text-slate-900"
                    }`}>1.20mm</td>
                    <td className="px-4 py-3">Gros travaux</td>
                    <td className="px-4 py-3">Boîtiers, fonds</td>
                    <td className="px-4 py-3">Déformation du pont</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={`mt-6 p-4 rounded-lg border ${
              darkMode
                ? "bg-[#0a0a0a] border-[#E2B44F]/30"
                : "bg-neutral-100 border-amber-500/30"
            }`}>
              <p className={`text-sm ${
                darkMode ? "text-gray-300" : "text-slate-700"
              }`}>
                <strong className={darkMode ? "text-white" : "text-slate-900"}>⚠️ Attention :</strong> Un tournevis 0.80mm mal taillé abîmera plus de vis qu'un tournevis 1.00mm bien aiguisé. La qualité du tranchant prime sur la taille exacte.
              </p>
            </div>
          </div>
        </section>

        <section id="bergeron" className="mb-12 scroll-mt-24">
          <h2 className={`text-3xl font-bold mb-6 font-serif flex items-center gap-3 ${
            darkMode ? "text-[#E2B44F]" : "text-amber-600"
          }`}>
            <Package className="w-7 h-7" />
            Porte-pièces & Bergeron : la troisième main
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`p-6 rounded-xl border ${
              darkMode
                ? "bg-[#1a1a1a] border-gray-800"
                : "bg-white border-slate-200"
            }`}>
              <h3 className={`text-xl font-bold mb-3 ${
                darkMode ? "text-[#E2B44F]" : "text-amber-600"
              }`}>Le porte-pièces simple</h3>
              <ul className={`space-y-2 text-sm ${
                darkMode ? "text-gray-300" : "text-slate-700"
              }`}>
                <li>• Serrage manuel par vis</li>
                <li>• Idéal pour le ponçage, le polissage léger</li>
                <li>• Budget : 20-35€</li>
                <li>• Marques : Bergeon, AF Switzerland</li>
              </ul>
            </div>
            <div className={`p-6 rounded-xl border ${
              darkMode
                ? "bg-[#1a1a1a] border-gray-800"
                : "bg-white border-slate-200"
            }`}>
              <h3 className={`text-xl font-bold mb-3 ${
                darkMode ? "text-[#E2B44F]" : "text-amber-600"
              }`}>Le bergeron professionnel</h3>
              <ul className={`space-y-2 text-sm ${
                darkMode ? "text-gray-300" : "text-slate-700"
              }`}>
                <li>• Serrage par levier, réglage fin</li>
                <li>• Indispensable pour l'usinage précis</li>
                <li>• Budget : 80-150€</li>
                <li>• Avec manchon de protection des pièces</li>
              </ul>
            </div>
          </div>
          <div className={`p-6 rounded-xl border mt-6 ${
            darkMode
              ? "bg-[#1a1a1a] border-gray-800"
              : "bg-white border-slate-200"
          }`}>
            <h3 className={`text-lg font-bold mb-3 ${
              darkMode ? "text-[#E2B44F]" : "text-amber-600"
            }`}>Erreur fatale à éviter</h3>
            <p className={`text-sm ${
              darkMode ? "text-gray-300" : "text-slate-700"
            }`}>
              Serrer une pièce délicate (balancier, spiral) dans un porte-pièces trop fort = <strong className={darkMode ? "text-white" : "text-slate-900"}>déformation irréversible</strong>. Toujours utiliser des manchons en laiton ou cuivre.
            </p>
          </div>
        </section>

        <section id="mesure" className="mb-12 scroll-mt-24">
          <h2 className={`text-3xl font-bold mb-6 font-serif flex items-center gap-3 ${
            darkMode ? "text-[#E2B44F]" : "text-amber-600"
          }`}>
            <Shield className="w-7 h-7" />
            Mesure et contrôle de qualité
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-6 rounded-xl border transition-all ${
              darkMode
                ? "bg-[#1a1a1a] border-gray-800 hover:border-[#E2B44F]/30"
                : "bg-white border-slate-200 hover:border-amber-500/40"
            }`}>
              <h3 className={`text-lg font-bold mb-2 ${
                darkMode ? "text-[#E2B44F]" : "text-amber-600"
              }`}>Pied à coulisse</h3>
              <p className={`text-sm ${
                darkMode ? "text-gray-400" : "text-slate-600"
              }`}>Précision 0.01mm. Pour les diamètres d'axes, épaisseurs de ponts. Budget : 30-50€</p>
            </div>
            <div className={`p-6 rounded-xl border transition-all ${
              darkMode
                ? "bg-[#1a1a1a] border-gray-800 hover:border-[#E2B44F]/30"
                : "bg-white border-slate-200 hover:border-amber-500/40"
            }`}>
              <h3 className={`text-lg font-bold mb-2 ${
                darkMode ? "text-[#E2B44F]" : "text-amber-600"
              }`}>Comparateur à cadran</h3>
              <p className={`text-sm ${
                darkMode ? "text-gray-400" : "text-slate-600"
              }`}>Précision 0.001mm. Pour le jeu axial des pivots. Budget : 60-100€</p>
            </div>
            <div className={`p-6 rounded-xl border transition-all ${
              darkMode
                ? "bg-[#1a1a1a] border-gray-800 hover:border-[#E2B44F]/30"
                : "bg-white border-slate-200 hover:border-amber-500/40"
            }`}>
              <h3 className={`text-lg font-bold mb-2 ${
                darkMode ? "text-[#E2B44F]" : "text-amber-600"
              }`}>Loupe binoculaire</h3>
              <p className={`text-sm ${
                darkMode ? "text-gray-400" : "text-slate-600"
              }`}>Grossissement x10 à x20. Indispensable pour l'inspection finale. Budget : 150-300€</p>
            </div>
          </div>
        </section>

        <section id="achat" className="mb-12 scroll-mt-24">
          <h2 className={`text-3xl font-bold mb-6 font-serif flex items-center gap-3 ${
            darkMode ? "text-[#E2B44F]" : "text-amber-600"
          }`}>
            <DollarSign className="w-7 h-7" />
            Conseils d'achat : où et quoi acheter
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`p-6 rounded-xl border ${
              darkMode
                ? "bg-green-900/20 border-green-700/50"
                : "bg-green-100 border-green-500/50"
            }`}>
              <h3 className={`text-xl font-bold mb-3 ${
                darkMode ? "text-green-400" : "text-green-700"
              }`}>✅ Bonnes marques</h3>
              <ul className={`space-y-2 text-sm ${
                darkMode ? "text-gray-300" : "text-slate-700"
              }`}>
                <li>• <strong>Bergeon</strong> (Suisse) - Référence professionnelle</li>
                <li>• <strong>AF Switzerland</strong> - Très bon rapport qualité/prix</li>
                <li>• <strong>Horotec</strong> - Outils innovants</li>
                <li>• <strong>Victor</strong> - Pour débutants sérieux</li>
              </ul>
            </div>
            <div className={`p-6 rounded-xl border ${
              darkMode
                ? "bg-red-900/20 border-red-700/50"
                : "bg-red-100 border-red-500/50"
            }`}>
              <h3 className={`text-xl font-bold mb-3 ${
                darkMode ? "text-red-400" : "text-red-700"
              }`}>❌ À éviter</h3>
              <ul className={`space-y-2 text-sm ${
                darkMode ? "text-gray-300" : "text-slate-700"
              }`}>
                <li>• Kits "horlogerie" sur Amazon (qualité médiocre)</li>
                <li>• Tournevis non demagnetisés</li>
                <li>• Brucelles en acier dur (cassent les pivots)</li>
                <li>• Tournevis avec jeu dans la lame</li>
              </ul>
            </div>
          </div>
          <div className={`p-6 rounded-xl border mt-6 ${
            darkMode
              ? "bg-[#1a1a1a] border-gray-800"
              : "bg-white border-slate-200"
          }`}>
            <h3 className={`text-lg font-bold mb-3 ${
              darkMode ? "text-[#E2B44F]" : "text-amber-600"
            }`}>Fournisseurs recommandés</h3>
            <ul className={`grid grid-cols-1 md:grid-cols-2 gap-2 text-sm ${
              darkMode ? "text-gray-300" : "text-slate-700"
            }`}>
              <li>• Cousins UK (grande sélection, livraison internationale)</li>
              <li>• Bergeon direct (professionnel uniquement)</li>
              <li>• AF Switzerland (revendeurs agréés)</li>
              <li>• Chronos (France, bon service client)</li>
            </ul>
          </div>
        </section>

        <section id="entretien" className="mb-12 scroll-mt-24">
          <h2 className={`text-3xl font-bold mb-6 font-serif flex items-center gap-3 ${
            darkMode ? "text-[#E2B44F]" : "text-amber-600"
          }`}>
            <Heart className="w-7 h-7" />
            Entretien et maintenance des outils
          </h2>
          <div className={`p-6 rounded-xl border ${
            darkMode
              ? "bg-[#1a1a1a] border-gray-800"
              : "bg-white border-slate-200"
          }`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className={`font-bold mb-3 ${
                  darkMode ? "text-[#E2B44F]" : "text-amber-600"
                }`}>Routine quotidienne</h3>
                <ul className={`space-y-2 text-sm ${
                  darkMode ? "text-gray-300" : "text-slate-700"
                }`}>
                  <li>• Essuyer les brucelles après chaque utilisation</li>
                  <li>• Démagnétiser les tournevis (démoagnétiseur obligatoire)</li>
                  <li>• Vérifier les pointes des brucelles sous loupe</li>
                  <li>• Nettoyer le porte-pièces à l'alcool</li>
                </ul>
              </div>
              <div>
                <h3 className={`font-bold mb-3 ${
                  darkMode ? "text-[#E2B44F]" : "text-amber-600"
                }`}>Maintenance hebdomadaire</h3>
                <ul className={`space-y-2 text-sm ${
                  darkMode ? "text-gray-300" : "text-slate-700"
                }`}>
                  <li>• Huiler légèrement les vis du bergeron</li>
                  <li>• Tailler les tournevis si besoin (pierre à oil)</li>
                  <li>• Vérifier le serrage du porte-pièces</li>
                  <li>• Stocker dans un étui à l'abri de l'humidité</li>
                </ul>
              </div>
            </div>
            <div className={`mt-6 p-4 rounded-lg border ${
              darkMode
                ? "bg-[#0a0a0a] border-yellow-700/30"
                : "bg-yellow-100 border-yellow-500/30"
            }`}>
              <p className={`text-sm ${
                darkMode ? "text-yellow-300" : "text-yellow-800"
              }`}>
                <strong className={darkMode ? "text-white" : "text-slate-900"}>⚠️ Durée de vie :</strong> Des outils entretenus durent 20 ans. Négligés, ils sont à jeter en 6 mois.
              </p>
            </div>
          </div>
        </section>

        <section id="checklist" className={`mb-8 p-6 md:p-8 rounded-xl border scroll-mt-24 ${
          darkMode
            ? "bg-[#1a1a1a] border-gray-800"
            : "bg-white border-slate-200"
        }`}>
          <h2 className={`text-3xl font-bold mb-6 font-serif flex items-center gap-3 ${
            darkMode ? "text-[#E2B44F]" : "text-amber-600"
          }`}>
            <Award className="w-7 h-7" />
            Checklist : Ma première mallette horlogère
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className={`font-bold mb-3 ${
                darkMode ? "text-white" : "text-slate-900"
              }`}>Niveau 1 : Premier montage (60-100€)</h3>
              <ul className={`space-y-2 text-sm ${
                darkMode ? "text-gray-300" : "text-slate-700"
              }`}>
                <li className="flex items-start gap-2">
                  <span className={darkMode ? "text-[#E2B44F]" : "text-amber-600"}>□</span>
                  <span>Brucelles n°3 et n°5 (Bergeon)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className={darkMode ? "text-[#E2B44F]" : "text-amber-600"}>□</span>
                  <span>Tournevis 0.80mm et 1.00mm</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className={darkMode ? "text-[#E2B44F]" : "text-amber-600"}>□</span>
                  <span>Loupe monoculaire x10</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className={darkMode ? "text-[#E2B44F]" : "text-amber-600"}>□</span>
                  <span>Porte-pièces simple</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className={darkMode ? "text-[#E2B44F]" : "text-amber-600"}>□</span>
                  <span>Chasse-goupille basique</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className={`font-bold mb-3 ${
                darkMode ? "text-white" : "text-slate-900"
              }`}>Niveau 2 : Révisions complètes (+150-200€)</h3>
              <ul className={`space-y-2 text-sm ${
                darkMode ? "text-gray-300" : "text-slate-700"
              }`}>
                <li className="flex items-start gap-2">
                  <span className={darkMode ? "text-[#E2B44F]" : "text-amber-600"}>□</span>
                  <span>Brucelles courbées et à plat</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className={darkMode ? "text-[#E2B44F]" : "text-amber-600"}>□</span>
                  <span>Tournevis 0.60mm et 1.20mm</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className={darkMode ? "text-[#E2B44F]" : "text-amber-600"}>□</span>
                  <span>Bergeron professionnel</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className={darkMode ? "text-[#E2B44F]" : "text-amber-600"}>□</span>
                  <span>Pied à coulisse digital</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className={darkMode ? "text-[#E2B44F]" : "text-amber-600"}>□</span>
                  <span>Loupe binoculaire x15</span>
                </li>
              </ul>
            </div>
          </div>
          <div className={`mt-6 p-4 rounded-lg border ${
            darkMode
              ? "bg-[#0a0a0a] border-[#E2B44F]/30"
              : "bg-neutral-100 border-amber-500/30"
          }`}>
            <p className={`text-sm text-center ${
              darkMode ? "text-gray-300" : "text-slate-600"
            }`}>
              <strong className={darkMode ? "text-white" : "text-slate-900"}>💡 Tip :</strong> Acheter progressivement. Vous connaîtrez vos besoins réels au fil des projets.
            </p>
          </div>
        </section>

        <section className={`mb-8 p-6 rounded-xl border ${
          darkMode
            ? "bg-[#1a1a1a] border-gray-800"
            : "bg-white border-slate-200"
        }`}>
          <h2 className={`text-2xl font-bold mb-4 font-serif ${
            darkMode ? "text-[#E2B44F]" : "text-amber-600"
          }`}>Pour aller plus loin</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className={`font-bold mb-1 ${
                darkMode ? "text-white" : "text-slate-900"
              }`}>Livres de référence</h3>
              <ul className={`space-y-1 ${
                darkMode ? "text-gray-300" : "text-slate-700"
              }`}>
                <li>• "L'outil horloger" - Bergeon (catalogue-bible)</li>
                <li>• "Techniques de base en horlogerie" - AF Switzerland</li>
              </ul>
            </div>
            <div>
              <h3 className={`font-bold mb-1 ${
                darkMode ? "text-white" : "text-slate-900"
              }`}>Forums actifs</h3>
              <ul className={`space-y-1 ${
                darkMode ? "text-gray-300" : "text-slate-700"
              }`}>
                <li>• Forum de la Fondation Haute Horlogerie</li>
                <li>• Reddit r/watchmaking (communauté anglophone)</li>
              </ul>
            </div>
          </div>
        </section>

        <footer className={`text-center text-sm border-t pt-6 ${
          darkMode ? "text-gray-500 border-gray-800" : "text-slate-500 border-slate-200"
        }`}>
          <p>HorloLearn - Cours de horlogerie en ligne | Dernière mise à jour : Novembre 2024</p>
          <p className="mt-1">Temps de lecture estimé : 15 minutes | Niveau : Débutant</p>
        </footer>
      </div>
    </div>
  );
}
