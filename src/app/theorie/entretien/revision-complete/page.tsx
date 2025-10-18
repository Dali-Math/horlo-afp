// app/[locale]/theorie/entretien/revision-complete/page.tsx

import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Révision Complète d'une Montre Mécanique | HorloLearn",
  description: "Découvrez les 9 étapes d'une révision complète : démontage, nettoyage ultrasons, épilamage, lubrification, réglage chronométrique, tests étanchéité.",
  keywords: "révision montre, démontage, nettoyage ultrasons, épilamage, lubrification, réglage, étanchéité, horloger professionnel",
};

export default function RevisionCompletePage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-neutral-950">
      {/* Header */}
      <div className="bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-800">
        <div className="container mx-auto px-4 py-6 max-w-6xl">
          <a
            href="/theorie/entretien"
            className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group"
          >
            <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour Entretien & Maintenance
          </a>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-12 md:py-16 max-w-6xl">
          <div className="mb-6">
            <span className="inline-block bg-white text-blue-900 text-sm font-medium px-4 py-1.5 rounded-full">
              Service Professionnel
            </span>
          </div>

          <div className="flex items-start gap-4 mb-6">
            <div className="text-6xl">🔧</div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                La Révision Complète
              </h1>
              <p className="text-xl text-blue-100 mt-2 italic">
                9 étapes pour restaurer la précision de votre montre
              </p>
            </div>
          </div>

          <p className="text-lg md:text-xl text-blue-50 leading-relaxed max-w-4xl mb-8">
            Une révision complète démonte entièrement votre montre, nettoie chaque composant aux ultrasons, remplace les pièces usées, lubrifie précisément et règle la chronométrie. Processus minutieux de 2-4 semaines réalisé par horlogers experts.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard number="9" label="Étapes majeures" />
            <StatCard number="200+" label="Pièces démontées" />
            <StatCard number="3" label="Bains nettoyage" />
            <StatCard number="5" label="Positions réglage" />
          </div>
        </div>
      </section>

      {/* Les 9 Étapes */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-12 text-center">
            Les 9 Étapes d'une Révision Complète
          </h2>

          <div className="space-y-8">
            {/* Étape 1 */}
            <StepCard
              number="1"
              title="Contrôle Initial et Diagnostic"
              duration="30 min"
              description="Réception de la montre, identification modèle, tests fonctionnels complets"
              details={[
                "Enregistrement et identification (numéro série, référence)",
                "Contrôle visuel : rayures, chocs, état général",
                "Tests mécaniques : remontage, mise à l'heure, passage date",
                "Vérification complications (chronographe, quantième, phases lune)",
                "Test chronométrie initial sur vibrographe",
                "Test étanchéité préliminaire",
                "Établissement devis détaillé selon état constaté",
                "Photos avant intervention (preuves d'état)"
              ]}
              color="blue"
            />

            {/* Étape 2 */}
            <StepCard
              number="2"
              title="Démontage Méthodique"
              duration="2-3 heures"
              description="Désassemblage complet pièce par pièce avec organisation rigoureuse"
              details={[
                "Retrait bracelet (barrettes ou vis)",
                "Démontage verre et lunette (outils spéciaux)",
                "Extraction mouvement du boîtier",
                "Retrait aiguilles (presse démonte-aiguilles)",
                "Démontage cadran et pieds de cadran",
                "Démontage complications et organes additionnels",
                "Démontage complet rouage : roues, ponts, platine",
                "Organisation pièces dans compartiments (éviter pertes)"
              ]}
              color="purple"
            />

            {/* Étape 3 */}
            <StepCard
              number="3"
              title="Nettoyage aux Ultrasons (3 Bains)"
              duration="30-45 min"
              description="Dégraissage et nettoyage profond par ultrasons haute fréquence"
              details={[
                "Bain 1 : Détergent horloger (dégraissage total)",
                "Bain 2 : Rinçage alcool isopropylique",
                "Bain 3 : Rinçage final eau distillée",
                "Durée : 3-5 minutes par bain selon saleté",
                "Ultrasons : 40 kHz créent cavitation micro-bulles",
                "Paniers treillis métallique pour pièces délicates",
                "Nettoyage manuel rubis et pierres précieuses",
                "Séchage air chaud pulsé (évite oxydation)"
              ]}
              color="cyan"
            />

            {/* Étape 4 */}
            <StepCard
              number="4"
              title="Inspection et Remplacement Pièces"
              duration="1-2 heures"
              description="Contrôle qualité visuel sous loupe, remplacement composants usés"
              details={[
                "Inspection loupe x10 : pivots, dents, rubis",
                "Remplacement pivots usés (jeu excessif détecté)",
                "Changement dents cassées ou usées sur roues",
                "Remplacement spiraux oxydés ou déformés",
                "Rubis fendus : changement obligatoire",
                "Joints d'étanchéité : remplacement systématique",
                "Ressort moteur : test tension, changement si fatigué",
                "Pièces détachées d'origine manufacturier"
              ]}
              color="orange"
            />

            {/* Étape 5 */}
            <StepCard
              number="5"
              title="Épilamage"
              duration="20-30 min"
              description="Traitement surfaces pour contrôle précis de l'étalement des huiles"
              details={[
                "Définition : traitement anti-capillarité",
                "Lotion Epilame appliquée sur pivots, palettes, ancre",
                "Empêche huile de couler et s'étaler anarchiquement",
                "Séchage à l'air chaud (température contrôlée)",
                "Essentiel pour lubrification précise et durable",
                "Procédé réservé haute horlogerie (standard chez professionnels)",
                "Surfaces traitées : rubis, pivots, échappement",
                "Durée protection : correspond à durée huile (5-7 ans)"
              ]}
              color="green"
            />

            {/* Étape 6 */}
            <StepCard
              number="6"
              title="Remontage et Lubrification"
              duration="3-4 heures"
              description="Assemblage précis avec lubrification micrométrique des points critiques"
              details={[
                "Remontage dans l'ordre inverse du démontage",
                "Lubrifiants spécifiques selon fonction :",
                "• Huile 9010 : échappement, palettes ancre",
                "• Graisse 9415 : barillet, ressort moteur",
                "• Huile 9020 : rouage, engrenages train",
                "• Moebius D5 : haute fréquence 36'000 alt/h",
                "Quantités infimes : 1/100e de goutte par point",
                "Outils : oilers (applicateurs précision micrométrique)"
              ]}
              color="red"
            />

            {/* Étape 7 */}
            <StepCard
              number="7"
              title="Réglage Chronométrique (5 Positions)"
              duration="1-2 jours"
              description="Ajustement précision sur 5 positions avec vibrographe électronique"
              details={[
                "Position 1 : Cadran en haut (CH)",
                "Position 2 : Cadran en bas (CB)",
                "Position 3 : Couronne en haut (3h)",
                "Position 4 : Couronne en bas (9h)",
                "Position 5 : Couronne à gauche (6h)",
                "Vibrographe mesure : amplitude, avance/retard, battement",
                "Ajustements raquette (modification longueur active spiral)",
                "Objectif final : ±5 secondes/jour maximum",
                "Cyclotest 5 jours avec relevés quotidiens précis"
              ]}
              color="indigo"
            />

            {/* Étape 8 */}
            <StepCard
              number="8"
              title="Tests d'Étanchéité"
              duration="30 min"
              description="Vérification hermétisme et certification étanchéité selon norme ATM"
              details={[
                "Test 1 : Pression à sec (sans eau, détection fuite air)",
                "Test 2 : Immersion eau 30°C (simulation usage réel)",
                "Test 3 : Surpression (dépassement 10% norme constructeur)",
                "Détection condensation sous verre (signe infiltration)",
                "Remplacement joints si moindre fuite détectée",
                "Graisse silicone sur couronne et fond vissé",
                "Certification étanchéité selon ATM annoncée (3/5/10/20/30 ATM)",
                "Rapport test consigné dans dossier montre"
              ]}
              color="teal"
            />

            {/* Étape 9 */}
            <StepCard
              number="9"
              title="Emboîtage, Finitions et Contrôle Final"
              duration="1-2 heures"
              description="Assemblage final, polissage optionnel, vérifications esthétique et mécanique"
              details={[
                "Pose cadran avec précautions anti-rayures",
                "Aiguillage (presse chasse-aiguilles, outils spéciaux)",
                "Installation mouvement dans boîtier (fixation/coincement)",
                "Fixation fond vissé ou clipsé (couple serrage contrôlé)",
                "Polissage boîtier/bracelet (optionnel, selon état)",
                "Contrôle esthétique final : poussières, traces doigts",
                "Vérification toutes fonctions : heure, date, complications",
                "Remise certificat révision + garantie 12-24 mois"
              ]}
              color="pink"
            />
          </div>
        </div>
      </section>

      {/* Coûts */}
      <section className="bg-white dark:bg-neutral-900 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Coûts d'une Révision Complète
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <PriceCard
              type="Montre Simple"
              price="500-800 CHF"
              description="3 aiguilles, date simple, mouvement ETA standard"
              includes={["Démontage complet", "Nettoyage ultrasons", "Lubrification", "Réglage 5 positions"]}
            />
            <PriceCard
              type="Chronographe"
              price="1000-1500 CHF"
              description="Complication chronographe, roue à colonnes, plus de pièces"
              includes={["Révision base + chrono", "Démontage mécanisme additionnel", "Réglage poussoirs", "Test fonctions timing"]}
            />
            <PriceCard
              type="Grande Complication"
              price="2000-5000+ CHF"
              description="Quantième perpétuel, répétition, tourbillon"
              includes={["Expertise haute horlogerie", "Pièces détachées rares", "Temps main-d'œuvre élevé", "Horloger spécialisé"]}
            />
          </div>

          <div className="mt-8 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-l-4 border-yellow-500 rounded-xl p-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <span className="font-semibold">💡 Conseil :</span> Demandez toujours un devis détaillé AVANT intervention. Les prix varient selon marque, modèle, état et complications. Une révision chez le manufacturier (Rolex, Patek) coûte 30-50% plus cher qu'un horloger indépendant qualifié.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              🔍 Diagnostic de Pannes
            </h2>
            <p className="text-xl text-blue-50 mb-8">
              Découvrez comment identifier et réparer les problèmes courants
            </p>
            <a
              href="/theorie/entretien/diagnostic-pannes"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg"
            >
              Diagnostic de Pannes
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

// ==========================================
// COMPONENTS
// ==========================================

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
      <div className="text-3xl font-bold mb-1">{number}</div>
      <div className="text-xs font-medium opacity-80">{label}</div>
    </div>
  );
}

