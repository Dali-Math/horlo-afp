// src/app/outils/outils-de-mesure/page.tsx
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Outils de mesure en horlogerie moderne | HorloLearn",
  description:
    "Sélection des 10 outils de mesure les plus utilisés en horlogerie moderne : usages, particularités et visuels. Ressource culturelle HorloLearn.",
};

type Outil = {
  id: string;
  titre: string;
  resume: string;
  details: string;
  img: string;
  alt: string;
};

const OR = "#E2B44F";

const OUTILS: Outil[] = [
  {
    id: "pied-a-coulisse",
    titre: "Pied à coulisse numérique",
    resume:
      "Mesure rapide des diamètres, largeurs et entraxes, lecture directe en mm/µm.",
    details:
      "Indispensable pour contrôler épaisseurs de ponts, ouvertures de boîte, diamètres de barillets ou axes. Version digitale = moins d’erreurs de lecture.",
    img: "/images/outils/pied-a-coulisse.webp",
    alt: "Pied à coulisse numérique pour l'horlogerie",
  },
  {
    id: "micrometre",
    titre: "Micromètre haute précision",
    resume:
      "Pour épaisseurs très fines et micro-jeux avec une excellente répétabilité.",
    details:
      "Externe/interne; utile pour ressorts, flasques, hauteurs de barillet. Versions numériques et à encliquetage pour force constante.",
    img: "/images/outils/micrometre.webp",
    alt: "Micromètre de précision horloger",
  },
  {
    id: "comparateur",
    titre: "Comparateur sur colonne",
    resume:
      "Vérifie planéité, faux-rond, battement; lecture des variations au centième/µm.",
    details:
      "Monté sur support granit/colonne. Sert fréquemment au contrôle de concentricité et de plateaux/pignons.",
    img: "/images/outils/comparateur-colonne.webp",
    alt: "Comparateur sur colonne pour contrôle",
  },
  {
    id: "jauges-epaisseur",
    titre: "Jauges d’épaisseur & jauges à trous",
    resume:
      "Feuilles cales pour jeux fins; jauges cylindriques/trous pour diamètres.",
    details:
      "Sélection de rubis/trous, contrôle d’appairage pivot/pierre et validation de jeux critiques.",
    img: "/images/outils/jauges-epaisseur.webp",
    alt: "Jauges d'épaisseur et jauges à trous",
  },
  {
    id: "mesure-video",
    titre: "Mesure vidéo sans contact",
    resume:
      "Métrologie optique 2D/3D pour micro-pièces: profils, rayons, entraxes, angles.",
    details:
      "Capture numérique, répétabilité élevée, utile pour petites séries et CQ moderne.",
    img: "/images/outils/mesure-video.webp",
    alt: "Système de mesure vidéo sans contact",
  },
  {
    id: "loupe-bino",
    titre: "Loupe micrométrique / Binoculaire",
    resume:
      "Grossissement stable pour inspection, avec réticule gradué pour mesures fines.",
    details:
      "Observation de surfaces, chanfreins, états de tribologie et lecture de dimensions via réticule.",
    img: "/images/outils/loupe-bino.webp",
    alt: "Binoculaire avec réticule micrométrique",
  },
  {
    id: "micrometre-profondeur",
    titre: "Micromètre de profondeur",
    resume:
      "Mesure profondeurs de rainures, logements, fraisures non accessibles.",
    details:
      "Semelle stable, touches interchangeables; contrôle précis là où le coulisse ne passe pas.",
    img: "/images/outils/micrometre-profondeur.webp",
    alt: "Micromètre de profondeur",
  },
  {
    id: "projecteur-profil",
    titre: "Projecteur de profil",
    resume:
      "Contrôle optique des formes: profils de dents, rayons, angles, avec écran.",
    details:
      "Comparaison à un gabarit, mesure d’angles de levée, contrôle géométrique non destructif.",
    img: "/images/outils/projecteur-profil.webp",
    alt: "Projecteur de profil optique",
  },
  {
    id: "cmm-3d",
    titre: "Machine de mesure 3D (CMM)",
    resume:
      "Mesure tridimensionnelle automatisée: géométries complexes, rapports CQ.",
    details:
      "Sonde tactile/optique, utile en micro-mécanique horlogère pour pièces complexes.",
    img: "/images/outils/cmm-3d.webp",
    alt: "Machine de mesure tridimensionnelle CMM",
  },
  {
    id: "palpeur",
    titre: "Palpeur numérique (Touch Probe)",
    resume:
      "Sonde de contact pour prises de références et mesures en cellule/FAO.",
    details:
      "Automatise datums et contrôles en production; réduit erreurs de réglage.",
    img: "/images/outils/palpeur.webp",
    alt: "Palpeur numérique de mesure",
  },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-black text-neutral-200">
      <section className="relative overflow-hidden border-b border-neutral-800">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-18">
          <div className="max-w-3xl">
            <h1
              className="text-3xl md:text-5xl font-semibold tracking-tight"
              style={{ color: OR }}
            >
              Outils de mesure en horlogerie moderne
            </h1>
            <p className="mt-4 text-neutral-300">
              Les instruments de précision qui garantissent l’exactitude du
              travail horloger contemporain. Sélection de dix outils
              couramment utilisés, avec leurs usages et particularités.
            </p>
            <div className="mt-6 flex gap-3">
              <Link
                href="/theorie/lecture-de-plan/vues-techniques"
                className="rounded-xl px-4 py-2 border border-neutral-700 text-sm hover:border-neutral-500 transition"
              >
                Vues techniques
              </Link>
              <Link
                href="/outils"
                className="rounded-xl px-4 py-2 border border-neutral-700 text-sm hover:border-neutral-500 transition"
              >
                Tous les outils
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {OUTILS.map((o) => (
            <article
              key={o.id}
              className="group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 hover:bg-neutral-900 transition"
            >
              <div className="relative h-52 w-full">
                <Image
                  src={o.img}
                  alt={o.alt}
                  fill
                  sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                  className="object-cover"
                  priority={false}
                />
                <div className="pointer-events-none absolute inset-0 ring-0 ring-inset ring-transparent group-hover:ring-1 group-hover:ring-neutral-700 transition" />
              </div>
              <div className="p-4">
                <h2
                  className="text-lg font-semibold"
                  style={{ color: OR }}
                >
                  {o.titre}
                </h2>
                <p className="mt-2 text-sm text-neutral-300">{o.resume}</p>
                <p className="mt-2 text-sm text-neutral-400">{o.details}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-neutral-800 bg-neutral-950 p-5 text-sm text-neutral-300">
          <p>
            Note : cette sélection vise l’usage contemporain en atelier
            horloger (inspection, contrôle dimensionnel, qualité). Elle complète
            la vision historique des outils classiques, dans l’esprit ressource
            culturelle HorloLearn.
          </p>
        </div>
      </section>
    </main>
  );
}
