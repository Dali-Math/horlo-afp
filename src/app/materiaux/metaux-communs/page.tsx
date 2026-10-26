'use client';

import Link from 'next/link';
import { useState } from 'react';

type Key = string;

const history = {
  '16th': {
    label: 'XVIe–XVIIe',
    title: 'Les Origines : Orfèvrerie et Métaux Précieux',
    text: "L'horlogerie suisse naît à Genève au XVIe siècle. L'interdiction du port d'objets ornementaux par Jean Calvin contraint les orfèvres à se reconvertir. Les premiers garde-temps sont naturellement fabriqués en or et argent.",
    bullets: [] as string[],
    tags: ['Or 18 carats', 'Argent sterling', 'Platine'],
  },
  '18th': {
    label: 'XVIIIe–XIXe',
    title: "L'Âge de la Précision : Laiton, Acier et Alliages",
    text: "Le XVIIIe siècle marque l'avènement de l'horlogerie de précision. Invention révolutionnaire des alliages par Charles-Édouard Guillaume (prix Nobel 1920) :",
    bullets: ['Invar (1896) : coefficient de dilatation thermique faible', "Elinvar (1912) : module d'élasticité constant"],
    tags: ['Invar', 'Elinvar', 'Laiton'],
  },
  '20th': {
    label: 'XXe siècle',
    title: "Industrialisation : L'Ère de l'Acier Inoxydable",
    text: "Le XXe siècle voit l'adoption généralisée de l'acier inoxydable 316L et l'émergence d'alliages de précision pour l'organe réglant :",
    bullets: ['Glucydur (années 1930) : alliage cuivre-béryllium pour balanciers', 'Nivarox (années 1930) : standard pour spiraux'],
    tags: ['Acier 316L', 'Glucydur', 'Nivarox'],
  },
  '21st': {
    label: 'XXIe siècle',
    title: 'Révolution High-Tech : Super-Alliages et Silicium',
    text: "L'horlogerie suisse embrasse les matériaux high-tech :",
    bullets: ['Titane : légèreté et résistance', 'Céramique : dureté et couleurs durables', 'Silicium : révolution des composants mécaniques', 'Carbone forgé : performance extrême'],
    tags: ['Silicium', 'Ceratanium', 'Carbone TPT'],
  },
} as const;

const traditional = {
  precious: {
    label: 'Métaux Précieux',
    items: [
      { icon: '🏆', name: 'Or 18 Carats', props: [['Composition', '75% Or + 25% alliages'], ['Densité', '15–16 g/cm³'], ['Propriétés', 'Inoxydable, amagnétique']], uses: ['Boîtiers de luxe', 'Bracelets premium', 'Masses oscillantes', 'Aiguilles haut de gamme'] },
      { icon: '💎', name: 'Platine 950', props: [['Composition', '95% Platine + 5% autres'], ['Densité', '20–21 g/cm³'], ['Propriétés', 'Plus noble des métaux']], uses: ['Haute horlogerie exclusive', 'Grandes complications', 'Séries limitées', 'Polissage miroir parfait'] },
      { icon: '✨', name: 'Argent 925', props: [['Composition', '92.5% Argent + 7.5% cuivre'], ['Densité', '10.4 g/cm³'], ['Propriétés', 'Blanc, ductile']], uses: ['Cadrans vintage', 'Boîtiers rétro', 'Ornementation', 'Protégé par rhodiage'] },
    ],
  },
  steel: {
    label: 'Aciers Spéciaux',
    items: [
      { icon: '⚙️', name: 'Acier Inox 316L', props: [['Composition', 'Fe-Cr-Ni-Mo + faible C'], ['Résistance', 'Corrosion marine'], ['Finitions', 'Polissage, satinage']], uses: ['Boîtiers standard horloger', 'Bracelets et maille', 'Composants mouvement', 'Production de masse'] },
      { icon: '🏆', name: 'Acier 904L', props: [['Composition', 'Super-acier Rolex'], ['Résistance', 'Acides + corrosion'], ['Éclat', 'Particulier après polissage']], uses: ['Montres professionnelles', 'Modèles de plongée', 'Haute résistance environnementale', "Boîtiers d'exception"] },
    ],
  },
  precision: {
    label: 'Alliages de Précision',
    items: [
      { icon: '🔬', name: 'Nivarox', props: [['Composition', 'Fe-Ni-Cr-Ti-Be'], ['Propriété', 'Thermo-élasticité nulle'], ['Usage', 'Spiraux depuis 1930']], uses: ['Spiraux de haute qualité', 'Standard horloger suisse', 'Isochronisme parfait', 'Amagnétisme total'] },
      { icon: '⚖️', name: 'Glucydur', props: [['Composition', 'Cuivre-Béryllium-Fer'], ['Propriété', 'Dureté et stabilité'], ['Couleur', 'Dorée caractéristique']], uses: ['Balanciers monométalliques', 'Équilibrage parfait', "Résistance à l'usure", 'Couple idéal avec Nivarox'] },
    ],
  },
  craft: {
    label: 'Savoir-Faire Artisanal',
    image: '/assets/images/atelier_artisanal_traditionnel.png',
    techniques: [
      ['🌊', 'Côtes de Genève', 'Rayures ondulées décorant ponts et masses oscillantes'],
      ['⚫', 'Perlage', 'Petits cercles se chevauchant sur les platines'],
      ['✨', 'Anglage', 'Chanfreinage et polissage des arêtes'],
      ['🔮', 'Poli Miroir', "Une finition si parfaite qu'elle apparaît noire"],
      ['🌀', 'Guillochage', 'Gravure de motifs géométriques complexes'],
      ['🎨', 'Décoration traditionnelle', 'Finitions manuelles et motifs décoratifs horlogers'],
    ],
  },
} as const;

