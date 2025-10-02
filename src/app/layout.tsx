import type { Metadata } from "next";
import "./globals.css";
import { Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: "Horlo-AFP - Plateforme d'apprentissage de l'horlogerie",
  description: "Apprenez l'horlogerie de A à Z avec notre plateforme complète",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="flex flex-col min-h-screen">
        <header className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
          <nav className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <a href="/" className="flex items-center gap-3 group">
                <Clock className="w-8 h-8 text-amber-600" strokeWidth={1.5} />
                <span className="text-2xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                  Horlo-AFP
                </span>
              </a>
              <div className="flex gap-8 text-sm font-medium">
                <a href="/theorie" className="text-gray-700 hover:text-amber-600 transition-colors">Théorie</a>
                <a href="/pratique" className="text-gray-700 hover:text-amber-600 transition-colors">Pratique</a>
                <a href="/quiz" className="text-gray-700 hover:text-amber-600 transition-colors">Quiz</a>
                <a href="/outils" className="text-gray-700 hover:text-amber-600 transition-colors">Outils</a>
                <a href="/ressources" className="text-gray-700 hover:text-amber-600 transition-colors">Ressources</a>
                <a href="/podcasts" className="text-gray-700 hover:text-amber-600 transition-colors">Podcasts</a>
                <a href="/culture" className="text-gray-700 hover:text-amber-600 transition-colors">Culture</a>
                <a href="/evenements" className="text-gray-700 hover:text-amber-600 transition-colors">Événements</a>
                <a href="/communaute" className="text-gray-700 hover:text-amber-600 transition-colors">Communauté</a>
              </div>
            </div>
          </nav>
        </header>
        
        <main className="flex-grow">
          {children}
        </main>
        
        <footer className="bg-slate-900 text-white py-8 mt-auto">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-3">Horlo-AFP</h3>
                <p className="text-sm text-slate-300">Plateforme d'apprentissage de l'horlogerie complète et accessible.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Navigation</h4>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li><a href="/theorie" className="hover:text-amber-400 transition-colors">Théorie</a></li>
                  <li><a href="/pratique" className="hover:text-amber-400 transition-colors">Pratique</a></li>
                  <li><a href="/ressources" className="hover:text-amber-400 transition-colors">Ressources</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Communauté</h4>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li><a href="/communaute" className="hover:text-amber-400 transition-colors">Forums</a></li>
                  <li><a href="/evenements" className="hover:text-amber-400 transition-colors">Événements</a></li>
                  <li><a href="/podcasts" className="hover:text-amber-400 transition-colors">Podcasts</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-700 mt-8 pt-6 text-center text-sm text-slate-400">
              © 2025 Horlo-AFP. Tous droits réservés.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
