// app/culture-horlogere/page.tsx - La Référence Absolue en Horlogerie Suisse
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';

// Configuration globale - Mode sombre/clair
const THEME_CONFIG = {
  dark: {
    bg: 'bg-black',
    bgGradient: 'bg-gradient-to-br from-black via-neutral-900 to-neutral-800',
    surface: 'bg-neutral-900',
    surfaceSecondary: 'bg-neutral-800',
    text: 'text-white',
    textSecondary: 'text-gray-300',
    accent: 'text-yellow-400',
    accentBg: 'bg-yellow-400',
    border: 'border-neutral-700',
    shadow: 'shadow-yellow-400/20',
  },
  light: {
    bg: 'bg-white',
    bgGradient: 'bg-gradient-to-br from-white via-gray-50 to-gray-100',
    surface: 'bg-white',
    surfaceSecondary: 'bg-gray-50',
    text: 'text-gray-900',
    textSecondary: 'text-gray-600',
    accent: 'text-yellow-600',
    accentBg: 'bg-yellow-500',
    border: 'border-gray-200',
    shadow: 'shadow-yellow-500/20',
  },
};

// Icônes intégrées (pas de dépendances)
const Icon = {
  Clock: ({ className }: { className: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Museum: ({ className }: { className: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  Video: ({ className }: { className: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Map: ({ className }: { className: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>
  ),
  Chevron: ({ className }: { className: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  ),
};

// Composant Carte Premium
const PremiumCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  theme: any;
}> = ({ children, className = '', theme }) => (
  <div
    className={`group relative overflow-hidden rounded-2xl border ${theme.border} ${theme.surface} shadow-xl transition-all duration-500 hover:shadow-2xl ${theme.shadow} ${className}`}
  >
    <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-transparent to-yellow-400/5" />
    {children}
  </div>
);

// Composant Timeline 3D
const Timeline3D: React.FC<{ theme: any }> = ({ theme }) => {
  const [selected, setSelected] = useState<number | null>(null);
  
  const events = [
    { year: '1510', title: 'Première montre portable', desc: 'Invention du « Nuremberg Egg »' },
    { year: '1675', title: 'Spiral à balance', desc: 'Christiaan Huygens révolutionne la précision' },
    { year: '1755', title: 'Naissance Vacheron Constantin', desc: 'La plus ancienne manufacture en activité continue' },
    { year: '1839', title: 'Fondation Patek Philippe', desc: 'Naît la référence absolue en complications' },
    { year: '1868', title: 'Première montre-bracelet', desc: 'Patek Philippe crée la réf. 27368' },
    { year: '1905', title: 'Naissance de Rolex', desc: 'La couronne devient synonyme de perfection' },
    { year: '1926', title: 'Oyster - première étanche', desc: 'Innovation révolutionnaire pour l\'époque' },
    { year: '1969', title: 'Révolution du quartz', desc: 'Suisse vs Japon : la guerre du temps' },
    { year: '1985', title: 'Naissance de la Swatch', desc: 'Renaissance suisse par l\'innovation' },
    { year: '2024', title: 'Ère de la haute-complication', desc: 'Micromécanique à son apogée' },
  ];

  return (
    <div className="relative">
      {/* Ligne centrale */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-gradient-to-b from-yellow-400 via-transparent to-yellow-400" />
      
      <div className="space-y-16 py-16">
        {events.map((event, idx) => (
          <div
            key={idx}
            className={`relative flex items-center ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
            onClick={() => setSelected(selected === idx ? null : idx)}
          >
            {/* Point sur la ligne */}
            <div className="absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-yellow-400 rounded-full border-4 border-yellow-400 shadow-lg shadow-yellow-400/50 z-10" />
            
            {/* Carte */}
            <div
              className={`w-5/12 cursor-pointer transform transition-all duration-500 ${
                selected === idx ? 'scale-105' : ''
              } ${idx % 2 === 0 ? 'text-right' : 'text-left'}`}
            >
              <PremiumCard theme={theme}>
                <div className="p-6">
                  <div className={`text-3xl font-bold ${theme.accent} mb-1`}>{event.year}</div>
                  <h3 className={`text-xl font-semibold mb-2 ${theme.text}`}>{event.title}</h3>
                  <p className={`${theme.textSecondary}`}>{event.desc}</p>
                  {selected === idx && (
                    <div className="mt-4 pt-4 border-t border-yellow-400/30">
                      <span className={`text-sm ${theme.accent}`}>Cliquez pour fermer</span>
                    </div>
                  )}
                </div>
              </PremiumCard>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Composant Marques Prestige
const BrandShowcase: React.FC<{ theme: any }> = ({ theme }) => {
  const brands = [
    { name: 'Patek Philippe', founded: 1839, specialty: 'Complications', color: 'text-blue-400' },
    { name: 'Vacheron Constantin', founded: 1755, specialty: 'Haute Horlogerie', color: 'text-purple-400' },
    { name: 'Audemars Piguet', founded: 1875, specialty: 'Sport-chic', color: 'text-green-400' },
    { name: 'Rolex', founded: 1905, specialty: 'Outils de précision', color: 'text-green-600' },
    { name: 'Omega', founded: 1848, specialty: 'Sport & Espace', color: 'text-red-500' },
    { name: 'Jaeger-LeCoultre', founded: 1833, specialty: 'Mouvements', color: 'text-indigo-400' },
    { name: 'Breguet', founded: 1775, specialty: 'Inventions', color: 'text-yellow-600' },
    { name: 'Blancpain', founded: 1735, specialty: 'Tradition', color: 'text-gray-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {brands.map((brand, idx) => (
        <PremiumCard key={idx} theme={theme} className="group">
          <div className="p-6">
            <h3 className={`text-2xl font-bold mb-2 ${brand.color}`}>{brand.name}</h3>
            <p className={`text-sm ${theme.textSecondary} mb-1`}>Fondée en {brand.founded}</p>
            <p className={`${theme.text} font-medium`}>{brand.specialty}</p>
            <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className={`text-sm ${theme.accent} border-b border-yellow-400/50`}>Découvrir →</span>
            </div>
          </div>
        </PremiumCard>
      ))}
    </div>
  );
};

// Composant Musées Suisse
const SwissMuseums: React.FC<{ theme: any }> = ({ theme }) => {
  const museums = [
    { name: 'Musée International d\'Horlogerie', city: 'La Chaux-de-Fonds', description: 'Temple du temps et patrimoine UNESCO', collection: '4\'500 objets' },
    { name: 'Patek Philippe Museum', city: 'Genève', description: 'Collection privée de légende', collection: '2\'000 pièces' },
    { name: 'Musée d\'Horlogerie du Locle', city: 'Le Locle', description: 'Histoire vivante de la précision', collection: '3\'000 objets' },
    { name: 'Omega Museum', city: 'Bienne', description: 'De la Lune à la mer', collection: '4\'000 modèles' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {museums.map((museum, idx) => (
        <PremiumCard key={idx} theme={theme} className="overflow-hidden group">
          <div className="h-1 bg-gradient-to-r from-yellow-400 to-transparent" />
          <div className="p-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className={`text-2xl font-bold ${theme.text} mb-1`}>{museum.name}</h3>
                <p className={`flex items-center gap-2 ${theme.textSecondary}`}>
                  <Icon.Map className="w-4 h-4" />
                  {museum.city}
                </p>
              </div>
              <Icon.Museum className={`w-8 h-8 ${theme.accent}`} />
            </div>
            <p className={`${theme.text} mb-4`}>{museum.description}</p>
            <div className={`inline-block px-4 py-2 rounded-full ${theme.surfaceSecondary} ${theme.textSecondary} text-sm`}>
              Collection: {museum.collection}
            </div>
          </div>
        </PremiumCard>
      ))}
    </div>
  );
};

// Composant Vidéos Premium
const VideoGallery: React.FC<{ theme: any }> = ({ theme }) => {
  const videos = [
    { title: 'Les Maîtres du Temps', platform: 'RTS', description: 'Documentaire historique 52min' },
    { title: 'L\'Art du Réglage', platform: 'FHH', description: 'Techniques de haute précision' },
    { title: 'Patek Philippe Grandes Complications', platform: 'YouTube', description: 'Mécanique ultime' },
    { title: 'Naissance d\'un Grand Complication', platform: 'Vacheron Constantin', description: 'Dans les ateliers de Genève' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {videos.map((video, idx) => (
        <PremiumCard key={idx} theme={theme} className="group cursor-pointer">
          <div className="p-6">
            <div className={`w-full h-40 rounded-xl mb-4 flex items-center justify-center ${theme.surfaceSecondary} group-hover:scale-105 transition-transform`}>
              <Icon.Video className={`w-16 h-16 ${theme.accent} opacity-80 group-hover:opacity-100 transition-opacity`} />
            </div>
            <h3 className={`text-lg font-semibold ${theme.text} mb-1`}>{video.title}</h3>
            <p className={`text-sm ${theme.textSecondary} mb-2`}>{video.description}</p>
            <span className={`text-xs px-3 py-1 rounded-full ${theme.accentBg} text-black font-medium`}>
              {video.platform}
            </span>
          </div>
        </PremiumCard>
      ))}
    </div>
  );
};

// Composant Complications Majeures
const ComplicationsShowcase: React.FC<{ theme: any }> = ({ theme }) => {
  const complications = [
    { name: 'Tourbillon', inventor: 'Breguet 1801', description: 'Compense la gravité pour la précision ultime' },
    { name: 'Répétition Minutes', inventor: 'Daniel Quare 1680', description: 'Sonne les heures, les quarts et les minutes' },
    { name: 'Perpétuel', inventor: 'Thomas Mudge 1762', description: 'Gère automatiquement les mois de 28-31 jours' },
    { name: 'Chronographe', inventor: 'Louis Moinet 1816', description: 'Mesure avec précision les intervalles de temps' },
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-yellow-400/20 bg-gradient-to-br from-yellow-400/10 to-transparent backdrop-blur-sm p-8">
      <h2 className={`text-3xl font-bold ${theme.accent} mb-8 text-center`}>Grandes Complications</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {complications.map((comp, idx) => (
          <div key={idx} className="group">
            <h3 className={`text-xl font-semibold ${theme.text} mb-1`}>{comp.name}</h3>
            <p className={`text-sm ${theme.textSecondary} mb-2`}>{comp.inventor}</p>
            <p className={`${theme.text} opacity-90 group-hover:opacity-100`}>{comp.description}</p>
          </div>
        ))}
      </div>
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl" />
    </div>
  );
};

// Composant Principal
export default function CultureHorlogere() {
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('timeline');

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('horlo-theme') as 'dark' | 'light' | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setThemeMode(saved || (systemPrefersDark ? 'dark' : 'light'));
  }, []);

  const theme = useMemo(() => THEME_CONFIG[themeMode], [themeMode]);

  const toggleTheme = () => {
    const newTheme = themeMode === 'dark' ? 'light' : 'dark';
    setThemeMode(newTheme);
    localStorage.setItem('horlo-theme', newTheme);
  };

  const sections = [
    { id: 'timeline', name: 'Timeline', icon: 'Clock' },
    { id: 'brands', name: 'Maisons', icon: 'Star' },
    { id: 'museums', name: 'Musées', icon: 'Museum' },
    { id: 'complications', name: 'Complications', icon: 'Cog' },
    { id: 'videos', name: 'Documentaires', icon: 'Video' },
  ];

  if (!mounted) return null;

  return (
    <>
      <Head>
        <title>Culture Horlogère Suisse - La Référence Mondiale</title>
        <meta name="description" content="La référence absolue sur l'horlogerie suisse. Histoire, maîtres du temps, complications et patrimoine." />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;700;900&display=swap" rel="stylesheet" />
      </Head>

      <main className={`min-h-screen ${theme.bgGradient} transition-colors duration-500`}>
        {/* Header Premium */}
        <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/10">
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg shadow-yellow-400/30 flex items-center justify-center">
                  <span className="text-2xl">🕰️</span>
                </div>
                <div>
                  <h1 className={`font-black text-2xl ${theme.text}`} style={{ fontFamily: "'Playfair Display', serif" }}>
                    HORLO CULTURE
                  </h1>
                  <p className={`text-xs ${theme.textSecondary}`}>Référence Mondiale</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                {/* Navigation sections */}
                <nav className="hidden md:flex items-center gap-2 bg-white/5 rounded-full p-1 backdrop-blur-sm">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        activeSection === section.id
                          ? `${theme.accentBg} text-black`
                          : `${theme.textSecondary} hover:${theme.accent}`
                      }`}
                    >
                      {section.name}
                    </button>
                  ))}
                </nav>

                {/* Toggle theme */}
                <button
                  onClick={toggleTheme}
                  className={`relative w-14 h-7 rounded-full border ${theme.border} ${theme.surface} transition-all duration-300 hover:scale-105`}
                >
                  <div
                    className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 transition-transform duration-300 ${
                      themeMode === 'light' ? 'translate-x-7' : ''
                    }`}
                  />
                  <span className="absolute -left-8 top-1.5 text-sm">🌙</span>
                  <span className="absolute -right-8 top-1.5 text-sm">☀️</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-yellow-400/10 via-transparent to-transparent" />
          <div className="container mx-auto px-6 relative">
            <div className="max-w-4xl mx-auto text-center">
              <h1
                className={`text-5xl lg:text-7xl font-black mb-6 ${theme.text}`}
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                La Culture Horlogère Suisse
              </h1>
              <p className={`text-xl lg:text-2xl ${theme.textSecondary} mb-10`}>
                Un voyage à travers 500 ans d'excellence, d'innovation et de savoir-faire ancestral
              </p>
              <div className={`text-lg italic ${theme.accent} border-t border-b ${theme.border} py-4 inline-block`}>
                « L'horlogerie est l'art de comprendre le temps avant de le mesurer »
              </div>
            </div>
          </div>
        </section>

        {/* Contenu Dynamique */}
        <div className="container mx-auto px-6 pb-20">
          {/* Timeline */}
          {activeSection === 'timeline' && (
            <section className="mb-20">
              <h2
                className={`text-4xl font-bold text-center mb-16 ${theme.text}`}
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Timeline Historique
              </h2>
              <Timeline3D theme={theme} />
            </section>
          )}

          {/* Brands */}
          {activeSection === 'brands' && (
            <section className="mb-20">
              <h2
                className={`text-4xl font-bold text-center mb-16 ${theme.text}`}
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Les Maisons de Légende
              </h2>
              <BrandShowcase theme={theme} />
            </section>
          )}

          {/* Museums */}
          {activeSection === 'museums' && (
            <section className="mb-20">
              <h2
                className={`text-4xl font-bold text-center mb-16 ${theme.text}`}
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Temples du Patrimoine
              </h2>
              <SwissMuseums theme={theme} />
            </section>
          )}

          {/* Complications */}
          {activeSection === 'complications' && (
            <section className="mb-20">
              <h2
                className={`text-4xl font-bold text-center mb-16 ${theme.text}`}
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Grandes Complications
              </h2>
              <ComplicationsShowcase theme={theme} />
            </section>
          )}

          {/* Videos */}
          {activeSection === 'videos' && (
            <section className="mb-20">
              <h2
                className={`text-4xl font-bold text-center mb-16 ${theme.text}`}
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Documentaires d'Exception
              </h2>
              <VideoGallery theme={theme} />
            </section>
          )}
        </div>

        {/* Footer Prestige */}
        <footer className={`border-t ${theme.border} backdrop-blur-xl`}>
          <div className="container mx-auto px-6 py-12">
            <div className="max-w-3xl mx-auto text-center">
              <h3
                className={`text-3xl font-bold mb-4 ${theme.accent}`}
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Horlo Culture
              </h3>
              <p className={`${theme.textSecondary} mb-6`}>
                La référence mondiale sur l'horlogerie suisse depuis 2024
              </p>
              <div className="flex justify-center gap-8 text-sm">
                <span className={theme.accent}>Histoire</span>
                <span className={theme.textSecondary}>•</span>
                <span className={theme.accent}>Innovation</span>
                <span className={theme.textSecondary}>•</span>
                <span className={theme.accent}>Tradition</span>
                <span className={theme.textSecondary}>•</span>
                <span className={theme.accent}>Excellence</span>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
