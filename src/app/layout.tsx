'use client';

import type { Metadata } from "next";
import "./globals.css";
import { Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <title>Horlo-AFP - Plateforme d'apprentissage de l'horlogerie</title>
        <meta name="description" content="Apprenez l'horlogerie de A à Z avec notre plateforme complète" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="flex flex-col min-h-screen">
        <header className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 py-4" style={{ fontFamily: "'Oswald', sans-serif" }}>
            <div className="flex items-center justify-between">
              {/* Logo */}
              <a href="/" className="flex items-center gap-2 sm:gap-3 group">
                <Clock className="w-7 h-7 sm:w-8 sm:h-8 text-amber-600" strokeWidth={1.5} />
                <span className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                  Horlo-AFP
                </span>
              </a>
            </div>
          </div>
          {/* Navigation Bar with active link highlighting */}
          <Navbar />
        </header>
        
        <main className="flex-grow">
          {children}
        </main>
        
        <footer className="bg-[#0a0a0a] border-t border-gray-800 py-10 text-gray-400">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            {/* Navigation */}
            <div>
              <h3 className="font-semibold text-white mb-3">Navigation</h3>
              <a className="block hover:text-[#E2B44F]" href="/theorie">Théorie</a>
              <a className="block hover:text-[#E2B44F]" href="/pratique">Pratique</a>
              <a className="block hover:text-[#E2B44F]" href="/ressources">Ressources</a>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3">Communauté</h3>
              <a className="block hover:text-[#E2B44F]" href="/forums">Forums</a>
              <a className="block hover:text-[#E2B44F]" href="/evenements">Événements</a>
              <a className="block hover:text-[#E2B44F]" href="/podcasts">Podcasts</a>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3">Contact</h3>
              <a className="block text-[#E2B44F] font-semibold" href="/contact">✉️ Me contacter</a>
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
