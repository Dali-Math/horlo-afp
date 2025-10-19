export default function FinitionsDecoratives() {
  return (
    <article className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-6">Finitions décoratives</h1>
      
      <section className="mb-8">
        <p className="text-lg leading-relaxed">
          Les finitions décoratives subliment l'aspect visuel du mouvement tout en témoignant 
          du savoir-faire artisanal de la manufacture. Elles combinent valeur esthétique, 
          distinction technique et signature de marque.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-6">Techniques principales</h2>
        
        <div className="space-y-8">
          <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-3">Perlage (Circular Graining)</h3>
            <p className="mb-3">
              Décor composé de cercles imbriqués couvrant les surfaces planes de la platine.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Outil :</strong> Bâton en bois (buis) avec pâte abrasive diamant</li>
              <li><strong>Technique :</strong> Rotation à 1500-3000 tr/min, pression contrôlée</li>
              <li><strong>Effet :</strong> Surface mate et homogène, signature de qualité</li>
              <li><strong>Durée :</strong> 30 min à 2h selon taille du mouvement</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-3">Côtes de Genève (Geneva Stripes)</h3>
            <p className="mb-3">
              Rayures parallèles ondulées caractéristiques de l'horlogerie genevoise.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Outil :</strong> Cabron (bois dur) monté sur axe rotatif</li>
              <li><strong>Technique :</strong> Déplacement linéaire + rotation simultanés</li>
              <li><strong>Largeur :</strong> 0,5 à 2 mm par strie</li>
              <li><strong>Effet visuel :</strong> Jeu de lumière et ombres, élégance raffinée</li>
              <li><strong>Manufactures emblématiques :</strong> Vacheron Constantin, Patek Philippe</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-3">Anglage (Beveling / Chamfering)</h3>
            <p className="mb-3">
              Chanfrein poli miroir sur les arêtes des ponts, réalisé manuellement.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Outil :</strong> Lime diamant à grain fin, puis papiers abrasifs</li>
              <li><strong>Finition :</strong> Polissage miroir manuel (10 000 tours/min)</li>
              <li><strong>Angle typique :</strong> 45° avec largeur 0,3 à 1 mm</li>
              <li><strong>Difficulté :</strong> Haute ; angle constant sur toute la longueur</li>
              <li><strong>Valeur :</strong> Marque d'excellence artisanale, très chronophage</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-3">Guillochage</h3>
            <p className="mb-3">
              Gravure de motifs géométriques complexes par tour à guillocher.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Machine :</strong> Tour à guillocher manuel (XVIII^e^ siècle)</li>
              <li><strong>Motifs :</strong> Vagues, paniers, damiers, soleils, etc.</li>
              <li><strong>Application :</strong> Rotors, cadrans, calottes de balancier</li>
              <li><strong>Exemples :</strong> Breguet (pionnier), Voutilainen, Philippe Dufour</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-3">Satinage / Brossage</h3>
            <p className="mb-3">
              Finition directionnelle mate obtenue par brossage abrasif.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Types :</strong> Circulaire, linéaire, soleil (radial)</li>
              <li><strong>Grain :</strong> 400 à 1200 selon effet souhaité</li>
              <li><strong>Zones :</strong> Flancs de ponts, rotor, platine périphérique</li>
              <li><strong>Avantage :</strong> Masque rayures, aspect sportif/technique</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Outils traditionnels</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-neutral-800 p-4 rounded-lg">
            <h4 className="font-bold mb-2">Lime</h4>
            <p className="text-sm">Lime suisse à grain diamant pour angles et chanfreins précis.</p>
          </div>
          <div className="bg-neutral-800 p-4 rounded-lg">
            <h4 className="font-bold mb-2">Cabron</h4>
            <p className="text-sm">Bâton en bois de tilleul ou buis pour Côtes de Genève.</p>
          </div>
          <div className="bg-neutral-800 p-4 rounded-lg">
            <h4 className="font-bold mb-2">Polissoir</h4>
            <p className="text-sm">Outil en acier poli miroir pour finitions brillantes.</p>
          </div>
        </div>
      </section>

      <section className="bg-amber-900/20 border-l-4 border-amber-500 p-6 rounded mb-8">
        <h3 className="font-bold mb-2">Exemples emblématiques</h3>
        <ul className="space-y-2">
          <li><strong>Audemars Piguet :</strong> Finitions satinées et polies contrastées sur Royal Oak</li>
          <li><strong>Breguet :</strong> Guillochage main, tradition depuis 1775</li>
          <li><strong>Voutilainen :</strong> Anglage extrême, perlage d'exception</li>
          <li><strong>Lange & Söhne :</strong> Platine 3/4 gravée et anglée</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Valeur et distinction</h2>
        <p className="text-lg mb-3">
          Les finitions décoratives représentent 20 à 40% du temps de fabrication d'un mouvement 
          haut de gamme. Elles n'influencent pas la fonction mais constituent :
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Un témoignage du savoir-faire artisanal</li>
          <li>Une signature visuelle de la manufacture</li>
          <li>Un critère de valorisation et d'authenticité</li>
          <li>Un héritage technique transmis de génération en génération</li>
        </ul>
      </section>
    </article>
  );
}
