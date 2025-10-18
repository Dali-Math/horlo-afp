'use client';
import Image from 'next/image';

interface Person {
  nom: string;
  epoque: string;
  texte: string;
  image: string; // Chemin local
}

const personnalites: Person[] = [
  {
    nom: "Abraham-Louis Breguet",
    epoque: "XVIIIe – XIXe siècle",
    texte: "Inventeur du tourbillon, pionnier de la haute horlogerie et du design classique.",
    image: "/img/personnalites/breguet.jpg"
  },
  {
    nom: "Hans Wilsdorf",
    epoque: "XXe siècle",
    texte: "Fondateur de Rolex, visionnaire marketing et précision chronométrique suprême.",
    image: "/img/personnalites/wilsdorf.jpg"
  }
  // ... ajoute plus !
];

export default function PersonnalitesSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-br from-yellow-50 to-orange-50">
      <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8 text-center">Personnalités Horlogères</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {personnalites.map((perso, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform group">
            <div className="w-28 h-28 mb-4 rounded-full overflow-hidden border-4 border-yellow-400 shadow-lg">
              <Image
                src={perso.image}
                alt={perso.nom}
                width={112}
                height={112}
                className="object-cover group-hover:grayscale-0 group-hover:scale-110 transition-all"
              />
            </div>
            <h3 className="text-xl font-bold text-yellow-700 mb-1">{perso.nom}</h3>
            <p className="text-xs text-yellow-800 font-semibold mb-2">{perso.epoque}</p>
            <p className="text-slate-600 text-sm">{perso.texte}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
