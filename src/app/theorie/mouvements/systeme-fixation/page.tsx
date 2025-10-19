export default function SystemeFixation() {
  return (
    <article className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-6">Système de fixation</h1>
      
      <section className="mb-8">
        <p className="text-lg mb-4 leading-relaxed">
          La fixation des ponts sur la platine est cruciale pour la précision du mouvement. 
          Elle doit assurer un positionnement reproductible, une stabilité dimensionnelle parfaite 
          et résister aux chocs et vibrations.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Types de fixations</h2>
        
        <div className="space-y-6">
          <div className="bg-neutral-800 p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-3">Vissage direct</h3>
            <p className="mb-2">
              Les vis traversent le pont et se vissent dans des taraudages pratiqués dans la platine.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Vis en acier bleui (traitement thermique à 300°C)</li>
              <li>Têtes polies miroir ou satinées</li>
              <li>Fentes parfaitement centrées et polies</li>
              <li>Couple de serrage calibré pour éviter déformations</li>
            </ul>
          </div>

          <div className="bg-neutral-800 p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-3">Chatons et pierres</h3>
            <p className="mb-2">
              Les pivots tournent dans des pierres (rubis synthétiques) enchâssées dans des chatons.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Pierres percées : guidage radial des pivots</li>
              <li>Contre-pivots : limitation du jeu axial</li>
              <li>Chatons vissés ou chassés dans la platine</li>
              <li>Réduction des frottements et de l'usure</li>
            </ul>
          </div>

          <div className="bg-neutral-800 p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-3">Goupilles de positionnement</h3>
            <p>
              Petites goupilles coniques assurant un positionnement précis et reproductible du pont 
              avant serrage des vis. Garantit l'alignement parfait des paliers.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Précision dimensionnelle</h2>
        <p className="text-lg mb-3">
          Les tolérances d'usinage sont extrêmement serrées :
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Planéité de la platine : ±0,005 mm</li>
          <li>Diamètre des trous de paliers : ±0,002 mm</li>
          <li>Entraxe des paliers : ±0,01 mm</li>
          <li>Perpendicularité des trous : ±0,5°</li>
        </ul>
      </section>

      <section className="bg-orange-900/20 border-l-4 border-orange-500 p-6 rounded">
        <h3 className="font-bold mb-2">Impact sur la marche</h3>
        <p>
          Un serrage excessif des vis déforme la platine et désaxe les paliers, augmentant 
          les frottements et dégradant la précision. Un serrage insuffisant crée du jeu et 
          des vibrations parasites. Le réglage optimal nécessite expérience et outils de mesure.
        </p>
      </section>
    </article>
  );
}
