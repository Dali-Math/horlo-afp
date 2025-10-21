'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight, Clock, Cog, BookOpen, Users, ArrowRight, Menu, X } from 'lucide-react';

export default function HorlogerieAccueil() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [time, setTime] = useState<string>('');

  // Mettre à jour l'heure en temps réel
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navigationLinks = [
    { label: 'Accueil', href: '#accueil' },
    { label: 'Histoire', href: '#histoire' },
    { label: 'Techniques', href: '#techniques' },
    { label: 'Formations', href: '#formations' },
    { label: 'Ressources', href: '#ressources' },
    { label: 'Contact', href: '#contact' },
  ];

  const domains = [
    {
      icon: '🕰️',
      title: 'Histoire & Patrimoine',
      description:
        'Explorez l\'évolution de l\'horlogerie à travers les siècles, des cadrans solaires aux montres modernes.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: '⚙️',
      title: 'Mécanismes & Techniques',
      description:
        'Comprenez les secrets des mouvements horlogers, des échappements aux complications sophistiquées.',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: '👨‍🏫',
      title: 'Formations Interactives',
      description:
        'Apprenez l\'horlogerie avec nos cours en ligne, tutoriels et ateliers pratiques pour tous niveaux.',
      color: 'from-amber-500 to-amber-600',
    },
  ];

  const resources = [
    {
      icon: '📚',
      title: 'Bibliothèque Numérique',
      description: 'Accès à plus de 500 ressources : livres, articles et documents historiques.',
      action: 'Découvrir',
    },
    {
      icon: '🎥',
      title: 'Vidéothèque',
      description:
        'Tutoriels, documentaires et démonstrations techniques de maîtres horlogers.',
      action: 'Regarder',
    },
    {
      icon: '🗺️',
      title: 'Visites Virtuelles',
      description: 'Explorez les ateliers et musées horlogers en réalité virtuelle 360°.',
      action: 'Visiter',
    },
    {
      icon: '🏆',
      title: 'Collections Prestigieuses',
      description: 'Découvrez les pièces d\'exception des plus grands horlogers mondiaux.',
      action: 'Explorer',
    },
  ];

  const testimonials = [
    {
      quote: 'L\'horlogerie est l\'art de traduire le temps en beauté mécanique.',
      author: 'Abraham-Louis Breguet',
    },
    {
      quote: 'Chaque montre raconte une histoire de précision, de passion et de dévouement.',
      author: 'Jean-Claude Biver',
    },
    {
      quote: 'Le temps est l\'illusion la plus précieuse de l\'humanité.',
      author: 'Cartier Fondateur',
    },
  ];

  return (
    <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white min-h-screen overflow-hidden">
      {/* Arrière-plan animé avec rouages */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern id="gears" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="3" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#gears)" />
        </svg>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-gradient-to-b from-slate-950 to-transparent backdrop-blur-md z-50 border-b border-amber-500/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <svg
                viewBox="0 0 40 40"
                className="w-full h-full text-amber-400 animate-spin"
                style={{ animationDuration: '8s' }}
              >
                <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="20" cy="20" r="14" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                <line x1="20" y1="6" x2="20" y2="14" stroke="currentColor" strokeWidth="1.5" />
                <line x1="20" y1="26" x2="20" y2="34" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-amber-400">Chronosophia</h1>
              <p className="text-xs text-amber-300">{time}</p>
            </div>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex gap-8">
            {navigationLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-gray-300 hover:text-amber-400 transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Bouton Menu Mobile */}
          <button
            className="md:hidden text-amber-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900/95 border-t border-amber-500/20 px-4 py-4 space-y-3">
            {navigationLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block text-sm text-gray-300 hover:text-amber-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Section Hero */}
      <section id="accueil" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="mb-6 inline-block">
            <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-2 backdrop-blur-sm">
              <Clock size={16} className="text-amber-400" />
              <span className="text-sm text-amber-300">Bienvenue dans l'univers horloger</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
              Le Temps à l'État Pur
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Plongez dans l'univers fascinant de l'horlogerie. Explorez l'histoire, maîtrisez les techniques,
            et découvrez les secrets de ces merveilles mécaniques qui battent au rythme du temps.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 overflow-hidden">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Commencer l'Exploration
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            <button className="px-8 py-4 border border-amber-400/50 rounded-lg font-semibold hover:bg-amber-500/10 transition-colors duration-300">
              En Savoir Plus
            </button>
          </div>

          {/* Animated clock visualization */}
          <div className="mt-12 inline-block">
            <div className="relative w-32 h-32 mx-auto">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(251, 146, 60, 0.2)" strokeWidth="1" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(251, 146, 60, 0.3)" strokeWidth="1.5" />

                {/* Hour markers */}
                {[...Array(12)].map((_, i) => {
                  const angle = (i * 30 * Math.PI) / 180;
                  const x1 = 50 + 38 * Math.sin(angle);
                  const y1 = 50 - 38 * Math.cos(angle);
                  const x2 = 50 + 42 * Math.sin(angle);
                  const y2 = 50 - 42 * Math.cos(angle);
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="rgba(251, 146, 60, 0.6)"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Hour hand */}
                <line
                  x1="50"
                  y1="50"
                  x2="50"
                  y2="25"
                  stroke="rgba(251, 146, 60, 0.8)"
                  strokeWidth="2"
                  style={{
                    transform: 'rotate(45deg)',
                    transformOrigin: '50px 50px',
                    animation: 'rotate 43200s linear infinite',
                  }}
                />

                {/* Minute hand */}
                <line
                  x1="50"
                  y1="50"
                  x2="50"
                  y2="15"
                  stroke="rgba(251, 146, 60, 0.9)"
                  strokeWidth="1.5"
                  style={{
                    transform: 'rotate(120deg)',
                    transformOrigin: '50px 50px',
                    animation: 'rotate 3600s linear infinite',
                  }}
                />

                {/* Second hand */}
                <line
                  x1="50"
                  y1="50"
                  x2="50"
                  y2="10"
                  stroke="rgba(239, 68, 68, 0.7)"
                  strokeWidth="1"
                  style={{
                    transform: 'rotate(240deg)',
                    transformOrigin: '50px 50px',
                    animation: 'rotate 60s linear infinite',
                  }}
                />

                <circle cx="50" cy="50" r="3" fill="rgba(251, 146, 60, 1)" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Section Domaines */}
      <section id="techniques" className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Nos Univers</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Explorez trois univers complémentaires pour une compréhension complète de l'horlogerie
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {domains.map((domain, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border border-amber-500/10 hover:border-amber-500/30 transition-all duration-300 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${domain.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                <div className="relative z-10">
                  <div className="text-5xl mb-4">{domain.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-amber-400">{domain.title}</h3>
                  <p className="text-gray-400 mb-6">{domain.description}</p>

                  <button className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors group/btn">
                    Découvrir <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>

                <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/5 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Ressources */}
      <section id="ressources" className="relative py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Ressources Pédagogiques</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Accédez à nos contenus exclusifs pour approfondir vos connaissances
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-lg border border-amber-500/10 hover:border-amber-500/30 p-6 transition-all duration-300 hover:scale-105"
              >
                <div className="text-4xl mb-4">{resource.icon}</div>
                <h3 className="font-bold text-lg mb-2 text-amber-400">{resource.title}</h3>
                <p className="text-sm text-gray-400 mb-4">{resource.description}</p>
                <button className="text-amber-400 text-sm font-semibold hover:text-amber-300 transition-colors inline-flex items-center gap-1 group/link">
                  {resource.action} <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Statistiques */}
      <section className="relative py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: '500+', label: 'Ressources' },
              { value: '50+', label: 'Formations' },
              { value: '10,000+', label: 'Apprenants' },
              { value: '2025', label: 'Depuis' },
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2 group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Témoignages */}
      <section className="relative py-20 px-4 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Citations Inspirantes</h2>

          <div className="space-y-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-amber-500/10 to-purple-500/10 border border-amber-500/20 rounded-lg p-8 hover:border-amber-500/40 transition-colors duration-300"
              >
                <p className="text-lg text-gray-100 mb-3 italic">"{testimonial.quote}"</p>
                <p className="text-amber-400 font-semibold">— {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Newsletter */}
      <section className="relative py-20 px-4">
        <div className="max-w-2xl mx-auto text-center bg-gradient-to-r from-amber-500/10 to-purple-500/10 border border-amber-500/20 rounded-xl p-12">
          <h2 className="text-3xl font-bold mb-4">Restez Connecté au Monde de l'Horlogerie</h2>
          <p className="text-gray-400 mb-6">
            Recevez chaque mois nos derniers articles, tutoriels et découvertes exclusives.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 bg-slate-800/50 border border-amber-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 transition-colors"
            />
            <button className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg px-6 py-3 font-semibold hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300">
              S'Abonner
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-amber-500/10 bg-gradient-to-t from-slate-950 to-slate-900/50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-amber-400 mb-4">Chronosophia</h4>
              <p className="text-sm text-gray-400">
                Plateforme éducative et culturelle dédiée à l'horlogerie et à l'art du temps.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-amber-400 mb-4">Navigation</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {navigationLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="hover:text-amber-400 transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-amber-400 mb-4">Légal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-amber-400 transition-colors">Conditions d'Utilisation</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Politique de Confidentialité</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Mentions Légales</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-amber-400 mb-4">Nous Suivre</h4>
              <div className="flex gap-3">
                {['Facebook', 'Instagram', 'Twitter', 'LinkedIn'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center hover:bg-amber-500/20 hover:border-amber-500/40 transition-all duration-300 text-sm font-semibold text-amber-400"
                  >
                    {social[0]}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-amber-500/10 pt-8 text-center text-sm text-gray-500">
            <p>© 2025 Chronosophia. Tous droits réservés. | Conçu avec précision et passion pour l'horlogerie.</p>
          </div>
        </div>
      </footer>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          padding: 0;
        }
      `}</style>
    </div>
  );
}
