import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  fr: {
    escapement: {
      back: 'Retour à la théorie',
      expertModeOn: 'Mode Expert ON',
      expertModeOff: 'Mode Expert OFF',
      metadata: {
        category: 'Organe de distribution',
        readingTime: 'Temps de lecture',
        difficulty: 'Niveau',
        lastUpdated: 'Dernière mise à jour',
      },
      title: "L'Échappement à Ancre Suisse",
      subtitle: "Le cœur battant de la montre : découvrez le mécanisme qui transforme l'énergie en impulsions régulières",
      tableOfContents: 'Table des matières',
      share: 'Partager',
      print: 'Imprimer',
      downloadPDF: 'Télécharger PDF',
      footer: {
        version: 'v1.0.0',
        author: 'Horology Reference',
        license: 'CC BY-NC-SA 4.0',
        cite: 'Citer cette page',
        exportBibtex: 'Exporter BibTeX',
      },
      principle: {
        title: 'Principe et fonction',
        beginner: "L'échappement transforme l'énergie continue du barillet en impulsions régulières. Il remplit une double fonction : entretien des oscillations et comptage du temps.",
        expert: "L'échappement à ancre suisse convertit le couple continu du barillet (E = ½Cθ²) en impulsions discrètes. Son rendement énergétique est de 35-40%, avec une dissipation thermique de ~0.1μW par alternance.",
        function1: {
          title: 'Entretien',
          description: 'Transmet des impulsions au balancier pour compenser les pertes par frottement.'
        },
        function2: {
          title: 'Comptage',
          description: 'Compte les oscillations en laissant échapper les dents de la roue.'
        },
        funFact: {
          title: '💓 Le "tic-tac" de la montre',
          description: 'Chaque tic et tac correspond à une impulsion. À 28\'800 A/h, vous entendez 8 battements par seconde !',
          frequency: 'Fréquence',
          beats: 'Battements/s',
          hertz: 'Fréquence',
          period: 'Période'
        }
      },
      elements: {
        title: 'Les 3 éléments',
        beginner: 'Trois pièces principales travaillent en synchronisation parfaite.',
        expert: 'Système à 3 corps : roue dentée (inertie 2.5×10⁻⁹ kg·m²), ancre (inertie 1.8×10⁻¹⁰ kg·m²) et plateau (inertie 3.2×10⁻⁹ kg·m²).',
        wheel: {
          title: 'La Roue d\'Échappement',
          beginner: 'Roue dentée spéciale qui transmet l\'énergie du rouage à l\'ancre.',
          expert: 'Roue à 15 dents avec profil cycloïdal. Module 0.3mm, pas diamétral 0.942mm. Matériau : Acier C90 (1.0205) trempé à 800°C.',
          specs: {
            teeth: 'Dents',
            material: 'Matériau',
            speed: 'Vitesse',
            iso: 'Norme'
          }
        },
        anchor: {
          title: 'L\'Ancre',
          beginner: 'Pièce pivotante avec deux palettes en rubis qui bloquent/libèrent la roue.',
          expert: 'Ancre à fourchette avec 2 palettes en corindon (Al₂O₃). Angle de bascule : 12-15°. Moment d\'inertie : 1.8×10⁻¹⁰ kg·m².',
          specs: {
            pallets: 'Palettes',
            function: 'Fonction',
            material: 'Matériau'
          }
        },
        balance: {
          title: 'Le Plateau de Balancier',
          beginner: 'Disque avec cheville qui pousse la fourchette à chaque oscillation.',
          expert: 'Plateau avec cheville en rubis (Ø 0.15mm) et encoche de sécurité à 90°. Fixation par sertissage.',
          specs: {
            pivot: 'Cheville',
            safety: 'Sécurité',
            frequency: 'Fréquence'
          }
        }
      },
      operation: {
        title: 'Fonctionnement en 4 phases',
        beginner: 'Chaque alternance du balancier déclenche un cycle complet de 4 phases.',
        expert: 'Cycle thermodynamique : repos (isochore), dégagement (adiabatic), impulsion (isobare), chute (adiabatic). Rendement : 38% typique.',
        phases: {
          title: 'Le cycle se déroule en 4 phases :'
        },
        phase1: {
          title: 'Repos',
          desc: 'Une palette bloque la roue. Le tirage maintient l\'ancre en position.',
          expert: 'Énergie potentielle stockée. Force de contact : 0.02N. Pression de contact : 200MPa.'
        },
        phase2: {
          title: 'Dégagement (Comptage)',
          desc: 'La cheville pousse la fourchette, libérant une dent de la roue.',
          expert: 'Travail de dégagement : W = F·d = 0.02N × 0.1mm = 2μJ. Accélération angulaire : 150 rad/s².'
        },
        phase3: {
          title: 'Impulsion',
          desc: 'La dent pousse sur la palette, transmettant de l\'énergie au balancier.',
          expert: 'Impulsion de 0.5μJ durant 2ms. Couple moyen : 0.3μN·m. Variation de vitesse : +0.8 rad/s.'
        },
        phase4: {
          title: 'Chute',
          desc: 'L\'ancre bascule, la palette opposée bloque la dent suivante.',
          expert: 'Perte d\'énergie par choc : 0.1μJ. Amortissement critique : ζ = 0.02.'
        },
        data: {
          title: '⚡ Données chiffrées',
          alternation: 'Durée d\'une alternance',
          impulseAngle: 'Angle d\'impulsion',
          freeArc: 'Arc supplémentaire',
          totalAmplitude: 'Amplitude totale',
          seconds: 's'
        }
      },
      evolution: {
        title: 'Évolution et types',
        beginner: 'Découvrez les différents types d\'échappements et leur histoire.',
        expert: 'Analyse comparative des échappements : levier suisse (rendement 38%), co-axial (rendement 45%), détente (rendement 48%).',
        timeline: {
          title: 'Évolution historique',
          verge: 'Échappement à verge (1ère échappement mécanique)',
          cylinder: 'Échappement cylindre (Abraham-Louis Breguet)',
          swissLever: 'Échappement à ancre suisse (invention moderne)',
          quartz: 'Révolution quartz (précision ±0.1s/j)',
          coaxial: 'Échappement co-axial (George Daniels/Omega)',
          silicon: 'Échappement en silicium (anticorrosion, pas de lubrification)'
        }
      },
      quiz: {
        title: 'Quiz : Testez vos connaissances',
        beginner: 'Cinq questions pour valider votre compréhension.',
        expert: 'Quiz technique avec calculs et normes ISO.',
        progress: 'Question {{current}} sur {{total}}',
        score: 'Score : {{score}}/{{total}}',
        time: 'Temps',
        results: {
          title: 'Quiz terminé !',
          score: 'Vous avez obtenu {{score}} sur {{total}} ({{percentage}}%)',
          time: 'Temps : {{seconds}} secondes',
          retry: 'Recommencer',
          share: 'Partager',
          excellent: 'Excellent ! Vous maîtrisez parfaitement le sujet.',
          good: 'Très bien ! Quelques détails à peaufiner.',
          average: 'Bon résultat. Relisez les sections difficiles.',
          improve: 'Continuez à vous entraîner. Vous progresserez !'
        }
      },
      resources: {
        title: 'Ressources et références',
        books: {
          title: 'Ouvrages de référence'
        },
        standards: {
          title: 'Normes techniques',
          iso3159: 'Chronomètres de montre-bracelet',
          nihs: 'Échappements à ancre'
        },
        download: {
          technical: 'Fiche technique (PDF)',
          diagrams: 'Diagrammes CAO (DXF)',
          iso: 'Normes ISO (ZIP)'
        }
      }
    }
  }
};

export default i18n;