const districts = {
  geneve: { label: 'Genève', title: 'Genève — Capitale de la Haute Horlogerie', text: "Berceau historique de l'horlogerie de luxe, Genève concentre les sièges des plus grandes manufactures.", specialties: ['Finition et décoration de prestige', 'Joaillerie et sertissage', 'Assemblage grandes complications', 'Poinçon de Genève'], companies: ['Patek Philippe', 'Rolex', 'Jaeger-LeCoultre'] },
  'vallee-joux': { label: 'Vallée de Joux', title: 'Vallée de Joux — Cœur Battant Mécanique', text: 'Vallée isolée, berceau de la haute horlogerie mécanique et des grandes complications.', specialties: ['Mouvements à grandes complications', 'Tourbillons et répétitions minutes', 'Quantièmes perpétuels', 'Haute horlogerie traditionnelle'], companies: ['Audemars Piguet', 'Breguet', 'Vacheron Constantin'] },
  neuchatel: { label: 'Neuchâtel', title: 'Neuchâtel — Cœur Industriel', text: 'Bastion de la fabrication de mouvements en grande série et des composants de précision.', specialties: ['Mouvements grande série', 'Décolletage de précision', 'Fabrication spiraux', 'Sous-traitance spécialisée'], companies: ['ETA', 'Sellita', 'Nivarox-FAR'] },
  bienne: { label: 'Bienne', title: 'Bienne — Nœud Stratégique', text: 'Centre névralgique du Swatch Group et des mouvements de précision.', specialties: ['Production mouvements Swatch Group', 'Recherche et développement', 'Coordination industrielle', 'Innovation technologique'], companies: ['Swatch Group', 'OMEGA', 'ETA'] },
} as const;

const future = {
  environment: { label: 'Environnement', title: 'Durabilité et Économie Circulaire', cards: [['Matériaux Recyclés', ['Acier Lucent (Chopard) : 80% recyclé', 'Or éthique certifié Fairmined', 'Titane recyclé Grade 5']], ['Production Propre', ['Bâtiments Minergie certifiés', 'Énergies 100% renouvelables', 'Circuits fermés eau et déchets']], ['Économie Circulaire', ['Droit à la réparation', 'Pièces garanties sur décennies', 'Marché seconde main certifié']]] },
  digital: { label: 'Digitalisation', title: 'Transformation Numérique', cards: [['Manufacture 4.0', ['Robots collaboratifs (cobots)', 'IA pour contrôle qualité', 'Maintenance prédictive']], ['Traçabilité Blockchain', ['Passeport numérique infalsifiable', 'Matériaux traçables', 'Lutte contrefaçon']], ['Expérience Client Augmentée', ['Réalité augmentée (essai virtuel)', 'Configurateur 3D', 'Service connecté']]] },
  technology: { label: 'Technologie', title: 'Nouvelles Frontières', cards: [['Matériaux Intelligents', ['Alliages mémoire de forme', 'Revêtements auto-cicatrisants', 'Capteurs intégrés matière']], ['Fabrication Additive', ['Impression 3D métallique', 'Géométries impossibles', 'Personnalisation de masse']], ['Miniaturisation Extrême', ['Récupération énergie ambiante', 'Micro-batteries état solide', 'MEMS et nanotechnologies']]] },
} as const;

const schools = [
  ['🎓', 'CFPT Genève', "L'une des plus anciennes écoles horlogères, formation d'horlogers et micromécaniciens d'élite.", ['Horlogerie', 'Micromécanique', 'Finitions']],
  ['🏔️', 'ETVJ Vallée de Joux', 'Spécialisée dans la formation aux métiers de la haute horlogerie et des complications.', ['Haute Horlogerie', 'Grandes Complications', 'Artisanat']],
  ['⚙️', 'CPNE Locle', "Pôle de formation dual au cœur industriel de l'horlogerie suisse.", ['Formation Duale', 'Industrie', 'Précision']],
  ['🌍', 'WOSTEP', 'Formation mondiale, spécialisations avancées et standards internationaux.', ['Formation Internationale', 'Service Après-Vente', 'Standards Globaux']],
] as const;

const companies = [
  ['PP', 'Patek Philippe', 'Advanced Research', ['Spiral Spiromax® en Silinvar® (2006)', 'Oscillomax® : organe réglant complet', 'Fortissimo : amplification sonore'], ['Innovation Long Terme', 'Partenariat CSEM']],
  ['R', 'Rolex', 'Ingénierie Matériaux', ['Céramique Cerachrom inaltérable', 'Acier Oystersteel 904L exclusive', 'Or Everose breveté', 'Échappement Chronergy'], ['Fonderie Propre', 'Standards Robustes']],
  ['AP', 'Audemars Piguet', 'Audace Matériaux', ['Carbone forgé pionnier (2007)', 'Céramique couleur développée', 'Chroma Forged Technology', 'Céramiques polychromes'], ['Design Innovation', 'Matériaux Exclusifs']],
  ['O', 'OMEGA', 'Anti-Magnétisme', ['Master Chronometer certification', 'Résistance 15 000 gauss', 'Spiral Si14 en silicium', 'Nivagauss™ composants'], ['Swatch Group', 'Certification METAS']],
] as const;

