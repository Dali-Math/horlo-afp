import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  fr: {
    escapement: {
      back: 'Retour à la théorie',
      expertModeOn: 'Mode Expert',
      expertModeOff: 'Mode Expert',
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
      // ... (toutes les autres clés de traduction)
    }
  },
  en: { /* ... */ },
  de: { /* ... */ },
  ja: { /* ... */ }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'fr',
  ns: ['escapement'],
  defaultNS: 'escapement',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
