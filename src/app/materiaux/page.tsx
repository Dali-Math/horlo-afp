<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Matériaux d'Exception - HorloLearn</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
      background: linear-gradient(135deg, #f8fafc 0%, #fef3c7 50%, #f8fafc 100%);
      min-height: 100vh;
      color: #1e293b;
    }

    .header {
      position: sticky;
      top: 0;
      z-index: 30;
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(12px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      transition: all 0.3s;
    }

    .header.scrolled {
      background: rgba(255, 255, 255, 0.95);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    }

    .header-content {
      max-width: 1280px;
      margin: 0 auto;
      padding: 1rem 1.5rem;
    }

    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: #475569;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s;
    }

    .back-link:hover {
      color: #f59e0b;
    }

    .container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 4rem 1.5rem;
    }

    h1 {
      font-size: 3.5rem;
      font-weight: 900;
      text-align: center;
      margin-bottom: 3rem;
      background: linear-gradient(to right, #d97706, #eab308, #d97706);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .filters {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 3rem;
      flex-wrap: wrap;
    }

    .filter-btn {
      padding: 0.75rem 1.5rem;
      border-radius: 1rem;
      font-weight: 600;
      font-size: 0.875rem;
      border: 2px solid #e2e8f0;
      background: white;
      color: #475569;
      cursor: pointer;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .filter-btn:hover {
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
    }

    .filter-btn.active {
      background: linear-gradient(to right, #f59e0b, #eab308);
      color: white;
      border-color: transparent;
      box-shadow: 0 8px 20px rgba(245, 158, 11, 0.3);
      transform: scale(1.05);
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 2rem;
      margin-bottom: 4rem;
    }

    .card {
      background: white;
      border-radius: 1.5rem;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      transition: all 0.5s;
      border: 1px solid #e2e8f0;
      display: flex;
      flex-direction: column;
      opacity: 0;
      transform: translateY(30px);
      animation: fadeInUp 0.6s forwards;
    }

    @keyframes fadeInUp {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .card:hover {
      box-shadow: 0 20px 40px rgba(245, 158, 11, 0.15);
      transform: translateY(-8px);
    }

    .card-image {
      position: relative;
      width: 100%;
      height: 220px;
      overflow: hidden;
      cursor: pointer;
      background: #f1f5f9;
    }

    .card-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.7s;
    }

    .card:hover .card-image img {
      transform: scale(1.1) rotate(1deg);
    }

    .card-content {
      padding: 1.5rem;
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .card-header {
      display: flex;
      align-items: start;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .card-icon {
      padding: 0.875rem;
      border-radius: 1rem;
      font-size: 1.5rem;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      flex-shrink: 0;
    }

    .card-title {
      flex: 1;
    }

    .card-title h2 {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: #0f172a;
    }

    .card-title .divider {
      height: 3px;
      width: 4rem;
      background: linear-gradient(to right, #f59e0b, #eab308);
      border-radius: 9999px;
    }

    .card-description {
      color: #475569;
      line-height: 1.6;
      margin-bottom: 1.5rem;
      flex: 1;
    }

    .card-footer {
      padding-top: 1rem;
      border-top: 1px solid #e2e8f0;
    }

    .card-footer-title {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #64748b;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .use-cases {
      list-style: none;
    }

    .use-cases li {
      display: flex;
      align-items: start;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
      font-size: 0.875rem;
      color: #334155;
    }

    .use-cases li::before {
      content: '▸';
      color: #f59e0b;
      font-weight: bold;
      margin-top: 0.125rem;
    }

    /* Section iframe */
    .iframe-section {
      background: white;
      border-radius: 2rem;
      padding: 2rem;
      margin-top: 4rem;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      border: 3px solid #f59e0b;
    }

    .iframe-section h2 {
      font-size: 2rem;
      font-weight: 800;
      text-align: center;
      margin-bottom: 2rem;
      color: #0f172a;
    }

    .iframe-container {
      position: relative;
      width: 100%;
      height: 800px;
      border-radius: 1rem;
      overflow: hidden;
      box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.1);
    }

    .iframe-container iframe {
      width: 100%;
      height: 100%;
      border: none;
    }

    /* Modal zoom */
    .modal {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 50;
      background: rgba(0, 0, 0, 0.9);
      backdrop-filter: blur(20px);
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .modal.active {
      display: flex;
    }

    .modal img {
      max-height: 90vh;
      max-width: 90vw;
      border-radius: 1.5rem;
      box-shadow: 0 20px 60px rgba(245, 158, 11, 0.3);
      border: 4px solid rgba(245, 158, 11, 0.3);
    }

    @media (max-width: 768px) {
      h1 {
        font-size: 2.5rem;
      }

      .grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      .iframe-container {
        height: 600px;
      }
    }
  </style>
</head>
<body>
  <header class="header" id="header">
    <div class="header-content">
      <a href="/theorie" class="back-link">
        ← Retour à la théorie
      </a>
    </div>
  </header>

  <main class="container">
    <h1>Matériaux d'Exception</h1>

    <div class="filters" id="filters"></div>

    <section class="grid" id="grid"></section>

    <!-- Section iframe encadrée -->
    <section class="iframe-section">
      <h2>📚 Explorer les Matériaux Horlogers</h2>
      <div class="iframe-container">
        <iframe 
          src="https://www.horlolearn.ch/materiaux-horlogers-suisse.html#hero"
          title="Matériaux Horlogers Suisse"
          loading="lazy"
          allowfullscreen>
        </iframe>
      </div>
    </section>
  </main>

  <div class="modal" id="modal">
    <img id="modalImg" src="" alt="">
  </div>

  <script>
    const MATERIALS = [
      {
        icon: '⬜',
        title: 'Acier inoxydable',
        colorClass: 'background: linear-gradient(135deg, #38bdf8, #0284c7)',
        illustration: '/images/materiaux/acier.jpg',
        description: "Le matériau le plus utilisé pour les boîtiers et bracelets modernes. L'acier 316L combine résistance à la corrosion, robustesse et finitions impeccables (polies ou brossées).",
        useCases: ['Boîtiers & bracelets', 'Couronnes vissées', 'Boucles déployantes', 'Masses oscillantes'],
        category: 'Classiques',
      },
      {
        icon: '🟨',
        title: 'Or',
        colorClass: 'background: linear-gradient(135deg, #fbbf24, #d97706)',
        illustration: '/images/materiaux/or.jpg',
        description: "Symbole ultime de luxe en horlogerie. L'or 18K (750/1000), disponible en jaune, rose ou blanc, est prisé pour sa noblesse et son éclat intemporel.",
        useCases: ['Boîtiers de montres de prestige', 'Aiguilles et index', 'Ponts hautement décorés', 'Bracelets de luxe'],
        category: 'Classiques',
      },
      {
        icon: '🥇',
        title: 'Laiton',
        colorClass: 'background: linear-gradient(135deg, #ca8a04, #854d0e)',
        illustration: '/images/materiaux/laiton.jpg',
        description: "Alliage de cuivre et zinc, base de la majorité des platines, ponts et roues. Facile à usiner, il offre une belle teinte jaune dorée souvent protégée par traitement galvanique.",
        useCases: ['Platines & ponts de mouvement', 'Roues de minuterie', 'Ébauches décoratives', 'Compteurs et modules'],
        category: 'Classiques',
      },
      {
        icon: '⚙️',
        title: 'Titane',
        colorClass: 'background: linear-gradient(135deg, #6366f1, #4338ca)',
        illustration: '/images/materiaux/titane.jpg',
        description: "Matériau high-tech ultra-léger (40% plus léger que l'acier), hypoallergénique et non magnétique. Son aspect mat et sa résistance en font un favori des montres sportives et professionnelles.",
        useCases: ['Boîtiers de montres techniques', 'Bracelets légers', 'Vis spéciales', 'Platines allégées'],
        category: 'Innovation',
      },
      {
        icon: '⬛',
        title: 'Céramique',
        colorClass: 'background: linear-gradient(135deg, #52525b, #18181b)',
        illustration: '/images/materiaux/ceramique.jpg',
        description: "Matériau composite extrêmement dur, pratiquement inrayable et résistant à l'usure. Sa finition mate ou brillante apporte un style contemporain et élégant.",
        useCases: ['Lunettes de montre (bezels)', 'Boîtiers haut de gamme', 'Composants décoratifs modernes'],
        category: 'Innovation',
      },
      {
        icon: '🔬',
        title: 'Silicium',
        colorClass: 'background: linear-gradient(135deg, #ec4899, #be185d)',
        illustration: '/images/materiaux/silicium.jpg',
        description: 'Matériau révolutionnaire issu de la microtechnologie. Permet de fabriquer des composants de haute précision, amagnétiques et nécessitant peu ou pas de lubrification.',
        useCases: ['Spiraux de balancier inamagnétiques', 'Ancre en silicium', "Roue d'échappement sans huile"],
        category: 'Innovation',
      },
      {
        icon: '💎',
        title: 'Rubis synthétique',
        colorClass: 'background: linear-gradient(135deg, #f43f5e, #be123c)',
        illustration: '/images/materiaux/rubis.jpg',
        description: "Pierre précieuse synthétique utilisée comme palier antifriction. Les rubis réduisent considérablement l'usure des axes de roues et garantissent une longévité exceptionnelle au mouvement.",
        useCases: ['Pierres de pivot (axes des roues)', 'Contrepoids de balancier', "Roulette d'ancre"],
        category: 'Classiques',
      },
      {
        icon: '🌲',
        title: 'Bois',
        colorClass: 'background: linear-gradient(135deg, #16a34a, #15803d)',
        illustration: '/images/materiaux/bois.jpg',
        description: 'Matériau rare et artisanal, utilisé par quelques créateurs pour des cadrans exclusifs ou des éléments décoratifs. Apporte une touche naturelle et unique à chaque pièce.',
        useCases: ['Cadrans exclusifs', 'Boîtiers ou maillons décoratifs', 'Maquettes pédagogiques'],
        category: 'Décoratif',
      },
    ];

    const CATEGORIES = ['Tous', 'Classiques', 'Innovation', 'Décoratif'];
    let currentFilter = 'Tous';

    // Render filters
    const filtersContainer = document.getElementById('filters');
    CATEGORIES.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = 'filter-btn' + (cat === 'Tous' ? ' active' : '');
      btn.textContent = cat;
      btn.onclick = () => setFilter(cat);
      filtersContainer.appendChild(btn);
    });

    function setFilter(category) {
      currentFilter = category;
      document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent === category);
      });
      renderGrid();
    }

    function renderGrid() {
      const grid = document.getElementById('grid');
      grid.innerHTML = '';
      
      const filtered = currentFilter === 'Tous' 
        ? MATERIALS 
        : MATERIALS.filter(m => m.category === currentFilter);

      filtered.forEach((material, i) => {
        const card = document.createElement('article');
        card.className = 'card';
        card.style.animationDelay = `${i * 100}ms`;
        
        card.innerHTML = `
          <div class="card-image" onclick="openModal('${material.illustration}', '${material.title}')">
            <img src="${material.illustration}" alt="${material.title}" loading="lazy">
          </div>
          <div class="card-content">
            <div class="card-header">
              <div class="card-icon" style="${material.colorClass}">${material.icon}</div>
              <div class="card-title">
                <h2>${material.title}</h2>
                <div class="divider"></div>
              </div>
            </div>
            <p class="card-description">${material.description}</p>
            <div class="card-footer">
              <div class="card-footer-title">Applications principales</div>
              <ul class="use-cases">
                ${material.useCases.map(u => `<li>${u}</li>`).join('')}
              </ul>
            </div>
          </div>
        `;
        
        grid.appendChild(card);
      });
    }

    function openModal(src, alt) {
      const modal = document.getElementById('modal');
      const img = document.getElementById('modalImg');
      img.src = src;
      img.alt = alt;
      modal.classList.add('active');
    }

    document.getElementById('modal').onclick = function() {
      this.classList.remove('active');
    };

    // Header scroll effect
    window.addEventListener('scroll', () => {
      document.getElementById('header').classList.toggle('scrolled', window.scrollY > 50);
    });

    // Initial render
    renderGrid();
  </script>
</body>
</html>
