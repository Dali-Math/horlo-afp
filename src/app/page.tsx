'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Wrench, 
  GraduationCap, 
  Users, 
  Award,
  TrendingUp,
  Star,
  ArrowRight,
  Play,
  CheckCircle,
  Lightbulb,
  Bell,
  Rss,
  Sparkles,
  Calendar,
  Clock,
  ExternalLink
} from 'lucide-react';
import AstuceDuJour from '@/components/AstuceDuJour';
import ActualitesHorlogeres from '@/components/ActualitesHorlogeres';
import MouvementDuMois from '@/components/MouvementDuMois';
import GalerieVideos from '@/components/GalerieVideos';
import ComparaisonMouvements from '@/components/ComparaisonMouvements';

// Hook pour animer les compteurs
function useCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);
  
  return count;
}

// Composant Stats Animées
function AnimatedStats() {
  const ressources = useCounter(156);
  const outils = useCounter(25);
  const visiteurs = useCounter(1247);
  const heures = useCounter(50);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {[
        { label: "Ressources gratuites", value: ressources, icon: "📚", color: "from-blue-600 to-cyan-600" },
        { label: "Outils disponibles", value: outils, icon: "🔧", color: "from-purple-600 to-pink-600" },
        { label: "Visiteurs ce mois", value: visiteurs, icon: "👥", color: "from-orange-600 to-red-600" },
        { label: "Heures de contenu", value: heures, icon: "⏱️", color: "from-green-600 to-emerald-600" }
      ].map((stat, idx) => (
        <div 
          key={idx}
          className="relative group"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
              {stat.icon}
            </div>
            <div className="mb-2">
              <span className="text-4xl font-bold text-white">{stat.value}</span>
              {idx === 2 && <span className="text-xl text-blue-300 ml-1">+</span>}
              {idx === 3 && <span className="text-xl text-blue-300 ml-1">h</span>}
            </div>
            <p className="text-white font-semibold text-sm mb-1">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// Composant Ressource de la Semaine
function RessourceDeLaSemaine() {
  return (
    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 shadow-xl border-2 border-yellow-200 mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-yellow-500 p-3 rounded-xl">
          <Star className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-sm text-orange-700 font-semibold uppercase">Ressource de la semaine</p>
          <h3 className="text-2xl font-bold text-slate-900">Guide complet ETA 2824-2</h3>
        </div>
      </div>
      <p className="text-slate-700 mb-6">
        Document PDF haute résolution : démontage complet, éclaté annoté, couples de serrage et procédures de réglage.
      </p>
      <div className="flex gap-4">
        <Link
          href="/ressources"
          className="flex items-center gap-2 bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
        >
          <BookOpen className="w-5 h-5" />
          Télécharger gratuitement
        </Link>
        <span className="flex items-center gap-2 text-sm text-slate-600">
          <Clock className="w-4 h-4" />
          Lecture : 15 min
        </span>
      </div>
    </div>
  );
}

// Composant Fil d'Actualités
function FilActualites() {
  const actualites = [
    {
      titre: "Watches & Wonders 2026 : Dates confirmées",
      date: "Il y a 2 jours",
      url: "https://www.watches-and-wonders.com"
    },
    {
      titre: "Nouveau calibre Sellita SW330-2 annoncé",
      date: "Il y a 5 jours",
      url: "#"
    },
    {
      titre: "Formation AFP : Nouveaux programmes 2026",
      date: "Il y a 1 semaine",
      url: "#"
    }
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 mb-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          Actualités horlogères
        </h3>
        <Link href="/evenements" className="text-sm text-blue-600 hover:text-blue-800 font-semibold">
          Voir tout →
        </Link>
      </div>
      <div className="space-y-4">
        {actualites.map((actu, idx) => (
          <a
            key={idx}
            href={actu.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 p-4 rounded-lg hover:bg-slate-50 transition-colors group"
          >
            <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
            <div className="flex-1">
              <h4 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                {actu.titre}
              </h4>
              <p className="text-xs text-slate-500 mt-1">{actu.date}</p>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
          </a>
        ))}
      </div>
    </div>
  );
}

// Composant Newsletter
function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Intégrer avec un service d'emailing (Mailchimp, SendGrid...)
    console.log('Email souscrit:', email);
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-white text-center mb-12">
      <div className="max-w-2xl mx-auto">
        <div className="inline-block p-3 bg-white/20 rounded-full mb-4">
          <Bell className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Restez informé</h2>
        <p className="text-xl text-blue-100 mb-8">
          Recevez chaque semaine : nouvelles ressources, astuces d'atelier et actualités horlogères
        </p>
        {!subscribed ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              required
              className="flex-1 px-6 py-4 rounded-xl text-slate-900 font-medium focus:outline-none focus:ring-4 focus:ring-white/50"
            />
            <button
              type="submit"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:shadow-xl transition-all"
            >
              S'abonner
            </button>
          </form>
        ) : (
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto">
            <CheckCircle className="w-12 h-12 mx-auto mb-3" />
            <p className="text-lg font-semibold">Merci ! Vous êtes inscrit 🎉</p>
          </div>
        )}
        <div className="flex items-center justify-center gap-6 mt-8 text-sm text-blue-200">
          <span className="flex items-center gap-2">
            <Rss className="w-4 h-4" />
            Flux RSS disponible
          </span>
          <span className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Notifications activables
          </span>
        </div>
      </div>
    </div>
  );
}

// Animation balancier CSS
const BalancierAnimation = () => (
  <style jsx>{`
    @keyframes swing {
      0%, 100% { transform: rotate(-15deg); }
      50% { transform: rotate(15deg); }
    }
    .balancier {
      animation: swing 2s ease-in-out infinite;
      transform-origin: center top;
    }
  `}</style>
);

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <BalancierAnimation />
      
      {/* HEADER / NAVIGATION */}
      <header className="bg-white/90 backdrop-blur-sm shadow-md sticky top-0 z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl group-hover:scale-110 transition-transform balancier">
                <Award className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  HorloLearn
                </h1>
                <p className="text-xs text-slate-600">Passion & Découverte Horlogère</p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link href="/theorie" className="text-slate-700 hover:text-blue-600 font-medium transition-colors flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Théorie
              </Link>
              <Link href="/pratique" className="text-slate-700 hover:text-blue-600 font-medium transition-colors flex items-center gap-2">
                <Wrench className="w-4 h-4" />
                Pratique
              </Link>
              <Link href="/quiz" className="text-slate-700 hover:text-blue-600 font-medium transition-colors flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Quiz
              </Link>
              <Link href="/outils" className="text-slate-700 hover:text-blue-600 font-medium transition-colors flex items-center gap-2">
                <Star className="w-4 h-4" />
                Outils
              </Link>
              <Link href="/communaute" className="text-slate-700 hover:text-blue-600 font-medium transition-colors flex items-center gap-2">
                <Users className="w-4 h-4" />
                Communauté
              </Link>
            </nav>

            <Link 
              href="/quiz" 
              className="hidden md:flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              <Play className="w-4 h-4" />
              Commencer
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
<section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white py-20">
  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
  
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="text-center max-w-4xl mx-auto">
      {/* Badges */}
      <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
        <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold border border-white/20">
          🇨🇭 Passion Horlogère Suisse
        </div>
        <div className="inline-block px-4 py-2 bg-green-500/20 backdrop-blur-sm rounded-full text-sm font-semibold border border-green-400/30">
          ✨ 100% Gratuit & Open-Source
        </div>
        <div className="inline-block px-4 py-2 bg-orange-500/20 backdrop-blur-sm rounded-full text-sm font-semibold border border-orange-400/30">
          👥 Communauté d'Entraide
        </div>
      </div>

      {/* Titre principal */}
      <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
        Explorez l'univers de l'
        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          horlogerie suisse
        </span>
      </h1>

      {/* Sous-titre */}
      <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
        Une bibliothèque collaborative de ressources, tutoriels et outils pour passionnés d'horlogerie. 
        <strong className="text-white"> Par la communauté, pour la communauté.</strong>
      </p>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link 
          href="/theorie" 
          className="flex items-center gap-2 bg-white text-blue-900 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all"
        >
          <BookOpen className="w-5 h-5" />
          Explorer les ressources
        </Link>
        <Link 
          href="/communaute" 
          className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all border border-white/30"
        >
          <Users className="w-5 h-5" />
          Rejoindre la communauté
        </Link>
      </div>

      {/* Petit texte en bas */}
      <p className="mt-8 text-sm text-blue-200">
        Aucune inscription requise • Aucun diplôme délivré • Simplement la passion du geste horloger
      </p>
    </div>
  </div>

  {/* Stats Animées */}
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 relative z-10">
    <div className="text-center mb-8">
      <div className="inline-block px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/30">
        <p className="text-white font-semibold flex items-center gap-3">
          <span className="text-2xl">📚</span>
          Ressources Partagées par la Communauté
          <span className="text-2xl">🤝</span>
        </p>
      </div>
    </div>
    <AnimatedStats />
    <div className="mt-12 text-center">
      <p className="text-2xl font-light text-white mb-2">
        L'horlogerie accessible à tous
      </p>
      <p className="text-blue-200 text-sm">
        Pas de certification, juste la passion du savoir-faire horloger
      </p>
    </div>
  </div>
</section>

        {/* Stats Animées */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 relative z-10">
          <div className="text-center mb-8">
            <div className="inline-block px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/30">
              <p className="text-white font-semibold flex items-center gap-3">
                <span className="text-2xl">🇨🇭</span>
                Qualité & Précision Suisse
                <span className="text-2xl">⚙️</span>
              </p>
            </div>
          </div>
          <AnimatedStats />
          <div className="mt-12 text-center">
            <p className="text-2xl font-light text-white mb-2">
              L'excellence horlogère à portée de main
            </p>
            <p className="text-blue-200 text-sm">
              Chaque détail compte. Chaque seconde est précieuse.
            </p>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Ressource de la Semaine */}
        <RessourceDeLaSemaine />

        {/* Fil d'Actualités */}
        <FilActualites />

        {/* Astuce du Jour */}
        <AstuceDuJour />

        {/* Parcours d'Apprentissage */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Parcours d'Apprentissage</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Un cursus complet de la théorie à la pratique pour devenir horloger
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Théorie",
                icon: BookOpen,
                color: "from-blue-600 to-cyan-600",
                description: "Principes fondamentaux, histoire et terminologie horlogère",
                link: "/theorie",
                features: ["Cours structurés", "Schémas animés", "Glossaire illustré"]
              },
              {
                title: "Pratique",
                icon: Wrench,
                color: "from-purple-600 to-pink-600",
                description: "Démontage, remontage et réglage de mouvements réels",
                link: "/pratique",
                features: ["Tutoriels vidéo", "Plans techniques", "Exercices guidés"]
              },
              {
                title: "Certification",
                icon: Award,
                color: "from-orange-600 to-red-600",
                description: "Validez vos compétences avec nos quiz certifiants",
                link: "/quiz",
                features: ["Quiz interactifs", "Badge de réussite", "Suivi progrès"]
              }
            ].map((parcours, idx) => (
              <Link 
                key={idx}
                href={parcours.link}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-slate-200 hover:scale-105"
              >
                <div className={`inline-block p-4 rounded-xl bg-gradient-to-br ${parcours.color} mb-6 group-hover:scale-110 transition-transform`}>
                  <parcours.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{parcours.title}</h3>
                <p className="text-slate-600 mb-6">{parcours.description}</p>
                <ul className="space-y-2 mb-6">
                  {parcours.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-4 transition-all">
                  Découvrir <ArrowRight className="w-5 h-5" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Mouvement du Mois */}
        <MouvementDuMois />

        {/* Newsletter */}
        <NewsletterSignup />

        {/* Actualités Horlogères */}
        <ActualitesHorlogeres />

        {/* Galerie Vidéos */}
        <GalerieVideos />

        {/* Comparaison */}
        <ComparaisonMouvements />

      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">HorloLearn</span>
              </div>
              <p className="text-slate-400 mb-4">
                La première plateforme interactive francophone dédiée à l'apprentissage de l'horlogerie suisse.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Apprendre</h3>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/theorie" className="hover:text-white transition-colors">Théorie</Link></li>
                <li><Link href="/pratique" className="hover:text-white transition-colors">Pratique</Link></li>
                <li><Link href="/quiz" className="hover:text-white transition-colors">Quiz</Link></li>
                <li><Link href="/ressources" className="hover:text-white transition-colors">Ressources</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Communauté</h3>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/communaute" className="hover:text-white transition-colors">Forum</Link></li>
                <li><Link href="/outils" className="hover:text-white transition-colors">Outils</Link></li>
                <li><Link href="/culture" className="hover:text-white transition-colors">Culture</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-400 text-sm">
              © 2025 HorloLearn – Passion & Découverte Horlogère Suisse
            </p>
            <div className="flex gap-6 text-sm text-slate-400">
              <Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link>
              <Link href="/politique-confidentialite" className="hover:text-white transition-colors">Confidentialité</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
