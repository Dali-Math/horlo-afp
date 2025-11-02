// /src/app/materiaux/page.tsx

'use client'

export default function MateriauxHorlogersSuisse() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-10 text-white">

      {/* HERO AVEC IMAGE */}
      <section id="hero" className="mb-12">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-amber-400 mb-4">
            Excellence et Innovation dans les Matériaux Horlogers Suisses
          </h1>
          <p className="text-xl text-gray-300 mb-4">
            Une analyse complète de l'écosystème des matériaux horlogers suisses, démontrant pourquoi la Suisse demeure le leader mondial en innovation, qualité et savoir-faire.
          </p>
          <img
            src="/images/materiaux/hero.jpg" // <-- adapte le bon chemin image
            alt="Matériaux Horlogers Suisse"
            className="mx-auto rounded-xl shadow-xl mb-8"
          />
          <div className="flex justify-center gap-4 mt-4">
            <a href="#materials" className="bg-amber-400 px-6 py-2 rounded-lg text-slate-950 font-bold hover:bg-amber-300 transition">Découvrir les Matériaux</a>
            <a href="#history" className="bg-slate-800 px-6 py-2 rounded-lg text-amber-400 font-bold hover:bg-slate-700 border border-amber-400 transition">Voir la Timeline</a>
          </div>
        </div>
      </section>

      {/* EXECUTIVE SUMMARY */}
      <section className="mb-12 bg-slate-900 p-8 rounded-2xl border border-amber-400/10 shadow">
        <h2 className="text-2xl font-bold text-amber-400 mb-4">Executive Summary</h2>
        <p className="mb-4 text-slate-200">
          Ce rapport offre une analyse complète et approfondie de l'écosystème des matériaux horlogers suisses, démontrant pourquoi la Suisse demeure le leader mondial incontesté en matière d'innovation, de qualité et de savoir-faire. De l'or 18 carats et des aciers spéciaux comme le 316L, qui ont défini les standards, jusqu’aux alliages modernes et composites innovants, la Suisse repousse constamment les limites de la science des matériaux.
        </p>
        <ul className="list-inside list-disc text-amber-400 space-y-1">
          <li>Maîtrise inégalée des matériaux de l'or au silicium</li>
          <li>Écosystème industriel unique au monde</li>
          <li>Formation de renommée mondiale (ETVJ, WOSTEP)</li>
          <li>Innovation continue et R&D de pointe</li>
          <li>Leadership face à la concurrence internationale</li>
        </ul>
      </section>

      {/* HISTORIQUE DES MATÉRIAUX */}
      <section id="history" className="mb-12">
        <h2 className="text-xl font-bold text-amber-400 mb-2">Chronologie Historique</h2>
        <p className="mb-2 text-slate-200">L'évolution des matériaux horlogers du XVIe siècle à aujourd'hui</p>
        <div className="flex gap-4 mb-4 text-center">
          <span className="bg-slate-800 px-4 py-2 rounded-xl text-amber-300 font-bold">XVIe-XVIIe</span>
          <span className="bg-slate-800 px-4 py-2 rounded-xl text-amber-300 font-bold">XVIIIe-XIXe</span>
          <span className="bg-slate-800 px-4 py-2 rounded-xl text-amber-300 font-bold">XXe siècle</span>
          <span className="bg-slate-800 px-4 py-2 rounded-xl text-amber-300 font-bold">XXIe siècle</span>
        </div>
        <h3 className="mt-6 text-lg font-semibold text-white">Les Origines : Orfèvrerie et Métaux Précieux</h3>
        <p className="mb-2 text-slate-200">
          L'horlogerie suisse naît à Genève au XVIe siècle. Les premiers garde-temps sont fabriqués en or et argent.
        </p>
        <ul className="list-inside list-disc text-amber-400 mb-4">
          <li>Or 18 carats</li>
          <li>Argent sterling</li>
          <li>Platine</li>
        </ul>
      </section>

      {/* MATÉRIAUX TRADITIONNELS */}
      <section id="materials" className="mb-12">
        <h2 className="text-xl font-bold text-amber-400 mb-2">Matériaux Traditionnels</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Or 18k */}
          <div className="bg-slate-800 p-5 rounded-xl border border-amber-400/10 shadow text-slate-200">
            <h3 className="text-lg font-bold text-amber-400 mb-2">Or 18 Carats</h3>
            <p>Composition: 75% Or + 25% alliages <br />Propriétés: Inoxydable, amagnétique</p>
            <div className="mt-2 font-semibold">Applications:</div>
            <ul className="list-inside list-disc mb-4">
              <li>Boîtiers de luxe</li>
              <li>Bracelets premium</li>
              <li>Masses oscillantes</li>
              <li>Aiguilles haut de gamme</li>
            </ul>
          </div>
          {/* Platine */}
          <div className="bg-slate-800 p-5 rounded-xl border border-amber-400/10 shadow text-slate-200">
            <h3 className="text-lg font-bold text-amber-400 mb-2">Platine 950</h3>
            <p>Composition: 95% Platine + 5% autres <br />Propriétés: Noble, polissage miroir</p>
            <div className="mt-2 font-semibold">Applications:</div>
            <ul className="list-inside list-disc mb-4">
              <li>Haute horlogerie exclusive</li>
              <li>Grandes complications</li>
              <li>Séries limitées</li>
              <li>Polissage parfait</li>
            </ul>
          </div>
          {/* Argent */}
          <div className="bg-slate-800 p-5 rounded-xl border border-amber-400/10 shadow text-slate-200">
            <h3 className="text-lg font-bold text-amber-400 mb-2">Argent 925</h3>
            <p>Composition: 92.5% Argent + 7.5% cuivre <br />Propriétés: Blanc, ductile</p>
            <div className="mt-2 font-semibold">Applications:</div>
            <ul className="list-inside list-disc mb-4">
              <li>Cadrans vintage</li>
              <li>Boîtiers rétro</li>
              <li>Ornementation</li>
              <li>Protégé par rhodiage</li>
            </ul>
          </div>
        </div>
      </section>

      {/* INNOVATION ET HIGH-TECH */}
      <section id="innovation" className="mb-12">
        <h2 className="text-xl font-bold text-amber-400 mb-2">Innovation et High-Tech</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-800 p-5 rounded-xl border border-amber-400/10 shadow text-slate-200">
            <h3 className="text-lg font-bold text-amber-400 mb-2">Céramique Technique</h3>
            <ul className="list-inside list-disc mb-2">
              <li>Dureté extrême (inrayable)</li>
              <li>Légèreté supérieure à l'acier</li>
              <li>Couleurs stables</li>
            </ul>
          </div>
          <div className="bg-slate-800 p-5 rounded-xl border border-amber-400/10 shadow text-slate-200">
            <h3 className="text-lg font-bold text-amber-400 mb-2">Titane Grade 5</h3>
            <ul className="list-inside list-disc mb-2">
              <li>40% plus léger que l'acier</li>
              <li>Résistance à la corrosion exceptionnelle</li>
              <li>Hypoallergénique</li>
            </ul>
          </div>
          <div className="bg-slate-800 p-5 rounded-xl border border-amber-400/10 shadow text-slate-200">
            <h3 className="text-lg font-bold text-amber-400 mb-2">Fibre de Carbone</h3>
            <ul className="list-inside list-disc mb-2">
              <li>Légèreté spectaculaire</li>
              <li>Rigidité incomparable</li>
              <li>Carbone forgé Carbon TPT®</li>
            </ul>
          </div>
          <div className="bg-slate-800 p-5 rounded-xl border border-amber-400/10 shadow text-slate-200">
            <h3 className="text-lg font-bold text-amber-400 mb-2">Silicium</h3>
            <ul className="list-inside list-disc mb-2">
              <li>Totalement amagnétique</li>
              <li>Léger et basse inertie</li>
              <li>Pas de lubrification</li>
              <li>Précision micron</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ENTREPRISES & FORMATION */}
      <section id="ecosystem" className="mb-12">
        <h2 className="text-xl font-bold text-amber-400 mb-4">Écosystème Industriel et Formation</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-white">Genève</h3>
            <ul className="ml-4 list-disc text-amber-400">
              <li>Patek Philippe</li>
              <li>Rolex</li>
              <li>Jaeger-LeCoultre</li>
            </ul>
            <p className="text-slate-200 mt-2">Finition et décoration, joaillerie, assemblage, Poinçon de Genève…</p>
          </div>
          <div>
            <h3 className="font-semibold text-white">Vallée de Joux, Neuchâtel, Bienne</h3>
            <ul className="ml-4 list-disc text-amber-400">
              <li>Haute horlogerie mécanique</li>
              <li>Grandes complications</li>
              <li>Fabrication de mouvements</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-white mb-1">CFPT Genève</h3>
            <p className="text-slate-200">Horlogerie, micromécanique, finitions</p>
            <h3 className="font-semibold text-white mb-1 mt-4">ETVJ Vallée de Joux</h3>
            <p className="text-slate-200">Haute horlogerie, complications, artisanat</p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-1">CPNE Locle</h3>
            <p className="text-slate-200">Formation duale, industrie, précision</p>
            <h3 className="font-semibold text-white mb-1 mt-4">WOSTEP</h3>
            <p className="text-slate-200">Formation internationale, standards globaux</p>
          </div>
        </div>
      </section>

      {/* VISION D'AVENIR */}
      <section id="future" className="mb-12">
        <h2 className="text-xl font-bold text-amber-400 mb-4">Vision d'Avenir & Durabilité</h2>
        <ul className="list-disc ml-4 text-amber-400 space-y-1">
          <li>Acier Lucent (Chopard) 80% recyclé</li>
          <li>Or éthique certifié Fairmined</li>
          <li>Titane recyclé</li>
          <li>Bâtiments Minergie certifiés</li>
          <li>Énergies 100% renouvelables</li>
          <li>Droit à la réparation</li>
          <li>Pièces garanties sur décennies</li>
        </ul>
      </section>
    </main>
  )
}
