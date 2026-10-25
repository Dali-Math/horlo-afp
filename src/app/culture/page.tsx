"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";

type Horloger = {
  nom: string;
  anneeFondation?: string;
  periode?: string;
  ville?: string;
  bio: string;
  imageUrl: string;
};

type Personality = {
  nom: string;
  epoque: string;
  anneesVie: string;
  specialite: string;
  description: string;
  biographieComplete: string;
  image: string;
  contribution: string;
};

const timeline = [
  ["3500 av. J.-C.", "Cadrans solaires", "Les premières méthodes de mesure du temps utilisent l’ombre du soleil pour indiquer les heures de la journée."],
  ["1400", "Horloges mécaniques", "Apparition des premières horloges mécaniques dans les églises et tours municipales européennes."],
  ["1510", "Montre portable", "Peter Henlein crée les premières montres portables, marquant le début de l’horlogerie personnelle."],
  ["1675", "Spiral réglant", "Christian Huygens invente le spiral réglant, révolutionnant la précision horlogère."],
  ["1755", "Échappement à ancre", "Thomas Mudge perfectionne l’échappement à ancre, amélioration majeure de la régulation."],
  ["1839", "Patek Philippe", "Fondation de Patek Philippe, l’une des manufactures horlogères les plus prestigieuses."],
  ["1868", "Montre-bracelet", "Patek Philippe crée une montre-bracelet pour la Comtesse Koscowicz de Hongrie."],
  ["1905", "Rolex", "Hans Wilsdorf fonde Rolex et accompagne l’essor de la montre-bracelet moderne."],
  ["1969", "Quartz", "Seiko lance la première montre à quartz de série, transformant profondément l’industrie horlogère."],
  ["2015", "Smartwatch", "L’Apple Watch popularise la montre connectée et rapproche horlogerie, données et services numériques."],
] as const;

const museums = [
  { name: "MIH — Musée International d’Horlogerie", place: "La Chaux-de-Fonds", description: "Collection exceptionnelle retraçant 500 ans d’histoire horlogère.", href: "https://www.chaux-de-fonds.ch/musees/mih" },
  { name: "Patek Philippe Museum", place: "Genève", description: "Collection de montres et automates du XVIe siècle à nos jours.", href: "https://www.patekmuseum.com" },
  { name: "Musée d’horlogerie du Locle — Château des Monts", place: "Le Locle", description: "Un cadre historique consacré à l’horlogerie neuchâteloise.", href: "https://www.chateaudesmonts.ch" },
  { name: "Musée des Arts et Métiers", place: "Paris", description: "Collections techniques comprenant horloges, pendules et instruments de mesure du temps.", href: "https://www.arts-et-metiers.net" },
] as const;

const sources = [
  { title: "Fondation de la Haute Horlogerie", description: "Encyclopédie de l’horlogerie : techniques, histoire et biographies.", href: "https://www.hautehorlogerie.org/en/encyclopaedia/" },
  { title: "British Museum — Horology", description: "Collections historiques d’horloges et de montres du monde entier.", href: "https://www.britishmuseum.org/collection/galleries/horology" },
  { title: "Watch-Wiki", description: "Base collaborative sur les marques, calibres et artisans horlogers.", href: "https://watch-wiki.org/" },
] as const;

