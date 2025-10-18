// app/[locale]/theorie/entretien/diagnostic-pannes/page.tsx

import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diagnostic de Pannes Horlogères | HorloLearn",
  description: "Identifiez et réparez les problèmes courants : magnétisation, arrêt, fuite, avance/retard. Outils professionnels et solutions pratiques.",
  keywords: "diagnostic pannes, magnétisation, démagnétiseur, vibrographe, réparation montre, problèmes horlogers, tests fonctionnels",
};

export default function DiagnosticPannesPage() {
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
      <section className="bg-gradient-to-br from-red-600 via-orange-600 to-amber-600 text-white">
        <div className="container mx-auto px-4 py-12 md:py-16 max-w-6xl">
          <div className="mb-6">
            <span className="inline-block bg-white text-red-900 text-sm font-medium px-4 py-1.5 rounded-full">
              Dépannage Expert
            </span>
          </div>

          <div className="flex items-start gap-4 mb-6">
            <div className="text-6xl">🔍</div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Diagnostic de Pannes
              </h1>
              <p className="text-xl text-orange-100 mt-2 italic">
                Identifier et résoudre les problèmes courants
              </p>
            </div>
          </div>

          <p className="text-lg md:text-xl text-orange-50 leading-relaxed max-w-4xl">
            Magnétisation, arrêt total, fuite d'eau, avance/retard : découvrez comment diagnostiquer les pannes courantes avec des outils professionnels et effectuer des réparations précises.
          </p>
        </div>
      </section>

      {/* Problèmes Courants */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-12 text-center">
            Problèmes Courants et Solutions
          </h2>

          <div className="space-y-6">
            <ProblemCard
              icon="🧲"
              title="Magnétisation du Spiral"
              symptoms={["Avance importante : +30 sec à plusieurs minutes/jour", "Variation brutale de marche", "Montre collée près d'un aimant ou smartphone"]}
              cause="Champs magnétiques (enceintes, aimants, chargeurs sans fil) magnétisent le spiral en acier. Les spires se collent, raccourcissant la longueur active."
              solution="Démagnétisation avec appareil spécialisé. Placez la montre sur le démagnétiseur, activez 2-3 secondes. Contrôle vibrographe après intervention."
              prevention="Éloigner montres des aimants, smartphones, ordinateurs. Préférer spiraux silicium (antimagnétiques)."
              color="red"
            />

            <ProblemCard
              icon="⏹️"
              title="Arrêt Total"
              symptoms={["Montre ne démarre plus malgré remontage", "Remontage très dur puis blocage", "Tic-tac absent même après secousses"]}
              cause="Ressort moteur cassé (remontage excessif), huile séchée après 10+ ans sans révision, ou choc violent (pivot cassé, spiral déformé)."
              solution="Ouverture mouvement, diagnostic visuel. Remplacement ressort si cassé. Révision complète si huiles sèches. Réparation pivot si choc."
              prevention="Révision tous les 5-7 ans obligatoire. Ne jamais forcer le remontage. Protection contre chocs violents."
              color="orange"
            />

            <ProblemCard
              icon="📅"
              title="Date Ne Change Pas"
              symptoms={["Date bloquée sur un jour", "Changement incomplet (entre deux chiffres)", "Claquement entendu mais pas de changement"]}
              cause="Came de quantième grippée (huile sèche), ressort sautoir cassé, ou correction forcée en zone interdite (22h-2h) : dents cassées."
              solution="Démontage mécanisme quantième. Nettoyage came et lubrification. Remplacement ressort sautoir si cassé. Réparation dents si correction forcée."
              prevention="Ne JAMAIS corriger date entre 22h et 2h. Révision régulière pour lubrification quantième."
              color="blue"
            />

            <ProblemCard
              icon="💧"
              title="Fuite d'Eau / Buée"
              symptoms={["Buée sous verre", "Gouttelettes d'eau visibles", "Cadran oxydé ou taches brunes", "Aiguilles rouillées"]}
              cause="Joints vieillis (après 5+ ans), couronne mal vissée, verre fissuré invisible à l'œil nu, ou test étanchéité non fait après révision."
              solution="Démontage immédiat. Séchage four 50°C 24h. Remplacement tous joints (couronne, fond, verre). Test étanchéité obligatoire."
              prevention="Visser couronne après chaque utilisation. Test étanchéité annuel pour plongée. Changer joints tous les 5 ans."
              color="cyan"
            />
          </div>
        </div>
      </section>

      {/* Outils Diagnostic */}
      <section className="bg-white dark:bg-neutral-900 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Outils de Diagnostic Professionnels
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ToolCard
              name="Vibrographe"
              icon="📊"
              description="Appareil électronique analysant le battement sonore. Mesure amplitude (250-300°), avance/retard, et détecte défauts mécaniques."
              price="1'500-5'000 CHF"
              brands="Witschi, Timegrapher"
            />
            <ToolCard
              name="Démagnétiseur"
              icon="🧲"
              description="Génère champ magnétique intense décroissant pour éliminer magnétisation spiral. Indispensable atelier moderne."
              price="50-200 CHF"
              brands="Horotec, Bergeon"
            />
            <ToolCard
              name="Loupe Horlogère"
              icon="🔍"
              description="Grossissement x2.5 à x10 pour inspection visuelle. Détecte rayures, cassures, usure pivots, dents cassées."
              price="20-150 CHF"
              brands="Zeiss, Bergeon, Eschenbach"
            />
            <ToolCard
              name="Tournevis Horlogers"
              icon="🔧"
              description="Jeu lames trempées anti-glisse 0.60 à 3.00mm. Bergeon Swiss Made référence mondiale. Essentiel démontage."
              price="150-500 CHF (set)"
              brands="Bergeon, Horotec"
            />
          </div>
        </div>
      </section>

      {/* Tests Fonctionnels */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Tests Fonctionnels
          </h2>

          <div className="space-y-6">
            <TestCard
              title="Test Amplitude"
              description="Mesure l'angle de rotation du balancier. Indicateur santé mouvement."
              procedure={[
                "Poser montre à plat sur vibrographe",
                "Lecture amplitude : 270-290° = excellent",
                "Couronne en haut : 240-260° = bon",
                "Écart <30° entre positions = état correct",
                "Si <220° : révision nécessaire (huile sèche)"
              ]}
            />
            <TestCard
              title="Test Réserve de Marche"
              description="Vérifie durée autonomie après remontage complet."
              procedure={[
                "Remontage manuel complet (jusqu'à résistance)",
                "Noter heure exacte de démarrage",
                "Laisser montre fonctionner sans toucher",
                "Chronométrer jusqu'à arrêt total",
                "Comparer avec spec fabricant (généralement 38-72h)"
              ]}
            />
            <TestCard
              title="Test Étanchéité"
              description="Contrôle hermétisme boîtier avant immersion."
              procedure={[
                "Placer montre en chambre vide d'air",
                "Créer dépression (pompe à vide)",
                "Observer condensation sous verre = fuite détectée",
                "Test immersion si pas de fuite détectée",
                "Obligatoire après toute ouverture boîtier"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Réparations Délicates */}
      <section className="bg-white dark:bg-neutral-900 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Réparations Délicates (Experts Uniquement)
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <RepairCard
              title="Remplacement Spiral"
              difficulty="Très difficile"
              duration="4-6 heures"
              steps={[
                "Démontage balancier complet",
                "Retrait ancien spiral déformé",
                "Centrage nouveau spiral sur plateau",
                "Ajustement spires (concentricité parfaite)",
                "Fixation virole et piton",
                "Contrôle amplitude après remontage"
              ]}
            />
            <RepairCard
              title="Rectification Dents Roues"
              difficulty="Difficile"
              duration="2-3 heures"
              steps={[
                "Limage manuel micrométrique",
                "Polissage profil dents (lime diamant)",
                "Vérification engrenage sous loupe x10",
                "Test rotation libre sans point dur",
                "Contrôle jeu entre roues",
                "Lubrification légère après rectification"
              ]}
            />
            <RepairCard
              title="Restauration Cadran"
              difficulty="Extrême"
              duration="Plusieurs jours"
              steps={[
                "Nettoyage cadran (solution spéciale)",
                "Refection laque (peinture horlogère)",
                "Pose index refaits (guillochage)",
                "Sérigraphie marques si nécessaire",
                "Séchage four basse température",
                "Très rare : artisans spécialisés uniquement"
              ]}
            />
          </div>

          <div className="mt-8 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-l-4 border-red-500 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Attention Réparations Amateurs</h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Les réparations listées ci-dessus nécessitent formation professionnelle et outillage spécialisé. Une intervention amateur peut causer dommages irréversibles : pivots cassés, spiral déformé, rayures cadran. <span className="font-semibold">Confiez toujours votre montre à un horloger qualifié</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Final */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gradient-to-br from-orange-500 to-red-600 dark:from-orange-600 dark:to-red-700 rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              🎓 Vous Avez Terminé HorloLearn !
            </h2>
            <p className="text-xl text-orange-50 mb-8">
              Félicitations ! Vous maîtrisez maintenant les fondamentaux de l'horlogerie suisse
            </p>
            <a
              href="/theorie"
              className="inline-flex items-center px-8 py-4 bg-white text-orange-600 font-bold rounded-xl hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg"
            >
              Retour à l'Accueil Théorie
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

// Components simplifiés (ProblemCard, ToolCard, TestCard, RepairCard)
