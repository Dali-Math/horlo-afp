'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Wrench, 
  Award,
  CheckCircle,
  ArrowRight,
  Bell,
  Rss,
  Clock,
  TrendingUp,
  ExternalLink,
  Heart
} from 'lucide-react';

function HeroSection() {
  return (
    <section className="relative min-h-screen bg-[#0a122a] overflow-hidden flex items-center justify-center px-4">
      {/* Rouages animés en arrière-plan */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {/* Grand rouage gauche */}
        <svg
          className="absolute top-20 left-10 w-96 h-96 animate-spin-slow"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="2" className="text-blue-300" />
          <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="2" className="text-blue-300" />
          <circle cx="100" cy="100" r="10" fill="currentColor" className="text-blue-300" />
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
            <g key={angle} transform={`rotate(${angle} 100 100)`}>
              <rect x="95" y="20" width="10" height="25" fill="currentColor" className="text-blue-300" />
              <circle cx="100" cy="20" r="8" fill="currentColor" className="text-blue-400" />
            </g>
          ))}
        </svg>

        {/* Moyen rouage droite */}
        <svg
          className="absolute top-40 right-20 w-64 h-64 animate-spin-reverse"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="2" className="text-blue-300" />
          <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="2" className="text-blue-300" />
          <circle cx="100" cy="100" r="8" fill="currentColor" className="text-blue-300" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <g key={angle} transform={`rotate(${angle} 100 100)`}>
              <rect x="95" y="30" width="10" height="20" fill="currentColor" className="text-blue-300" />
              <circle cx="100" cy="30" r="7" fill="currentColor" className="text-blue-400" />
            </g>
          ))}
        </svg>

        {/* Petit rouage bas droite */}
        <svg
          className="absolute bottom-20 right-40 w-48 h-48 animate-spin-slow"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="2" className="text-blue-300" />
          <circle cx="100" cy="100" r="45" stroke="currentColor" strokeWidth="2" className="text-blue-300" />
          <circle cx="100" cy="100" r="6" fill="currentColor" className="text-blue-300" />
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <g key={angle} transform={`rotate(${angle} 100 100)`}>
              <rect x="95" y="40" width="10" height="18" fill="currentColor" className="text-blue-300" />
              <circle cx="100" cy="40" r="6" fill="currentColor" className="text-blue-400" />
            </g>
          ))}
        </svg>

        {/* Grand rouage bas gauche */}
        <svg
          className="absolute bottom-10 left-20 w-80 h-80 animate-spin-reverse"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="100" cy="100" r="75" stroke="currentColor" strokeWidth="2" className="text-blue-300" />
          <circle cx="100" cy="100" r="55" stroke="currentColor" strokeWidth="2" className="text-blue-300" />
          <circle cx="100" cy="100" r="9" fill="currentColor" className="text-blue-300" />
          {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((angle) => (
            <g key={angle} transform={`rotate(${angle} 100 100)`}>
              <rect x="95" y="25" width="10" height="23" fill="currentColor" className="text-blue-300" />
              <circle cx="100" cy="25" r="7.5" fill="currentColor" className="text-blue-400" />
            </g>
          ))}
        </svg>

        {/* Petit rouage haut droite */}
        <svg
          className="absolute top-10 right-60 w-40 h-40 animate-spin-slow"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="100" cy="100" r="55" stroke="currentColor" strokeWidth="2" className="text-blue-300" />
          <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="2" className="text-blue-300" />
          <circle cx="100" cy="100" r="5" fill="currentColor" className="text-blue-300" />
          {[0, 72, 144, 216, 288].map((angle) => (
            <g key={angle} transform={`rotate(${angle} 100 100)`}>
              <rect x="95" y="45" width="10" height="15" fill="currentColor" className="text-blue-300" />
              <circle cx="100" cy="45" r="5.5" fill="currentColor" className="text-blue-400" />
            </g>
          ))}
        </svg>

        {/* Moyen rouage centre gauche */}
        <svg
          className="absolute top-1/2 left-40 w-56 h-56 animate-spin-reverse transform -translate-y-1/2"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="100" cy="100" r="65" stroke="currentColor" strokeWidth="2" className="text-blue-300" />
          <circle cx="100" cy="100" r="48" stroke="currentColor" strokeWidth="2" className="text-blue-300" />
          <circle cx="100" cy="100" r="7" fill="currentColor" className="text-blue-300" />
          {[0, 51.4, 102.8, 154.2, 205.6, 257, 308.4].map((angle) => (
            <g key={angle} transform={`rotate(${angle} 100 100)`}>
              <rect x="95" y="35" width="10" height="19" fill="currentColor" className="text-blue-300" />
              <circle cx="100" cy="35" r="6.5" fill="currentColor" className="text-blue-400" />
            </g>
          ))}
        </svg>
      </div>

      {/* Contenu */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div className="flex justify-center mb-8">
          <span className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-800 to-sky-600/60 text-white font-medium text-xs shadow-lg backdrop-blur border border-blue-700/30">
            🔧 Bibliothèque Collaborative
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-br from-white via-sky-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
          L&apos;horlogerie suisse<br />
          <span className="bg-gradient-to-r from-sky-500 via-cyan-400 to-cyan-300 bg-clip-text text-transparent">
            n&apos;a jamais été aussi accessible
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-blue-100/90 mb-10 font-light">
          Explorez <span className="font-bold text-white">2,500+ ressources</span> partagées par des passionnés pour des passionnés
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
          <Link
            href="/theorie"
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-sky-500 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition inline-flex items-center justify-center gap-2"
          >
            ⚡ Explorer maintenant <span className="text-xl">→</span>
          </Link>
          <Link
            href="/communaute"
            className="px-8 py-4 bg-[#151f38] border border-blue-800 text-white font-bold rounded-xl hover:bg-blue-900/80 hover:scale-105 transition inline-flex items-center justify-center gap-2"
          >
            👥 Rejoindre la communauté
          </Link>
        </div>

        <div className="flex justify-center">
          <span className="px-5 py-2 rounded-full bg-gradient-to-r from-green-600 to-emerald-500 text-white text-xs font-semibold shadow-lg">
            🟢 53 passionnés en ligne
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin-reverse 15s linear infinite;
        }
      `}</style>
    </section>
  );
}

function RessourceDeLaSemaine() {
  return (
    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-6 sm:p-8 shadow-xl border-2 border-yellow-200 dark:border-yellow-700/50 mb-8 sm:mb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4 sm:mb-6">
        <div className="bg-yellow-500 dark:bg-yellow-600 p-3 rounded-xl flex-shrink-0">
          <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <div>
          <p className="text-xs sm:text-sm text-orange-700 dark:text-orange-300 font-semibold uppercase">Ressource de la semaine</p>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Guide complet ETA 2824-2</h3>
        </div>
      </div>
      <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 mb-4 sm:mb-6">
        Document PDF haute résolution : démontage complet, éclaté annoté, couples de serrage et procédures de réglage.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <Link href="/ressources" className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors w-full sm:w-auto">
          <BookOpen className="w-5 h-5" />
          Télécharger gratuitement
        </Link>
        <span className="flex items-center justify-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <Clock className="w-4 h-4" />
          Lecture : 15 min
        </span>
      </div>
    </div>
  );
}

function FilActualites() {
  const actualites = [
    { titre: "Watches & Wonders 2026 : Dates confirmées", date: "Il y a 2 jours", url: "https://www.watches-and-wonders.com" },
    { titre: "Nouveau calibre Sellita SW330-2 annoncé", date: "Il y a 5 jours", url: "#" },
    { titre: "Formation AFP : Nouveaux programmes 2026", date: "Il y a 1 semaine", url: "#" }
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-4 sm:p-6 shadow-lg border border-slate-200 dark:border-slate-700 mb-8 sm:mb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-2">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          Actualités horlogères
        </h3>
        <Link href="/evenements" className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold">
          Voir tout →
        </Link>
      </div>
      <div className="space-y-3 sm:space-y-4">
        {actualites.map((actu, idx) => (
          <a key={idx} href={actu.url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group">
            <div className="flex-shrink-0 w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2"></div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors break-words">{actu.titre}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{actu.date}</p>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 flex-shrink-0" />
          </a>
        ))}
      </div>
    </div>
  );
}

function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-800 rounded-2xl sm:rounded-3xl p-6 sm:p-12 text-white text-center mb-8 sm:mb-12">
      <div className="max-w-2xl mx-auto">
        <div className="inline-block p-3 bg-white/20 rounded-full mb-4">
          <Bell className="w-6 h-6 sm:w-8 sm:h-8" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Restez informé</h2>
        <p className="text-base sm:text-xl text-blue-100 dark:text-blue-200 mb-6 sm:mb-8 px-4">
          Recevez chaque semaine : nouvelles ressources partagées, astuces d&apos;atelier et actualités horlogères
        </p>
        {!subscribed ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto px-4 sm:px-0">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="votre@email.com" required className="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-xl text-slate-900 font-medium focus:outline-none focus:ring-4 focus:ring-white/50" />
            <button type="submit" className="bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold hover:shadow-xl transition-all whitespace-nowrap">S&apos;abonner</button>
          </form>
        ) : (
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 sm:p-6 max-w-md mx-auto">
            <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3" />
            <p className="text-base sm:text-lg font-semibold">Merci ! Vous êtes inscrit 🎉</p>
          </div>
        )}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-8 text-xs sm:text-sm text-blue-200">
          <span className="flex items-center gap-2"><Rss className="w-4 h-4" /> Flux RSS disponible</span>
          <span className="flex items-center gap-2"><Bell className="w-4 h-4" /> Notifications activables</span>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
      <HeroSection />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <RessourceDeLaSemaine />
        <FilActualites />

        <section className="mb-12 sm:mb-16">
          <div className="text-center mb-8 sm:mb-12 px-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4">Explorer par Thématique</h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Des ressources organisées pour progresser à votre rythme
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { title: "Théorie", icon: BookOpen, color: "from-blue-600 to-cyan-600", description: "Principes fondamentaux, histoire et terminologie horlogère", link: "/theorie", features: ["Cours détaillés", "Schémas annotés", "Glossaire illustré"] },
              { title: "Pratique", icon: Wrench, color: "from-purple-600 to-pink-600", description: "Démontage, remontage et réglage de mouvements", link: "/pratique", features: ["Tutoriels vidéo", "Plans techniques", "Guides pas-à-pas"] },
              { title: "Évaluation", icon: Award, color: "from-orange-600 to-red-600", description: "Testez vos connaissances avec nos quiz", link: "/quiz", features: ["Quiz interactifs", "Correction détaillée", "Suivi progrès"] }
            ].map((parcours, idx) => (
              <Link key={idx} href={parcours.link} className="group bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all border border-slate-200 dark:border-slate-700 hover:scale-105">
                <div className={`inline-block p-3 sm:p-4 rounded-xl bg-gradient-to-br ${parcours.color} mb-4 sm:mb-6 group-hover:scale-110 transition-transform`}>
                  <parcours.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-3">{parcours.title}</h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-4 sm:mb-6">{parcours.description}</p>
                <ul className="space-y-2 mb-4 sm:mb-6">
                  {parcours.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold group-hover:gap-4 transition-all text-sm sm:text-base">
                  Découvrir <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <NewsletterSignup />
      </main>

      <footer className="bg-slate-900 dark:bg-slate-950 text-white py-8 sm:py-12 mt-12 sm:mt-20 border-t border-slate-800 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div className="col-span-1 sm:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <span className="text-xl sm:text-2xl font-bold">HorloLearn</span>
              </div>
              <p className="text-sm sm:text-base text-slate-400 mb-4">La première plateforme collaborative francophone dédiée au partage de connaissances horlogères.</p>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
                <Heart className="w-4 h-4 text-red-500" />
                <span>Fait avec passion par la communauté</span>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Explorer</h3>
              <ul className="space-y-2 text-sm sm:text-base text-slate-400">
                <li><Link href="/theorie" className="hover:text-white transition-colors">Théorie</Link></li>
                <li><Link href="/pratique" className="hover:text-white transition-colors">Pratique</Link></li>
                <li><Link href="/quiz" className="hover:text-white transition-colors">Quiz</Link></li>
                <li><Link href="/ressources" className="hover:text-white transition-colors">Ressources</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Communauté</h3>
              <ul className="space-y-2 text-sm sm:text-base text-slate-400">
                <li><Link href="/communaute" className="hover:text-white transition-colors">Forum</Link></li>
                <li><Link href="/outils" className="hover:text-white transition-colors">Outils</Link></li>
                <li><Link href="/culture" className="hover:text-white transition-colors">Culture</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6 sm:pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
              <p className="text-slate-400 text-xs sm:text-sm text-center md:text-left">© 2025 HorloLearn – Passion & Découverte Horlogère Suisse</p>
              <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm text-slate-400">
                <Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link>
                <Link href="/politique-confidentialite" className="hover:text-white transition-colors">Confidentialité</Link>
              </div>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-500 text-center px-4">
              💡 HorloLearn n&apos;est ni une école ni un centre de formation officiel. Aucun diplôme ou certification reconnue n&apos;est délivré. 
              Il s&apos;agit d&apos;une plateforme collaborative de partage de connaissances horlogères.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
