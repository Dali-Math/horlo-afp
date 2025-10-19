"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Clock, 
  MapPin, 
  Users, 
  BookOpen, 
  Award,
  Calendar,
  ExternalLink,
  Play,
  Building2,
  Globe
} from "lucide-react";

export default function CulturePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600 dark:border-blue-400 mx-auto mb-4"></div>
          <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">
            Chargement de la Culture Horlogère...
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            ⏱️ Veuillez patienter quelques instants
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900 text-slate-900 dark:text-white transition-colors duration-500">
      {/* HERO HEADER */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-800 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white max-w-4xl mx-auto">
            <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-4 border border-white/30">
              🇨🇭 Patrimoine Horloger Suisse
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Culture & Savoir-Faire Horloger</h1>
            <p className="text-xl md:text-2xl opacity-90">
              Découvrez l'histoire, les musées et les grands horlogers suisses
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* TIMELINE HORLOGERIE */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">
            <Clock className="inline-block w-8 h-8 mr-2 text-blue-600 dark:text-blue-400" />
            Chronologie de l'Horlogerie Suisse
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { year: "1541", event: "Arrivée de Jean Calvin à Genève", desc: "Début de l'industrie horlogère genevoise" },
              { year: "1601", event: "Corporation des Horlogers", desc: "Création de la première corporation officielle" },
              { year: "1755", event: "Révolution industrielle", desc: "Mécanisation de la production horlogère" },
              { year: "1970", event: "Crise du Quartz", desc: "L'horlogerie suisse face au défi du quartz japonais" },
            ].map((item, i) => (
              <div key={i} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">{item.year}</div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{item.event}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* HISTOIRE */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">
            <BookOpen className="inline-block w-8 h-8 mr-2 text-blue-600 dark:text-blue-400" />
            Histoire de l'Horlogerie Suisse
          </h2>
          
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 md:p-12 shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                L'horlogerie suisse trouve ses origines au <strong>XVIe siècle</strong> à Genève, lorsque Jean Calvin interdit le port de bijoux, 
                poussant les orfèvres à se reconvertir dans la fabrication de montres.
              </p>
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                Au <strong>XVIIIe siècle</strong>, la Suisse devient le leader mondial de l'horlogerie grâce à ses manufactures 
                à La Chaux-de-Fonds, Le Locle et dans la Vallée de Joux.
              </p>
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                Aujourd'hui, la <strong>Swiss Made</strong> est synonyme d'excellence, de précision et de savoir-faire artisanal 
                reconnu mondialement.
              </p>
            </div>
          </div>
        </section>

        {/* MUSÉES */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">
            <Building2 className="inline-block w-8 h-8 mr-2 text-blue-600 dark:text-blue-400" />
            Musées Horlogers Suisses
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Musée International d'Horlogerie", city: "La Chaux-de-Fonds", url: "https://www.mih.ch" },
              { name: "Patek Philippe Museum", city: "Genève", url: "https://www.patekmuseum.com" },
              { name: "Musée Atelier Audemars Piguet", city: "Le Brassus", url: "https://www.audemarspiguet.com" },
              { name: "Omega Museum", city: "Bienne", url: "https://www.omegawatches.com" },
            ].map((museum, i) => (
              <a
                key={i}
                href={museum.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:border-blue-400 dark:hover:border-blue-500 transition-all"
              >
                <MapPin className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {museum.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">{museum.city}</p>
                <ExternalLink className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
              </a>
            ))}
          </div>
        </section>

        {/* GRANDS HORLOGERS */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">
            <Users className="inline-block w-8 h-8 mr-2 text-blue-600 dark:text-blue-400" />
            Grands Horlogers Historiques
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Abraham-Louis Breguet", years: "1747-1823", contribution: "Inventeur du tourbillon et du spiral Breguet" },
              { name: "Antoine LeCoultre", years: "1803-1881", contribution: "Fondateur de Jaeger-LeCoultre, pionnier de la micromécanique" },
              { name: "Georges-Édouard Piaget", years: "1855-1910", contribution: "Créateur de mouvements ultra-plats" },
            ].map((person, i) => (
              <div key={i} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
                <Award className="w-10 h-10 text-yellow-500 dark:text-yellow-400 mb-3" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{person.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{person.years}</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">{person.contribution}</p>
              </div>
            ))}
          </div>
        </section>

        {/* VIDÉOS */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">
            <Play className="inline-block w-8 h-8 mr-2 text-blue-600 dark:text-blue-400" />
            Vidéos & Documentaires
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "L'Art de l'Horlogerie Suisse", duration: "45 min", desc: "Documentaire complet sur les manufactures" },
              { title: "Fabrication d'une Montre Mécanique", duration: "28 min", desc: "Toutes les étapes de A à Z" },
            ].map((video, i) => (
              <div key={i} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all">
                <div className="aspect-video bg-gradient-to-br from-blue-400 to-indigo-500 dark:from-blue-600 dark:to-indigo-700 rounded-lg mb-4 flex items-center justify-center">
                  <Play className="w-16 h-16 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{video.title}</h3>
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-2">
                  <Clock className="w-4 h-4" />
                  {video.duration}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">{video.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-20">
          <div className="rounded-2xl bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 p-8 md:p-12 border border-blue-200 dark:border-blue-700">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  Poursuivre l'exploration
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Découvrez la théorie, les outils et la pratique de l'horlogerie moderne.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/theorie"
                  className="px-6 py-3 rounded-lg bg-blue-600 dark:bg-blue-500 text-white font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-all"
                >
                  Théorie
                </Link>
                <Link
                  href="/outils"
                  className="px-6 py-3 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition-all"
                >
                  Outils
                </Link>
                <Link
                  href="/pratique"
                  className="px-6 py-3 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition-all"
                >
                  Pratique
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-white py-8 mt-16 border-t border-slate-800 dark:border-slate-700">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-400 dark:text-slate-500">
            © 2025 HorloLearn – Culture & Patrimoine Horloger Suisse
          </p>
        </div>
      </footer>
    </div>
  );
}
