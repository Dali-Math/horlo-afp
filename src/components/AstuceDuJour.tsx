'use client';

import { Lightbulb, Calendar } from 'lucide-react';

const astuces = [
  {
    titre: "Éviter de perdre les petites vis",
    contenu: "Placez un aimant sous votre tapis de travail. Les vis microscopiques tomberont dessus au lieu de se perdre dans les rainures.",
    categorie: "Atelier"
  },
  {
    titre: "Graisser le barillet, jamais l'ancre",
    contenu: "Le barillet nécessite une lubrification pour son frottement continu. L'ancre, elle, doit rester sèche pour assurer un échappement précis.",
    categorie: "Technique"
  },
  {
    titre: "Tester la réserve de marche",
    contenu: "Remontez complètement, notez l'heure. Laissez tourner sans toucher. Comptez les heures jusqu'à l'arrêt = réserve de marche réelle.",
    categorie: "Diagnostic"
  },
  {
    titre: "Repérer une ancre déformée",
    contenu: "Observez l'amplitude du balancier. Si elle est asymétrique (plus grande d'un côté), l'ancre peut être tordue ou mal ajustée.",
    categorie: "Diagnostic"
  },
  {
    titre: "Nettoyer sans produit chimique",
    contenu: "Pour un nettoyage d'urgence sans machine à ultrasons : essence de térébenthine + brosse souple. Rincer à l'alcool isopropylique.",
    categorie: "Atelier"
  },
  {
    titre: "Lire un plan d'éclaté",
    contenu: "Commencez toujours par identifier le barillet (pièce 1), puis suivez le train de rouages dans l'ordre numérique croissant.",
    categorie: "Théorie"
  },
  {
    titre: "Régler la raquette avec précision",
    contenu: "Déplacez par micro-incréments (0.5mm max). Testez 24h en position cadran dessus avant d'ajuster à nouveau.",
    categorie: "Réglage"
  }
];

export default function AstuceDuJour() {
  // Astuce change chaque jour
  const jourDeLAnnee = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const astuceDuJour = astuces[jourDeLAnnee % astuces.length];

  return (
    <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-6 shadow-xl text-white mb-8">
      <div className="flex items-center gap-3 mb-4">
        <Lightbulb className="w-8 h-8" />
        <div>
          <h3 className="text-2xl font-bold">💡 Astuce du Jour</h3>
          <p className="text-sm text-yellow-100 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>
      </div>
      <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-bold text-lg">{astuceDuJour.titre}</h4>
          <span className="text-xs px-3 py-1 bg-white/20 rounded-full">{astuceDuJour.categorie}</span>
        </div>
        <p className="text-yellow-50">{astuceDuJour.contenu}</p>
      </div>
    </div>
  );
}