interface StepCardProps {
  number: string;
  title: string;
  duration: string;
  description: string;
  details: string[];
  color: string;
}

function StepCard({ number, title, duration, description, details, color }: StepCardProps) {
  const colorClasses = {
    blue: 'border-blue-500',
    purple: 'border-purple-500',
    cyan: 'border-cyan-500',
    orange: 'border-orange-500',
    green: 'border-green-500',
    red: 'border-red-500',
    indigo: 'border-indigo-500',
    teal: 'border-teal-500',
    pink: 'border-pink-500',
  };

  return (
    <div className={`bg-white dark:bg-neutral-900 border-l-4 ${colorClasses[color as keyof typeof colorClasses]} border border-gray-200 dark:border-neutral-800 rounded-xl p-6 shadow-lg`}>
      <div className="flex items-start gap-4 mb-4">
        <div className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
          {number}
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">⏱️ {duration}</p>
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">{description}</p>
        </div>
      </div>
      
      <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
        {details.map((detail, idx) => (
          <li key={idx} className="flex items-start">
            <span className="text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0">•</span>
            <span>{detail}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface PriceCardProps {
  type: string;
  price: string;
  description: string;
  includes: string[];
}

function PriceCard({ type, price, description, includes }: PriceCardProps) {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{type}</h3>
      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-3">{price}</div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{description}</p>
      <div className="space-y-2">
        {includes.map((item, idx) => (
          <div key={idx} className="flex items-start text-xs text-gray-700 dark:text-gray-300">
            <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