const personalities: Personality[] = [
  {
    nom: "Abraham-Louis Breguet",
    epoque: "XVIIIe siècle",
    anneesVie: "1747–1823",
    specialite: "Inventeur du tourbillon",
    description: "Horloger né à Neuchâtel, associé à des innovations majeures qui ont profondément marqué l’horlogerie.",
    biographieComplete: "Abraham-Louis Breguet naît à Neuchâtel en 1747. Son œuvre est liée à des avancées majeures comme le tourbillon, l’échappement naturel et le spiral qui porte son nom. Son approche associe recherche de précision, élégance mécanique et invention.",
    image: "/images/personnalites/breguet.jpg",
    contribution: "Tourbillon · échappement naturel · spiral Breguet",
  },
  {
    nom: "Hans Wilsdorf",
    epoque: "XXe siècle",
    anneesVie: "1881–1960",
    specialite: "Fondateur de Rolex",
    description: "Entrepreneur visionnaire qui accompagne l’essor de la montre-bracelet moderne et de l’étanchéité.",
    biographieComplete: "Hans Wilsdorf fonde son entreprise à Londres en 1905 avant de développer Rolex. Il mise très tôt sur la précision des montres-bracelets et sur l’étanchéité avec l’Oyster, tout en donnant une place nouvelle à la communication horlogère.",
    image: "/images/personnalites/wilsdorf.jpg",
    contribution: "Rolex Oyster · montre-bracelet · chronométrie",
  },
  {
    nom: "Antoni Patek",
    epoque: "XIXe siècle",
    anneesVie: "1812–1877",
    specialite: "Co-fondateur de Patek Philippe",
    description: "Figure fondatrice d’une manufacture devenue l’un des symboles de l’horlogerie genevoise.",
    biographieComplete: "Antoni Patek s’installe à Genève et développe une maison horlogère qui deviendra Patek Philippe après sa rencontre avec Adrien Philippe. La manufacture se distingue rapidement par ses complications et ses pièces de prestige.",
    image: "/images/personnalites/patek.jpg",
    contribution: "Patek Philippe · complications · montres de prestige",
  },
  {
    nom: "George Daniels",
    epoque: "XXe siècle",
    anneesVie: "1926–2011",
    specialite: "Maître horloger indépendant",
    description: "Horloger britannique reconnu pour son approche artisanale complète et l’échappement co-axial.",
    biographieComplete: "George Daniels est l’une des grandes figures de l’horlogerie indépendante du XXe siècle. Il maîtrise de nombreux métiers nécessaires à la fabrication complète d’une montre et développe l’échappement co-axial.",
    image: "/images/personnalites/george-daniels.jpg",
    contribution: "Échappement co-axial · horlogerie artisanale",
  },
  {
    nom: "John Harrison",
    epoque: "XVIIIe siècle",
    anneesVie: "1693–1776",
    specialite: "Chronomètre de marine",
    description: "Horloger britannique dont les chronomètres apportent une réponse décisive au problème de la longitude.",
    biographieComplete: "John Harrison consacre une grande partie de sa vie à la recherche d’un garde-temps suffisamment précis pour déterminer la longitude en mer. Son H4 marque une étape majeure dans l’histoire de la chronométrie maritime.",
    image: "/images/personnalites/john.harrison.jpg",
    contribution: "Chronomètre de marine H4 · précision",
  },
  {
    nom: "Kintarō Hattori",
    epoque: "XIXe siècle",
    anneesVie: "1860–1934",
    specialite: "Fondateur de Seiko",
    description: "Figure essentielle du développement de l’horlogerie japonaise moderne.",
    biographieComplete: "Kintarō Hattori ouvre une boutique d’horlogerie à Tokyo puis fonde Seikosha. Son entreprise donnera naissance à Seiko et jouera un rôle majeur dans l’industrialisation de l’horlogerie japonaise.",
    image: "/images/personnalites/kintaro.hattori.jpg",
    contribution: "Seiko · industrialisation · héritage quartz",
  },
];

const videos = [
  { id: "b58ViTgZQNI", title: "Tout savoir sur le vocabulaire horloger", duration: "12:34" },
  { id: "vz_1rhl1lvY", title: "Régler une montre avec un timegrapher", duration: "13:18" },
  { id: "9_QsCLYs2mY", title: "Comment fonctionne une montre mécanique", duration: "10:21" },
  { id: "tjd6eZc3oRs", title: "Restauration d’une montre ancienne", duration: "18:12" },
] as const;

const books = [
  { title: "L’Horlogerie suisse", description: "Un aperçu historique et technique de l’excellence horlogère helvétique.", href: "https://drive.google.com/file/d/1a6CVAT_aQ55yom734HTry25hbUWkSJKm/preview" },
  { title: "Swiss Horlogerie 2019", description: "Document moderne présentant le savoir-faire, la précision et les métiers de l’horlogerie suisse.", href: "https://drive.google.com/file/d/1pc7-I4fklvulSWPLOvHtLrPS-JxnA2sq/preview" },
  { title: "Manuel de quatrième classe", description: "Ressource pédagogique utilisée dans des cursus horlogers suisses AFP/CFC.", href: "https://drive.google.com/file/d/1q3A-AlPaD5Ro0Hc1T6EhM1HaMQxsfc5q/preview" },
  { title: "Manuel de l’horloger (1863)", description: "Ouvrage classique de Louis M. Le Normand couvrant théorie, échappements et réglages.", href: "https://drive.google.com/file/d/1-VmMkeg7FvgpJqUq7tMnLvRO4yQYQbFq/preview" },
] as const;

