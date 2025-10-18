// app/[locale]/theorie/complications/tourbillon/page.tsx

import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Le Tourbillon - Complication Mécanique Suprême | HorloLearn",
  description: "Découvrez le tourbillon horloger inventé par Abraham-Louis Breguet en 1795 : compensation de la gravité, cage tournante, chef-d'œuvre de Haute Horlogerie.",
  keywords: "tourbillon, Breguet, cage tournante, gravité, haute horlogerie, complication, balancier, précision chronométrique",
};

export default function TourbillonPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-neutral-950">
      {/* Hero avec fond sombre élégant */}
      <section className="bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-6">
            <span className="inline-block bg-purple-100 text-purple-900 text-sm font-medium px-4 py-1.5 rounded-full">
              Chef-d'œuvre de Haute Horlogerie
            </span>
          </div>
          <div className="flex items-start gap-4 mb-6">
            <div className="text-6xl animate-spin-slow">🌀</div>
            <h1 className="text-5xl md:text-6xl font-bold">Le Tourbillon</h1>
          </div>
          <p className="text-xl text-purple-100 max-w-4xl">
            Inventé par Abraham-Louis Breguet en 1795, le tourbillon est le sommet absolu de la complexité horlogère. Cette cage tournante compense les effets de la gravité terrestre sur le balancier-spiral, symbole ultime du savoir-faire horloger.
          </p>
        </div>
      </section>

      {/* Reste du contenu avec sections : Invention Breguet, Fonctionnement, Types de tourbillons (volant, double, triple), Manufactures... */}
      {/* ... Code similaire aux pages précédentes ... */}
    </main>
  );
}
