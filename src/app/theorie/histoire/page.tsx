// app/[locale]/theorie/histoire-horlogerie/page.tsx

import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Histoire de l'Horlogerie Suisse | HorloLearn",
  description: "Quatre siècles d'excellence horlogère suisse : des origines genevoises aux innovations du XXIe siècle. Découvrez les pionniers, les crises et les renaissances qui ont façonné le leadership mondial de l'horlogerie helvétique.",
  keywords: "horlogerie suisse, histoire, Daniel Jeanrichard, Abraham-Louis Perrelet, Beta 21, quartz, manufacture",
};

export default function HistoireHorlogerie() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-neutral-800">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-950/20 via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10 max-w-5xl">
          <a
            href="/theorie"
            className="inline-flex items-center text-sm text-gray-400 hover:text-orange-400 transition-colors mb-8 group"
          >
            <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour à la théorie
          </a>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent leading-tight">
            Histoire de l'Horlogerie Suisse
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-3xl">
            Quatre siècles d'excellence, d'innovations et de savoir-faire qui ont positionné la Suisse comme référence mondiale incontestée de l'art horloger.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div className="bg-neutral-900/50 backdrop-blur border border-neutral-800 rounded-lg p-4 hover:border-orange-500/50 transition-all">
              <div className="text-3xl font-bold text-orange-400 mb-1">1541</div>
              <div className="text-sm text-gray-400">Origines à Genève</div>
            </div>
            <div className="bg-neutral-900/50 backdrop-blur border border-neutral-800 rounded-lg p-4 hover:border-orange-500/50 transition-all">
              <div className="text-3xl font-bold text-orange-400 mb-1">60K</div>
              <div className="text-sm text-gray-400">Montres exportées en 1790</div>
            </div>
            <div className="bg-neutral-900/50 backdrop-blur border border-neutral-800 rounded-lg p-4 hover:border-orange-500/50 transition-all">
              <div className="text-3xl font-bold text-orange-400 mb-1">21</div>
              <div className="text-sm text-gray-400">Manufactures Beta 21</div>
            </div>
            <div className="bg-neutral-900/50 backdrop-blur border border-neutral-800 rounded-lg p-4 hover:border-orange-500/50 transition-all">
              <div className="text-3xl font-bold text-orange-400 mb-1">N°1</div>
              <div className="text-sm text-gray-400">Leader mondial</div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Interactive */}
      <section className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="relative">
          {/* Ligne verticale timeline */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 via-amber-400 to-orange-600"></div>

          {/* 1541-1601: Genève, berceau de l'horlogerie */}
          <TimelineItem
            year="1541"
            title="Genève, berceau de l'horlogerie suisse"
            side="left"
          >
            <p className="text-gray-300 leading-relaxed mb-4">
              L'industrie horlogère suisse naît à <span className="text-orange-400 font-semibold">Genève</span> au milieu du XVI<sup>e</sup> siècle. Le réformateur <span className="text-orange-400 font-semibold">Jean Calvin</span>, en bannissant le port d'objets ornementaux en 1541, contraint les orfèvres et joailliers genevois à se reconvertir vers l'art de l'horlogerie[web:3].
            </p>
            <p className="text-gray-300 leading-relaxed">
              Dès la fin du siècle, Genève acquiert une réputation d'excellence mondiale. En <span className="text-orange-400 font-semibold">1601</span>, la première corporation d'horlogers suisse voit le jour sous le nom de <em>« Maîtrise des horlogers de Genève »</em>[web:3].
            </p>
          </TimelineItem>

          {/* 1665-1741: Daniel Jeanrichard */}
          <TimelineItem
            year="1665-1741"
            title="Daniel Jeanrichard : le génie du Jura"
            side="right"
          >
            <p className="text-gray-300 leading-relaxed mb-4">
              Né en 1665 au hameau des Bressels (entre La Chaux-de-Fonds et Le Locle), <span className="text-orange-400 font-semibold">Daniel Jeanrichard</span> découvre l'horlogerie à 15 ans lorsqu'un marchand de chevaux lui confie une montre anglaise à réparer[web:25][web:30].
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              En <span className="text-orange-400 font-semibold">1681</span>, à seulement 16 ans, il conçoit sa propre montre — la <em>toute première</em> jamais fabriquée dans la région de Neuchâtel. Pour y parvenir, il imagine et construit tous les outils nécessaires, démontrant un génie autodidacte exceptionnel[web:25].
            </p>
            <div className="bg-neutral-900 border border-orange-500/30 rounded-lg p-4 my-4">
              <p className="text-sm text-orange-300 font-semibold mb-2">💡 Innovation majeure</p>
              <p className="text-gray-300 text-sm leading-relaxed">
                Jeanrichard implante le système de <span className="text-orange-400 font-semibold">l'établissage</span> : une organisation divisée du travail où chaque artisan se spécialise dans une pièce spécifique, révolutionnant ainsi la production horlogère[web:3][web:25].
              </p>
            </div>
          </TimelineItem>

          {/* 1700s: Migration Arc jurassien */}
          <TimelineItem
            year="1700"
            title="L'expansion dans l'Arc jurassien"
            side="left"
          >
            <p className="text-gray-300 leading-relaxed mb-4">
              Au début du XVIII<sup>e</sup> siècle, Genève compte « trop » d'horlogers. Beaucoup quittent la région genevoise pour s'établir le long de <span className="text-orange-400 font-semibold">l'Arc jurassien</span>, de Genève à Schaffhouse[web:3].
            </p>
            <p className="text-gray-300 leading-relaxed">
              Ce développement est également favorisé par l'arrivée de <span className="text-orange-400 font-semibold">Huguenots</span> suite à la révocation de l'édit de Nantes par Louis XIV. Ces artisans de talent apportent des connaissances précieuses qui enrichissent l'industrie horlogère suisse naissante[web:8].
            </p>
          </TimelineItem>

          {/* 1770-1777: Abraham-Louis Perrelet */}
          <TimelineItem
            year="1770-1777"
            title="Abraham-Louis Perrelet et la montre automatique"
            side="right"
          >
            <p className="text-gray-300 leading-relaxed mb-4">
              En 1770, <span className="text-orange-400 font-semibold">Abraham-Louis Perrelet</span> crée la <em>« montre à secousses »</em> dite perpétuelle, considérée comme l'ancêtre de la montre automatique moderne[web:3][web:26].
            </p>
            <p className="text-gray-300 leading-relaxed">
              En <span className="text-orange-400 font-semibold">1777</span>, il perfectionne son invention : le ressort du barillet s'arme uniquement grâce à l'énergie des mouvements naturels du porteur. Un système révolutionnaire qui inspire toute l'horlogerie automatique contemporaine[web:28][web:34].
            </p>
          </TimelineItem>

          {/* 1790: Export massif */}
          <TimelineItem
            year="1790"
            title="L'essor commercial"
            side="left"
          >
            <p className="text-gray-300 leading-relaxed">
              En 1790, Genève exporte déjà plus de <span className="text-orange-400 font-semibold">60'000 montres</span>, témoignant d'une industrie florissante et d'une réputation mondiale solidement établie[web:3].
            </p>
          </TimelineItem>

          {/* 1816: Louis Moinet chronographe */}
          <TimelineItem
            year="1816"
            title="Le premier chronographe"
            side="right"
          >
            <p className="text-gray-300 leading-relaxed">
              <span className="text-orange-400 font-semibold">Louis Moinet</span> réalise le premier chronographe, également appelé <em>« compteur de tierces »</em>. Cette innovation marque le début des complications horlogères modernes[web:3].
            </p>
          </TimelineItem>

          {/* 1842: Adrien Philippe */}
          <TimelineItem
            year="1842"
            title="Adrien Philippe et le remontoir au pendant"
            side="left"
          >
            <p className="text-gray-300 leading-relaxed">
              <span className="text-orange-400 font-semibold">Adrien Philippe</span>, cofondateur de la prestigieuse manufacture Patek Philippe, invente la montre avec remontoir au pendant, supprimant le besoin d'une clé de remontage[web:3].
            </p>
          </TimelineItem>

          {/* 1854-1876: Industrialisation */}
          <TimelineItem
            year="1854-1876"
            title="La révolution industrielle américaine"
            side="right"
          >
            <p className="text-gray-300 leading-relaxed mb-4">
              En 1854, le visionnaire <span className="text-orange-400 font-semibold">Aaron Lufkin Dennison</span> crée la <em>Waltham Watch Company</em> avec une vision radicale : développer machines, systèmes de production, jauges et standardisation pour rendre chaque pièce <span className="text-orange-400 font-semibold">interchangeable</span>[web:8].
            </p>
            <div className="bg-red-950/20 border border-red-500/30 rounded-lg p-4 my-4">
              <p className="text-sm text-red-300 font-semibold mb-2">⚠️ Menace existentielle</p>
              <p className="text-gray-300 text-sm leading-relaxed">
                En 1876, Jacques David de Longines fait un rapport détaillé de la méthode américaine aux autorités helvétiques. Ce rapport déclenche une réaction salutaire : l'industrie suisse adopte progressivement ces nouvelles méthodes pour préserver sa compétitivité[web:8].
              </p>
            </div>
          </TimelineItem>

          {/* Début 1900s: Mécanisation */}
          <TimelineItem
            year="1900"
            title="Mécanisation et standardisation"
            side="left"
          >
            <p className="text-gray-300 leading-relaxed">
              Au début du XX<sup>e</sup> siècle, la mécanisation de la fabrication prend place grâce aux recherches d'horlogers réputés comme <span className="text-orange-400 font-semibold">Frédéric Ingold</span> et <span className="text-orange-400 font-semibold">Georges Léschot</span>. Augmentation de la productivité, interchangeabilité des composants et standardisation permettent à l'horlogerie suisse d'étendre sa suprématie mondiale[web:3].
            </p>
          </TimelineItem>

          {/* 1918-1926: Montre-bracelet */}
          <TimelineItem
            year="1918-1926"
            title="L'ère de la montre-bracelet"
            side="right"
          >
            <p className="text-gray-300 leading-relaxed mb-4">
              La fin de la Première Guerre mondiale coïncide avec l'introduction de la <span className="text-orange-400 font-semibold">montre-bracelet</span>, qui remplace progressivement la montre de gousset[web:3].
            </p>
            <p className="text-gray-300 leading-relaxed">
              En <span className="text-orange-400 font-semibold">1926</span>, la première montre-bracelet automatique est produite à Granges. Sa forme ronde traditionnelle est définitivement adoptée au début des années 1960[web:3].
            </p>
          </TimelineItem>

          {/* 1952: Montres électriques */}
          <TimelineItem
            year="1952"
            title="L'électrification"
            side="left"
          >
            <p className="text-gray-300 leading-relaxed">
              Les premières montres électriques apparaissent en 1952, ouvrant la voie vers l'électronique horlogère[web:3].
            </p>
          </TimelineItem>

          {/* 1967-1970: Beta 21 & Crise du quartz */}
          <TimelineItem
            year="1967-1970"
            title="Beta 21 : triomphe technique, échec commercial"
            side="right"
          >
            <p className="text-gray-300 leading-relaxed mb-4">
              En <span className="text-orange-400 font-semibold">1967</span>, le Centre électronique horloger de Neuchâtel développe la première montre-bracelet à quartz du monde : la fameuse <span className="text-orange-400 font-semibold">Beta 21</span>[web:3].
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              Ce projet réunit <span className="text-orange-400 font-semibold">21 manufactures suisses</span> prestigieuses : Omega, Rolex, Patek Philippe, IWC, Longines, Zenith, et bien d'autres[web:38].
            </p>
            <div className="bg-red-950/20 border border-red-500/30 rounded-lg p-4 my-4">
              <p className="text-sm text-red-300 font-semibold mb-2">💥 La crise du quartz</p>
              <p className="text-gray-300 text-sm leading-relaxed mb-3">
                Malgré sa précision redoutable, la Beta 21 arrive <span className="text-red-400 font-semibold">trop tard</span> : 4 mois après la mise sur le marché de l'<em>Astron</em> de Seiko, la première montre à quartz commerciale au monde[web:29].
              </p>
              <p className="text-gray-300 text-sm leading-relaxed">
                Instable, fragile et énergivore, seulement 6000 mouvements Beta 21 sont produits avant l'abandon du projet[web:29][web:38]. La crise du quartz menace alors l'existence même de l'horlogerie mécanique suisse.
              </p>
            </div>
          </TimelineItem>

          {/* 1980s-1990s: Renaissance */}
          <TimelineItem
            year="1980-1990"
            title="Renaissance et repositionnement"
            side="left"
          >
            <p className="text-gray-300 leading-relaxed mb-4">
              Face à la crise du quartz, l'industrie suisse démontre une capacité d'innovation remarquable. Le lancement de <span className="text-orange-400 font-semibold">Swatch</span> dans les années 1980 révolutionne le marché avec des montres à quartz accessibles et design[web:12].
            </p>
            <p className="text-gray-300 leading-relaxed">
              Parallèlement, l'horlogerie haut de gamme se repositionne sur l'<span className="text-orange-400 font-semibold">excellence mécanique</span>, l'artisanat d'art et les complications. Les fusions de groupes (Swatch Group, Richemont, LVMH) consolident le secteur[web:12][web:13].
            </p>
          </TimelineItem>

          {/* XXIe siècle */}
          <TimelineItem
            year="2000-2025"
            title="L'horlogerie du XXI<sup>e</sup> siècle"
            side="right"
          >
            <p className="text-gray-300 leading-relaxed mb-4">
              Forte de ses traditions mais résolument innovante, l'horlogerie suisse contemporaine allie <span className="text-orange-400 font-semibold">matériaux high-tech</span> (céramique, silicium, graphène), <span className="text-orange-400 font-semibold">complications extrêmes</span> et connectivité[web:12].
            </p>
            <p className="text-gray-300 leading-relaxed">
              Elle conserve son <span className="text-orange-400 font-semibold">leadership mondial</span> en incarnant l'excellence du <em>« Swiss Made »</em> : précision absolue, finitions impeccables et savoir-faire artisanal unique transmis depuis quatre siècles[web:3][web:12].
            </p>
          </TimelineItem>
        </div>
      </section>

      {/* Figures emblématiques */}
      <section className="bg-neutral-900/50 border-y border-neutral-800 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
            Figures emblématiques
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FigureCard
              name="Daniel Jeanrichard"
              years="1665-1741"
              role="Fondateur de l'horlogerie jurassienne"
              achievement="Première montre neuchâteloise (1681) et système de l'établissage"
            />
            <FigureCard
              name="Abraham-Louis Perrelet"
              years="1729-1826"
              role="Inventeur de la montre automatique"
              achievement="Montre à secousses perpétuelle (1770-1777)"
            />
            <FigureCard
              name="Louis Moinet"
              years="1768-1853"
              role="Créateur du chronographe"
              achievement="Premier chronographe au monde (1816)"
            />
            <FigureCard
              name="Adrien Philippe"
              years="1815-1894"
              role="Cofondateur Patek Philippe"
              achievement="Remontoir au pendant (1842)"
            />
            <FigureCard
              name="Aaron Lufkin Dennison"
              years="1812-1895"
              role="Pionnier de l'industrialisation"
              achievement="Waltham Watch Company (1854)"
            />
            <FigureCard
              name="Georges Léschot"
              years="1800-1884"
              role="Mécanisation de la production"
              achievement="Standardisation et interchangeabilité"
            />
          </div>
        </div>
      </section>

      {/* Innovations majeures */}
      <section className="container mx-auto px-4 py-16 max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
          Innovations & premières mondiales
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <InnovationCard
            icon="🔄"
            title="Montre automatique"
            description="Abraham-Louis Perrelet révolutionne l'horlogerie avec un système qui capte l'énergie des mouvements du porteur pour remonter automatiquement le ressort."
            year="1770-1777"
          />
          <InnovationCard
            icon="⏱️"
            title="Chronographe"
            description="Louis Moinet crée le premier chronographe, ouvrant la voie aux complications de mesure du temps."
            year="1816"
          />
          <InnovationCard
            icon="🔑"
            title="Remontoir au pendant"
            description="Adrien Philippe supprime la clé de remontage avec son ingénieux système de remontoir intégré à la couronne."
            year="1842"
          />
          <InnovationCard
            icon="⚙️"
            title="Interchangeabilité"
            description="La standardisation des pièces permet une production de masse tout en maintenant la qualité suisse."
            year="1900"
          />
          <InnovationCard
            icon="⌚"
            title="Montre-bracelet"
            description="La transition de la montre de gousset vers la montre-bracelet moderne transforme l'usage quotidien de l'horlogerie."
            year="1918-1926"
          />
          <InnovationCard
            icon="💎"
            title="Beta 21 - Quartz"
            description="Premier mouvement à quartz suisse développé par 21 manufactures prestigieuses, marquant l'entrée dans l'ère électronique."
            year="1967-1970"
          />
        </div>
      </section>

      {/* Conclusion */}
      <section className="bg-gradient-to-br from-orange-950/20 via-neutral-900 to-neutral-950 border-t border-neutral-800 py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
            Un héritage vivant
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-8">
            L'horlogerie suisse incarne plus de quatre siècles d'excellence, d'innovation et de passion. Des ateliers artisanaux de Daniel Jeanrichard aux manufactures high-tech contemporaines, elle a su traverser les crises, s'adapter aux révolutions technologiques et maintenir son statut de référence mondiale absolue[web:3][web:12].
          </p>
          <p className="text-lg text-gray-400 leading-relaxed">
            Aujourd'hui, le <em>« Swiss Made »</em> reste synonyme de précision, d'élégance intemporelle et de savoir-faire artisanal unique — un patrimoine horloger inégalé que les horlogers suisses continuent d'enrichir chaque jour[web:3].
          </p>
        </div>
      </section>
    </main>
  );
}

