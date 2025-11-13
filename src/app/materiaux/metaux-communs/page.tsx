import React from "react";
import Link from "next/link";

export default function MetauxCommunsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-zinc-100">
      <div className="max-w-6xl mx-auto px-4 py-10 lg:py-16">
        {/* Header */}
        <header className="mb-10 lg:mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-1 text-xs font-medium text-yellow-300 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-yellow-400 animate-pulse" />
            Module Matériaux · Chapitre 2
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-yellow-100">
            Métaux communs utilisés{" "}
            <span className="text-yellow-400">en horlogerie</span>
          </h1>

          <p className="mt-4 max-w-2xl text-sm sm:text-base text-zinc-300">
            Synthèse structurée de ton cours sur les métaux communs : propriétés
            physiques, comportement, alliages et principales utilisations en
            horlogerie.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/pdfs/metaux-communs.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-yellow-500 px-4 py-2 text-xs sm:text-sm font-semibold text-black shadow-lg shadow-yellow-500/30 hover:bg-yellow-400 transition"
            >
              Télécharger le PDF original
              <span aria-hidden>⬇️</span>
            </a>

            <Link
              href="/materiaux"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/60 px-4 py-2 text-xs sm:text-sm font-medium text-zinc-200 hover:border-yellow-500/60 hover:text-yellow-200 transition"
            >
              ← Retour aux matériaux
            </Link>
          </div>
        </header>

        {/* Layout : sommaire + contenu */}
        <div className="lg:grid lg:grid-cols-[260px,1fr] lg:gap-10 xl:gap-14">
          {/* Sommaire */}
          <aside className="mb-10 lg:mb-0">
            <div className="sticky top-20 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4 lg:p-5">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-zinc-400 mb-3">
                Sommaire rapide
              </h2>
              <nav className="space-y-2 text-sm">
                <SectionLink href="#introduction" label="Introduction & métallurgie" />
                <SectionLink href="#fer" label="Fer" />
                <SectionLink href="#aciers" label="Aciers (non/all. / fortement all.)" />
                <SectionLink href="#acier-inox" label="Acier inoxydable" />
                <SectionLink href="#chrome" label="Chrome (Cr)" />
                <SectionLink href="#aluminium" label="Aluminium (Al)" />
                <SectionLink href="#titane" label="Titane (Ti)" />
                <SectionLink href="#nickel" label="Nickel (Ni)" />
                <SectionLink href="#cuivre" label="Cuivre (Cu)" />
                <SectionLink href="#zinc" label="Zinc (Zn)" />
                <SectionLink href="#etain" label="Étain (Sn)" />
                <SectionLink href="#tungstene" label="Tungstène (W)" />
                <SectionLink href="#plomb" label="Plomb (Pb)" />
                <SectionLink href="#laiton" label="Laiton" />
                <SectionLink href="#bronze" label="Bronze" />
                <SectionLink href="#maillechort" label="Maillechort" />
                <SectionLink href="#horlogerie" label="Applications horlogères" />
              </nav>
            </div>
          </aside>

          {/* Contenu principal */}
          <section className="space-y-10 lg:space-y-12 text-sm sm:text-base leading-relaxed">
            {/* INTRO */}
            <article
              id="introduction"
              className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 sm:p-6"
            >
              <SectionTitle
                title="Introduction : métallurgie et sidérurgie"
                badge="Rappel de cours"
              />
              <p className="text-zinc-300 mb-3">
                La métallurgie concerne l’ensemble des opérations qui permettent
                d’obtenir un métal à partir des minerais :
              </p>
              <ul className="list-disc list-inside space-y-1 text-zinc-300">
                <li>Extraction du minerai</li>
                <li>Préparation du minerai (élimination de la gangue)</li>
                <li>Extraction du métal et affinage</li>
                <li>Mise en forme des produits métallurgiques</li>
              </ul>
              <p className="mt-3 text-zinc-300">
                La <span className="text-yellow-300 font-medium">sidérurgie</span>{" "}
                est la branche dédiée au fer, aux fontes et aux aciers.
              </p>
            </article>

            {/* FER */}
            <article
              id="fer"
              className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 sm:p-6"
            >
              <SectionTitle title="Fer (Fe)" badge="Base des aciers" />
              <PropertyGrid
                data={[
                  ["Masse volumique", "≈ 7,86 kg/dm³"],
                  ["Point de fusion", "≈ 1 535 °C"],
                  ["Aspect", "Métal blanc-gris"],
                ]}
              />
              <SubTitle label="Propriétés principales" />
              <ul className="list-disc list-inside space-y-1 text-zinc-300">
                <li>Métal mou, ductile et malléable à l’état pur</li>
                <li>S’oxyde facilement et se corrode sans protection</li>
                <li>Bon conducteur thermique et électrique</li>
                <li>Fer pur magnétisable</li>
                <li>Entièrement recyclable, acceptant de nombreux traitements de surface</li>
              </ul>

              <SubTitle label="Utilisations typiques" />
              <ul className="list-disc list-inside space-y-1 text-zinc-300">
                <li>Armes, outils et structures</li>
                <li>Fer forgé, chemins de fer, carrosseries</li>
                <li>Électroménager et éléments de construction</li>
              </ul>
            </article>

            {/* ACIERS */}
            <article
              id="aciers"
              className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 sm:p-6"
            >
              <SectionTitle title="Aciers : non alliés, faiblement et fortement alliés" />

              <p className="text-zinc-300 mb-3">
                L’acier est un alliage de fer contenant environ{" "}
                <span className="text-yellow-300 font-medium">0,02 % à 2 % de carbone</span>.
                Plus la teneur en carbone est élevée, plus l’acier devient dur et fragile.
              </p>

              <SubTitle label="Rôle du carbone et des éléments d’alliage" />
              <ul className="list-disc list-inside space-y-1 text-zinc-300 mb-4">
                <li>
                  Le carbone permet d’ajuster la{" "}
                  <span className="text-yellow-300">dureté</span> et la{" "}
                  <span className="text-yellow-300">trempabilité</span>.
                </li>
                <li>
                  Des éléments comme le{" "}
                  <span className="text-yellow-300">manganèse, chrome, nickel, molybdène</span>{" "}
                  modifient les propriétés mécaniques, chimiques ou magnétiques.
                </li>
              </ul>

              <div className="grid gap-5 lg:grid-cols-3">
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
                  <h3 className="text-sm font-semibold text-yellow-200 mb-2">
                    Aciers non alliés (au carbone)
                  </h3>
                  <p className="text-zinc-300 mb-2">
                    Carbone ≤ 2 % en masse, utilisés selon leurs caractéristiques
                    mécaniques (limite d’élasticité, rupture…).
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-zinc-300 text-xs sm:text-sm">
                    <li>Type S : usage général</li>
                    <li>Type P : appareils à pression</li>
                    <li>Type L : tubes de conduites</li>
                    <li>Type E : construction mécanique</li>
                    <li>Type R : rails</li>
                  </ul>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
                  <h3 className="text-sm font-semibold text-yellow-200 mb-2">
                    Aciers faiblement alliés
                  </h3>
                  <p className="text-zinc-300 mb-2">
                    Somme des éléments d’alliage &lt; 5 %. Propriétés supérieures aux aciers
                    au carbone ordinaires.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-zinc-300 text-xs sm:text-sm">
                    <li>Aciers trempés et revenus (faible C)</li>
                    <li>Aciers à très haute résistance (C moyen)</li>
                    <li>Aciers à roulement</li>
                  </ul>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
                  <h3 className="text-sm font-semibold text-yellow-200 mb-2">
                    Aciers fortement alliés
                  </h3>
                  <p className="text-zinc-300 mb-2">
                    Somme des éléments d’alliage &gt; 5 %. On y trouve :
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-zinc-300 text-xs sm:text-sm">
                    <li>Aciers inoxydables</li>
                    <li>Aciers rapides (outillage)</li>
                    <li>Aciers résistants à la chaleur</li>
                  </ul>
                </div>
              </div>
            </article>

            {/* ACIER INOX */}
            <article
              id="acier-inox"
              className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 sm:p-6"
            >
              <SectionTitle title="Acier inoxydable en horlogerie" />
              <p className="text-zinc-300 mb-3">
                Un acier inoxydable contient au moins{" "}
                <span className="text-yellow-300 font-medium">≈ 12 % de chrome</span>.
                En horlogerie, il est souvent allié au nickel, parfois au molybdène pour
                réduire les risques d’allergies.
              </p>

              <SubTitle label="Qualités recherchées" />
              <ul className="list-disc list-inside space-y-1 text-zinc-300 mb-3">
                <li>Résistance à la corrosion</li>
                <li>Amagnétique ou faiblement magnétique selon nuance</li>
                <li>Bonne usinabilité</li>
                <li>Déformable à froid</li>
                <li>Excellentes propriétés de polissage</li>
                <li>Couleur uniforme, aspect stable</li>
                <li>Fourniture en barres, feuilles, planches</li>
                <li>Possibilité de recuit après déformation à froid</li>
              </ul>
            </article>

            {/* CHROME */}
            <article
              id="chrome"
              className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 sm:p-6"
            >
              <SectionTitle title="Chrome (Cr)" />
              <PropertyGrid
                data={[
                  ["Masse volumique", "≈ 7,2 kg/dm³"],
                  ["Point de fusion", "≈ 1 857 °C"],
                  ["Aspect", "Blanc légèrement bleuté"],
                ]}
              />
              <SubTitle label="Propriétés" />
              <ul className="list-disc list-inside space-y-1 text-zinc-300">
                <li>Très dur, résistant à l’usure</li>
                <li>Inoxydable à l’air, bonne résistance à la corrosion</li>
              </ul>
              <SubTitle label="Utilisations" />
              <ul className="list-disc list-inside space-y-1 text-zinc-300">
                <li>Revêtements de surface (chromage décoratif ou dur)</li>
                <li>Élément d’alliage dans les aciers inox (12–25 %)</li>
              </ul>
            </article>

            {/* ALUMINIUM */}
            <article
              id="aluminium"
              className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 sm:p-6"
            >
              <SectionTitle title="Aluminium (Al)" />
              <PropertyGrid
                data={[
                  ["Masse volumique", "≈ 2,70 kg/dm³"],
                  ["Point de fusion", "≈ 660 °C"],
                  ["Aspect", "Métal léger, blanc argenté"],
                ]}
              />
              <p className="text-zinc-300 mb-3">
                Obtenu à partir de la bauxite via l’alumine, puis réduction électrolytique.
                Métal recyclable à 100 %.
              </p>
              <SubTitle label="Propriétés" />
              <ul className="list-disc list-inside space-y-1 text-zinc-300">
                <li>Léger, bonne résistance à la corrosion (couche d’oxyde protectrice)</li>
                <li>Bonne conductivité thermique et électrique</li>
                <li>Très malléable et ductile</li>
                <li>Non magnétique et non toxique</li>
              </ul>
              <SubTitle label="Utilisations" />
              <ul className="list-disc list-inside space-y-1 text-zinc-300">
                <li>Toitures, emballages, aérosols</li>
                <li>Machines, structures légères</li>
              </ul>
            </article>

            {/* TITANE */}
            <article
              id="titane"
              className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 sm:p-6"
            >
              <SectionTitle title="Titane (Ti)" />
              <PropertyGrid
                data={[
                  ["Masse volumique", "≈ 4,54 kg/dm³"],
                  ["Point de fusion", "≈ 1 660 °C"],
                  ["Particularité", "≈ 45 % plus léger que l’acier"],
                ]}
              />
              <SubTitle label="Propriétés" />
              <ul className="list-disc list-inside space-y-1 text-zinc-300">
                <li>Excellent rapport résistance mécanique / masse volumique</li>
                <li>Bonne résistance à la chaleur et à la corrosion</li>
                <li>Faible dilatation thermique</li>
                <li>Amagnétique</li>
              </ul>
              <SubTitle label="Utilisations" />
              <ul className="list-disc list-inside space-y-1 text-zinc-300">
                <li>Pièces d’aviation et d’astronautique</li>
                <li>Matériel médical</li>
                <li>Boîtes et composants de montres haut de gamme (légereté + confort)</li>
              </ul>
            </article>

            {/* NICKEL */}
            <article
              id="nickel"
              className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 sm:p-6"
            >
              <SectionTitle title="Nickel (Ni)" />
              <PropertyGrid
                data={[
                  ["Masse volumique", "≈ 8,90 kg/dm³"],
                  ["Point de fusion", "≈ 1 455 °C"],
                ]}
              />
              <SubTitle label="Propriétés" />
              <ul className="list-disc list-inside space-y-1 text-zinc-300">
                <li>Ductile, malléable et très dur</li>
                <li>Très bonne résistance à la corrosion</li>
                <li>Ferromagnétique</li>
                <li>Allergène pour certaines personnes</li>
              </ul>
              <SubTitle label="Utilisations" />
              <ul className="list-disc list-inside space-y-1 text-zinc-300">
                <li>Alliage dans aciers inox</li>
                <li>Nickelage de pièces pour protection anticorrosion</li>
                <li>
                  Alliage Invar (≈ 36 % Ni) pour spiraux et balanciers, très faible dilatation
                  dimensionnelle
                </li>
              </ul>
            </article>

            {/* CUIVRE */}
            <article
              id="cuivre"
              className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 sm:p-6"
            >
              <SectionTitle title="Cuivre (Cu)" />
              <PropertyGrid
                data={[
                  ["Masse volumique", "≈ 8,92 kg/dm³"],
                  ["Point de fusion", "≈ 1 083 °C"],
                ]}
              />
              <SubTitle label="Propriétés" />
              <ul className="list-disc list-inside space-y-1 text-zinc-300">
                <li>Excellent conducteur de chaleur et d’électricité (après l’argent)</li>
                <li>Non magnétique</li>
                <li>Très malléable et ductile</li>
                <li>
                  Forme une couche de vert-de-gris protectrice en atmosphère humide (oxyde
                  superficiel)
                </li>
              </ul>
              <SubTitle label="Utilisations" />
              <ul className="list-disc list-inside space-y-1 text-zinc-300">
                <li>Fils électriques, bobinages</li>
                <li>Toitures, tuyauteries</li>
                <li>Base d’alliages : laiton, bronze, maillechort, alliages or</li>
              </ul>
            </article>

            {/* ZINC */}
            <article
              id="zinc"
              className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 sm:p-6"
            >
              <SectionTitle title="Zinc (Zn)" />
              <PropertyGrid
                data={[
                  ["Masse volumique", "≈ 7,14 kg/dm³"],
                  ["Point de fusion", "≈ 419,5 °C"],
                ]}
              />
              <p className="text-zinc-300 mb-3">
                Métal gris-bleu, souvent utilisé en alliage (laiton) ou comme métal de
                recouvrement.
              </p>
              <SubTitle label="Propriétés" />
              <ul className="list-disc list-inside space-y-1 text-zinc-300">
                <li>Cassant à basse température</li>
                <li>Se moule bien</li>
                <li>Inoxydable à froid et à l’air sec</li>
                <li>Fortement attaqué par certains acides (ex : acide sulfurique)</li>
              </ul>
              <SubTitle label="Utilisations" />
              <ul className="list-disc list-inside space-y-1 text-zinc-300">
                <li>Galvanisation : recouvrement de pièces d’acier (piquets, lampadaires…)</li>
                <li>Revêtements par immersion ou par électrolyse</li>
              </ul>
            </article>

            {/* ETAIN */}
            <article
              id="etain"
              className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 sm:p-6"
            >
              <SectionTitle title="Étain (Sn)" />
              <PropertyGrid
                data={[
                  ["Masse volumique", "≈ 11,34 kg/dm³"],
                  ["Point de fusion", "≈ 231,9 °C"],
                ]}
              />
              <SubTitle label="Propriétés" />
              <ul className="list-disc list-inside space-y-1 text-zinc-300">
                <li>Métal blanc, mou, très malléable</li>
                <li>Se laisse réduire en feuilles très minces</li>
                <li>Bonne coulabilité (se moule bien)</li>
                <li>Inoxydable à l’air, résiste aux acides faibles</li>
              </ul>
              <SubTitle label="Utilisations" />
              <ul className="list-disc list-inside space-y-1 text-zinc-300">
                <li>Étain de soudure en électronique</li>
                <li>Étamage intérieur des boîtes de conserves</li>
                <li>Peintures, industrie du verre</li>
                <li>Constituant du bronze (alliage Cu–Sn)</li>
              </ul>
            </article>

            {/* TUNGSTENE */}
            <article
              id="tungstene"
              className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 sm:p-6"
            >
              <SectionTitle title="Tungstène (W)" />
              <PropertyGrid
                data={[
                  ["Masse volumique", "≈ 19,35 kg/dm³"],
                  ["Point de fusion", "≈ 3 410 °C"],
                  ["Particularité", "Un des métaux les plus denses et réfractaires"],
                ]}
              />
              <SubTitle label="Propriétés" />
              <ul className="list-disc list-inside space-y-1 text-zinc-300">
                <li>Très dur, très ductile mais fragile</li>
                <li>Inaltérable à l’air, réactif à l’oxygène à chaud</li>
                <li>Peu réactif aux acides et bases</li>
              </ul>
              <SubTitle label="Utilisations" />
              <ul className="list-disc list-inside space-y-1 text-zinc-300">
                <li>Outils de coupe en carbure de tungstène</li>
                <li>Élément d’alliage dans les aciers rapides</li>
                <li>Procédé de soudage TIG</li>
                <li>
                  En horlogerie de luxe : carrures, lunettes (masse élevée et grande dureté)
                </li>
              </ul>
            </article>

            {/* PLOMB */}
            <article
              id="plomb"
              className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 sm:p-6"
            >
              <SectionTitle title="Plomb (Pb)" />
              <PropertyGrid
                data={[
                  ["Masse volumique", "≈ 11,34 kg/dm³"],
                  ["Point de fusion", "≈ 327,5 °C"],
                ]}
              />
              <SubTitle label="Propriétés" />
              <ul className="list-disc list-inside space-y-1 text-zinc-300">
                <li>Très mou, très malléable, ductile</li>
                <li>Se ternit rapidement par oxydation superficielle</li>
                <li>Résiste à de nombreux acides (sauf acide nitrique)</li>
                <li>Vapeurs toxiques, métal à manipuler avec précautions</li>
              </ul>
              <SubTitle label="Utilisations" />
              <ul className="list-disc list-inside space-y-1 text-zinc-300">
                <li>Protection contre les rayons X</li>
                <li>Toitures, certaines tuyauteries anciennes</li>
                <li>Projectiles (munitions)</li>
              </ul>
            </article>

            {/* LAITON */}
            <article
              id="laiton"
              className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 sm:p-6"
            >
              <SectionTitle title="Laiton (alliage Cu–Zn–Pb)" />
              <PropertyGrid
                data={[
                  ["Masse volumique", "≈ 8,5–8,8 kg/dm³"],
                  ["Point de fusion", "≈ 900–980 °C"],
                  ["Composition horlogerie", "≈ 58 % Cu – 39 % Zn – 3 % Pb"],
                ]}
              />
              <p className="text-zinc-300 mb-3">
                Nom générique des alliages de cuivre et de zinc. La couleur varie du rouge au
                jaune selon la teneur en zinc.
              </p>
              <SubTitle label="Propriétés" />
              <ul className="list-disc list-inside space-y-1 text-zinc-300">
                <li>Bonne résistance à la corrosion</li>
                <li>Bonne conductivité thermique et électrique</li>
                <li>Ductile, malléable</li>
                <li>Bonne résistance mécanique</li>
              </ul>
              <SubTitle label="Utilisations (dont horlogerie)" />
              <ul className="list-disc list-inside space-y-1 text-zinc-300">
                <li>Boîtes de montres</li>
                <li>Pièces de mouvement horloger</li>
                <li>Douilles de cartouches, robinetterie</li>
              </ul>
            </article>

            {/* BRONZE */}
            <article
              id="bronze"
              className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 sm:p-6"
            >
              <SectionTitle title="Bronze (alliage Cu–Sn)" />
              <PropertyGrid
                data={[
                  ["Masse volumique", "≈ 8,7–8,8 kg/dm³"],
                  ["Point de fusion", "≈ 1 000 °C (variable)"],
                  ["Composition typique", "≈ 95 % Cu – 2–10 % Sn"],
                ]}
              />
              <p className="text-zinc-300 mb-3">
                Alliage cuivre–étain, la couleur dépend de la teneur en étain.
              </p>
              <SubTitle label="Propriétés" />
              <ul className="list-disc list-inside space-y-1 text-zinc-300">
                <li>Bonne résistance à la corrosion</li>
                <li>Facile à travailler</li>
                <li>Non magnétique</li>
                <li>Bonne conductivité thermique et électrique</li>
              </ul>
              <SubTitle label="Utilisations" />
              <ul className="list-disc list-inside space-y-1 text-zinc-300">
                <li>Œuvres d’art, cloches, lustrerie</li>
                <li>Ressorts et roues dentées</li>
                <li>Certains boîtiers de montres "bronze"</li>
              </ul>
            </article>

            {/* MAILLECHORT */}
            <article
              id="maillechort"
              className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 sm:p-6"
            >
              <SectionTitle title="Maillechort (alliage Ni–Cu–Zn)" />
              <p className="text-zinc-300 mb-3">
                Alliage de nickel, cuivre et zinc. Composition variable, typiquement :
                environ 50–60 % Cu, 15–40 % Zn, 5–30 % Ni.
              </p>
              <SubTitle label="Propriétés" />
              <ul className="list-disc list-inside space-y-1 text-zinc-300">
                <li>Très bonne résistance à la corrosion et à l’oxydation</li>
                <li>Malléable et ductile</li>
                <li>Bonnes caractéristiques mécaniques</li>
                <li>Aspect « argenté » durable</li>
              </ul>
              <SubTitle label="Utilisations (dont horlogerie)" />
              <ul className="list-disc list-inside space-y-1 text-zinc-300">
                <li>Pointes de stylos à bille</li>
                <li>Instruments de musique, montures de lunettes</li>
                <li>Brucelles et pièces de mouvement horloger</li>
              </ul>
            </article>

            {/* HORLOGERIE : RECAP */}
            <article
              id="horlogerie"
              className="rounded-2xl border border-yellow-500/40 bg-gradient-to-br from-yellow-500/10 via-zinc-950 to-zinc-950 p-5 sm:p-6"
            >
              <SectionTitle
                title="Applications typiques en horlogerie"
                badge="Synthèse"
              />
              <div className="grid gap-4 lg:grid-cols-2">
                <div>
                  <h3 className="text-sm font-semibold text-yellow-200 mb-2">
                    Aciers & alliages d’acier
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-zinc-100 text-sm">
                    <li>Boîtiers (montres classiques, sportives, plongée)</li>
                    <li>Bracelets, maillons, fermoirs</li>
                    <li>Aiguilles (dont aiguilles bleuies)</li>
                    <li>Ressorts : barillet, tirette, cliquet</li>
                    <li>Axes, pivots, vis</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-yellow-200 mb-2">
                    Cuivre, laiton, bronze, maillechort
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-zinc-100 text-sm">
                    <li>Platines et ponts</li>
                    <li>Roues dentées et mobiles</li>
                    <li>Boîtes de montres en laiton ou bronze</li>
                    <li>Éléments décoratifs et fonctionnels</li>
                  </ul>
                </div>
              </div>

              <p className="mt-4 text-sm text-zinc-200">
                Cette page reprend et structure ton PDF « Métaux communs » pour que les
                élèves retrouvent rapidement les propriétés et les usages de chaque métal,
                avec un accès direct au support original en PDF.
              </p>
            </article>
          </section>
        </div>
      </div>
    </main>
  );
}

