
import React, { useState } from 'react';
import { Search, BookOpen, GraduationCap } from 'lucide-react';

interface Term {
  term: string;
  definition: string;
  category: 'Mécanique' | 'Décoration' | 'Habillage';
}

const lexicon: Term[] = [
  {
    term: "Alternance",
    definition: "Mouvement d'aller-retour du balancier. Le nombre d'alternances par heure (A/h) détermine la fréquence de la montre et donc sa précision (ex: 28'800 A/h = 4Hz).",
    category: "Mécanique"
  },
  {
    term: "Anglage",
    definition: "Technique de finition manuelle consistant à abattre l'arête vive entre la surface et le flanc d'une pièce (pont, platine) pour créer un biseau poli miroir à 45°.",
    category: "Décoration"
  },
  {
    term: "Balancier",
    definition: "Organe régulateur de la montre. Couplé au spiral, il oscille de manière régulière pour diviser le temps en fractions égales.",
    category: "Mécanique"
  },
  {
    term: "Calibre",
    definition: "Synonyme de mouvement. Désigne le mécanisme interne de la montre, caractérisé par ses dimensions et sa forme.",
    category: "Mécanique"
  },
  {
    term: "Complications",
    definition: "Fonctions mécaniques complexes allant au-delà de la simple indication de l'heure (heures, minutes, secondes). Témoins du génie horloger, elles incluent les complications astronomiques (comme le Quantième Perpétuel), sonores (comme la Répétition Minutes) ou de précision (comme le Tourbillon).",
    category: "Mécanique"
  },
  {
    term: "Côtes de Genève",
    definition: "Décoration ondu lée traditionnelle ornant les platines et les ponts des montres de haute horlogerie, capturant la lumière pour un effet esthétique profond.",
    category: "Décoration"
  },
  {
    term: "Guillochage",
    definition: "Technique de gravure décorative consistant à tracer des motifs géométriques répétés (clous de Paris, grain d'orge) sur un cadran ou un boîtier.",
    category: "Décoration"
  },
  {
    term: "Lunette",
    definition: "Anneau entourant la glace de la montre. Elle peut être fixe, tournante (pour la plongée), sertie de diamants ou gravée d'une échelle tachymétrique.",
    category: "Habillage"
  },
  {
    term: "Phase de Lune",
    definition: "Complication poétique affichant le cycle lunaire (nouvelle lune, premier quartier, pleine lune) sur le cadran, souvent via un disque rotatif.",
    category: "Mécanique"
  },
  {
    term: "Répétition Minutes",
    definition: "L'une des complications les plus sophistiquées. Elle sonne l'heure, les quarts et les minutes à la demande grâce à des marteaux frappant sur des timbres.",
    category: "Mécanique"
  },
  {
    term: "Tourbillon",
    definition: "Dispositif inventé par Breguet en 1801. Il place l'organe régulateur dans une cage mobile pour compenser les écarts de marche dus à la gravité terrestre.",
    category: "Mécanique"
  }
];

const Glossary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredTerms = lexicon.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) || item.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="min-h-screen bg-white dark:bg-neutral-950 py-32 px-6 transition-colors">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-900 rounded-full flex items-center justify-center border border-gold-500/30">
                <BookOpen className="w-8 h-8 text-gold-500" />
            </div>
          </div>
          <span className="text-gold-600 dark:text-gold-400 uppercase tracking-[0.3em] text-xs font-bold">Savoir Encyclopédique</span>
          <h1 className="text-4xl md:text-6xl font-serif mt-6 mb-6 text-neutral-900 dark:text-white">
            Lexique Horloger
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl mx-auto font-light">
            Pour comprendre l'exception, il faut maîtriser le langage. Découvrez les termes techniques qui définissent la haute horlogerie.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between bg-neutral-50 dark:bg-neutral-900/50 p-6 rounded-lg border border-neutral-200 dark:border-neutral-800">
            <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
                <input 
                    type="text" 
                    placeholder="Rechercher un terme..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-full pl-12 pr-6 py-3 text-sm focus:outline-none focus:border-gold-500 transition-colors dark:text-white"
                />
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
                {['Mécanique', 'Décoration', 'Habillage'].map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                        className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap border ${
                            selectedCategory === cat 
                            ? 'bg-gold-500 text-white border-gold-500' 
                            : 'bg-transparent text-neutral-500 border-neutral-300 dark:border-neutral-700 hover:border-gold-500 hover:text-gold-500'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTerms.length > 0 ? (
                filteredTerms.map((item, idx) => (
                    <div key={idx} className="group bg-neutral-50 dark:bg-neutral-900 p-8 border border-neutral-200 dark:border-neutral-800 hover:border-gold-500/50 transition-all duration-300 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <GraduationCap className="w-12 h-12 text-gold-500" />
                        </div>
                        <span className="inline-block px-3 py-1 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-full text-[10px] font-bold uppercase tracking-widest text-gold-600 dark:text-gold-400 mb-4">
                            {item.category}
                        </span>
                        <h3 className="font-serif text-2xl text-neutral-900 dark:text-white mb-4 group-hover:text-gold-500 transition-colors">
                            {item.term}
                        </h3>
                        <div className="w-12 h-0.5 bg-neutral-200 dark:bg-neutral-700 mb-4 group-hover:w-24 group-hover:bg-gold-500 transition-all duration-500"></div>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed font-light">
                            {item.definition}
                        </p>
                    </div>
                ))
            ) : (
                <div className="col-span-2 text-center py-12">
                    <p className="text-neutral-500">Aucun terme ne correspond à votre recherche.</p>
                </div>
            )}
        </div>

      </div>
    </section>
  );
};

export default Glossary;
