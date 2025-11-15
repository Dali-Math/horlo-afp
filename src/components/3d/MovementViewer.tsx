// Structure de données enrichie (à stocker en CMS headless : Sanity/Strapi)
const conceptSchema = {
  id: "platine-ponts",
  metadata: {
    lastUpdated: "2025-01-16T14:30:00Z",
    author: "Dr. Michel Vouillamoz",
    reviewers: ["réviseur_certifié_1", "réviseur_certifié_2"],
    certification: "COSC_TECH_DOC_2025",
    languages: ["fr", "en", "de", "ja", "zh"]
  },
  content: {
    summary: "...", // Pour rich snippets
    technical: { /* données structurées */ },
    historical: { /* timeline interactive */ },
    applications: [ /* cas d'usages manufactures */ ],
    references: [ /* normes ISO, brevets */ ]
  },
  media: {
    3dModel: "https://cdn.horlolearn.ch/models/caliber_3200.glb",
    explodedView: "https://cdn.horlolearn.ch/animations/platine_exploded.webm",
    micrographs: [ /* images microscopy */ ],
    sound: "https://cdn.horlolearn.ch/sounds/bridge_tap.mp3"
  },
  quizzes: [ /* Quiz adaptatif avec rétroaction IA */ ],
  certifications: { /* Badges after completion */ }
}