// Composant Timeline Item
interface TimelineItemProps {
  year: string;
  title: string;
  side: "left" | "right";
  children: React.ReactNode;
}

function TimelineItem({ year, title, side, children }: TimelineItemProps) {
  return (
    <div className={`relative mb-16 md:mb-20 ${side === "right" ? "md:ml-1/2 md:pl-12" : "md:mr-1/2 md:pr-12"}`}>
      {/* Point sur la timeline */}
      <div className="absolute left-4 md:left-auto md:right-auto md:-translate-x-1/2 md:left-1/2 top-2 w-4 h-4 bg-orange-500 rounded-full border-4 border-neutral-900 z-10 shadow-lg shadow-orange-500/50"></div>
      
      <div className="ml-12 md:ml-0">
        <div className={`bg-neutral-900/80 backdrop-blur border border-neutral-800 rounded-xl p-6 hover:border-orange-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10 ${side === "right" ? "md:ml-8" : "md:mr-8"}`}>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl font-bold text-orange-400">{year}</span>
            <div className="h-px flex-1 bg-gradient-to-r from-orange-500/50 to-transparent"></div>
          </div>
          <h3 className="text-xl font-bold text-gray-100 mb-4">{title}</h3>
          <div className="text-sm leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// Composant Figure Card
interface FigureCardProps {
  name: string;
  years: string;
  role: string;
  achievement: string;
}

function FigureCard({ name, years, role, achievement }: FigureCardProps) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:border-orange-500/50 transition-all hover:shadow-xl hover:shadow-orange-500/10">
      <h3 className="text-xl font-bold text-orange-400 mb-1">{name}</h3>
      <p className="text-sm text-gray-400 mb-3">{years}</p>
      <p className="text-gray-200 font-semibold mb-2">{role}</p>
      <p className="text-sm text-gray-400 leading-relaxed">{achievement}</p>
    </div>
  );
}

// Composant Innovation Card
interface InnovationCardProps {
  icon: string;
  title: string;
  description: string;
  year: string;
}

function InnovationCard({ icon, title, description, year }: InnovationCardProps) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:border-orange-500/50 transition-all hover:shadow-xl hover:shadow-orange-500/10">
      <div className="flex items-start gap-4">
        <div className="text-4xl">{icon}</div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-orange-400">{title}</h3>
            <span className="text-xs text-gray-500 font-mono">{year}</span>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}
