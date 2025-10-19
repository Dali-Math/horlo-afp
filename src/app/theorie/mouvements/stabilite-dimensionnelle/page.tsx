export default function StabiliteDimensionnelle() {
  return (
    <article className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-6">Stabilité dimensionnelle</h1>
      
      <section className="mb-8">
        <p className="text-lg leading-relaxed mb-4">
          La stabilité dimensionnelle désigne la capacité de la platine et des ponts à conserver 
          leurs dimensions et leur géométrie malgré les variations de température, l'humidité, 
          les chocs et le vieillissement. C'est un facteur déterminant pour la précision à long terme.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Matériaux utilisés</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-neutral-800 p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-3">Laiton</h3>
            <p className="mb-2">Alliage cuivre-zinc, matériau traditionnel</p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Coefficient de dilatation : 18×10⁻⁶/°C</li>
              <li>Excellent usinable</li>
              <li>Traitement de surface : rhodiage, dorage</li>
              <li>Coût modéré</li>
            </ul>
          </div>

          <div className="bg-neutral-800 p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-3">Maillechort</h3>
            <p className="mb-2">Alliage cuivre-nickel-zinc</p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Meilleure stabilité que le laiton</li>
              <li>Couleur argentée naturelle</li>
              <li>Résistance à la corrosion</li>
              <li>Utilisé en haute horlogerie</li>
            </ul>
          </div>

          <div className="bg-neutral-800 p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-3">Alliages modernes</h3>
            <p className="mb-2">Titane, or, platine</p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Titane : léger, amagnétique, stable</li>
              <li>Or : prestige, résistance chimique</li>
              <li>Platine : densité, esthétique</li>
            </ul>
          </div>

          <div className="bg-neutral-800 p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-3">Matériaux composites</h3>
            <p className="mb-2">Silicium, céramique</p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Dilatation thermique minimale</li>
              <li>Légèreté exceptionnelle</li>
              <li>Propriétés amagnétiques</li>
              <li>Coût élevé, usinage complexe</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Traitements anti-déformation</h2>
        
        <ul className="space-y-4">
          <li className="bg-neutral-800 p-4 rounded-lg">
            <strong className="text-lg">Recuit de détente</strong>
            <p className="mt-1">Traitement thermique à 200-250°C pour éliminer les tensions internes 
            créées par l'usinage. Stabilise la structure métallurgique.</p>
          </li>
          
          <li className="bg-neutral-800 p-4 rounded-lg">
            <strong className="text-lg">Vieillissement artificiel</strong>
            <p className="mt-1">Cycles thermiques accélérés simulant plusieurs années de vieillissement 
            naturel. Prévient les déformations différées.</p>
          </li>
          
          <li className="bg-neutral-800 p-4 rounded-lg">
            <strong className="text-lg">Finitions mécaniques</strong>
            <p className="mt-1">Lappage, rodage pour obtenir des surfaces parfaitement planes et parallèles. 
            Élimine les micro-contraintes de surface.</p>
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Impact sur la régularité</h2>
        <p className="text-lg mb-3">
          Une variation dimensionnelle de 0,01 mm sur l'entraxe des paliers peut engendrer :
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Augmentation des frottements : +15 à 30%</li>
          <li>Variation de la marche diurne : ±5 à 10 secondes/jour</li>
          <li>Usure prématurée des pivots et pierres</li>
          <li>Risque de grippage en cas de choc</li>
        </ul>
      </section>

      <section className="bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded">
        <h3 className="font-bold mb-2">Exemple industriel</h3>
        <p>
          Les manufactures haut de gamme (Patek Philippe, Vacheron Constantin) stockent leurs 
          platines usinées pendant 6 à 12 mois avant assemblage final, permettant une stabilisation 
          naturelle complète. Les dimensions sont recontrôlées avant montage.
        </p>
      </section>
    </article>
  );
}
