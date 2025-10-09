'use client';
import type { Metadata } from "next";
import "./globals.css";
import Navbar from '@/components/Navbar';
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <title>HorloLearn - Pour les passionnés et apprentis horlogers</title>
        <meta name="description" content="HorloLearn : plateforme d'apprentissage complète pour les passionnés et apprentis horlogers AFP, CFC ou autodidactes." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="HorloLearn - Pour les passionnés et apprentis horlogers" />
        <meta property="og:description" content="Plateforme d'apprentissage pour les passionnés et apprentis horlogers" />
        <meta property="og:image" content="/logos/Logo.jpg" />
        <link rel="icon" href="/logos/Logo.jpg" />
      </head>
      <body className="flex flex-col min-h-screen">
        {/* Navigation Bar with HorloLearn branding */}
        <Navbar />
        
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
              <p className="mt-2 text-sm">Pour les passionnés et apprentis horlogers</p>
            </div>
          </div>
          <p className="mt-8 text-center text-sm text-gray-500">
            © 2025 HorloLearn. Tous droits réservés.
          </p>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
