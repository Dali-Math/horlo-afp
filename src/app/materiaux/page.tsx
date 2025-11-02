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
      padding: 3rem 1.5rem;
    }

    h1 {
      font-size: 3rem;
      font-weight: 900;
      text-align: center;
      margin-bottom: 2rem;
      background: linear-gradient(to right, #d97706, #eab308, #d97706);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .filters {
      display: flex;
      justify-content: center;
      gap: 0.75rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }

    .filter-btn {
      padding: 0.5rem 1.25rem;
      border-radius: 0.75rem;
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
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
    }

    .filter-btn.active {
      background: linear-gradient(to right, #f59e0b, #eab308);
      color: white;
      border-color: transparent;
      box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
      transform: scale(1.05);
    }

    /* CARTES COMPACTES */
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.25rem;
      margin-bottom: 3rem;
    }

    .card {
      background: white;
      border-radius: 1.25rem;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      transition: all 0.4s;
      border: 1px solid #e2e8f0;
      display: flex;
      flex-direction: column;
      opacity: 0;
      transform: translateY(20px);
      animation: fadeInUp 0.5s forwards;
    }

    @keyframes fadeInUp {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .card:hover {
      box-shadow: 0 12px 24px rgba(245, 158, 11, 0.2);
      transform: translateY(-6px);
    }

    .card-image {
      position: relative;
      width: 100%;
      height: 140px;
      overflow: hidden;
      cursor: pointer;
      background: #f1f5f9;
    }

    .card-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s;
    }

    .card:hover .card-image img {
      transform: scale(1.08);
    }

    .card-content {
      padding: 1rem;
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .card-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.75rem;
    }

    .card-icon {
      padding: 0.625rem;
      border-radius: 0.75rem;
      font-size: 1.25rem;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      flex-shrink: 0;
    }

    .card-title h2 {
      font-size: 1.125rem;
      font-weight: 700;
      color: #0f172a;
      margin: 0;
    }

    .card-description {
      color: #475569;
      line-height: 1.5;
      margin-bottom: 0.75rem;
      font-size: 0.8125rem;
      flex: 1;
    }

    .card-footer {
      padding-top: 0.75rem;
      border-top: 1px solid #e2e8f0;
    }

    .card-footer-title {
      font-size: 0.6875rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #64748b;
      font-weight: 700;
      margin-bottom: 0.375rem;
    }

    .use-cases {
      list-style: none;
    }

    .use-cases li {
      display: flex;
      align-items: start;
      gap: 0.375rem;
      margin-bottom: 0.375rem;
      font-size: 0.75rem;
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
      border: 4px solid #f59e0b;
      position: relative;
    }

    .iframe-section h2 {
      font-size: 2rem;
      font-weight: 800;
      text-align: center;
      margin-bottom: 1.5rem;
      color: #0f172a;
    }

    .iframe-info {
      text-align: center;
      color: #64748b;
      font-size: 0.875rem;
      margin-bottom: 1rem;
      font-style: italic;
    }

    .iframe-container {
      position: relative;
      width: 100%;
      height: 900px;
      border-radius: 1rem;
      overflow: hidden;
      box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.1);
      background: white;
    }

    .iframe-container iframe {
      width: 100%;
      height: 100%;
      border: none;
      display: block;
    }

    .iframe-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(15, 23, 42, 0.95);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 10;
      border-radius: 1rem;
    }

    .iframe-overlay.loading {
      display: flex;
    }

    .loader {
      width: 50px;
      height: 50px;
      border: 5px solid rgba(245, 158, 11, 0.3);
      border-top-color: #f59e0b;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .open-external {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      background: linear-gradient(to right, #f59e0b, #eab308);
      color: white;
      text-decoration: none;
      border-radius: 0.75rem;
      font-weight: 600;
      margin-top: 1rem;
      transition: all 0.3s;
      box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
    }

    .open-external:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(245, 158, 11, 0.4);
    }

    .external-link-container {
      text-align: center;
      margin-top: 1rem;
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
        font-size: 2rem;
      }

      .grid {
        grid-template-columns: 1fr;
      }

      .iframe-container {
        height: 700px;
      }

      .iframe-section {
        padding: 1.5rem;
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

    <!-- Section iframe encadrée avec toute la page externe -->
    <section class="iframe-section">
      <h2>📚 Explorer les Matériaux Horlogers Suisses</h2>
      <p class="iframe-info">Navigation interactive • Histoire complète • Contenu enrichi</p>
      
      <div class="iframe-container">
        <div class="iframe-overlay loading" id="iframeOverlay">
          <div class="loader"></div>
        </div>
        <iframe 
          id="materialIframe"
          src="https://www.horlolearn.ch/materiaux-horlogers-suisse.html"
          title="Matériaux Horlogers Suisse - Page Interactive Complète"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          loading="lazy"
          allowfullscreen>
        </iframe>
      </div>

      <div class="external-link-container">
        <a href="https://www.horlolearn.ch/materiaux-horlogers-suisse.html" target="_blank" rel="noopener noreferrer" class="open-external">
          🔗 Ouvrir en pleine page
        </a>
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
        description: "Matériau moderne par excellence. L'acier 316L combine résistance et finitions impeccables.",
        useCases: ['Boîtiers & bracelets', 'Couronnes vissées', 'Masses oscillantes'],
        category: 'Classiques',
      },
      {
        icon: '🟨',
        title: 'Or',
        colorClass: 'background: linear-gradient(135deg, #fbbf24, #d97706)',
        illustration: '/images/materiaux/or.jpg',
        description: "Symbole de luxe. L'or 18K est prisé pour sa noblesse et son éclat intemporel.",
        useCases: ['Boîtiers de prestige', 'Aiguilles et index', 'Ponts décorés'],
        category: 'Classiques',
      },
      {
        icon: '🥇',
        title: 'Laiton',
        colorClass: 'background: linear-gradient(135deg, #ca8a04, #854d0e)',
        illustration: '/images/materiaux/laiton.jpg',
        description: "Base des platines et ponts. Facile à usiner avec belle teinte dorée.",
        useCases: ['Platines & ponts', 'Roues de minuterie', 'Ébauches décoratives'],
        category: 'Classiques',
      },
      {
        icon: '⚙️',
        title: 'Titane',
        colorClass: 'background: linear-gradient(135deg, #6366f1, #4338ca)',
        illustration: '/images/materiaux/titane.jpg',
        description: "Ultra-léger (40% plus léger que l'acier), hypoallergénique et non magnétique.",
        useCases: ['Boîtiers techniques', 'Bracelets légers', 'Platines allégées'],
        category: 'Innovation',
      },
      {
        icon: '⬛',
        title: 'Céramique',
        colorClass: 'background: linear-gradient(135deg, #52525b, #18181b)',
        illustration: '/images/materiaux/ceramique.jpg',
        description: "Extrêmement dur, pratiquement inrayable. Style contemporain et élégant.",
        useCases: ['Lunettes de montre', 'Boîtiers haut de gamme', 'Composants modernes'],
        category: 'Innovation',
      },
      {
        icon: '🔬',
        title: 'Silicium',
        colorClass: 'background: linear-gradient(135deg, #ec4899, #be185d)',
        illustration: '/images/materiaux/silicium.jpg',
        description: 'Révolutionnaire. Haute précision, amagnétique, sans lubrification.',
        useCases: ['Spiraux inamagnétiques', 'Ancre en silicium', "Roue d'échappement"],
        category: 'Innovation',
      },
      {
        icon: '💎',
        title: 'Rubis synthétique',
        colorClass: 'background: linear-gradient(135deg, #f43f5e, #be123c)',
        illustration: '/images/materiaux/rubis.jpg',
        description: "Palier antifriction. Réduit l'usure et garantit longévité exceptionnelle.",
        useCases: ['Pierres de pivot', 'Contrepoids balancier', "Roulette d'ancre"],
        category: 'Classiques',
      },
      {
        icon: '🌲',
        title: 'Bois',
        colorClass: 'background: linear-gradient(135deg, #16a34a, #15803d)',
        illustration: '/images/materiaux/bois.jpg',
        description: 'Rare et artisanal. Apporte une touche naturelle et unique.',
        useCases: ['Cadrans exclusifs', 'Éléments décoratifs', 'Maquettes pédagogiques'],
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
        card.style.animationDelay = `${i * 50}ms`;
        
        card.innerHTML = `
          <div class="card-image" onclick="openModal('${material.illustration}', '${material.title}')">
            <img src="${material.illustration}" alt="${material.title}" loading="lazy">
          </div>
          <div class="card-content">
            <div class="card-header">
              <div class="card-icon" style="${material.colorClass}">${material.icon}</div>
              <div class="card-title">
                <h2>${material.title}</h2>
              </div>
            </div>
            <p class="card-description">${material.description}</p>
            <div class="card-footer">
              <div class="card-footer-title">Applications</div>
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

    // Gérer le chargement de l'iframe
    const iframe = document.getElementById('materialIframe');
    const overlay = document.getElementById('iframeOverlay');

    iframe.addEventListener('load', function() {
      setTimeout(() => {
        overlay.classList.remove('loading');
      }, 500);
    });

    // Si l'iframe ne charge pas après 10 secondes, cacher l'overlay
    setTimeout(() => {
      overlay.classList.remove('loading');
    }, 10000);

    // Initial render
    renderGrid();
  </script>
</body>
</html>
