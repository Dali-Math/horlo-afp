import type { Metadata } from "next";
import "./globals.css";

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
      <body>
        <header>
          <nav>
            <a href="/">Accueil</a>
            <a href="/theorie">Théorie</a>
            <a href="/pratique">Pratique</a>
            <a href="/quiz">Quiz</a>
            <a href="/outils">Outils</a>
            <a href="/ressources">Ressources</a>
            <a href="/podcasts">Podcasts</a>
            <a href="/culture">Culture</a>
            <a href="/evenements">Événements</a>
            <a href="/communaute">Communauté</a>
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          <p>© 2025 Horlo-AFP. Tous droits réservés.</p>
        </footer>
      </body>
    </html>
  );
}