const legacyMaterials = [
  ['Acier inoxydable', 'XXe siècle', '316L, résistance à la corrosion, polissage miroir ou brossage satiné', ['Boîtiers & bracelets', 'Couronnes vissées', 'Boucles déployantes', 'Masses oscillantes']],
  ['Or', 'XVIe siècle', 'Or 18K, alliages jaune, rose ou blanc, poids spécifique élevé', ['Boîtiers de prestige', 'Aiguilles et index', 'Ponts décorés', 'Bracelets de luxe']],
  ['Laiton', 'XVIIIe siècle', 'Alliage Cu/Zn, excellente usinabilité, rhodiage ou galvanoplastie', ['Platines & ponts', 'Roues de minuterie', 'Ébauches décoratives', 'Compteurs et modules']],
  ['Titane', 'XXe siècle', 'Grade 2 ou Grade 5, densité 4.5 g/cm³, biocompatible', ['Boîtiers techniques', 'Bracelets légers', 'Vis spéciales', 'Platines allégées']],
  ['Céramique', 'XXIe siècle', 'Zircone, dureté élevée, frittage haute température', ['Lunettes', 'Boîtiers haut de gamme', 'Composants décoratifs']],
  ['Silicium', 'XXIe siècle', 'Monocristallin, procédé DRIE, élasticité élevée, amagnétique', ['Spiraux', 'Ancres', "Roues d'échappement"]],
  ['Rubis synthétique', 'XVIIIe siècle', 'Corindon synthétique, dureté 9 Mohs, faible coefficient de friction', ['Pierres de pivot', 'Balancier', 'Ancre']],
  ['Bois', 'Contemporain', 'Bois nobles stabilisés et traités contre l’humidité', ['Cadrans exclusifs', 'Éléments décoratifs', 'Maquettes pédagogiques']],
  ['Platine', 'XIXe siècle', 'Pt 950, densité 21.5 g/cm³, hypoallergénique', ['Boîtiers de haute horlogerie', 'Masses oscillantes', 'Éditions limitées']],
  ['Saphir', 'XXe siècle', 'Corindon synthétique transparent, dureté 9 Mohs', ['Glaces', 'Fonds transparents', 'Composants de précision']],
  ['Carbone', 'XXIe siècle', 'NTPT ou forged carbon, densité faible et rigidité élevée', ['Boîtiers sportifs', 'Cadrans techniques', 'Composants allégés']],
  ['Bronze', 'Contemporain', 'Alliage Cu/Sn, oxydation naturelle contrôlée et patine évolutive', ['Boîtiers', 'Lunettes plongeuses', 'Éditions spéciales']],
] as const;

