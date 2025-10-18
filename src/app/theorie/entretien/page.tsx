// app/[locale]/theorie/entretien/page.tsx

import React from "react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Entretien & Maintenance Horlogère | HorloLearn",
  description: "Découvrez l'entretien professionnel des montres mécaniques : révision complète, diagnostic de pannes, réparations. Guide complet pour préserver votre montre.",
  keywords: "entretien montre, révision, maintenance horlogère, diagnostic pannes, réparation, nettoyage ultrasons, horloger professionnel",
};

export default function EntretienPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-neutral-950">
      {/* Header */}
      <div className="bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-800">
        <div className="container mx-auto px-4 py-6 max-w-6xl">
          <a
            href="/theorie"
            className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group"
          >
            <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour à la théorie
          </a>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-600 via-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-4 py-12 md:py-16 max-w-6xl">
          <div className="mb-6">
            <span className="inline-block bg-white text-amber-900 text-sm font-medium px-4 py-1.5 rounded-full">
              Maintenance Professionnelle
            </span>
          </div>

          <div className="flex items-start gap-4 mb-6">
            <div className="text-6xl">🔧</div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Entretien & Maintenance
              </h1>
            </div>
          </div>

          <p className="text-lg md:text-xl text-amber-50 leading-relaxed max-w-4xl mb-8">
            Une montre mécanique nécessite un entretien régulier pour fonctionner parfaitement pendant des décennies. Découvrez les étapes d'une révision complète et comment diagnostiquer les pannes courantes.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard number="5-7" label="Ans entre révisions" />
            <StatCard number="2-4" label="Semaines (durée)" />
            <StatCard number="500-2000" label="CHF (coût moyen)" />
            <StatCard number="200+" label="Pièces démontées" />
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Pourquoi Entretenir sa Montre ?
          </h2>

          <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-8 mb-8">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Une montre mécanique est un chef-d'œuvre de précision comportant 200 à 400 pièces en mouvement permanent. Comme tout mécanisme, elle s'use avec le temps : les lubrifiants sèchent, les pivots s'usent, la poussière s'accumule.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Un entretien régulier tous les <span className="font-semibold text-gray-900 dark:text-gray-100">5 à 7 ans</span> permet de préserver la précision, prolonger la durée de vie et maintenir la valeur de votre montre. Sans révision, les frottements augmentent, l'amplitude diminue, et des dommages irréversibles peuvent survenir.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Une révision complète comprend démontage, nettoyage aux ultrasons, remplacement des pièces usées, lubrification, réglage chronométrique et tests d'étanchéité. C'est un processus minutieux réalisé par des horlogers qualifiés.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <BenefitCard
              icon="⏱️"
              title="Précision Restaurée"
              description="Retour à ±5 secondes/jour après réglage chronométrique sur 5 positions."
            />
            <BenefitCard
              icon="🛡️"
              title="Protection Longévité"
              description="Évite l'usure prématurée des pivots et engrenages. Durée de vie multipliée."
            />
            <BenefitCard
              icon="💎"
              title="Valeur Préservée"
              description="Historique d'entretien prouvé : essentiel pour la revente ou transmission."
            />
          </div>
        </div>
      </section>

      {/* Les 2 Services */}
      <section className="bg-white dark:bg-neutral-900 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
            Services d'Entretien Professionnel
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <ServiceCard
              icon="🔧"
              title="Révision Complète"
              description="Démontage total, nettoyage ultrasons, remplacement pièces usées, lubrification, réglage chronométrique, tests étanchéité. Processus complet en 9 étapes."
              href="/theorie/entretien/revision-complete"
              duration="2-4 semaines"
              cost="800-2000 CHF"
              features={[
                "Démontage méthodique complet",
                "Nettoyage 3 bains ultrasons",
                "Remplacement joints systématique",
                "Lubrification points critiques",
                "Réglage 5 positions",
                "Test étanchéité certifié"
              ]}
            />

            <ServiceCard
              icon="🔍"
              title="Diagnostic de Pannes"
              description="Identification problèmes courants (magnétisation, arrêt, fuite), outils diagnostic professionnels, tests fonctionnels, réparations délicates par horlogers experts."
              href="/theorie/entretien/diagnostic-pannes"
              duration="Variable"
              cost="150-800 CHF"
              features={[
                "Analyse vibrographe",
                "Test magnétisation",
                "Contrôle amplitude",
                "Vérification étanchéité",
                "Diagnostic visuel loupe",
                "Devis détaillé gratuit"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Fréquence Entretien */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Fréquence d'Entretien Recommandée
          </h2>

          <div className="space-y-6">
            <FrequencyCard
              type="Montre Mécanique (Manuel ou Automatique)"
              frequency="Tous les 5-7 ans"
              reasons={[
                "Lubrifiants sèchent après 5-7 ans",
                "Huiles deviennent acides et corrosives",
                "Pivots s'usent par frottements accrus",
                "Amplitude diminue progressivement"
              ]}
              color="blue"
            />
            <FrequencyCard
              type="Montre à Quartz"
              frequency="Changement pile tous les 2-5 ans"
              reasons={[
                "Pile épuisée : arrêt total",
                "Pas de révision mécanique nécessaire",
                "Contrôle étanchéité recommandé",
                "Durée de vie circuits : 20-30 ans"
              ]}
              color="green"
            />
            <FrequencyCard
              type="Montres de Plongée"
              frequency="Tous les 3-4 ans + Test annuel"
              reasons={[
                "Joints vieillissent rapidement",
                "Étanchéité critique pour sécurité",
                "Test pression annuel obligatoire",
                "Couronne vissée : usure accélérée"
              ]}
              color="purple"
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gradient-to-br from-orange-500 to-red-600 dark:from-orange-600 dark:to-red-700 rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              📚 Continuez Votre Apprentissage
            </h2>
            <p className="text-xl text-orange-50 mb-8">
              Explorez toutes les théories sur l'horlogerie suisse
            </p>
            <a
              href="/theorie"
              className="inline-flex items-center px-8 py-4 bg-white text-orange-600 font-bold rounded-xl hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg"
            >
              Retour à la Théorie
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

// Components
function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
      <div className="text-3xl font-bold mb-1">{number}</div>
      <div className="text-xs font-medium opacity-80">{label}</div>
    </div>
  );
}

function BenefitCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-6 text-center">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">{title}</h3>
      <p className="text-gray-700 dark:text-gray-300 text-sm">{description}</p>
    </div>
  );
}

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  href: string;
  duration: string;
  cost: string;
  features: string[];
}

function ServiceCard({ icon, title, description, href, duration, cost, features }: ServiceCardProps) {
  return (
    <Link href={href}>
      <div className="bg-white dark:bg-neutral-900 border-2 border-gray-200 dark:border-neutral-800 hover:border-orange-500 dark:hover:border-orange-500 rounded-xl p-6 transition-all hover:shadow-xl cursor-pointer h-full">
        <div className="text-5xl mb-4">{icon}</div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">{title}</h3>
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">{description}</p>
        
        <div className="flex gap-4 mb-4">
          <div className="bg-orange-50 dark:bg-orange-900/20 px-3 py-1 rounded-lg text-xs font-semibold text-orange-700 dark:text-orange-300">
            ⏱️ {duration}
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-lg text-xs font-semibold text-green-700 dark:text-green-300">
            💰 {cost}
          </div>
        </div>

        <div className="space-y-2 mb-4">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-start text-xs text-gray-600 dark:text-gray-400">
              <span className="text-orange-600 dark:text-orange-400 mr-2">✓</span>
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-neutral-700">
          <span className="text-sm text-orange-600 dark:text-orange-400 font-semibold">En savoir plus →</span>
        </div>
      </div>
    </Link>
  );
}

interface FrequencyCardProps {
  type: string;
  frequency: string;
  reasons: string[];
  color: 'blue' | 'green' | 'purple';
}

function FrequencyCard({ type, frequency, reasons, color }: FrequencyCardProps) {
  const colors = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    green: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
  };

  return (
    <div className={`border rounded-xl p-6 ${colors[color]}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{type}</h3>
        <span className="bg-white dark:bg-neutral-800 px-3 py-1 rounded-lg text-sm font-bold text-orange-600 dark:text-orange-400">
          {frequency}
        </span>
      </div>
      <ul className="space-y-2">
        {reasons.map((reason, idx) => (
          <li key={idx} className="flex items-start text-sm text-gray-700 dark:text-gray-300">
            <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
            <span>{reason}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