export default function CulturePage() {
  const [horlogers, setHorlogers] = useState<Horloger[]>([]);
  const [horlogerQuery, setHorlogerQuery] = useState("");
  const [horlogerPeriod, setHorlogerPeriod] = useState("");
  const [personQuery, setPersonQuery] = useState("");
  const [personPeriod, setPersonPeriod] = useState("");
  const [selectedPerson, setSelectedPerson] = useState<Personality | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [activeBook, setActiveBook] = useState<(typeof books)[number] | null>(null);

  useEffect(() => {
    let alive = true;
    fetch("/data/horlogers.json", { cache: "no-store" })
      .then((res) => res.json())
      .then((data: Horloger[]) => {
        if (alive) setHorlogers(data);
      })
      .catch(() => {
        if (alive) setHorlogers([]);
      });
    return () => {
      alive = false;
    };
  }, []);

  const horlogerPeriods = useMemo(
    () => Array.from(new Set(horlogers.map((h) => h.periode).filter(Boolean) as string[])).sort(),
    [horlogers]
  );

  const filteredHorlogers = useMemo(() => {
    const q = horlogerQuery.trim().toLowerCase();
    return horlogers.filter((h) => {
      const haystack = `${h.nom} ${h.bio} ${h.ville ?? ""} ${h.periode ?? ""}`.toLowerCase();
      const okQuery = !q || haystack.includes(q);
      const okPeriod = !horlogerPeriod || h.periode === horlogerPeriod;
      return okQuery && okPeriod;
    });
  }, [horlogers, horlogerQuery, horlogerPeriod]);

  const filteredPeople = useMemo(() => {
    const q = personQuery.trim().toLowerCase();
    return personalities.filter((p) => {
      const haystack = `${p.nom} ${p.specialite} ${p.contribution}`.toLowerCase();
      const okQuery = !q || haystack.includes(q);
      const okPeriod = !personPeriod || p.epoque === personPeriod;
      return okQuery && okPeriod;
    });
  }, [personQuery, personPeriod]);

  return (
    <main className="culture-editorial">
      <section className="culture-hero" id="ouverture">
        <div className="culture-wrap culture-hero-grid">
          <div className="culture-hero-copy">
            <div className="culture-kicker">Culture & savoir-faire horloger · Dossier éditorial</div>
            <h1>Culture<br /><em>horlogère.</em></h1>
            <p className="culture-hero-lead">Un voyage à travers les arts et métiers du temps — des premiers instruments de mesure aux grandes manufactures, des maîtres horlogers aux musées qui conservent leur mémoire.</p>
            <div className="culture-hero-stats">
              <div><span>Chronologie</span><strong>3500 av. J.-C. → 2015</strong></div>
              <div><span>Patrimoine</span><strong>4 musées</strong></div>
              <div><span>Répertoire</span><strong>{horlogers.length || 12} horlogers</strong></div>
            </div>
          </div>
          <figure className="culture-hero-visual">
            <img src="/images/Patek_Philippe_Swiss_watch_movement_caliber_mechanism_technical_photo.jpg" alt="Mouvement horloger suisse" />
            <figcaption><div className="culture-kicker">Mémoire · geste · précision</div><h2>L’horlogerie comme patrimoine vivant.</h2><p>Une culture faite d’inventions, de transmission, de territoires et de métiers spécialisés.</p></figcaption>
          </figure>
        </div>
      </section>

      <nav className="culture-chapter-nav" aria-label="Sommaire Culture horlogère"><div className="culture-wrap"><a href="#timeline">01 Chronologie</a><a href="#histoire">02 Histoire</a><a href="#musees">03 Musées</a><a href="#horlogers">04 Horlogers</a><a href="#personnalites">05 Personnalités</a><a href="#videos">06 Vidéos</a><a href="#bibliotheque">07 Bibliothèque</a></div></nav>

      <section className="culture-chapter" id="timeline"><div className="culture-wrap">
        <ChapterHead number="01 / 07" kicker="Ligne du temps" title={<>Mesurer le temps,<br />siècle après siècle.</>} text="Une lecture continue des jalons déjà présents dans HorloLearn, sans cartes répétitives : chaque rupture technique devient un chapitre de l’histoire du temps." note="Précision, portabilité, autonomie et nouveaux usages : chaque étape transforme notre rapport au temps." />
        <div className="culture-timeline">{timeline.map(([year, title, text]) => <article className="culture-event" key={`${year}-${title}`}><div className="culture-event-year">{year}</div><div className="culture-event-title">{title}</div><p>{text}</p></article>)}</div>
      </div></section>

      <section className="culture-chapter" id="histoire"><div className="culture-wrap">
        <ChapterHead number="02 / 07" kicker="Histoire & références" title={<>La mémoire<br />du temps.</>} text="Des cadrans solaires aux montres connectées, comprendre l’horlogerie demande aussi de remonter aux collections, aux archives et aux sources." note="Les références déjà présentes sur la page Culture restent accessibles ici dans une présentation plus sobre." />
        <div className="culture-history-grid"><div className="culture-history-statement">L’horlogerie n’est pas seulement une suite d’objets. C’est une <em>histoire de précision</em>, de transmission et d’inventions qui modifient notre manière d’habiter le temps.</div><div className="culture-source-list">{sources.map((source, index) => <a href={source.href} target="_blank" rel="noopener noreferrer" className="culture-source" key={source.href}><span className="culture-index">{String(index + 1).padStart(2, "0")}</span><div><strong>{source.title}</strong><p>{source.description}</p></div><span className="culture-arrow">↗</span></a>)}</div></div>
      </div></section>

      <section className="culture-chapter" id="musees"><div className="culture-wrap">
        <ChapterHead number="03 / 07" kicker="Patrimoine" title={<>Les lieux qui<br />conservent le temps.</>} text="Collections, automates, montres, horloges et instruments de mesure : le patrimoine horloger se comprend aussi devant les pièces originales." note="Quatre institutions déjà référencées sur HorloLearn, traitées ici comme des destinations culturelles plutôt que comme une grille de cartes." />
        <div className="culture-museum-list">{museums.map((museum, index) => <a className="culture-museum" href={museum.href} target="_blank" rel="noopener noreferrer" key={museum.href}><span className="culture-index">{String(index + 1).padStart(2, "0")}</span><div><h3>{museum.name}</h3><span>{museum.place}</span></div><p>{museum.description}</p><span className="culture-arrow">↗</span></a>)}</div>
      </div></section>

      <section className="culture-chapter" id="horlogers"><div className="culture-wrap">
        <ChapterHead number="04 / 07" kicker="Répertoire" title={<>Les maîtres<br />et maisons historiques.</>} text="Le répertoire actuel est conservé avec sa recherche et son filtrage, mais présenté comme un catalogue documentaire plutôt que comme une mosaïque de cartes." note={`${filteredHorlogers.length} entrée${filteredHorlogers.length > 1 ? "s" : ""} affichée${filteredHorlogers.length > 1 ? "s" : ""}.`} />
        <div className="culture-controls"><input value={horlogerQuery} onChange={(e) => setHorlogerQuery(e.target.value)} placeholder="Rechercher un horloger, une ville, une innovation…" /><select value={horlogerPeriod} onChange={(e) => setHorlogerPeriod(e.target.value)}><option value="">Toutes les périodes</option>{horlogerPeriods.map((period) => <option value={period} key={period}>{period}</option>)}</select></div>
        <div className="culture-directory">{filteredHorlogers.map((h, index) => <article className="culture-directory-row" key={`${h.nom}-${index}`}><span className="culture-index">{String(index + 1).padStart(2, "0")}</span><img src={h.imageUrl} alt={h.nom} onError={(e) => { e.currentTarget.src = "/images/Geneva_Clock_Tower_Architectural_Detail_Swiss_Horology.jpg"; }} /><div className="culture-directory-main"><div className="culture-directory-meta">{h.periode || "Période non précisée"} · {h.ville || "Suisse"}</div><h3>{h.nom}</h3><p>{h.bio}</p></div><div className="culture-directory-year"><span>Repère</span><strong>{h.anneeFondation || "—"}</strong></div></article>)}{filteredHorlogers.length === 0 && <div className="culture-empty">Aucun résultat pour ces critères.</div>}</div>
      </div></section>

      <section className="culture-chapter" id="personnalites"><div className="culture-wrap">
        <ChapterHead number="05 / 07" kicker="Portraits" title={<>Ceux qui ont<br />changé l’horlogerie.</>} text="Six figures déjà présentes dans la page Culture, avec recherche et filtre par époque, dans un traitement plus documentaire." note="Cliquer sur un portrait ouvre une biographie courte sans quitter la page." />
        <div className="culture-controls"><input value={personQuery} onChange={(e) => setPersonQuery(e.target.value)} placeholder="Rechercher un nom ou une spécialité…" /><select value={personPeriod} onChange={(e) => setPersonPeriod(e.target.value)}><option value="">Toutes les périodes</option><option>XVIIIe siècle</option><option>XIXe siècle</option><option>XXe siècle</option></select></div>
        <div className="culture-people">{filteredPeople.map((person) => <button className="culture-person" key={person.nom} onClick={() => setSelectedPerson(person)}><div className="culture-person-image"><img src={person.image} alt={person.nom} onError={(e) => { e.currentTarget.src = "/images/Geneva_Clock_Tower_Architectural_Detail_Swiss_Horology.jpg"; }} /></div><div className="culture-person-body"><div className="culture-person-meta">{person.anneesVie} · {person.epoque}</div><h3>{person.nom}</h3><p>{person.description}</p><div className="culture-person-contrib"><span>Contribution</span><strong>{person.contribution}</strong></div></div></button>)}</div>
      </div></section>

      <section className="culture-chapter" id="videos"><div className="culture-wrap">
        <ChapterHead number="06 / 07" kicker="Vidéos & documentaires" title={<>Voir le geste,<br />écouter l’histoire.</>} text="Les quatre vidéos proposées sur HorloLearn restent accessibles dans une présentation plus cinématographique et moins proche d’une grille YouTube." note="Le lecteur ne se charge qu’au clic pour garder la page légère." />
        <div className="culture-video-grid">{videos.map((video) => <article className="culture-video" key={video.id}><div className="culture-video-frame">{activeVideo === video.id ? <iframe src={`https://www.youtube.com/embed/${video.id}?autoplay=1`} title={video.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /> : <><img src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`} alt="" /><button onClick={() => setActiveVideo(video.id)} aria-label={`Lire ${video.title}`}>▶</button></>}</div><div className="culture-video-copy"><h3>{video.title}</h3><span>{video.duration}</span></div></article>)}</div>
      </div></section>

      <section className="culture-chapter" id="bibliotheque"><div className="culture-wrap">
        <ChapterHead number="07 / 07" kicker="Bibliothèque" title={<>Lire,<br />conserver, transmettre.</>} text="Les ressources déjà intégrées à HorloLearn deviennent des notices éditoriales simples, avec lecteur intégré à la demande." note="Le document sélectionné s’ouvre sous le catalogue sans quitter HorloLearn." />
        <div className="culture-library-grid">{books.map((book, index) => <article className="culture-book" key={book.href}><div className="culture-book-index">OUVRAGE {String(index + 1).padStart(2, "0")}</div><h3>{book.title}</h3><p>{book.description}</p><button onClick={() => setActiveBook(book)}>Lire dans HorloLearn</button></article>)}</div>
        {activeBook && <div className="culture-reader"><div className="culture-reader-head"><div><span>Document sélectionné</span><strong>{activeBook.title}</strong></div><button onClick={() => setActiveBook(null)}>Fermer ×</button></div><iframe src={activeBook.href} title={activeBook.title} allow="autoplay" /></div>}
      </div></section>

      <section className="culture-closing"><div className="culture-wrap culture-closing-grid"><div><div className="culture-kicker">Poursuivre l’exploration</div><h2>De la culture<br />à la mécanique.</h2><p>Retrouvez les autres univers HorloLearn sans transformer la fin de page en nouvelle grille de navigation.</p></div><div className="culture-closing-links"><Link href="/theorie">Théorie</Link><Link href="/pratique">Pratique</Link><Link href="/outils">Outils</Link></div></div></section>

      {selectedPerson && <div className="culture-modal" role="dialog" aria-modal="true" aria-label={selectedPerson.nom} onClick={() => setSelectedPerson(null)}><article onClick={(e) => e.stopPropagation()}><button className="culture-modal-close" onClick={() => setSelectedPerson(null)}>×</button><div className="culture-kicker">{selectedPerson.epoque} · {selectedPerson.anneesVie}</div><h2>{selectedPerson.nom}</h2><h3>{selectedPerson.specialite}</h3><p>{selectedPerson.biographieComplete}</p><div className="culture-modal-contrib"><span>Contribution majeure</span><strong>{selectedPerson.contribution}</strong></div></article></div>}

      <style jsx global>{`
        .culture-editorial{background:var(--hl-bg);color:var(--hl-ink);min-height:100vh;transition:background .2s ease,color .2s ease}.culture-editorial *{box-sizing:border-box}.culture-wrap{width:min(1420px,calc(100% - 48px));margin:0 auto}.culture-kicker{color:var(--hl-metal);font:10px/1.25 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.22em;text-transform:uppercase}.culture-hero{border-bottom:1px solid var(--hl-line)}.culture-hero-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(430px,.76fr);min-height:78vh}.culture-hero-copy{padding:92px 72px 76px 0;display:flex;flex-direction:column;justify-content:center}.culture-hero h1{margin:24px 0 28px;font-family:Georgia,'Times New Roman',serif;font-size:clamp(64px,8vw,124px);line-height:.84;letter-spacing:-.058em;font-weight:500}.culture-hero h1 em{font-style:normal;color:var(--hl-metal)}.culture-hero-lead{max-width:700px;color:var(--hl-muted);font-size:18px;line-height:1.7}.culture-hero-stats{margin-top:46px;display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid var(--hl-line);border-bottom:1px solid var(--hl-line)}.culture-hero-stats div{padding:18px 16px 18px 0}.culture-hero-stats div+div{border-left:1px solid var(--hl-line);padding-left:18px}.culture-hero-stats span{display:block;color:var(--hl-muted);font:9px monospace;text-transform:uppercase;letter-spacing:.13em}.culture-hero-stats strong{display:block;margin-top:7px;font-family:Georgia,serif;font-size:22px;font-weight:500}.culture-hero-visual{position:relative;overflow:hidden;min-height:650px;background:#0b0e11;border-left:1px solid var(--hl-line);margin:0}.culture-hero-visual img{width:100%;height:100%;object-fit:cover;display:block;filter:saturate(.7) contrast(1.08) brightness(.68)}.culture-hero-visual:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(8,10,12,.15),rgba(8,10,12,.15) 50%,rgba(8,10,12,.88))}.culture-hero-visual figcaption{position:absolute;z-index:2;left:30px;right:30px;bottom:30px;color:#f3efe7}.culture-hero-visual figcaption .culture-kicker{color:#d5b576}.culture-hero-visual h2{font:500 38px/1 Georgia,serif;margin:10px 0 8px}.culture-hero-visual p{margin:0;color:#c5beb3;font-size:13px;line-height:1.6;max-width:500px}.culture-chapter-nav{position:sticky;top:64px;z-index:30;background:color-mix(in srgb,var(--hl-bg) 94%,transparent);backdrop-filter:blur(15px);border-bottom:1px solid var(--hl-line)}.culture-chapter-nav .culture-wrap{display:flex;align-items:center;overflow-x:auto}.culture-chapter-nav a{flex:0 0 auto;padding:15px 18px;border-right:1px solid var(--hl-line);color:var(--hl-muted);font:9px monospace;text-transform:uppercase;letter-spacing:.12em;transition:.2s}.culture-chapter-nav a:first-child{border-left:1px solid var(--hl-line)}.culture-chapter-nav a:hover{color:var(--hl-ink);background:var(--hl-surface)}.culture-chapter{padding:118px 0;border-bottom:1px solid var(--hl-line);scroll-margin-top:120px}.culture-chapter-head{display:grid;grid-template-columns:120px minmax(0,1.15fr) minmax(280px,.55fr);gap:42px;align-items:start;margin-bottom:58px}.culture-chapter-no{color:var(--hl-metal);font:11px monospace;letter-spacing:.15em;padding-top:9px}.culture-chapter-title h2{font-family:Georgia,'Times New Roman',serif;font-size:clamp(50px,6vw,88px);line-height:.9;letter-spacing:-.048em;font-weight:500;margin:0}.culture-chapter-title p{max-width:740px;color:var(--hl-muted);font-size:16px;line-height:1.7;margin:22px 0 0}.culture-chapter-note{border-top:1px solid var(--hl-line);padding-top:17px;color:var(--hl-muted);font-size:12px;line-height:1.65}.culture-timeline{border-top:1px solid var(--hl-line)}.culture-event{display:grid;grid-template-columns:160px minmax(220px,.45fr) minmax(0,1fr);gap:34px;padding:26px 0;border-bottom:1px solid var(--hl-line);align-items:baseline;transition:.18s}.culture-event:hover{background:var(--hl-surface);padding-left:16px;padding-right:16px}.culture-event-year{font:10px monospace;color:var(--hl-metal);letter-spacing:.08em}.culture-event-title{font-family:Georgia,serif;font-size:25px;font-weight:500}.culture-event p{margin:0;color:var(--hl-muted);font-size:13px;line-height:1.6}.culture-history-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:70px}.culture-history-statement{font-family:Georgia,'Times New Roman',serif;font-size:clamp(28px,3.2vw,46px);line-height:1.17;letter-spacing:-.025em}.culture-history-statement em{color:var(--hl-metal);font-style:normal}.culture-source-list{border-top:1px solid var(--hl-line)}.culture-source{display:grid;grid-template-columns:42px 1fr 24px;gap:16px;padding:20px 0;border-bottom:1px solid var(--hl-line);align-items:start}.culture-index{color:var(--hl-metal);font:9px monospace}.culture-source strong{display:block;font-family:Georgia,serif;font-size:20px;font-weight:500}.culture-source p{margin:6px 0 0;color:var(--hl-muted);font-size:12px;line-height:1.55}.culture-arrow{color:var(--hl-metal);font-size:20px}.culture-museum-list{border-top:1px solid var(--hl-line)}.culture-museum{display:grid;grid-template-columns:70px minmax(0,1.05fr) minmax(0,.9fr) 50px;gap:26px;padding:29px 0;border-bottom:1px solid var(--hl-line);align-items:center;transition:.18s}.culture-museum:hover{padding-left:18px;padding-right:18px;background:var(--hl-surface)}.culture-museum h3{font:500 27px/1.07 Georgia,serif;margin:0}.culture-museum h3+span{display:block;margin-top:7px;color:var(--hl-metal);font:9px monospace;text-transform:uppercase;letter-spacing:.1em}.culture-museum p{margin:0;color:var(--hl-muted);font-size:13px;line-height:1.55}.culture-controls{display:grid;grid-template-columns:1fr 260px;gap:12px;margin-bottom:25px}.culture-controls input,.culture-controls select{width:100%;background:transparent;color:var(--hl-ink);border:1px solid var(--hl-line);padding:13px 14px;outline:none}.culture-controls input:focus,.culture-controls select:focus{border-color:var(--hl-metal)}.culture-directory{border-top:1px solid var(--hl-line)}.culture-directory-row{display:grid;grid-template-columns:48px 120px minmax(0,1fr) 130px;gap:22px;align-items:center;padding:18px 0;border-bottom:1px solid var(--hl-line)}.culture-directory-row img{width:120px;height:86px;object-fit:cover;filter:saturate(.75);background:var(--hl-bg-soft)}.culture-directory-meta{color:var(--hl-metal);font:8px monospace;text-transform:uppercase;letter-spacing:.1em}.culture-directory-main h3{font:500 24px/1.05 Georgia,serif;margin:7px 0 8px}.culture-directory-main p{margin:0;color:var(--hl-muted);font-size:12.5px;line-height:1.6}.culture-directory-year{border-left:1px solid var(--hl-line);padding-left:18px}.culture-directory-year span{display:block;color:var(--hl-muted);font:8px monospace;text-transform:uppercase;letter-spacing:.12em}.culture-directory-year strong{display:block;margin-top:5px;font:500 22px Georgia,serif}.culture-empty{padding:45px 0;color:var(--hl-muted);text-align:center;border-bottom:1px solid var(--hl-line)}.culture-people{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid var(--hl-line);border-left:1px solid var(--hl-line)}.culture-person{appearance:none;border:0;border-right:1px solid var(--hl-line);border-bottom:1px solid var(--hl-line);background:var(--hl-surface);color:var(--hl-ink);padding:0;text-align:left;cursor:pointer;display:flex;flex-direction:column;min-height:510px}.culture-person-image{height:265px;overflow:hidden;background:#0b0e11}.culture-person-image img{width:100%;height:100%;object-fit:cover;filter:saturate(.75);transition:transform .5s ease,filter .3s ease}.culture-person:hover img{transform:scale(1.025);filter:saturate(.95)}.culture-person-body{padding:24px;display:flex;flex-direction:column;flex:1}.culture-person-meta{color:var(--hl-metal);font:9px monospace;letter-spacing:.12em;text-transform:uppercase}.culture-person h3{font:500 29px/1 Georgia,serif;margin:13px 0 10px}.culture-person p{margin:0;color:var(--hl-muted);font-size:12.5px;line-height:1.6}.culture-person-contrib{margin-top:auto;padding-top:18px;border-top:1px solid var(--hl-line)}.culture-person-contrib span{display:block;color:var(--hl-muted);font:8px monospace;text-transform:uppercase;letter-spacing:.12em}.culture-person-contrib strong{display:block;margin-top:7px;font-family:Georgia,serif;font-size:16px;font-weight:500}.culture-video-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:var(--hl-line);border:1px solid var(--hl-line)}.culture-video{background:var(--hl-surface)}.culture-video-frame{aspect-ratio:16/9;background:#080b0e;position:relative;overflow:hidden}.culture-video-frame img{width:100%;height:100%;object-fit:cover;display:block;filter:saturate(.72) brightness(.72)}.culture-video-frame:after{content:'';position:absolute;inset:0;background:linear-gradient(transparent 40%,rgba(0,0,0,.55));pointer-events:none}.culture-video-frame button{position:absolute;z-index:2;left:50%;top:50%;transform:translate(-50%,-50%);width:68px;height:68px;border-radius:50%;border:1px solid rgba(230,200,140,.55);background:rgba(8,10,12,.65);color:#e4c78e;cursor:pointer;font-size:24px}.culture-video-frame iframe{position:absolute;inset:0;width:100%;height:100%;border:0;z-index:3}.culture-video-copy{padding:21px 23px 24px;display:grid;grid-template-columns:1fr auto;gap:18px;align-items:start}.culture-video h3{font:500 22px/1.15 Georgia,serif;margin:0}.culture-video-copy span{font:9px monospace;color:var(--hl-metal);padding-top:4px}.culture-library-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:var(--hl-line);border:1px solid var(--hl-line)}.culture-book{background:var(--hl-surface);padding:30px;min-height:250px;display:flex;flex-direction:column}.culture-book-index{color:var(--hl-metal);font:9px monospace;letter-spacing:.14em}.culture-book h3{font:500 28px/1.04 Georgia,serif;margin:22px 0 12px}.culture-book p{color:var(--hl-muted);font-size:13px;line-height:1.65;margin:0;max-width:500px}.culture-book button{margin-top:auto;padding:24px 0 0;border:0;background:transparent;color:var(--hl-metal);font:9px monospace;text-transform:uppercase;letter-spacing:.13em;text-align:left;cursor:pointer}.culture-book button:before{content:'';display:inline-block;width:42px;height:1px;background:var(--hl-metal);vertical-align:middle;margin-right:12px}.culture-reader{margin-top:26px;border:1px solid var(--hl-line);background:var(--hl-surface)}.culture-reader-head{display:flex;justify-content:space-between;gap:20px;align-items:center;padding:16px 18px;border-bottom:1px solid var(--hl-line)}.culture-reader-head span{display:block;color:var(--hl-muted);font:8px monospace;text-transform:uppercase;letter-spacing:.12em}.culture-reader-head strong{display:block;margin-top:4px;font-family:Georgia,serif;font-weight:500}.culture-reader-head button{border:0;background:transparent;color:var(--hl-metal);cursor:pointer}.culture-reader iframe{width:100%;height:720px;border:0;background:white}.culture-closing{padding:90px 0 110px}.culture-closing-grid{display:grid;grid-template-columns:1fr auto;gap:50px;align-items:center;border-top:1px solid var(--hl-line);border-bottom:1px solid var(--hl-line);padding:38px 0}.culture-closing h2{font:500 clamp(38px,4vw,64px)/.95 Georgia,serif;margin:10px 0 0}.culture-closing p{color:var(--hl-muted);margin:14px 0 0;max-width:660px;line-height:1.65}.culture-closing-links{display:flex;gap:8px;flex-wrap:wrap}.culture-closing-links a{border:1px solid var(--hl-line);padding:12px 15px;font:9px monospace;text-transform:uppercase;letter-spacing:.12em}.culture-closing-links a:hover{border-color:var(--hl-metal);color:var(--hl-metal)}.culture-modal{position:fixed;inset:0;z-index:100;background:rgba(0,0,0,.78);backdrop-filter:blur(10px);display:grid;place-items:center;padding:24px}.culture-modal article{position:relative;width:min(720px,100%);max-height:88vh;overflow:auto;background:var(--hl-surface);border:1px solid var(--hl-line);padding:42px}.culture-modal h2{font:500 clamp(40px,6vw,70px)/.95 Georgia,serif;margin:15px 0 9px}.culture-modal h3{font:500 20px Georgia,serif;color:var(--hl-metal);margin:0 0 22px}.culture-modal p{color:var(--hl-muted);line-height:1.75}.culture-modal-close{position:absolute;right:18px;top:15px;border:0;background:transparent;color:var(--hl-ink);font-size:28px;cursor:pointer}.culture-modal-contrib{margin-top:26px;padding-top:18px;border-top:1px solid var(--hl-line)}.culture-modal-contrib span{display:block;color:var(--hl-muted);font:8px monospace;text-transform:uppercase;letter-spacing:.12em}.culture-modal-contrib strong{display:block;margin-top:7px;font-family:Georgia,serif;font-size:19px;font-weight:500}@media(max-width:1050px){.culture-hero-grid,.culture-history-grid{grid-template-columns:1fr}.culture-hero-copy{padding-right:0}.culture-hero-visual{border-left:0;border-top:1px solid var(--hl-line);min-height:500px}.culture-chapter-head{grid-template-columns:80px 1fr}.culture-chapter-note{grid-column:2}.culture-people{grid-template-columns:repeat(2,1fr)}.culture-museum{grid-template-columns:50px 1fr 40px}.culture-museum p{grid-column:2}.culture-video-grid,.culture-library-grid{grid-template-columns:1fr}.culture-directory-row{grid-template-columns:42px 100px 1fr}.culture-directory-row img{width:100px;height:78px}.culture-directory-year{grid-column:3;border-left:0;padding-left:0;padding-top:8px}}@media(max-width:720px){.culture-wrap{width:min(100% - 28px,1420px)}.culture-hero-copy{padding:66px 0 56px}.culture-hero h1{font-size:clamp(56px,18vw,82px)}.culture-hero-stats{grid-template-columns:1fr}.culture-hero-stats div+div{border-left:0;border-top:1px solid var(--hl-line);padding-left:0}.culture-chapter-nav{top:56px}.culture-chapter{padding:82px 0}.culture-chapter-head{grid-template-columns:1fr;gap:14px}.culture-chapter-note{grid-column:1}.culture-event{grid-template-columns:95px 1fr;gap:15px}.culture-event p{grid-column:2}.culture-museum{grid-template-columns:42px 1fr 30px;gap:12px}.culture-controls{grid-template-columns:1fr}.culture-directory-row{grid-template-columns:36px 1fr;align-items:start}.culture-directory-row img{grid-column:2;width:100%;height:170px}.culture-directory-main{grid-column:2}.culture-directory-year{grid-column:2}.culture-people{grid-template-columns:1fr}.culture-person{min-height:0}.culture-closing-grid{grid-template-columns:1fr}.culture-reader iframe{height:560px}}
      `}</style>
    </main>
  );
}

function ChapterHead({ number, kicker, title, text, note }: { number: string; kicker: string; title: ReactNode; text: string; note: string }) {
  return <header className="culture-chapter-head"><div className="culture-chapter-no">{number}</div><div className="culture-chapter-title"><div className="culture-kicker">{kicker}</div><h2>{title}</h2><p>{text}</p></div><div className="culture-chapter-note">{note}</div></header>;
}
