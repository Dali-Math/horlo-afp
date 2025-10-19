import Image from "next/image";

export default function PlatinePonts() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-neutral-100">Platine et Ponts</h1>
      
      <article className="mb-10 text-lg text-neutral-300">
        <p className="mb-2">
          La <b>platine</b> et les <b>ponts</b> forment l’ossature d’un mouvement mécanique. 
          Ils servent de support à tous les organes mobiles et fixent les axes des roues, assurant 
          stabilité et précision à l’ensemble.
        </p>
        <p className="mb-4">
          <b>Platine :</b> c’est la base du mouvement, souvent en laiton, parfois décorée (perlage, Côtes de Genève…). 
          Elle reçoit la plupart des composants : rouages, barillet, ancre, balancier…
        </p>
        <p className="mb-4">
          <b>Ponts :</b> ils maintiennent les extrémités des axes du rouage et d’autres éléments. 
          Le nombre, la forme et la décoration des ponts varient selon chaque manufacture et calibre.
        </p>
      </article>
      
      <div className="flex flex-col md:flex-row gap-8 items-center bg-neutral-800 p-6 rounded-xl mb-8 shadow">
        <Image 
          src="/images/platine-decoree.webp" 
          alt="Platine décorée" 
          width={280} 
          height={180}
          className="rounded shadow"
        />
        <Image 
          src="/images/pont-anglage.webp" 
          alt="Pont anglé" 
          width={180}
          height={110}
          className="rounded shadow"
        />
      </div>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-neutral-50">Rôles et caractéristiques</h2>
        <ul className="space-y-2 pl-5 list-disc text-neutral-300">
          <li>Assurance de la stabilité dimensionnelle de l’ensemble.</li>
          <li>Systèmes de fixation : vis, clavettes, ajustements de précision.</li>
          <li>Influence directe sur la fiabilité et la durabilité du mouvement.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-3 text-neutral-50">Finitions décoratives</h2>
        <p className="mb-2 text-neutral-300">
          Les platines et ponts peuvent recevoir des décorations raffinées : 
          <br />
          <span className="italic">Perlage</span>, <span className="italic">Côtes de Genève</span>, <span className="italic">anglage</span>… 
          Cela allie tradition horlogère, prouesse technique et esthétique.
        </p>
        <div className="flex gap-5 mt-4">
          <Image src="/images/cotes-de-geneve.webp" alt="Côtes de Genève" width={120} height={100} className="rounded" />
          <Image src="/images/perlage.webp" alt="Perlage" width={120} height={100} className="rounded" />
        </div>
      </section>
    </section>
  );
}