interface SectionLinkProps {
  href: string;
  label: string;
}

function SectionLink({ href, label }: SectionLinkProps) {
  return (
    <a
      href={href}
      className="block rounded-lg px-3 py-1.5 text-zinc-300 hover:text-yellow-200 hover:bg-zinc-800/70 text-xs sm:text-sm transition"
    >
      {label}
    </a>
  );
}

interface SectionTitleProps {
  title: string;
  badge?: string;
}

function SectionTitle({ title, badge }: SectionTitleProps) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-3">
        <h2 className="text-lg sm:text-xl font-semibold text-yellow-100">
          {title}
        </h2>
        {badge && (
          <span className="inline-flex items-center rounded-full border border-yellow-500/40 bg-yellow-500/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-yellow-300">
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}

interface PropertyGridProps {
  data: [string, string][];
}

function PropertyGrid({ data }: PropertyGridProps) {
  return (
    <dl className="mb-4 grid gap-2 text-xs sm:text-sm text-zinc-200 sm:grid-cols-2">
      {data.map(([label, value]) => (
        <div
          key={label}
          className="flex flex-col rounded-lg border border-zinc-800/80 bg-zinc-900/70 px-3 py-2"
        >
          <dt className="text-[11px] uppercase tracking-wide text-zinc-400">
            {label}
          </dt>
          <dd className="text-sm font-medium text-yellow-100">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

interface SubTitleProps {
  label: string;
}

function SubTitle({ label }: SubTitleProps) {
  return (
    <h3 className="mt-3 mb-2 text-sm font-semibold text-yellow-200">
      {label}
    </h3>
  );
}
