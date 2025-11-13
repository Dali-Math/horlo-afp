// Collez ici votre contenu HTML nettoyé
export const guideData = {
  title: "Guide Complet des Matériaux en Horlogerie",
  meta: {
    pages: 42,
    readingTime: "25 min",
    level: "Formation Professionnelle"
  },
  chapters: [
    {
      id: "sommaire",
      title: "Sommaire Interactif",
      icon: "fas fa-list",
      content: `
        <div class="info-card">
          <h4>🎯 Guide professionnel</h4>
          <p>Ce document couvre tous les métaux et alliages utilisés en horlogerie suisse...</p>
        </div>
        <ul class="sommaire-liste">
          <li><a href="#generalites">📖 Généralités sur les métaux</a></li>
          <li><a href="#materiaux-ferreux">🔩 Métaux ferreux</a></li>
          <li><a href="#acier">⚙️ Classification des aciers</a></li>
          <li><a href="#siderurgie">🔥 Du minerai à l'acier</a></li>
          <li><a href="#comparatif">📊 Applications en horlogerie</a></li>
        </ul>
      `
    },
    {
      id: "generalites",
      title: "Généralités sur les Métaux",
      icon: "fas fa-atom",
      content: `
        <p>Les <span class="tooltip" data-tip="Matière élémentaire possédant des propriétés métalliques">métaux</span> peuvent être classés en <strong>trois catégories principales</strong> :</p>
        
        <div class="table-container">
          <table class="materials-table">
            <thead><tr><th>Métaux ferreux</th><th>Métaux non ferreux</th><th>Métaux précieux</th></tr></thead>
            <tbody>
              <tr><td>Le fer (Fe)</td><td>Le cuivre (Cu)</td><td>L'or (Au)</td></tr>
              <tr><td>L'acier (Ac)</td><td>L'aluminium (Al)</td><td>L'argent (Ag)</td></tr>
            </tbody>
          </table>
        </div>

        <div class="info-card">
          <h4>💡 Définition : Alliage métallique</h4>
          <p>Matériau composé de <strong>deux ou plusieurs éléments</strong>, dont au moins un métal...</p>
        </div>

        <h3>Exemples d'alliages courants :</h3>
        <ul class="alloys-list">
          <li><strong>Fer + Carbone</strong> → Acier et Fonte</li>
          <li><strong>Cuivre + Zinc + Plomb</strong> → Laiton horloger</li>
        </ul>
      `
    },
    // Ajoutez tous vos chapitres ici...
  ]
};
