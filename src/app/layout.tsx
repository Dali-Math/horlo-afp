'use client';
import type { Metadata } from "next";
import "./globals.css";
import { Clock, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/theorie', label: 'Théorie' },
    { href: '/pratique', label: 'Pratique' },
    { href: '/quiz', label: 'Quiz' },
    { href: '/outils', label: 'Outils' },
    { href: '/ressources', label: 'Ressources' },
    { href: '/suisse', label: '🇨🇭 Horlogerie Suisse' },
    { href: '/podcasts', label: 'Podcasts' },
    { href: '/culture', label: 'Culture' },
    { href: '/evenements', label: 'Événements' },
    { href: '/communaute', label: 'Communauté' },
  ];

  return (
    <html lang="fr">
      <head>
        <title>Horlo-AFP - Plateforme d'apprentissage de l'horlogerie</title>
        <meta name="description" content="Apprenez l'horlogerie de A à Z avec notre plateforme complète" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="flex flex-col min-h-screen">
        <header className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
          <nav className="container mx-auto px-4 sm:px-6 py-4" style={{ fontFamily: "'Oswald', sans-serif" }}>
            <div className="flex items-center justify-between">
              {/* Logo */}
              <a href="/" className="flex items-center gap-2 sm:gap-3 group">
                <Clock className="w-7 h-7 sm:w-8 sm:h-8 text-amber-600" strokeWidth={1.5} />
                <span className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                  Horlo-AFP
                </span>
              </a>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex gap-6 xl:gap-8 text-sm font-medium">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-gray-700 hover:text-amber-600 transition-colors whitespace-nowrap"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-gray-700 hover:text-amber-600 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
              <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
                <div className="flex flex-col space-y-3">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="text-gray-700 hover:text-amber-600 transition-colors py-2 px-2 rounded hover:bg-amber-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </nav>
        </header>
        
        <main className="flex-grow">
          {children}
        </main>
        
        <footer className="bg-[#0a0a0a] border-t border-gray-800 py-10 text-gray-400">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            
            <div>
              <h3 className="font-semibold text-white mb-3">Navigation</h3>
              <a href="/theorie" className="block hover:text-[#E2B44F]">Théorie</a>
              <a href="/pratique" className="block hover:text-[#E2B44F]">Pratique</a>
              <a href="/ressources" className="block hover:text-[#E2B44F]">Ressources</a>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-3">Communauté</h3>
              <a href="/forums" className="block hover:text-[#E2B44F]">Forums</a>
              <a href="/evenements" className="block hover:text-[#E2B44F]">Événements</a>
              <a href="/podcasts" className="block hover:text-[#E2B44F]">Podcasts</a>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-3">Contact</h3>
              <a href="/contact" className="block text-[#E2B44F] font-semibold">✉️ Me contacter</a>
            </div>

          </div>

          <p className="mt-8 text-center text-sm text-gray-500">
            © 2025 Horlo-AFP. Tous droits réservés.
          </p>
        </footer>
      </body>
    </html>
  );
}
