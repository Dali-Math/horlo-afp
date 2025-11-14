"use client";

import { useState, useRef, useMemo } from 'react';

export default function HorloLearn() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  const searchableElements = useRef<Array<HTMLElement | null>>([]);
  const registerSearchableElement = (el: HTMLElement | null) => {
    if (el && !searchableElements.current.includes(el)) {
      searchableElements.current.push(el);
    }
  };

  const materials = [
    {
      id: 'fer',
      type: 'section-big',
      category: 'metal',
      title: '⚒️ FER',
      specs: [
        { label: 'Masse volumique', value: '7,86 Kg/dm³' },
        { label: 'Point de fusion', value: '1535°C' }
      ],
      description: "Le fer n'est pas un minéral obtenu de la nature à l'état pur, mais bien un métal extrait de minéraux très divers, dont la magnétite, les oxydes et l'hématite. Le fer est un métal de couleur blanc-gris. La métallurgie du fer (sidérurgie) a pour but de préparer des alliages fer-carbone dont la teneur en carbone est inférieure à 6,7% connus sous le nom de fontes et aciers.",
      properties: ['Mou, ductile et malléable à l\'état pur', 'S\'oxyde facilement et se désagrège par corrosion', 'Entièrement recyclable', 'Se prête bien à tous les traitements de surface', 'Le fer pur est magnétisable', 'Bon conducteur thermique et électrique'],
      usage: ['Armes et outils', 'Fer forgé', 'Chemins de fer', 'Carrosseries', 'Électroménager', 'Base des aciers et fontes']
    },
    {
      id: 'aciers',
      type: 'section-big',
      category: 'acier',
      title: '🔩 ACIERS',
      description: "Il s'agit d'un alliage de fer contenant entre 0,02% et 2% de carbone. Plus la teneur en carbone est haute, plus l'acier sera dur. Grâce au pourcentage de carbone, nous pourrons maîtriser la dureté de la trempe. L'implémentation de petits éléments comme le manganèse, molybdène, ou autre sont destinés à modifier les propriétés mécaniques, magnétiques ou chimiques (résistance à la corrosion).",
      steelCategories: [
        {
          title: 'ACIERS NON-ALLIÉS (AU CARBONE)',
          desc: 'Les aciers non-alliés sont utilisés selon leurs caractéristiques mécaniques, principalement la limite d\'élasticité ou de rupture. Les aciers non alliés (au carbone) peuvent contenir jusqu\'à 2% en masse de carbone. Ils sont destinés à la construction soudée, à l\'usinage, au pliage, etc.',
          types: [{ name: 'TYPE S', desc: 'Usage général de base' }, { name: 'TYPE P', desc: 'Usage dans les appareils à pression' }, { name: 'TYPE L', desc: 'Pour les tubes de conduites' }, { name: 'TYPE E', desc: 'Pour la construction mécanique' }, { name: 'TYPE R', desc: 'Pour les rails' }]
        },
        {
          title: 'ACIERS FAIBLEMENT ALLIÉS (< 5%)',
          desc: 'Dans lesquels la somme des éléments d\'alliage totaux est inférieur à 5%. Les aciers faiblement alliés se classent selon leur teneur en carbone ainsi que des éléments d\'alliages. Ces éléments tels que le nickel, le chrome et le molybdène, le manganèse et le silicium présentent des propriétés mécaniques supérieures aux aciers au carbone ordinaires.',
          types: [{ name: 'Aciers trempés et revenus (QT)', desc: 'À faible teneur en carbone' }, { name: 'Aciers à ultra-haute résistance', desc: 'À moyenne teneur en carbone' }, { name: 'Aciers à roulement', desc: 'Pour applications mécaniques exigeantes' }]
        },
        {
          title: 'ACIERS FORTEMENT ALLIÉS (> 5%)',
          desc: 'Les aciers fortement alliés sont définis par un pourcentage élevé d\'éléments d\'alliage (somme totale > 5%). Dans cette catégorie, on trouve les aciers inoxydables, les aciers rapides pour la confection d\'outils, les aciers à résistance thermique etc. L\'acier inoxydable est un acier fortement allié qui contient au moins 12% de chrome.\n\nL\'acier inoxydable utilisé pour la fabrication en horlogerie est allié avec du chrome et du nickel. Suite à des normes européennes, la convention européenne a décidé de diminuer le taux de nickel pour éviter les allergies qui a été remplacé par du molybdène.',
          types: [{ name: 'Qualités recherchées', desc: 'Résistance à la corrosion, Non-magnétique, Bonne usinabilité, Déformable à froid, Excellentes propriétés de polissage, Couleur uniforme, Fourniture sous forme de feuilles, planches ou barres, Possibilités d\'être recuit après déformation à froid' }]
        }
      ],
      horlogerieUses: ['Boîtiers: Montres classiques, sportives, de plongée (ex. Rolex Submariner, Omega Seamaster)', 'Bracelets: Maillons pleins ou creux en acier, fermoirs déployants', 'Aiguilles: Notamment bleuies à la flamme pour des modèles haut de gamme', 'Ressorts: Ressorts de barillet, de tirette, de cliquet', 'Axes et pivots: Très utilisés dans les trains de rouage', 'Vis: Y compris les vis décoratives (par exemple, vis bleuies)', 'Glaces: Certaines montres utilisent des glaces en acier poli dans les montres de poche anciennes', 'Lunettes de montres: Lunette fixe ou tournante (ex. lunette tachymétrique ou de plongée)']
    },
    { id: 'chrome', type: 'card', category: 'metal', materialType: 'Métal Pur', title: 'CHROME', icon: '✨', specs: [{ label: 'Masse volumique', value: '7,2 Kg/dm³' }, { label: 'Point de fusion', value: '1857°C' }], description: 'Le chrome a été découvert à la fin du 18ème siècle dans un minerai venant de Sibérie qui était une météorite. Le chrome de couleur blanche, légèrement bleuté. Grande utilisation du chrome comme élément de recouvrement et protection contre la corrosion.', properties: ['Très dur, résistant à l\'usure', 'Inoxydable à l\'air', 'Résistant à la corrosion'], usage: ['Élément d\'alliage dans les aciers (entre 12% et 25%)', 'Acier inoxydable 18-10 (18% de Cr et 10% de Ni)', 'Très utilisé dans les ustensiles de cuisine, évier, installations chimiques'] },
    { id: 'aluminium', type: 'card', category: 'metal', materialType: 'Métal Léger', title: 'ALUMINIUM', icon: '🪶', specs: [{ label: 'Masse volumique', value: '2,702 Kg/dm³' }, { label: 'Point de fusion', value: '660°C' }], quickStats: ['100% Recyclable', 'Ultra-léger'], description: 'À partir du minerai, la bauxite, on extrait dans un premier temps un oxyde d\'aluminium appelé alumine. Avec cette alumine, par réduction électrolytique, on obtient de l\'aluminium. L\'alumine est souvent utilisée comme abrasif. Il s\'agit d\'un métal léger, de teinte blanche. Il s\'agit d\'un métal recyclable à 100% sans une perte de la qualité. En contact avec l\'air, l\'aluminium ne change pas car il est protégé par une couche qui s\'appelle l\'anodisation obtenue par électrolyse.', properties: ['Léger, résistant à la corrosion', 'Bonne conductivité thermique et électrique', 'Très malléable et ductile', 'Non magnétique et non toxique', '100% recyclable'], usage: ['Machines outils, toiture, emballage, aérosol'], horlogerieUses: ['Lunettes colorées: Très utilisé pour les lunettes rotatives (montres de plongée, GMT)', 'Composants internes dans les montres quartz', 'Aiguilles squelettes: Pour gagner en légèreté', 'Cadrans: Certains cadrans sont en aluminium brossé ou anodisé', 'Plaques de décor: Pour ajouter des motifs au mouvement', 'Boîtiers de montres connectées ou de sport: Garmin, Suunto, etc.'] },
    { id: 'titane', type: 'card', category: 'metal', materialType: 'Métal Premium', title: 'TITANE', icon: '💎', specs: [{ label: 'Masse volumique', value: '4,54 Kg/dm³' }, { label: 'Point de fusion', value: '1660°C' }], quickStats: ['45% plus léger que l\'acier', 'Amagnétique'], description: 'Il s\'agit d\'un élément que l\'on retrouve beaucoup dans la nature. Il est extrait de l\'ilménite et du rutile. Allié à l\'aluminium, l\'étain ou le molybdène, l\'alliage va être utilisé pour la fabrication des pièces d\'avions, d\'outils et d\'appareils médicaux. En horlogerie à cause de sa masse volumique plus basse de 45% par rapport à l\'acier.', properties: ['Métal léger, bonne résistance à la chaleur', 'Bonne conductibilité thermique', 'Faible dilation thermique', 'Bonne résistance mécanique', 'Excellent rapport résistance/masse volumique', 'Bonne résistance chimique, amagnétique', 'Excellente résistance à la corrosion'], usage: ['Pièces pour l\'aviation et l\'astronautique', 'Électrotechnique', 'Horlogerie et bijouterie', 'Médecine'] },
    { id: 'nickel', type: 'card', category: 'metal', materialType: 'Métal Pur', title: 'NICKEL', icon: '🔘', specs: [{ label: 'Masse volumique', value: '8,906 Kg/dm³' }, { label: 'Point de fusion', value: '1455°C' }], description: 'Il s\'agit d\'un métal blanc rencontré à l\'état natif également. Grande utilisation du nickel comme élément d\'alliage dans les aciers inox. Nous entendrons également parler de nickelage qui consiste à déposer une fine couche de nickel sur la surface des pièces en métaux ferreux afin de les protéger de la corrosion.', properties: ['Ductile, malléable, très dur', 'Résistance remarquable à la corrosion', 'Ferromagnétique', '⚠️ Allergène'], usage: ['Dans la fabrication des pièces de monnaie, ustensiles de cuisine', 'L\'invar est un alliage de fer et de nickel à 36% souvent utilisé en horlogerie sur les ressorts spiral, le balancier', 'Sa qualité est sa faible déformation dimensionnelle'] },
    { id: 'cuivre', type: 'card', category: 'metal', materialType: 'Métal Conducteur', title: 'CUIVRE', icon: '🟠', specs: [{ label: 'Masse volumique', value: '8,92 Kg/dm³' }, { label: 'Point de fusion', value: '1083°C' }], description: 'Il rentre dans la composition du laiton, du bronze, du maillechort mais également dans les alliages avec de l\'or. Il peut se trouver à l\'état natif. La particularité du cuivre est que l\'eau pure n\'a aucune action sur le cuivre peu importe la température. Cela ne veut pas dire que le cuivre ne s\'oxyde pas. La fine couche d\'oxydation sur le cuivre s\'appelle vert-de-gris et il est provoqué par l\'air humide. Cette dernière évite une attaque en profondeur du métal.', properties: ['Le meilleur conducteur de chaleur et de l\'électricité après l\'argent', 'Non-magnétique', 'Très malléable, très ductile', 'Résistance à la corrosion'], usage: ['Fil électrique, bobinage des moteurs (excellente conductivité)', 'Toiture, tuyauteries isolées (résistance à la corrosion)'] },
    { id: 'zinc', type: 'card', category: 'metal', materialType: 'Métal Protecteur', title: 'ZINC', icon: '⚡', specs: [{ label: 'Masse volumique', value: '7,14 Kg/dm³' }, { label: 'Point de fusion', value: '419.5°C' }], description: 'Le zinc est un métal de couleur gris-bleu qui a plusieurs applications industrielles et est souvent utilisé en alliages, comme dans le laiton. Le zinc est connu depuis le XVIIe siècle. C\'est un métal bleuâtre qui s\'oxyde à l\'air humide et se recouvre d\'un oxyde qui le protège.', properties: ['Cassant à basse température', 'Se moule bien', 'Inoxydable à froid et à l\'air sec', 'Fortement attaqué par les acides sulfuriques'], usage: ['Utilisé principalement comme métal de recouvrement par immersion', 'Piquets de barrière, lampadaires, construction métallique', 'Le recouvrement avec le zinc peut également se faire par électrolyse'] },
    { id: 'etain', type: 'card', category: 'metal', materialType: 'Métal Fusible', title: 'ÉTAIN', icon: '🥈', specs: [{ label: 'Masse volumique', value: '7,28 Kg/dm³' }, { label: 'Point de fusion', value: '231.9°C' }], description: 'L\'étain est un métal de couleur argentée, souvent utilisé dans les alliages, notamment avec le cuivre pour former le bronze. Métal blanc, facilement fusible et l\'un des constituants du bronze. À température ambiante, il change lentement et superficiellement mais à chaud, il s\'oxyde rapidement. Il ne change pas en contact de l\'air.', properties: ['Mou, très malléable', 'Se laisse réduire en feuilles très minces', 'Se laisse bien mouler', 'Inoxydable à l\'air', 'Résiste aux acides faibles', 'Conducteur électrique'], usage: ['Étamage (dépôt d\'étain à l\'intérieur des conserves)', 'Électronique (soudage)', 'Industrie chimique (peinture)', 'Industrie du verre'] },
    { id: 'tungstene', type: 'card', category: 'metal', materialType: 'Métal Extrême', title: 'TUNGSTÈNE', icon: '⚫', specs: [{ label: 'Masse volumique', value: '19,35 Kg/dm³' }, { label: 'Point de fusion', value: '3410°C' }], quickStats: ['Plus haute température de fusion', 'Un des métaux les plus lourds'], description: 'Le tungstène pur est un métal de couleur allant du gris acier au blanc étain. Il s\'agit de métal avec la température de fusion la plus élevée et des métaux les plus lourds.', properties: ['Très dur, très ductile mais fragile', 'Inaltérable à l\'air', 'Réactif à l\'oxygène', 'Non-réactif aux acides et aux bases'], usage: ['Outils de coupe en carbure de tungstène (WC)', 'Élément d\'alliage dans les aciers rapides (acier outil)', 'Procédé de soudage TIG', 'Horlogerie de luxe (carrures, lunettes)'] },
    { id: 'plomb', type: 'card', category: 'metal', materialType: 'Métal Dense', title: 'PLOMB', icon: '⚠️', specs: [{ label: 'Masse volumique', value: '11,34 Kg/dm³' }, { label: 'Point de fusion', value: '327.5°C' }], quickStats: ['⚠️ Vapeurs toxiques'], description: 'Le plomb est connu depuis l\'Antiquité, où il était utilisé comme support d\'écriture. Dans une époque plus récente, le plomb a été utilisé pour la tuyauterie d\'alimentation d\'eau des habitations. Il a donné son nom au métier des personnes qui avaient en charge la pose et l\'entretien de ces conduites : le métier de plombier. Le plomb pur est un métal gris bleuâtre, très mou. Après découpe de ce dernier, il reflète un vif éclat métallique qui se ternit à l\'air par suite d\'oxydation superficielle.', properties: ['Très mou, très malléable, ductile', 'Se ternit rapidement à l\'air', 'Oxydation superficielle', 'Résiste aux acides (à l\'exception de l\'acide nitrique)', '⚠️ Les vapeurs sont toxiques'], usage: ['Munition', 'Protection contre les rayons X', 'Toitures, tuyauterie'] },
    {
      id: 'laiton',
      type: 'section-big',
      category: 'alloy',
      title: '🟡 LAITON',
      specs: [
        { label: 'Masse volumique', value: '8,5 - 8,8 Kg/dm³' },
        { label: 'Point de fusion', value: '900 - 980°C' }
      ],
      quickStats: ['Cuivre 58%', 'Zinc 39%', 'Plomb 3%'],
      description: "Nom générique des alliages de cuivre et de zinc. Teneur en zinc compris entre 5 et 45%. Laiton en horlogerie : Cuivre (58%) – Zinc (39%) – Plomb (3%). Grande utilisation dans l'industrie pour le moulage, emboutissage, soudure, malléabilité. La particularité du laiton est que sa couleur peut changer du rouge au jaune suivant la teneur en zinc. Le cuivre est majoritaire qui apporte la conductivité et la malléabilité. Le zinc augmente la dureté et la résistance mécanique.",
      properties: ['Bonne résistance à la corrosion', 'Bonne conductivité électrique et thermique', 'Ductile, malléable', 'Bonne résistance mécanique'],
      usage: ['Boites de montre', 'Pièces de mouvement horloger', 'Douille de cartouche', 'Robinetterie'],
      horlogerieUses: ['Platines: La base sur laquelle tout le mouvement est assemblé', 'Ponts: Maintiennent les rouages et les organes du mouvement', 'Roue de minuterie: Roue qui transmet le mouvement aux aiguilles', 'Roue d\'ancre: Dans le système d\'échappement', 'Roue des heures, des minutes, des secondes', 'Tiges et leviers de mise à l\'heure: Utilisés dans le système de remontage', 'Couronnes: Parfois en laiton chromé dans les montres bon marché', 'Décorations galvanisées: Le laiton est souvent recouvert d\'un traitement galvanique (or, nickel, rhodium…)']
    },
    {
      id: 'bronze',
      type: 'section-big',
      category: 'alloy',
      title: '🟤 BRONZE',
      specs: [
        { label: 'Masse volumique', value: '8,7 - 8,8 Kg/dm³' },
        { label: 'Point de fusion', value: '~1000°C' }
      ],
      quickStats: ['Cuivre 95%', 'Étain 2-10%'],
      description: "Alliage de cuivre et d'étain. Teneur en cuivre 95%, teneur en étain 2% à 10% (bronze industriel). La particularité du bronze est que sa couleur varie en fonction de la teneur d'étain.",
      properties: ['Bonne résistance à la corrosion', 'Facile à travailler', 'Non-magnétique', 'Bonne conductivité thermique et électrique'],
      usage: ['Œuvres d\'art, lustrerie', 'Robinetterie', 'Cloches', 'Roues dentées, ressorts'],
      horlogerieUses: ['Platines et ponts haut de gamme: Présents dans les montres artisanales (ex. A. Lange & Söhne, Glashütte)', 'Roues décorées: Dans les montres visibles par fond transparent', 'Composants gravés à la main: Grâce à sa dureté moyenne, il se prête bien à la gravure décorative', 'Base de cadrans: Sur lesquels sont appliqués des finis (émaillage, guillochage…)', 'Composants de complications: Tourbillons, quantièmes, etc., pour leur stabilité et leur résistance à l\'usure']
    },
    {
      id: 'maillechort',
      type: 'section-big',
      category: 'alloy',
      title: '⚪ MAILLECHORT',
      quickStats: ['Cuivre 50-60%', 'Zinc 15-40%', 'Nickel 5-30%'],
      description: "Alliage de nickel, cuivre et de zinc. Sa composition est très variable (en moyenne 50 à 60% de cuivre / 15 à 40% de zinc / 5 à 30% de nickel). Sa particularité est qu'il s'agit d'un métal dur et inaltérable (qui garde ses qualités). Sa différence avec le laiton est qu'il possède une résistance mécanique supérieure.",
      properties: ['Très résistant à la corrosion et à l\'oxydation', 'Malléable et ductile', 'Bonnes caractéristiques mécaniques'],
      usage: ['Pointes de stylos à bille']
    }
  ];

  const filteredMaterials = useMemo(() => {
    return materials.filter(material => {
      const matchesFilter = activeFilter === 'all' || material.category === activeFilter;
      
      if (!searchTerm.trim()) {
        return matchesFilter;
      }
      
      const searchLower = searchTerm.toLowerCase();
      
      // Recherche dans les propriétés du matériau
      const searchInMaterial = (obj: any): boolean => {
        if (typeof obj === 'string') {
          return obj.toLowerCase().includes(searchLower);
        }
        if (Array.isArray(obj)) {
          return obj.some(item => searchInMaterial(item));
        }
        if (typeof obj === 'object' && obj !== null) {
          return Object.values(obj).some(value => searchInMaterial(value));
        }
        return false;
      };
      
      return matchesFilter && searchInMaterial(material);
    });
  }, [activeFilter, searchTerm]);

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div className="bg-animation">
        <div className="bg-gradient"></div>
        <div className="grid-overlay"></div>
      </div>

      <div className="container">
        <header>
          <h1 className="logo">HORLOLEARN</h1>
          <p className="subtitle">Guide Complet des Métaux et Matériaux en Horlogerie</p>
        </header>

        <div className="search-container">
          <div className="search-wrapper">
            <input
              type="text"
              className="search-input"
              ref={searchInputRef}
              placeholder="Rechercher un matériau, une propriété, une utilisation..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <span className="search-icon">🔍</span>
          </div>
        </div>

        <div className="filters">
          <button className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => handleFilterClick('all')}>Tous</button>
          <button className={`filter-btn ${activeFilter === 'metal' ? 'active' : ''}`} onClick={() => handleFilterClick('metal')}>Métaux Purs</button>
          <button className={`filter-btn ${activeFilter === 'acier' ? 'active' : ''}`} onClick={() => handleFilterClick('acier')}>Aciers</button>
          <button className={`filter-btn ${activeFilter === 'alloy' ? 'active' : ''}`} onClick={() => handleFilterClick('alloy')}>Alliages</button>
          <button className={`filter-btn ${activeFilter === 'horlogerie' ? 'active' : ''}`} onClick={() => handleFilterClick('horlogerie')}>Usages Horlogerie</button>
        </div>

        <div className="materials-grid">
          {filteredMaterials.map((material) => {
            if (material.type === 'section-big') {
              return (
                <div
                  key={material.id}
                  ref={registerSearchableElement as unknown as React.LegacyRef<HTMLDivElement>}
                  className="section-big searchable"
                  data-category={material.category}
                >
                  <h2 className="section-title">{material.title}</h2>
                  
                  {material.specs && (
                    <div className="specs-grid" style={{ maxWidth: '600px', margin: '0 auto 30px' }}>
                      {material.specs.map((spec, idx) => (
                        <div key={idx} className="spec-item">
                          <div className="spec-label">{spec.label}</div>
                          <div className="spec-value">{spec.value}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {material.quickStats && (
                    <div className="quick-stats" style={{ justifyContent: 'center', marginBottom: '30px' }}>
                      {material.quickStats.map((stat, idx) => (
                        <span key={idx} className="stat-badge">{stat}</span>
                      ))}
                    </div>
                  )}

                  {material.description && (
                    <div className="category-desc" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 40px' }}>
                      {material.description}
                    </div>
                  )}

                  {material.steelCategories && (
                    <div className="steel-categories">
                      {material.steelCategories.map((cat, idx) => (
                        <div key={idx} className="steel-category">
                          <div className="category-title">{cat.title}</div>
                          <div className="category-desc">{cat.desc}</div>
                          <div className="steel-types-grid">
                            {cat.types.map((type, typeIdx) => (
                              <div key={typeIdx} className="steel-type-item">
                                <div className="steel-type-name">{type.name}</div>
                                {type.desc && type.name !== 'Qualités recherchées' && <div className="category-desc">{type.desc}</div>}
                                {type.name === 'Qualités recherchées' && (
                                  <ul className="property-list" style={{ marginTop: '10px' }}>
                                    {type.desc?.split(',').map((item, i) => (
                                      <li key={i}>{item.trim()}</li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {material.properties && (
                    <div className="advantages-grid">
                      <div className="advantage-card">
                        <div className="advantage-title">Propriétés</div>
                        <ul className="property-list">
                          {material.properties.map((prop, idx) => (
                            <li key={idx}>{prop}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="advantage-card">
                        <div className="advantage-title">Utilisation</div>
                        <ul className="property-list">
                          {material.usage?.map((use, idx) => (
                            <li key={idx}>{use}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {material.horlogerieUses && (
                    <div className="horlogerie-uses">
                      <div className="uses-title">🕰️ UTILISATIONS EN HORLOGERIE</div>
                      <ul className="property-list">
                        {material.horlogerieUses.map((use, idx) => (
                          <li key={idx} dangerouslySetInnerHTML={{ __html: use }} />
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            } else {
              return (
                <div
                  key={material.id}
                  ref={registerSearchableElement as unknown as React.LegacyRef<HTMLDivElement>}
                  className="material-card searchable"
                  data-category={material.category}
                >
                  <div className="material-type">{material.materialType}</div>
                  <div className="card-header">
                    <h3 className="material-title">{material.title}</h3>
                    <span className="material-icon">{material.icon}</span>
                  </div>
                  
                  {material.specs && (
                    <div className="specs-grid">
                      {material.specs.map((spec, idx) => (
                        <div key={idx} className="spec-item">
                          <div className="spec-label">{spec.label}</div>
                          <div className="spec-value">{spec.value}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {material.quickStats && (
                    <div className="quick-stats">
                      {material.quickStats.map((stat, idx) => (
                        <span key={idx} className="stat-badge">{stat}</span>
                      ))}
                    </div>
                  )}

                  {material.description && (
                    <p style={{ color: 'var(--text-dim)', margin: '16px 0' }}>
                      {material.description}
                    </p>
                  )}

                  <div className="section-divider"></div>
                  
                  {material.properties && (
                    <>
                      <div className="section-label">Propriétés</div>
                      <ul className="property-list">
                        {material.properties.map((prop, idx) => (
                          <li key={idx}>{prop}</li>
                        ))}
                      </ul>
                    </>
                  )}

                  {material.usage && (
                    <>
                      <div className="section-label">Utilisation</div>
                      <ul className="property-list">
                        {material.usage.map((use, idx) => (
                          <li key={idx}>{use}</li>
                        ))}
                      </ul>
                    </>
                  )}

                  {material.horlogerieUses && (
                    <div className="horlogerie-uses">
                      <div className="uses-title">🕰️ EN HORLOGERIE</div>
                      <ul className="property-list">
                        {material.horlogerieUses.map((use, idx) => (
                          <li key={idx}>{use}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            }
          })}
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            --primary: #0a0e27;
            --secondary: #1a1f3a;
            --accent: #00d4ff;
            --accent2: #9333ea;
            --text: #e4e4e7;
            --text-dim: #a1a1aa;
            --card-bg: rgba(26, 31, 58, 0.6);
            --border: rgba(255, 255, 255, 0.1);
        }

        body {
            font-family: 'Inter', sans-serif;
            background: var(--primary);
            color: var(--text);
            overflow-x: hidden;
        }

        .bg-animation {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
            overflow: hidden;
        }

        .bg-gradient {
            position: absolute;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle at 20% 50%, rgba(0, 212, 255, 0.15) 0%, transparent 50%),
                        radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.15) 0%, transparent 50%);
            animation: rotate 20s linear infinite;
        }

        @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .grid-overlay {
            position: absolute;
            width: 100%;
            height: 100%;
            background-image: 
                linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
            background-size: 50px 50px;
            opacity: 0.5;
        }

        .container {
            max-width: 1600px;
            margin: 0 auto;
            padding: 0 40px;
            position: relative;
            z-index: 1;
        }

        header {
            padding: 80px 0 60px;
            text-align: center;
        }

        .logo {
            font-size: 3.5em;
            font-weight: 800;
            background: linear-gradient(135deg, var(--accent), var(--accent2));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 20px;
            letter-spacing: -2px;
        }

        .subtitle {
            font-size: 1.3em;
            color: var(--text-dim);
            font-weight: 300;
        }

        .search-container {
            max-width: 700px;
            margin: 60px auto 50px;
            position: relative;
        }

        .search-wrapper {
            position: relative;
            background: var(--card-bg);
            backdrop-filter: blur(20px);
            border: 1px solid var(--border);
            border-radius: 16px;
            overflow: hidden;
            transition: all 0.3s ease;
        }

        .search-wrapper:focus-within {
            border-color: var(--accent);
            box-shadow: 0 0 30px rgba(0, 212, 255, 0.3);
        }

        .search-input {
            width: 100%;
            padding: 20px 60px 20px 25px;
            background: transparent;
            border: none;
            color: var(--text);
            font-size: 16px;
            font-family: 'Inter', sans-serif;
            outline: none;
        }

        .search-input::placeholder {
            color: var(--text-dim);
        }

        .search-icon {
            position: absolute;
            right: 25px;
            top: 50%;
            transform: translateY(-50%);
            color: var(--accent);
            font-size: 20px;
        }

        .filters {
            display: flex;
            gap: 12px;
            justify-content: center;
            flex-wrap: wrap;
            margin-bottom: 60px;
        }

        .filter-btn {
            padding: 12px 28px;
            background: var(--card-bg);
            backdrop-filter: blur(20px);
            border: 1px solid var(--border);
            border-radius: 50px;
            color: var(--text);
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .filter-btn:hover {
            border-color: var(--accent);
            transform: translateY(-2px);
        }

        .filter-btn.active {
            background: linear-gradient(135deg, var(--accent), var(--accent2));
            border-color: transparent;
            color: white;
        }

        .section-big {
            background: var(--card-bg);
            backdrop-filter: blur(20px);
            border: 1px solid var(--border);
            border-radius: 24px;
            padding: 50px;
            margin: 80px 0;
        }

        .section-title {
            font-size: 2.5em;
            font-weight: 800;
            text-align: center;
            margin-bottom: 40px;
            background: linear-gradient(135deg, var(--accent), var(--accent2));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .materials-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
            gap: 24px;
            margin-bottom: 40px;
        }

        .material-card {
            background: var(--card-bg);
            backdrop-filter: blur(20px);
            border: 1px solid var(--border);
            border-radius: 20px;
            padding: 32px;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
            cursor: pointer;
            margin-bottom: 24px;
        }

        .material-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--accent), var(--accent2));
            opacity: 0;
            transition: opacity 0.3s;
        }

        .material-card:hover::before {
            opacity: 1;
        }

        .material-card:hover {
            transform: translateY(-8px);
            border-color: rgba(0, 212, 255, 0.5);
            box-shadow: 0 20px 60px rgba(0, 212, 255, 0.2);
        }

        .material-card.hidden {
            display: none;
        }

        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 20px;
        }

        .material-title {
            font-size: 1.8em;
            font-weight: 700;
            background: linear-gradient(135deg, var(--accent), var(--accent2));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .material-icon {
            font-size: 2.5em;
        }

        .material-type {
            display: inline-block;
            padding: 6px 14px;
            background: rgba(0, 212, 255, 0.1);
            border: 1px solid rgba(0, 212, 255, 0.3);
            border-radius: 20px;
            font-size: 0.75em;
            font-weight: 600;
            color: var(--accent);
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 20px;
        }

        .specs-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            margin: 24px 0;
        }

        .spec-item {
            background: rgba(0, 0, 0, 0.3);
            padding: 16px;
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .spec-label {
            font-size: 0.75em;
            color: var(--text-dim);
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 6px;
            font-weight: 600;
        }

        .spec-value {
            font-size: 1.3em;
            font-weight: 700;
            color: var(--text);
        }

        .section-divider {
            height: 1px;
            background: linear-gradient(90deg, transparent, var(--border), transparent);
            margin: 24px 0;
        }

        .section-label {
            font-size: 0.85em;
            font-weight: 700;
            color: var(--accent);
            text-transform: uppercase;
            letter-spacing: 1.5px;
            margin: 20px 0 12px;
        }

        .property-list {
            list-style: none;
            display: grid;
            gap: 10px;
        }

        .property-list li {
            padding-left: 24px;
            position: relative;
            color: var(--text-dim);
            font-size: 0.95em;
            line-height: 1.6;
        }

        .property-list li::before {
            content: '→';
            position: absolute;
            left: 0;
            color: var(--accent);
            font-weight: bold;
        }

        .steel-categories {
            display: grid;
            gap: 30px;
            margin-top: 30px;
        }

        .steel-category {
            background: rgba(0, 0, 0, 0.3);
            border: 1px solid var(--border);
            border-radius: 16px;
            padding: 30px;
            border-left: 4px solid var(--accent);
        }

        .category-title {
            font-size: 1.5em;
            font-weight: 700;
            color: var(--accent);
            margin-bottom: 20px;
        }

        .category-desc {
            color: var(--text-dim);
            line-height: 1.6;
            margin-bottom: 20px;
            white-space: pre-line;
        }

        .steel-types-grid {
            display: grid;
            gap: 15px;
        }

        .steel-type-item {
            background: rgba(0, 212, 255, 0.05);
            padding: 15px;
            border-radius: 10px;
            border-left: 3px solid var(--accent2);
        }

        .steel-type-name {
            font-weight: 700;
            color: var(--text);
            margin-bottom: 5px;
        }

        .table-container {
            overflow-x: auto;
            border-radius: 16px;
            margin: 30px 0;
        }

        .comparison-table {
            width: 100%;
            border-collapse: collapse;
            background: rgba(0, 0, 0, 0.3);
        }

        .comparison-table th {
            background: linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(147, 51, 234, 0.2));
            padding: 18px;
            text-align: left;
            font-weight: 700;
            font-size: 0.9em;
            text-transform: uppercase;
            letter-spacing: 1px;
            border-bottom: 2px solid var(--accent);
        }

        .comparison-table td {
            padding: 18px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            color: var(--text-dim);
        }

        .comparison-table tr:hover {
            background: rgba(0, 212, 255, 0.05);
        }

        .comparison-table td:first-child {
            font-weight: 600;
            color: var(--text);
        }

        .advantages-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 24px;
            margin-top: 40px;
        }

        .advantage-card {
            background: rgba(0, 0, 0, 0.3);
            border: 1px solid var(--border);
            border-radius: 16px;
            padding: 28px;
            position: relative;
            overflow: hidden;
        }

        .advantage-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 4px;
            height: 100%;
            background: linear-gradient(180deg, var(--accent), var(--accent2));
        }

        .advantage-title {
            font-size: 1.4em;
            font-weight: 700;
            color: var(--accent);
            margin-bottom: 20px;
        }

        .pros, .cons {
            margin: 16px 0;
        }

        .pros-title {
            color: #10b981;
            font-weight: 600;
            font-size: 0.9em;
            margin-bottom: 10px;
        }

        .cons-title {
            color: #ef4444;
            font-weight: 600;
            font-size: 0.9em;
            margin-bottom: 10px;
        }

        .pros ul, .cons ul {
            list-style: none;
            padding-left: 0;
        }

        .pros li {
            padding: 5px 0;
            color: var(--text-dim);
        }

        .pros li::before {
            content: '✓ ';
            color: #10b981;
            font-weight: bold;
        }

        .cons li {
            padding: 5px 0;
            color: var(--text-dim);
        }

        .cons li::before {
            content: '✗ ';
            color: #ef4444;
            font-weight: bold;
        }

        .info-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 24px;
            margin-top: 40px;
        }

        .info-card {
            background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(147, 51, 234, 0.1));
            border: 1px solid var(--border);
            border-radius: 16px;
            padding: 28px;
            transition: all 0.3s ease;
        }

        .info-card:hover {
            transform: translateY(-5px);
            border-color: var(--accent);
        }

        .info-icon {
            font-size: 2em;
            margin-bottom: 12px;
        }

        .info-title {
            font-size: 1.2em;
            font-weight: 700;
            color: var(--accent);
            margin-bottom: 12px;
        }

        .info-text {
            color: var(--text-dim);
            line-height: 1.6;
            font-size: 0.95em;
        }

        .quick-stats {
            display: flex;
            gap: 10px;
            margin: 15px 0;
            flex-wrap: wrap;
        }

        .stat-badge {
            padding: 6px 12px;
            background: rgba(0, 212, 255, 0.1);
            border: 1px solid rgba(0, 212, 255, 0.3);
            border-radius: 8px;
            font-size: 0.8em;
            color: var(--accent);
            font-weight: 600;
        }

        @media (max-width: 1024px) {
            .container {
                padding: 0 20px;
            }

            .materials-grid {
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            }

            .section-big {
                padding: 30px 20px;
            }
        }

        @media (max-width: 768px) {
            .logo {
                font-size: 2.5em;
            }

            .subtitle {
                font-size: 1.1em;
            }

            .specs-grid {
                grid-template-columns: 1fr;
            }

            .materials-grid {
                grid-template-columns: 1fr;
            }

            .section-title {
                font-size: 1.8em;
            }
        }

        ::-webkit-scrollbar {
            width: 10px;
        }

        ::-webkit-scrollbar-track {
            background: var(--secondary);
        }

        ::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, var(--accent), var(--accent2));
            border-radius: 10px;
        }

        .horlogerie-uses {
            background: rgba(147, 51, 234, 0.1);
            border: 1px solid rgba(147, 51, 234, 0.3);
            border-radius: 12px;
            padding: 20px;
            margin-top: 20px;
        }

        .uses-title {
            font-weight: 700;
            color: var(--accent2);
            margin-bottom: 15px;
            font-size: 1.1em;
        }
      `}</style>
    </>
  );
}