export default function MetauxCommunsPage() {
  const [historyKey, setHistoryKey] = useState<keyof typeof history>('16th');
  const [materialKey, setMaterialKey] = useState<keyof typeof traditional>('precious');
  const [districtKey, setDistrictKey] = useState<keyof typeof districts>('geneve');
  const [futureKey, setFutureKey] = useState<keyof typeof future>('environment');

  const currentHistory = history[historyKey];
  const currentMaterial = traditional[materialKey];
  const currentDistrict = districts[districtKey];
  const currentFuture = future[futureKey];

  return (
    <main className="mc-page">
      <div className="mc-topbar"><div className="mc-wrap"><Link href="/materiaux">← Retour aux matériaux</Link><span>Rapport complet · Matériaux horlogers suisses</span></div></div>

      <section className="mc-hero">
        <div className="mc-wrap mc-hero-grid">
          <div className="mc-hero-copy">
            <div className="mc-kicker">Rapport de référence · HorloLearn</div>
            <h1>Excellence et<br /><em>Innovation.</em></h1>
            <h2>dans les Matériaux Horlogers Suisses</h2>
            <p>Une analyse complète de l'écosystème des matériaux horlogers suisses, de la tradition des métaux précieux aux innovations en silicium, céramique et composites.</p>
          </div>
          <figure className="mc-hero-visual"><img src="/assets/images/materials_dashboard.png" alt="Panorama des matériaux horlogers" /><figcaption><span>Or · acier · titane · silicium · carbone</span><strong>La matière comme architecture de précision.</strong></figcaption></figure>
        </div>
      </section>

      <section className="mc-section">
        <div className="mc-wrap">
          <SectionHead n="01" kicker="Résumé exécutif" title="De l’or au silicium." text="Un même écosystème relie savoir-faire artisanal, ingénierie des matériaux, formation, R&D et capacité industrielle." />
          <div className="mc-summary">
            <div>
              <p className="mc-lead">Ce rapport offre une analyse complète et approfondie de l'écosystème des matériaux horlogers suisses, démontrant pourquoi la Suisse demeure une référence majeure en matière d'innovation, de qualité et de savoir-faire.</p>
              <p>De l'or 18 carats et des aciers spéciaux comme le 316L aux super-alliages modernes, au silicium et aux composites en carbone, l'industrie horlogère repousse continuellement les limites de la science des matériaux.</p>
              <div className="mc-keybox"><h3>Points clés</h3><ul><li>Maîtrise des matériaux de l'or au silicium</li><li>Écosystème industriel intégré</li><li>Formation spécialisée et transmission des métiers</li><li>Innovation continue et R&D</li><li>Positionnement international haut de gamme</li></ul></div>
            </div>
            <img src="/assets/images/materials_dashboard.png" alt="Dashboard des matériaux" />
          </div>
        </div>
      </section>

      <section className="mc-section mc-alt" id="history">
        <div className="mc-wrap">
          <SectionHead n="02" kicker="Chronologie historique" title="Cinq siècles de matière." text="L’évolution des matériaux horlogers du XVIe siècle à aujourd’hui." />
          <div className="mc-two-col">
            <img className="mc-feature-image" src="/assets/images/chronologie_historique.png" alt="Chronologie des matériaux horlogers" />
            <div className="mc-panel">
              <Tabs keys={Object.keys(history)} active={historyKey} onChange={(key) => setHistoryKey(key as keyof typeof history)} labels={Object.fromEntries(Object.entries(history).map(([k,v]) => [k,v.label]))} />
              <h3>{currentHistory.title}</h3><p>{currentHistory.text}</p>
              {currentHistory.bullets.length > 0 && <ul className="mc-list">{currentHistory.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}
              <div className="mc-tags">{currentHistory.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mc-section" id="materials">
        <div className="mc-wrap">
          <SectionHead n="03" kicker="Matériaux traditionnels" title="Les piliers historiques." text="Métaux précieux, aciers spéciaux, alliages de précision et savoir-faire artisanal." />
          <Tabs keys={Object.keys(traditional)} active={materialKey} onChange={(key) => setMaterialKey(key as keyof typeof traditional)} labels={Object.fromEntries(Object.entries(traditional).map(([k,v]) => [k,v.label]))} />
          {'items' in currentMaterial ? (
            <div className="mc-card-grid">{currentMaterial.items.map((item) => <MaterialCard key={item.name} item={item} />)}</div>
          ) : (
            <div className="mc-craft"><img src={currentMaterial.image} alt="Atelier artisanal traditionnel" /><div><h3>Techniques artisanales emblématiques</h3><div className="mc-tech-grid">{currentMaterial.techniques.map(([icon,name,text]) => <article key={name}><span>{icon}</span><h4>{name}</h4><p>{text}</p></article>)}</div></div></div>
          )}
        </div>
      </section>

      <section className="mc-section mc-alt">
        <div className="mc-wrap">
          <SectionHead n="04" kicker="Innovation & high-tech" title="Nouveaux matériaux." text="Matériaux modernes, composants électroniques et miniaturisation." />
          <div className="mc-innovation-grid">
            <article className="mc-big-card"><img src="/assets/images/materiaux_hightech_horlogerie.png" alt="Matériaux High-Tech" /><div><h3>Nouveaux Matériaux</h3><InfoBlock title="La Céramique Technique" items={["Dureté extrême", "Légèreté supérieure à l'acier", 'Couleurs stables dans la masse']} /><InfoBlock title="Le Titane Grade 5" items={["40% plus léger que l'acier", 'Résistance corrosion exceptionnelle', 'Hypoallergénique']} /><InfoBlock title="Fibre de Carbone" items={['Légèreté spectaculaire', 'Rigidité incomparable', 'Carbone forgé / Carbon TPT®']} /></div></article>
            <article className="mc-big-card"><div><h3>Révolution Silicium</h3><div className="mc-mini-grid"><span>🧲 Totalement amagnétique</span><span>⚡ Léger et basse inertie</span><span>🔧 Faible besoin de lubrification</span><span>🎯 Précision géométrique micronique</span></div><InfoBlock title="Innovations marquantes" items={['Spiral Silinvar® : recherche sur les organes réglants en silicium', 'Composants silicium : réduction des frottements et meilleure stabilité']} /></div></article>
            <article className="mc-big-card"><div><h3>Composants Électroniques</h3><InfoBlock title="Smartwatches et technologie" items={['SoC : cerveau miniature intégré', 'Capteurs biomédicaux : PPG, ECG, SpO2, température', 'GPS, Bluetooth, Wi‑Fi, 4G/5G', 'Affichage OLED']} /><InfoBlock title="Miniaturisation extrême" items={['System-in-Package (SiP)', 'Packaging 3D et empilement vertical des puces']} /></div></article>
          </div>
        </div>
      </section>

      <section className="mc-section" id="ecosystem">
        <div className="mc-wrap">
          <SectionHead n="05" kicker="Écosystème industriel" title="Les territoires du savoir-faire." text="Districts horlogers, chaîne d’approvisionnement et concentrations de compétences." />
          <div className="mc-two-col">
            <figure className="mc-map"><img src="/assets/images/districts_horlogers_suisse.png" alt="Districts horlogers suisses" /><figcaption><strong>Arc jurassien</strong><span>Concentration géographique du savoir-faire horloger</span></figcaption></figure>
            <div className="mc-panel">
              <Tabs keys={Object.keys(districts)} active={districtKey} onChange={(key) => setDistrictKey(key as keyof typeof districts)} labels={Object.fromEntries(Object.entries(districts).map(([k,v]) => [k,v.label]))} />
              <h3>{currentDistrict.title}</h3><p>{currentDistrict.text}</p><h4>Spécialités</h4><ul className="mc-list">{currentDistrict.specialties.map((item) => <li key={item}>{item}</li>)}</ul><h4>Entreprises</h4><div className="mc-tags">{currentDistrict.companies.map((item) => <span key={item}>{item}</span>)}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mc-section mc-alt">
        <div className="mc-wrap">
          <SectionHead n="06" kicker="Transmission" title="Écoles & parcours." text="Un réseau d’écoles et de spécialisations transmet les gestes, la microtechnique et les standards du métier." />
          <div className="mc-two-col mc-formation"><img className="mc-feature-image" src="/assets/images/formation_horlogere_suisse.png" alt="Formation horlogère suisse" /><div><div className="mc-school-grid">{schools.map(([icon,name,text,tags]) => <article key={name}><span>{icon}</span><h3>{name}</h3><p>{text}</p><div className="mc-tags">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div></article>)}</div><div className="mc-path"><h3>Parcours de formation</h3><div><span>01</span><strong>CFC Horloger</strong><p>Certificat fédéral de capacité — parcours professionnel.</p></div><div><span>02</span><strong>Brevet fédéral</strong><p>Évolution vers des responsabilités techniques et d’atelier.</p></div><div><span>03</span><strong>Formations continues</strong><p>Spécialisations WOSTEP, chronographes, polissage et perfectionnement.</p></div></div></div></div>
        </div>
      </section>

      <section className="mc-section">
        <div className="mc-wrap">
          <SectionHead n="07" kicker="Entreprises leaders" title="L’innovation à l’échelle manufacture." text="Quatre exemples de stratégies matériaux et de recherche appliquée." />
          <div className="mc-companies"><img className="mc-feature-image" src="/assets/images/entreprises_horlogeres_leaders.png" alt="Entreprises horlogères leaders" /><div className="mc-company-grid">{companies.map(([logo,name,area,items,tags]) => <article key={name}><div className="mc-company-head"><span>{logo}</span><h3>{name}</h3></div><h4>{area}</h4><ul className="mc-list">{items.map((item) => <li key={item}>{item}</li>)}</ul><div className="mc-tags">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div></article>)}</div></div>
        </div>
      </section>

      <section className="mc-section mc-alt" id="future">
        <div className="mc-wrap">
          <SectionHead n="08" kicker="Vision d’avenir" title="Trois axes de transformation." text="Défis environnementaux, digitalisation et nouvelles technologies." />
          <div className="mc-two-col"><img className="mc-feature-image" src="/assets/images/innovation_horlogerie_futur.png" alt="Innovation horlogère future" /><div className="mc-panel"><Tabs keys={Object.keys(future)} active={futureKey} onChange={(key) => setFutureKey(key as keyof typeof future)} labels={Object.fromEntries(Object.entries(future).map(([k,v]) => [k,v.label]))} /><h3>{currentFuture.title}</h3><div className="mc-trend-grid">{currentFuture.cards.map(([title,items]) => <InfoBlock key={title} title={title} items={[...items]} />)}</div></div></div>
        </div>
      </section>

      <section className="mc-section">
        <div className="mc-wrap">
          <SectionHead n="09" kicker="Positionnement mondial" title="Trois modèles industriels." text="Une lecture comparative de la Suisse, de l’Allemagne et du Japon." />
          <div className="mc-table"><div className="mc-th"><span>Pays</span><span>Stratégie</span><span>Forces</span><span>Marques</span></div><Country flag="🇨🇭" name="Suisse" strategy="Leadership en valeur · Luxe + innovation matériaux" strengths={['Savoir-faire artisanal', 'Écosystème intégré', 'R&D continue', 'Label Swiss Made']} brands={['Rolex','Patek Philippe','Audemars Piguet','OMEGA']} /><Country flag="🇩🇪" name="Allemagne" strategy="Haute horlogerie mécanique · Rigueur technique" strengths={['Finitions impeccables','Style Glashütte','Perfection mécanique','Esthétique Bauhaus']} brands={['A. Lange & Söhne','Glashütte Original','Nomos']} /><Country flag="🇯🇵" name="Japon" strategy="Innovation technologique · Production de masse" strengths={['Maîtrise du quartz','Technologies hybrides','Intégration verticale','Rapport qualité-prix']} brands={['Seiko','Grand Seiko','Citizen','Casio']} /></div>
          <div className="mc-stat-grid"><div><strong>50%</strong><span>du marché mondial en valeur<br />avec seulement 2% du volume</span></div><div><strong>1200$</strong><span>Prix moyen d’une montre<br />suisse exportée</span></div><div><strong>65k</strong><span>Emplois directs<br />en Suisse en 2024</span></div></div>
        </div>
      </section>

      <section className="mc-section mc-alt">
        <div className="mc-wrap">
          <SectionHead n="10" kicker="Répertoire technique HorloLearn" title="Les matériaux, du composant à l’usage." text="Le contenu technique de l’ancienne page HorloLearn reste intégré directement ici." />
          <div className="mc-legacy-list">{legacyMaterials.map(([name,period,technical,uses], index) => <article key={name}><span className="mc-no">{String(index+1).padStart(2,'0')}</span><div><h3>{name}</h3><small>{period}</small></div><p>{technical}</p><div className="mc-tags">{uses.map((use) => <span key={use}>{use}</span>)}</div></article>)}</div>
          <div className="mc-closing"><div><span className="mc-kicker">Approfondir</span><h3>Comparatifs, PDF et cartes flash.</h3></div><Link href="/materiaux/guide-complet">Ouvrir le guide complet →</Link></div>
        </div>
      </section>

      <style jsx global>{`
        .mc-page{background:var(--hl-bg);color:var(--hl-ink);min-height:100vh}.mc-page *{box-sizing:border-box}.mc-wrap{width:min(1420px,calc(100% - 48px));margin:0 auto}.mc-topbar{border-bottom:1px solid var(--hl-line);background:var(--hl-bg)}.mc-topbar .mc-wrap{min-height:58px;display:flex;align-items:center;justify-content:space-between;gap:24px}.mc-topbar a{font-size:13px;font-weight:650}.mc-topbar a:hover{color:var(--hl-metal)}.mc-topbar span{color:var(--hl-muted);font:9px monospace;text-transform:uppercase;letter-spacing:.14em}.mc-kicker{color:var(--hl-metal);font:10px/1.3 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.18em;text-transform:uppercase}.mc-hero{border-bottom:1px solid var(--hl-line)}.mc-hero-grid{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(460px,.95fr);min-height:76vh}.mc-hero-copy{padding:96px 72px 82px 0;display:flex;flex-direction:column;justify-content:center}.mc-hero h1{font:500 clamp(66px,7.2vw,118px)/.84 Georgia,'Times New Roman',serif;letter-spacing:-.06em;margin:20px 0 18px}.mc-hero h1 em{font-style:normal;color:var(--hl-metal)}.mc-hero h2{font:500 clamp(28px,3vw,48px)/1 Georgia,serif;color:var(--hl-muted);margin:0 0 28px}.mc-hero-copy>p{max-width:760px;color:var(--hl-muted);font-size:17px;line-height:1.72}.mc-hero-visual{position:relative;margin:0;min-height:650px;overflow:hidden;background:#0a0d10;border-left:1px solid var(--hl-line)}.mc-hero-visual img{width:100%;height:100%;display:block;object-fit:cover;filter:saturate(.74) brightness(.66)}.mc-hero-visual:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.06),rgba(0,0,0,.16) 45%,rgba(0,0,0,.86))}.mc-hero-visual figcaption{position:absolute;z-index:2;left:28px;right:28px;bottom:28px;color:#f3efe7}.mc-hero-visual figcaption span{color:#dcc18e;font:9px monospace;text-transform:uppercase;letter-spacing:.13em}.mc-hero-visual figcaption strong{display:block;margin-top:10px;font:500 34px/1.04 Georgia,serif}.mc-section{padding:112px 0;border-bottom:1px solid var(--hl-line)}.mc-alt{background:var(--hl-bg-soft)}.mc-head{display:grid;grid-template-columns:90px minmax(0,1fr) minmax(260px,.54fr);gap:42px;margin-bottom:50px;align-items:start}.mc-head-no{color:var(--hl-metal);font:10px monospace;padding-top:9px}.mc-head h2{font:500 clamp(48px,5.4vw,82px)/.9 Georgia,serif;letter-spacing:-.045em;margin:0}.mc-head p{margin:18px 0 0;color:var(--hl-muted);font-size:15px;line-height:1.7}.mc-head-note{border-top:1px solid var(--hl-line);padding-top:14px;color:var(--hl-muted);font-size:12px;line-height:1.65}.mc-summary,.mc-two-col{display:grid;grid-template-columns:minmax(0,1fr) minmax(440px,.88fr);gap:1px;background:var(--hl-line);border:1px solid var(--hl-line)}.mc-summary>div,.mc-panel{background:var(--hl-surface);padding:38px}.mc-summary>img,.mc-feature-image{width:100%;height:100%;min-height:520px;object-fit:cover;display:block;background:#0a0d10}.mc-lead{font:500 26px/1.35 Georgia,serif;color:var(--hl-ink)!important}.mc-summary p,.mc-panel p{color:var(--hl-muted);line-height:1.7}.mc-keybox{margin-top:30px;padding:24px;border-left:2px solid var(--hl-metal);background:var(--hl-bg-soft)}.mc-keybox h3,.mc-panel h3{font:500 31px/1.1 Georgia,serif;margin:0 0 18px}.mc-keybox ul,.mc-list{margin:0;padding:0;list-style:none;display:grid;gap:9px}.mc-keybox li,.mc-list li{position:relative;padding-left:18px;color:var(--hl-muted)}.mc-keybox li:before,.mc-list li:before{content:'—';position:absolute;left:0;color:var(--hl-metal)}.mc-tabs{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:8px;margin-bottom:30px}.mc-tabs button{padding:12px 10px;border:1px solid var(--hl-line);background:var(--hl-bg);color:var(--hl-ink);cursor:pointer}.mc-tabs button.active{background:var(--hl-metal);border-color:var(--hl-metal);color:var(--hl-bg)}.mc-tags{display:flex;flex-wrap:wrap;gap:6px}.mc-tags span{border:1px solid var(--hl-line);padding:6px 9px;color:var(--hl-muted);font-size:10px}.mc-panel h4{font:500 18px Georgia,serif;color:var(--hl-metal);margin:24px 0 10px}.mc-card-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--hl-line);border:1px solid var(--hl-line)}.mc-material-card{background:var(--hl-surface);padding:30px}.mc-material-card .icon{font-size:28px}.mc-material-card h3{font:500 30px Georgia,serif;margin:12px 0 22px}.mc-properties{border-top:1px solid var(--hl-line)}.mc-properties div{display:grid;grid-template-columns:110px 1fr;gap:14px;padding:12px 0;border-bottom:1px solid var(--hl-line)}.mc-properties span:first-child{font-weight:650}.mc-properties span:last-child{color:var(--hl-muted)}.mc-material-card h4,.mc-big-card h4{font:500 18px Georgia,serif;color:var(--hl-metal);margin:22px 0 10px}.mc-craft{display:grid;grid-template-columns:.9fr 1.1fr;gap:1px;background:var(--hl-line);border:1px solid var(--hl-line)}.mc-craft>img{width:100%;height:100%;min-height:620px;object-fit:cover}.mc-craft>div{background:var(--hl-surface);padding:36px}.mc-craft h3{font:500 34px Georgia,serif}.mc-tech-grid,.mc-mini-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:var(--hl-line)}.mc-tech-grid article,.mc-mini-grid span{background:var(--hl-bg);padding:20px}.mc-tech-grid h4{font:500 19px Georgia,serif;margin:8px 0}.mc-tech-grid p{color:var(--hl-muted);font-size:12px;line-height:1.55}.mc-innovation-grid{display:grid;grid-template-columns:1.2fr .8fr .8fr;gap:1px;background:var(--hl-line);border:1px solid var(--hl-line)}.mc-big-card{background:var(--hl-surface);padding:30px}.mc-big-card>img{width:100%;height:260px;object-fit:cover;display:block;margin:-30px -30px 26px;width:calc(100% + 60px)}.mc-big-card h3{font:500 32px Georgia,serif;margin:0 0 22px}.mc-info-block{border-top:1px solid var(--hl-line);padding-top:16px;margin-top:18px}.mc-info-block h4{margin-top:0}.mc-info-block ul{margin:0;padding-left:18px;color:var(--hl-muted);display:grid;gap:7px}.mc-map{position:relative;margin:0;min-height:560px;overflow:hidden}.mc-map img{width:100%;height:100%;object-fit:cover}.mc-map figcaption{position:absolute;left:0;right:0;bottom:0;padding:24px;background:linear-gradient(transparent,rgba(0,0,0,.82));color:#fff}.mc-map strong{display:block;font:500 26px Georgia,serif}.mc-map span{font-size:12px;color:#d1cbc1}.mc-formation{background:transparent;border:0;gap:36px}.mc-school-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:var(--hl-line);border:1px solid var(--hl-line)}.mc-school-grid article,.mc-company-grid article{background:var(--hl-surface);padding:24px}.mc-school-grid article>span{font-size:24px}.mc-school-grid h3,.mc-company-grid h3{font:500 24px Georgia,serif;margin:9px 0}.mc-school-grid p{color:var(--hl-muted);font-size:12px;line-height:1.6}.mc-path{margin-top:28px;border-top:1px solid var(--hl-line)}.mc-path>h3{font:500 27px Georgia,serif}.mc-path>div{display:grid;grid-template-columns:42px 180px 1fr;gap:16px;padding:16px 0;border-bottom:1px solid var(--hl-line)}.mc-path span{color:var(--hl-metal);font:9px monospace}.mc-path p{margin:0;color:var(--hl-muted);font-size:12px}.mc-companies{display:grid;grid-template-columns:.72fr 1.28fr;gap:36px}.mc-companies>.mc-feature-image{min-height:760px}.mc-company-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:var(--hl-line);border:1px solid var(--hl-line)}.mc-company-head{display:flex;align-items:center;gap:12px}.mc-company-head>span{width:44px;height:44px;display:grid;place-items:center;border:1px solid var(--hl-metal);color:var(--hl-metal);font-weight:700}.mc-company-grid h4{color:var(--hl-metal);font-size:13px;text-transform:uppercase;letter-spacing:.08em}.mc-trend-grid{display:grid;gap:1px;background:var(--hl-line)}.mc-trend-grid .mc-info-block{background:var(--hl-bg);padding:20px;margin:0;border:0}.mc-table{border:1px solid var(--hl-line);overflow:hidden}.mc-th,.mc-country{display:grid;grid-template-columns:1fr 1.55fr 1.8fr 1.65fr}.mc-th{background:var(--hl-metal);color:var(--hl-bg);font-weight:700}.mc-th span,.mc-country>div{padding:18px}.mc-country{background:var(--hl-surface);border-top:1px solid var(--hl-line)}.mc-country .name{font-weight:700}.mc-country p{margin:0;color:var(--hl-muted);line-height:1.55}.mc-country .brands{display:flex;flex-wrap:wrap;gap:6px}.mc-country .brands span{border:1px solid var(--hl-line);padding:5px 7px;font-size:10px}.mc-stat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--hl-line);margin-top:34px}.mc-stat-grid>div{background:var(--hl-surface);padding:32px;text-align:center}.mc-stat-grid strong{display:block;color:var(--hl-metal);font:500 48px Georgia,serif}.mc-stat-grid span{color:var(--hl-muted);font-size:12px;line-height:1.55}.mc-legacy-list{border-top:1px solid var(--hl-line)}.mc-legacy-list article{display:grid;grid-template-columns:45px 190px 1.15fr 1fr;gap:20px;align-items:center;padding:21px 0;border-bottom:1px solid var(--hl-line)}.mc-no{color:var(--hl-metal);font:9px monospace}.mc-legacy-list h3{font:500 22px Georgia,serif;margin:0}.mc-legacy-list small{color:var(--hl-muted)}.mc-legacy-list p{margin:0;color:var(--hl-muted);font-size:12px;line-height:1.6}.mc-closing{margin-top:52px;border-top:1px solid var(--hl-line);border-bottom:1px solid var(--hl-line);padding:28px 0;display:flex;justify-content:space-between;align-items:center;gap:24px}.mc-closing h3{font:500 29px Georgia,serif;margin:7px 0 0}.mc-closing a{color:var(--hl-metal);font:9px monospace;text-transform:uppercase;letter-spacing:.12em}@media(max-width:1050px){.mc-hero-grid,.mc-summary,.mc-two-col,.mc-craft,.mc-companies{grid-template-columns:1fr}.mc-hero-copy{padding-right:0}.mc-hero-visual{border-left:0;border-top:1px solid var(--hl-line);min-height:500px}.mc-head{grid-template-columns:65px 1fr}.mc-head-note{grid-column:2}.mc-card-grid,.mc-innovation-grid{grid-template-columns:1fr 1fr}.mc-company-grid{grid-template-columns:1fr}.mc-companies>.mc-feature-image{min-height:520px}.mc-th,.mc-country{grid-template-columns:1fr 1fr}.mc-th span:nth-child(n+3){display:none}.mc-country>div:nth-child(n+3){grid-column:auto}.mc-legacy-list article{grid-template-columns:40px 170px 1fr}.mc-legacy-list .mc-tags{grid-column:2 / -1}}@media(max-width:720px){.mc-wrap{width:min(100% - 28px,1420px)}.mc-topbar span{display:none}.mc-hero-copy{padding:66px 0 54px}.mc-hero h1{font-size:clamp(58px,17vw,82px)}.mc-section{padding:80px 0}.mc-head{grid-template-columns:1fr;gap:14px}.mc-head-note{grid-column:1}.mc-card-grid,.mc-innovation-grid,.mc-school-grid,.mc-stat-grid{grid-template-columns:1fr}.mc-tech-grid,.mc-mini-grid{grid-template-columns:1fr}.mc-panel,.mc-summary>div{padding:24px}.mc-path>div{grid-template-columns:34px 1fr}.mc-path p{grid-column:2}.mc-th{display:none}.mc-country{grid-template-columns:1fr}.mc-country>div{border-bottom:1px solid var(--hl-line)}.mc-legacy-list article{grid-template-columns:34px 1fr}.mc-legacy-list p,.mc-legacy-list .mc-tags{grid-column:2}.mc-closing{flex-direction:column;align-items:flex-start}}
      `}</style>
    </main>
  );
}

function SectionHead({ n, kicker, title, text }: { n: string; kicker: string; title: string; text: string }) {
  return <header className="mc-head"><div className="mc-head-no">{n} / 10</div><div><div className="mc-kicker">{kicker}</div><h2>{title}</h2><p>{text}</p></div><div className="mc-head-note">Rapport intégré directement dans HorloLearn — sans iframe ni page HTML intermédiaire.</div></header>;
}

function Tabs({ keys, active, onChange, labels }: { keys: string[]; active: string; onChange: (key: Key) => void; labels: Record<string,string> }) {
  return <div className="mc-tabs">{keys.map((key) => <button key={key} className={active === key ? 'active' : ''} onClick={() => onChange(key)}>{labels[key]}</button>)}</div>;
}

function MaterialCard({ item }: { item: { icon: string; name: string; props: readonly (readonly [string,string])[]; uses: readonly string[] } }) {
  return <article className="mc-material-card"><span className="icon">{item.icon}</span><h3>{item.name}</h3><div className="mc-properties">{item.props.map(([label,value]) => <div key={label}><span>{label}</span><span>{value}</span></div>)}</div><h4>Applications</h4><ul className="mc-list">{item.uses.map((use) => <li key={use}>{use}</li>)}</ul></article>;
}

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  return <div className="mc-info-block"><h4>{title}</h4><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></div>;
}

function Country({ flag, name, strategy, strengths, brands }: { flag: string; name: string; strategy: string; strengths: string[]; brands: string[] }) {
  return <div className="mc-country"><div className="name">{flag} {name}</div><div><p>{strategy}</p></div><div><p>{strengths.map((item) => `• ${item}`).join('\n')}</p></div><div className="brands">{brands.map((brand) => <span key={brand}>{brand}</span>)}</div></div>;
}
