"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ChevronRight,
  AlertTriangle,
  Lightbulb,
  Wrench,
  CheckCircle,
  BookOpen,
  Eye,
  DollarSign,
  Award,
  Clock,
  Zap,
  Thermometer,
  Sun,
  Moon,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function HuilagePage() {
  const [activeSection, setActiveSection] = useState<string>("introduction");
  const [darkMode, setDarkMode] = useState<boolean>(true);

  // Visualisateur de viscosité
  const [temperature, setTemperature] = useState(20);
  const huiles = [
    { nom: "Mobius 9010", couleur: "bg-blue-500", base: 10 },
    { nom: "Mobius 9020", couleur: "bg-green-500", base: 20 },
    { nom: "Mobius 9415", couleur: "bg-yellow-500", base: 15 },
    { nom: "Mobius 8200", couleur: "bg-red-500", base: 900 },
  ];

  const calculateViscosite = (base: number, temp: number) => {
    const difference = temp - 20;
    if (difference > 0) {
      return Math.round(base * (1 - difference * 0.02));
    } else {
      return Math.round(base * (1 - difference * 0.04));
    }
  };

  const sections = [
    { id: "introduction", title: "Introduction", icon: BookOpen },
    { id: "importance", title: "Pourquoi le huilage est-il crucial ?", icon: AlertTriangle },
    { id: "anatomie", title: "Anatomie d'un point de lubrification", icon: Eye },
    { id: "types-huiles", title: "Les types d'huiles et leurs applications", icon: Lightbulb },
    { id: "outils", title: "Outils du professionnel", icon: Wrench },
    { id: "technique", title: "Technique pas à pas", icon: CheckCircle },
    { id: "signes", title: "Signes visuels à reconnaître", icon: Eye },
    { id: "erreurs", title: "Erreurs courantes", icon: AlertTriangle },
    { id: "maintenance", title: "Plan de maintenance", icon: Clock },
    { id: "economie", title: "Considérations économiques", icon: DollarSign },
    { id: "normes", title: "Normes industrielles", icon: Award },
    { id: "checklist", title: "Checklist pratique", icon: CheckCircle },
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
          Huilage & Lubrification Horlogère
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
              src="https://www.youtube.com/embed/ARb8Vo4refs?si=nRyWBeHLpwyreJgg"
              title="Techniques de lubrification horlogère"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
          <p className={`text-sm mt-3 italic text-center ${
            darkMode ? "text-gray-400" : "text-slate-600"
          }`}>
            Durée : 12 min | Niveau : Intermédiaire | Outils nécessaires : huilier, loupe binoculaire
          </p>
        </section>

        <section id="importance" className={`mb-12 p-6 md:p-8 rounded-2xl scroll-mt-24 ${
          darkMode
            ? "bg-[#1a1a1a] border border-gray-800"
            : "bg-white border border-slate-200"
        }`}>
          <h2 className={`text-3xl font-bold mb-6 flex items-center gap-3 font-serif ${
            darkMode ? "text-[#E2B44F]" : "text-amber-600"
          }`}>
            <AlertTriangle className="w-7 h-7" />
            Pourquoi le huilage est-il crucial ?
          </h2>
          <div className={`leading-relaxed space-y-6 ${
            darkMode ? "text-gray-300" : "text-slate-700"
          }`}>
            <p className="text-lg">
              Le huilage représente{" "}
              <strong className={`font-semibold ${
                darkMode ? "text-[#E2B44F]" : "text-amber-600"
              }`}>
                30% de la précision
              </strong>{" "}
              et{" "}
              <strong className={`font-semibold ${
                darkMode ? "text-[#E2B44F]" : "text-amber-600"
              }`}>
                50% de la longévité
              </strong>{" "}
              d'un mouvement mécanique. Un mouvement non huilé voit son amortissement augmenter de{" "}
              <strong>40% en 6 mois</strong>.
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
                Impact réel sur la précision
              </h3>
              <p className={darkMode ? "text-gray-300" : "text-slate-700"}>
                Une montre révisée avec un huilage optimal gagne/perd{" "}
                <strong>±2 secondes/jour</strong>. La même montre avec un huilage défaillant peut
                atteindre <strong>+30 à +60 secondes/jour</strong>. C'est un facteur 15x sur la
                précision !
              </p>
            </div>
            <div className={`p-5 rounded-lg border-l-4 my-6 ${
              darkMode
                ? "bg-[#0a0a0a] border-[#E2B44F]"
                : "bg-neutral-100 border-amber-600"
            }`}>
              <h3 className={`font-bold mb-2 flex items-center gap-2 ${
                darkMode ? "text-white" : "text-slate-900"
              }`}>
                <Lightbulb className={`w-5 h-5 ${
                  darkMode ? "text-[#E2B44F]" : "text-amber-600"
                }`} />
                Saviez-vous ?
              </h3>
              <p className={darkMode ? "text-gray-300" : "text-slate-700"}>
                Une montre mécanique contient en moyenne{" "}
                <strong>15 à 30 points de lubrification</strong> distincts, chacun nécessitant une
                huile de viscosité spécifique. Le calibre Rolex 3135 a exactement 31 points de
                huilage !
              </p>
            </div>
            <p>
              Les frottements dans un mouvement non lubrifié génèrent de la chaleur, usent les pivots
              et les rubis, et provoquent une dérive de précision de{" "}
              <strong>+15 à +30 secondes par jour</strong>. Le huilage crée un film de seulement{" "}
              <strong>0,001 à 0,01 mm</strong> entre les surfaces, suffisant pour transformer un
              frottement sec (coefficient 0,3) en frottement fluide (coefficient 0,03).
            </p>
          </div>
        </section>

        <section id="anatomie" className="mb-12 scroll-mt-24">
          <h2 className={`text-3xl font-bold mb-6 font-serif flex items-center gap-3 ${
            darkMode ? "text-[#E2B44F]" : "text-amber-600"
          }`}>
            <Eye className="w-7 h-7" />
            Anatomie d'un point de lubrification
          </h2>
          <div className={`p-6 rounded-2xl ${
            darkMode
              ? "bg-[#1a1a1a] border border-gray-800"
              : "bg-white border border-slate-200"
          }`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className={`text-xl font-bold mb-3 ${
                  darkMode ? "text-[#E2B44F]" : "text-amber-600"
                }`}>
                  Structure d'un pivot huilé
                </h3>
                <ul className={`space-y-3 text-sm ${
                  darkMode ? "text-gray-300" : "text-slate-700"
                }`}>
                  <li className="flex items-start gap-2">
                    <CheckCircle className={`w-4 h-4 mt-0.5 ${
                      darkMode ? "text-[#E2B44F]" : "text-amber-600"
                    }`} />
                    <span>
                      <strong>1. Le ménisque :</strong> Film d'huile visible, forme demi-sphérique
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className={`w-4 h-4 mt-0.5 ${
                      darkMode ? "text-[#E2B44F]" : "text-amber-600"
                    }`} />
                    <span>
                      <strong>2. Le pivot :</strong> Axe en acier trempé, poli miroir
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className={`w-4 h-4 mt-0.5 ${
                      darkMode ? "text-[#E2B44F]" : "text-amber-600"
                    }`} />
                    <span>
                      <strong>3. Le rubis :</strong> Roulement en corindon synthétique
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className={`w-4 h-4 mt-0.5 ${
                      darkMode ? "text-[#E2B44F]" : "text-amber-600"
                    }`} />
                    <span>
                      <strong>4. L'huile :</strong> Film de 0.001mm entre les surfaces
                    </span>
                  </li>
                </ul>
              </div>
              <div className={`p-4 rounded-lg border ${
                darkMode
                  ? "bg-[#0a0a0a] border-gray-700"
                  : "bg-neutral-100 border-slate-200"
              }`}>
                <h4 className={`font-bold mb-2 ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}>
                  Visualisation du film lubrifiant
                </h4>
                <div className={`space-y-2 text-xs ${
                  darkMode ? "text-gray-400" : "text-slate-600"
                }`}>
                  <div className="flex justify-between">
                    <span>Pivot</span>
                    <span className={darkMode ? "text-[#E2B44F]" : "text-amber-600"}>
                      Ø 0.10-0.15 mm
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Film d'huile</span>
                    <span className={darkMode ? "text-[#E2B44F]" : "text-amber-600"}>
                      0.001 mm
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rubis</span>
                    <span className={darkMode ? "text-[#E2B44F]" : "text-amber-600"}>
                      Ø 0.20-0.25 mm
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ménisque visible</span>
                    <span className={darkMode ? "text-[#E2B44F]" : "text-amber-600"}>
                      Ø 0.5 mm
                    </span>
                  </div>
                </div>
                <p className={`mt-4 text-xs ${
                  darkMode ? "text-gray-500" : "text-slate-500"
                }`}>
                  *Ces dimensions sont au centième de millimètre près
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="types-huiles" className="mb-12 scroll-mt-24">
          <h2 className={`text-3xl font-bold mb-6 font-serif ${
            darkMode ? "text-[#E2B44F]" : "text-amber-600"
          }`}>
            Les types d'huiles et leurs applications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`p-6 rounded-2xl transition-all hover:border-opacity-40 ${
              darkMode
                ? "bg-[#1a1a1a] border border-gray-800 hover:border-[#E2B44F]/30"
                : "bg-white border border-slate-200 hover:border-amber-500/40"
            }`}>
              <h3 className={`text-xl font-bold mb-3 ${
                darkMode ? "text-[#E2B44F]" : "text-amber-600"
              }`}>
                Huiles synthétiques (modernes)
              </h3>
              <ul className={`space-y-2 text-sm ${
                darkMode ? "text-gray-300" : "text-slate-700"
              }`}>
                <li>
                  <strong>9010 (Mobius) :</strong> Pivots rapides, viscosité 10 cSt - Roulements,
                  rotor automatique
                </li>
                <li>
                  <strong>9020 :</strong> Pivots moyens, viscosité 20 cSt - Roue de centre, roue des
                  secondes
                </li>
                <li>
                  <strong>9415 (spécial échappement) :</strong> Haute pression, 15 cSt - Dents
                  d'échappement, palette
                </li>
                <li>
                  <strong>8200 :</strong> Haute viscosité, 800-1000 cSt - Barillet, ressort de
                  remontoir
                </li>
              </ul>
            </div>
            <div className={`p-6 rounded-2xl transition-all hover:border-opacity-40 ${
              darkMode
                ? "bg-[#1a1a1a] border border-gray-800 hover:border-[#E2B44F]/30"
                : "bg-white border border-slate-200 hover:border-amber-500/40"
            }`}>
              <h3 className={`text-xl font-bold mb-3 ${
                darkMode ? "text-[#E2B44F]" : "text-amber-600"
              }`}>
                Graisses (zones à forte pression)
              </h3>
              <ul className={`space-y-2 text-sm ${
                darkMode ? "text-gray-300" : "text-slate-700"
              }`}>
                <li>
                  <strong>8300 (Mobius) :</strong> Graisse lithium pour barillets - Résiste à 30
                  kg/cm²
                </li>
                <li>
                  <strong>KLUBER P125 :</strong> Paliers de rotor automatique - Très haute adhérence
                </li>
                <li>
                  <strong>HP1300 :</strong> Roue à canon, canon de roue de réglage - Pression modérée
                </li>
              </ul>
            </div>
          </div>

          {/* VISUALISATEUR DE VISCOSITÉ INTÉGRÉ */}
          <div className={`p-6 rounded-2xl mt-6 ${
            darkMode
              ? "bg-[#1a1a1a] border border-gray-800"
              : "bg-white border border-slate-200"
          }`}>
            <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${
              darkMode ? "text-[#E2B44F]" : "text-amber-600"
            }`}>
              <Thermometer className="w-6 h-6" />
              Impact de la température sur les huiles
            </h3>

            <div className="mb-6">
              <label className={`block mb-2 ${
                darkMode ? "text-gray-300" : "text-slate-700"
              }`}>
                Température : {temperature}°C
              </label>
              <input
                type="range"
                min="0"
                max="40"
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
                  darkMode ? "bg-gray-700" : "bg-slate-200"
                }`}
              />
              <div className={`flex justify-between text-xs mt-1 ${
                darkMode ? "text-gray-400" : "text-slate-500"
              }`}>
                <span>0°C (Hiver)</span>
                <span>20°C (Idéal)</span>
                <span>40°C (Été)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {huiles.map((huile) => {
                const viscosite = calculateViscosite(huile.base, temperature);
                const variation = (((viscosite - huile.base) / huile.base) * 100).toFixed(0);

                return (
                  <div
                    key={huile.nom}
                    className={`p-4 rounded-lg ${
                      darkMode ? "bg-[#0a0a0a]" : "bg-neutral-100"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className={`font-bold ${
                        darkMode ? "text-white" : "text-slate-900"
                      }`}>
                        {huile.nom}
                      </span>
                      <span className={`${huile.couleur} text-white text-xs px-2 py-1 rounded`}>
                        {viscosite} cSt
                      </span>
                    </div>
                    <div className={`w-full rounded-full h-2 ${
                      darkMode ? "bg-gray-700" : "bg-slate-200"
                    }`}>
                      <div
                        className={`${huile.couleur} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${Math.min(100, (viscosite / huile.base) * 100)}%` }}
                      ></div>
                    </div>
                    <p className={`text-xs mt-1 ${
                      darkMode ? "text-gray-400" : "text-slate-500"
                    }`}>
                      {variation > "0" ? "+" : ""}
                      {variation}% vs 20°C
                    </p>
                  </div>
                );
              })}
            </div>

            <div className={`mt-6 p-4 rounded-lg border ${
              darkMode
                ? "bg-[#0a0a0a] border-[#E2B44F]/30"
                : "bg-neutral-100 border-amber-500/30"
            }`}>
              <h4 className={`font-bold mb-2 ${
                darkMode ? "text-[#E2B44F]" : "text-amber-600"
              }`}>
                Impact sur la précision (estimation)
              </h4>
              <p className={`text-sm ${
                darkMode ? "text-gray-300" : "text-slate-700"
              }`}>
                À {temperature}°C :{" "}
                <strong className={`${
                  darkMode ? "text-white" : "text-slate-900"
                }`}>
                  {temperature > 25
                    ? "La montre avance"
                    : temperature < 15
                    ? "La montre retarde"
                    : "Précision optimale"}
                </strong>{" "}
                de ±{Math.abs(temperature - 20) * 0.5} s/j
              </p>
            </div>
          </div>

          <div className={`p-6 rounded-2xl mt-6 ${
            darkMode
              ? "bg-[#1a1a1a] border border-gray-800"
              : "bg-white border border-slate-200"
          }`}>
            <h3 className={`text-xl font-bold mb-3 ${
              darkMode ? "text-[#E2B44F]" : "text-amber-600"
            }`}>
              Tableau de compatibilité complet
            </h3>
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
                    <th className="px-4 py-3">Composant</th>
                    <th className="px-4 py-3">Vitesse</th>
                    <th className="px-4 py-3">Pression</th>
                    <th className="px-4 py-3">Huile recommandée</th>
                    <th className="px-4 py-3">Quantité</th>
                    <th className="px-4 py-3">Durée de vie</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={`border-b ${
                    darkMode ? "border-gray-800" : "border-slate-200"
                  }`}>
                    <td className={`px-4 py-3 font-medium ${
                      darkMode ? "text-white" : "text-slate-900"
                    }`}>
                      Barillet
                    </td>
                    <td className="px-4 py-3">1 tour/8h</td>
                    <td className="px-4 py-3">Élevée (30kg/cm²)</td>
                    <td className="px-4 py-3">Mobius 8200</td>
                    <td className="px-4 py-3">2-3 mg</td>
                    <td className="px-4 py-3">5-7 ans</td>
                  </tr>
                  <tr className={`border-b ${
                    darkMode ? "border-gray-800" : "border-slate-200"
                  }`}>
                    <td className={`px-4 py-3 font-medium ${
                      darkMode ? "text-white" : "text-slate-900"
                    }`}>
                      Roue de centre
                    </td>
                    <td className="px-4 py-3">1 tour/heure</td>
                    <td className="px-4 py-3">Moyenne</td>
                    <td className="px-4 py-3">Mobius 9020</td>
                    <td className="px-4 py-3">0.5-1 mg</td>
                    <td className="px-4 py-3">4-6 ans</td>
                  </tr>
                  <tr className={`border-b ${
                    darkMode ? "border-gray-800" : "border-slate-200"
                  }`}>
                    <td className={`px-4 py-3 font-medium ${
                      darkMode ? "text-white" : "text-slate-900"
                    }`}>
                      Échappement
                    </td>
                    <td className="px-4 py-3">5 Hz / 18 000 A/h</td>
                    <td className="px-4 py-3">Très élevée</td>
                    <td className="px-4 py-3">Mobius 9415</td>
                    <td className="px-4 py-3">0.1-0.2 mg</td>
                    <td className="px-4 py-3">3-5 ans</td>
                  </tr>
                  <tr className={`border-b ${
                    darkMode ? "border-gray-800" : "border-slate-200"
                  }`}>
                    <td className={`px-4 py-3 font-medium ${
                      darkMode ? "text-white" : "text-slate-900"
                    }`}>
                      Rotor auto
                    </td>
                    <td className="px-4 py-3">500-1000 tours/min</td>
                    <td className="px-4 py-3">Faible</td>
                    <td className="px-4 py-3">Mobius 9010</td>
                    <td className="px-4 py-3">1-2 mg</td>
                    <td className="px-4 py-3">5-7 ans</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="outils" className="mb-12 scroll-mt-24">
          <h2 className={`text-3xl font-bold mb-6 font-serif ${
            darkMode ? "text-[#E2B44F]" : "text-amber-600"
          }`}>
            Outils du professionnel
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-6 rounded-2xl transition-all text-center ${
              darkMode
                ? "bg-[#1a1a1a] border border-gray-800 hover:border-[#E2B44F]/30"
                : "bg-white border border-slate-200 hover:border-amber-500/40"
            }`}>
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                darkMode ? "bg-[#E2B44F]/10" : "bg-amber-100"
              }`}>
                <Wrench className={`w-10 h-10 ${
                  darkMode ? "text-[#E2B44F]" : "text-amber-600"
                }`} />
              </div>
              <h3 className={`text-lg font-bold mb-2 ${
                darkMode ? "text-[#E2B44F]" : "text-amber-600"
              }`}>
                Huilier manuel
              </h3>
              <p className={`text-sm ${
                darkMode ? "text-gray-400" : "text-slate-600"
              }`}>
                Corps en laiton, pointe capillaire 0.15-0.25mm. Permet de déposer des quantités
                précises au micron près. Nettoyage à l'alcool après chaque utilisation.
              </p>
            </div>
            <div className={`p-6 rounded-2xl transition-all text-center ${
              darkMode
                ? "bg-[#1a1a1a] border border-gray-800 hover:border-[#E2B44F]/30"
                : "bg-white border border-slate-200 hover:border-amber-500/40"
            }`}>
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                darkMode ? "bg-[#E2B44F]/10" : "bg-amber-100"
              }`}>
                <Lightbulb className={`w-10 h-10 ${
                  darkMode ? "text-[#E2B44F]" : "text-amber-600"
                }`} />
              </div>
              <h3 className={`text-lg font-bold mb-2 ${
                darkMode ? "text-[#E2B44F]" : "text-amber-600"
              }`}>
                Loupe binoculaire
              </h3>
              <p className={`text-sm ${
                darkMode ? "text-gray-400" : "text-slate-600"
              }`}>
                Grossissement x10 à x20. Indispensable pour visualiser le ménisque d'huile.
                Éclairage LED intégré recommandé pour éviter les ombres.
              </p>
            </div>
            <div className={`p-6 rounded-2xl transition-all text-center ${
              darkMode
                ? "bg-[#1a1a1a] border border-gray-800 hover:border-[#E2B44F]/30"
                : "bg-white border border-slate-200 hover:border-amber-500/40"
            }`}>
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                darkMode ? "bg-[#E2B44F]/10" : "bg-amber-100"
              }`}>
                <CheckCircle className={`w-10 h-10 ${
                  darkMode ? "text-[#E2B44F]" : "text-amber-600"
                }`} />
              </div>
              <h3 className={`text-lg font-bold mb-2 ${
                darkMode ? "text-[#E2B44F]" : "text-amber-600"
              }`}>
                Papier absorbant
              </h3>
              <p className={`text-sm ${
                darkMode ? "text-gray-400" : "text-slate-600"
              }`}>
                Pour retirer l'excès d'huile sans laisser de fibres. Papier de soie horlogère ou
                buvard qualité supérieure uniquement.
              </p>
            </div>
          </div>
        </section>

        <section id="technique" className={`mb-12 p-6 md:p-8 rounded-2xl scroll-mt-24 ${
          darkMode
            ? "bg-[#1a1a1a] border border-gray-800"
            : "bg-white border border-slate-200"
        }`}>
          <h2 className={`text-3xl font-bold mb-6 font-serif ${
            darkMode ? "text-[#E2B44F]" : "text-amber-600"
          }`}>
            Technique pas à pas
          </h2>
          <div className="space-y-6">
            <div className={`p-5 rounded-lg border-l-4 ${
              darkMode
                ? "bg-[#0a0a0a] border-[#E2B44F]"
                : "bg-neutral-100 border-amber-600"
            }`}>
              <h3 className={`font-bold mb-2 ${
                darkMode ? "text-white" : "text-slate-900"
              }`}>
                Étape 1 : Préparation du mouvement
              </h3>
              <p className={darkMode ? "text-gray-300" : "text-slate-700"}>
                Nettoyer tous les pivots à la benzine horlogère, séchage à l'air chaud (max 50°C).
                Vérifier l'absence de poussière sous loupe x10. <strong>Temps : 30-45 min</strong>{" "}
                pour un mouvement complet. Un résidu de poussière = usure prématurée.
              </p>
            </div>
            <div className={`p-5 rounded-lg border-l-4 ${
              darkMode
                ? "bg-[#0a0a0a] border-[#E2B44F]"
                : "bg-neutral-100 border-amber-600"
            }`}>
              <h3 className={`font-bold mb-2 ${
                darkMode ? "text-white" : "text-slate-900"
              }`}>
                Étape 2 : Chargement du huilier
              </h3>
              <p className={darkMode ? "text-gray-300" : "text-slate-700"}>
                Tremper la pointe capillaire à <strong>1mm maximum</strong> dans l'huile. Retirer et
                attendre 3 secondes que la goutte se stabilise par tension superficielle.{" "}
                <strong>Ne jamais</strong> remplir plus de 2mm la pointe pour éviter l'écoulement
                intempestif.
              </p>
            </div>
            <div className={`p-5 rounded-lg border-l-4 ${
              darkMode
                ? "bg-[#0a0a0a] border-[#E2B44F]"
                : "bg-neutral-100 border-amber-600"
            }`}>
              <h3 className={`font-bold mb-2 ${
                darkMode ? "text-white" : "text-slate-900"
              }`}>
                Étape 3 : Application sur le pivot
              </h3>
              <p className={darkMode ? "text-gray-300" : "text-slate-700"}>
                Approcher la pointe à <strong>0.5mm du pivot</strong>. Laisser la goutte toucher le
                pivot par capillarité - <strong>ne jamais frotter</strong>. Le ménisque doit être
                visible en 3 secondes. Si besoin, retirer l'excès immédiatement avec un pointe de
                buvard.
              </p>
            </div>
            <div className={`p-5 rounded-lg border-l-4 ${
              darkMode
                ? "bg-[#0a0a0a] border-[#E2B44F]"
                : "bg-neutral-100 border-amber-600"
            }`}>
              <h3 className={`font-bold mb-2 ${
                darkMode ? "text-white" : "text-slate-900"
              }`}>
                Étape 4 : Vérification finale
              </h3>
              <p className={darkMode ? "text-gray-300" : "text-slate-700"}>
                Sous loupe x10-x15, vérifier que l'huile forme un ménisque{" "}
                <strong>régulier, brillant, sans bulles</strong>. Diamètre idéal : 0.4-0.6mm. Si le
                ménisque est trop grand (&gt;1mm), retirer immédiatement avec du buvard. Un ménisque
                trop petit (&lt;0.3mm) signifie une quantité insuffisante.
              </p>
            </div>
          </div>
        </section>

        <section id="signes" className="mb-12 scroll-mt-24">
          <h2 className={`text-3xl font-bold mb-6 font-serif flex items-center gap-3 ${
            darkMode ? "text-[#E2B44F]" : "text-amber-600"
          }`}>
            <Eye className="w-7 h-7" />
            Signes visuels à reconnaître
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`p-6 rounded-2xl border ${
              darkMode
                ? "bg-green-900/20 border-green-700/50"
                : "bg-green-100 border-green-500/50"
            }`}>
              <h3 className={`text-xl font-bold mb-3 ${
                darkMode ? "text-green-400" : "text-green-700"
              }`}>
                ✓ Bon huilage
              </h3>
              <ul className={`space-y-2 text-sm ${
                darkMode ? "text-gray-300" : "text-slate-700"
              }`}>
                <li>• Ménisque brillant et régulier, forme parfaite</li>
                <li>• Diamètre entre 0.4 et 0.6mm</li>
                <li>• Absence de bulles d'air</li>
                <li>• Huile centrée sur le pivot, pas sur le rubis</li>
                <li>• Pas de traces d'huile sur les ponts voisins</li>
              </ul>
            </div>
            <div className={`p-6 rounded-2xl border ${
              darkMode
                ? "bg-red-900/20 border-red-700/50"
                : "bg-red-100 border-red-500/50"
            }`}>
              <h3 className={`text-xl font-bold mb-3 ${
                darkMode ? "text-red-400" : "text-red-700"
              }`}>
                ✗ Mauvais huilage
              </h3>
              <ul className={`space-y-2 text-sm ${
                darkMode ? "text-gray-300" : "text-slate-700"
              }`}>
                <li>• Ménisque plat ou irrégulier</li>
                <li>• Diamètre &gt;1mm (excès) ou &lt;0.3mm (insuffisance)</li>
                <li>• Bulles d'air piégées = contamination</li>
                <li>• Huile qui déborde sur le pont = risque de migration</li>
                <li>• Aspect terne ou granuleux = huile séchée</li>
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
            }`}>
              Diagnostic visuel rapide
            </h3>
            <p className={`text-sm ${
              darkMode ? "text-gray-300" : "text-slate-700"
            }`}>
              Un horloger expérimenté évalue la qualité d'un huilage en{" "}
              <strong>3 secondes</strong> par pivot. Cette rapidité vient de milliers d'heures de
              pratique. La clarté du ménisque est le critère n°1.
            </p>
          </div>
        </section>

        <section id="erreurs" className="mb-12 scroll-mt-24">
          <h2 className={`text-3xl font-bold mb-6 font-serif ${
            darkMode ? "text-[#E2B44F]" : "text-amber-600"
          }`}>
            Erreurs courantes et leurs conséquences
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`p-6 rounded-xl border ${
              darkMode
                ? "bg-red-900/20 border-red-700/50"
                : "bg-red-100 border-red-500/50"
            }`}>
              <h3 className={`text-xl font-bold mb-3 flex items-center gap-2 ${
                darkMode ? "text-red-400" : "text-red-700"
              }`}>
                <AlertTriangle className="w-5 h-5" />
                Excès d'huile (le plus fréquent)
              </h3>
              <ul className={`space-y-2 text-sm ${
                darkMode ? "text-gray-300" : "text-slate-700"
              }`}>
                <li>• <strong>Conséquence immédiate :</strong> Migration vers le spiral → gain de +10 à +30 s/j</li>
                <li>• <strong>À moyen terme :</strong> Attirance des poussières → usure accélérée x3</li>
                <li>• <strong>À long terme :</strong> Risque de blocage complet du balancier</li>
                <li>• <strong>Coût de réparation :</strong> 300-500€ si migration sur spiral</li>
              </ul>
            </div>
            <div className={`p-6 rounded-xl border ${
              darkMode
                ? "bg-red-900/20 border-red-700/50"
                : "bg-red-100 border-red-500/50"
            }`}>
              <h3 className={`text-xl font-bold mb-3 flex items-center gap-2 ${
                darkMode ? "text-red-400" : "text-red-700"
              }`}>
                <AlertTriangle className="w-5 h-5" />
                Huile inadaptée
              </h3>
              <ul className={`space-y-2 text-sm ${
                darkMode ? "text-gray-300" : "text-slate-700"
              }`}>
                <li>• <strong>Trop fluide :</strong> Fuite rapide, séchement en 1-2 ans au lieu de 5-7</li>
                <li>• <strong>Trop épaisse :</strong> Surconsommation de remontoir (-30% d'autonomie)</li>
                <li>• <strong>Mélange de types :</strong> Polymérisation prématurée, résines collantes</li>
                <li>• <strong>Coût :</strong> Révision complète obligatoire (200-400€)</li>
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
            }`}>
              Témoignage d'un master horloger
            </h3>
            <blockquote className={`italic border-l-4 pl-4 ${
              darkMode ? "text-gray-300 border-[#E2B44F]" : "text-slate-700 border-amber-600"
            }`}>
              "J'ai vu des montres de 20 000€ devenir imprécises à +5 min/jour juste à cause d'un excès d'huile sur le pivot du balancier. La lubrification est le test ultime de la patience du horloger. Moins c'est mieux, mais il faut juste ce qu'il faut."
              <footer className={`text-sm mt-2 ${
                darkMode ? "text-gray-400" : "text-slate-500"
              }`}>
                - Jean-Marc, 35 ans d'expérience, Biel/Bienne
              </footer>
            </blockquote>
          </div>
        </section>

        <section id="maintenance" className={`mb-12 p-6 md:p-8 rounded-xl border scroll-mt-24 ${
          darkMode
            ? "bg-[#1a1a1a] border-gray-800"
            : "bg-white border-slate-200"
        }`}>
          <h2 className={`text-3xl font-bold mb-6 font-serif ${
            darkMode ? "text-[#E2B44F]" : "text-amber-600"
          }`}>
            Plan de maintenance recommandé
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`text-center p-6 rounded-lg border ${
              darkMode
                ? "bg-[#0a0a0a] border-gray-700"
                : "bg-neutral-100 border-slate-200"
            }`}>
              <div className={`text-4xl font-bold mb-2 ${
                darkMode ? "text-[#E2B44F]" : "text-amber-600"
              }`}>
                3-5 ans
              </div>
              <div className={darkMode ? "text-gray-300" : "text-slate-700"}>
                <p className={`font-semibold mb-1 ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}>
                  Montres de tous les jours
                </p>
                <p className="text-sm">
                  Révision complète avec changement de tous les lubrifiants. Inspection des usures. Conditions : chaleur, humidité, poussière.
                </p>
              </div>
            </div>
            <div className={`text-center p-6 rounded-lg border ${
              darkMode
                ? "bg-[#0a0a0a] border-gray-700"
                : "bg-neutral-100 border-slate-200"
            }`}>
              <div className={`text-4xl font-bold mb-2 ${
                darkMode ? "text-[#E2B44F]" : "text-amber-600"
              }`}>
                5-7 ans
              </div>
              <div className={darkMode ? "text-gray-300" : "text-slate-700"}>
                <p className={`font-semibold mb-1 ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}>
                  Montres occasionnelles
                </p>
                <p className="text-sm">
                  Révision complète. Les huiles synthétiques résistent mieux au temps. Stockage dans un environnement stable.
                </p>
              </div>
            </div>
            <div className={`text-center p-6 rounded-lg border ${
              darkMode
                ? "bg-red-900/20 border-red-700/30"
                : "bg-red-100 border-red-500/30"
            }`}>
              <div className={`text-4xl font-bold mb-2 ${
                darkMode ? "text-red-400" : "text-red-600"
              }`}>
                +7 ans
              </div>
              <div className={darkMode ? "text-gray-300" : "text-slate-700"}>
                <p className={`font-semibold mb-1 ${
                  darkMode ? "text-red-400" : "text-red-600"
                }`}>
                  ZONE DE RISQUE
                </p>
                <p className="text-sm">
                  Huiles séchées → usure mécanique irréversible. Coûts de réparation majeurs. Risque de casse de pivots.
                </p>
              </div>
            </div>
          </div>
          <div className={`p-5 rounded-lg mt-6 border ${
            darkMode
              ? "bg-[#0a0a0a] border-[#E2B44F]/30"
              : "bg-neutral-100 border-amber-500/30"
          }`}>
            <h3 className={`font-bold mb-2 ${
              darkMode ? "text-[#E2B44F]" : "text-amber-600"
            }`}>
              Indicateurs d'un huilage à revoir
            </h3>
            <ul className={`grid grid-cols-1 md:grid-cols-2 gap-2 text-sm ${
              darkMode ? "text-gray-300" : "text-slate-700"
            }`}>
              <li>• Perturbation de la marche (±15 s/j ou plus)</li>
              <li>• Réserve de marche diminuée (-20% d'autonomie)</li>
              <li>• Remontoir plus dur ou grincant</li>
              <li>• Bruits anormaux (cliquetis, frottements secs)</li>
              <li>• Condensation sous le verre (signe de séchage)</li>
              <li>• Montre non portée depuis &gt;3 ans</li>
            </ul>
          </div>
        </section>

        <section id="economie" className="mb-12 scroll-mt-24">
          <h2 className={`text-3xl font-bold mb-6 font-serif flex items-center gap-3 ${
            darkMode ? "text-[#E2B44F]" : "text-amber-600"
          }`}>
            <DollarSign className="w-7 h-7" />
            Considérations économiques
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`p-6 rounded-xl border ${
              darkMode
                ? "bg-[#1a1a1a] border-gray-800"
                : "bg-white border-slate-200"
            }`}>
              <h3 className={`text-xl font-bold mb-3 ${
                darkMode ? "text-[#E2B44F]" : "text-amber-600"
              }`}>
                Coûts de la révision (France/Suisse 2024)
              </h3>
              <ul className={`space-y-2 text-sm ${
                darkMode ? "text-gray-300" : "text-slate-700"
              }`}>
                <li className="flex justify-between">
                  <span>Révision simple (ETA 2824)</span>
                  <span className={darkMode ? "text-[#E2B44F] font-bold" : "text-amber-600 font-bold"}>
                    250-350€
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Révision complète (calibre manufacture)</span>
                  <span className={darkMode ? "text-[#E2B44F] font-bold" : "text-amber-600 font-bold"}>
                    500-800€
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Changement uniquement des huiles</span>
                  <span className={darkMode ? "text-red-400" : "text-red-600"}>
                    Non recommandé
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Réparation pivot + spiral (excès d'huile)</span>
                  <span className={darkMode ? "text-red-400 font-bold" : "text-red-600 font-bold"}>
                    400-600€
                  </span>
                </li>
              </ul>
            </div>
            <div className={`p-6 rounded-xl border ${
              darkMode
                ? "bg-[#1a1a1a] border-gray-800"
                : "bg-white border-slate-200"
            }`}>
              <h3 className={`text-xl font-bold mb-3 ${
                darkMode ? "text-[#E2B44F]" : "text-amber-600"
              }`}>
                Retour sur investissement
              </h3>
              <div className={`p-4 rounded-lg ${
                darkMode ? "bg-[#0a0a0a]" : "bg-neutral-100"
              }`}>
                <p className={`text-sm mb-2 ${
                  darkMode ? "text-gray-300" : "text-slate-700"
                }`}>
                  Une révision préventive coûte <strong>3 fois moins</strong> qu'une réparation corrective. Sur 10 ans :
                </p>
                <ul className={`space-y-1 text-xs ${
                  darkMode ? "text-gray-400" : "text-slate-500"
                }`}>
                  <li>• 2 révisions préventives : 600-800€</li>
                  <li>• 1 réparation + révision : 1200-1500€</li>
                  <li>• <strong>Économie : 50-60%</strong></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="normes" className="mb-12 scroll-mt-24">
          <h2 className={`text-3xl font-bold mb-6 font-serif flex items-center gap-3 ${
            darkMode ? "text-[#E2B44F]" : "text-amber-600"
          }`}>
            <Award className="w-7 h-7" />
            Normes et certifications industrielles
          </h2>
          <div className={`p-6 rounded-xl border ${
            darkMode
              ? "bg-[#1a1a1a] border-gray-800"
              : "bg-white border-slate-200"
          }`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className={`font-bold mb-2 ${
                  darkMode ? "text-[#E2B44F]" : "text-amber-600"
                }`}>
                  ISO 3159 (montres chronométriques)
                </h3>
                <p className={`text-sm mb-4 ${
                  darkMode ? "text-gray-300" : "text-slate-700"
                }`}>
                  Spécifie les conditions de lubrification pour le contrôle chronométrique. Un mauvais huilage empêche la certification.
                </p>
                
                <h3 className={`font-bold mb-2 ${
                  darkMode ? "text-[#E2B44F]" : "text-amber-600"
                }`}>
                  Normes Rolex
                </h3>
                <p className={`text-sm ${
                  darkMode ? "text-gray-300" : "text-slate-700"
                }`}>
                  31 points de lubrification distincts, chacun avec une huile spécifique et une procédure validée. Tout écart invalide la garantie.
                </p>
              </div>
              <div className={`p-4 rounded-lg ${
                darkMode ? "bg-[#0a0a0a]" : "bg-neutral-100"
              }`}>
                <h3 className={`font-bold mb-2 ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}>
                  Labels de qualité
                </h3>
                <ul className={`space-y-1 text-xs ${
                  darkMode ? "text-gray-400" : "text-slate-500"
                }`}>
                  <li>• <strong>Poinçon de Genève :</strong> Vérification du huilage lors du marquage</li>
                  <li>• <strong>COSC :</strong> Montre testée avec ses huiles d'origine</li>
                  <li>• <strong>Qualité Fleurier :</strong> Contrôle de la migration des huiles</li>
                </ul>
              </div>
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
            <CheckCircle className="w-7 h-7" />
            Checklist pratique : Avez-vous tout vérifié ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className={`font-bold mb-3 ${
                darkMode ? "text-white" : "text-slate-900"
              }`}>
                Avant le huilage
              </h3>
              <ul className={`space-y-2 text-sm ${
                darkMode ? "text-gray-300" : "text-slate-700"
              }`}>
                <li className="flex items-start gap-2">
                  <span className={darkMode ? "text-[#E2B44F]" : "text-amber-600"}>□</span>
                  <span>Mouvement nettoyé à la benzine et séché</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className={darkMode ? "text-[#E2B44F]" : "text-amber-600"}>□</span>
                  <span>Loupe binoculaire x15 prête et éclairée</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className={darkMode ? "text-[#E2B44F]" : "text-amber-600"}>□</span>
                  <span>Huile du type correcte (vérifier le cSt)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className={darkMode ? "text-[#E2B44F]" : "text-amber-600"}>□</span>
                  <span>Huilier propre, pointe capillaire intacte</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className={darkMode ? "text-[#E2B44F]" : "text-amber-600"}>□</span>
                  <span>Papier absorbant à portée de main</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className={`font-bold mb-3 ${
                darkMode ? "text-white" : "text-slate-900"
              }`}>
                Après le huilage
              </h3>
              <ul className={`space-y-2 text-sm ${
                darkMode ? "text-gray-300" : "text-slate-700"
              }`}>
                <li className="flex items-start gap-2">
                  <span className={darkMode ? "text-[#E2B44F]" : "text-amber-600"}>□</span>
                  <span>Ménisque de 0.4-0.6mm, brillant et régulier</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className={darkMode ? "text-[#E2B44F]" : "text-amber-600"}>□</span>
                  <span>Pas d'huile sur les ponts alentours</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className={darkMode ? "text-[#E2B44F]" : "text-amber-600"}>□</span>
                  <span>Pas de bulles d'air dans le ménisque</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className={darkMode ? "text-[#E2B44F]" : "text-amber-600"}>□</span>
                  <span>Rotation libre du pivot testée</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className={darkMode ? "text-[#E2B44F]" : "text-amber-600"}>□</span>
                  <span>Date de révision notée sur la fiche</span>
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
              Cette checklist peut être imprimée et utilisée en atelier. Chaque point est critique pour la qualité finale.
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
          }`}>
            Pour aller plus loin
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className={`font-bold mb-1 ${
                darkMode ? "text-white" : "text-slate-900"
              }`}>
                Livres de référence
              </h3>
              <ul className={`space-y-1 ${
                darkMode ? "text-gray-300" : "text-slate-700"
              }`}>
                <li>• "La pratique de la lubrification horlogère" - Michel Diederich</li>
                <li>• "Techniques du graissage en horlogerie" - FH (Fondation Haute Horlogerie)</li>
              </ul>
            </div>
            <div>
              <h3 className={`font-bold mb-1 ${
                darkMode ? "text-white" : "text-slate-900"
              }`}>
                Fournisseurs certifiés
              </h3>
              <ul className={`space-y-1 ${
                darkMode ? "text-gray-300" : "text-slate-700"
              }`}>
                <li>• Mobius Lubricants (Suisse) - Référence mondiale</li>
                <li>• Bergeon (Suisse) - Outils et huiles spécialisés</li>
                <li>• Moebius (Allemagne) - Huiles synthétiques haut de gamme</li>
              </ul>
            </div>
          </div>
        </section>

        <footer className={`text-center text-sm border-t pt-6 ${
          darkMode ? "text-gray-500 border-gray-800" : "text-slate-500 border-slate-200"
        }`}>
          <p>HorloLearn - Cours de horlogerie en ligne | Dernière mise à jour : Novembre 2024</p>
          <p className="mt-1">
            Temps de lecture estimé : 20 minutes | Niveau : Intermédiaire | Certificat disponible
          </p>
        </footer>
      </div>
    </div>
  );
}
