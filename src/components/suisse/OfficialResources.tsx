
import React from 'react';
import { ExternalLink, Building2, GraduationCap, Landmark, ChevronRight } from 'lucide-react';

const resources = [
  {
    category: "Les Gardiens du Temps",
    subtitle: "Institutions & Certifications",
    icon: <Building2 className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    links: [
      { name: "Fondation Haute Horlogerie", url: "https://www.hautehorlogerie.org", desc: "Culture & Expertise" },
      { name: "COSC", url: "https://www.cosc.ch", desc: "Contrôle Officiel Suisse des Chronomètres" },
      { name: "Fédération Horlogère (FH)", url: "https://www.fhs.swiss", desc: "Industrie Suisse" }
    ]
  },
  {
    category: "Temples d'Histoire",
    subtitle: "Musées & Patrimoine",
    icon: <Landmark className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1518998053901-5348d3969105?q=80&w=800&auto=format&fit=crop",
    links: [
      { name: "Musée International (MIH)", url: "https://www.chaux-de-fonds.ch/musees/mih", desc: "La Chaux-de-Fonds" },
      { name: "Patek Philippe Museum", url: "https://www.patek.com/museum", desc: "Genève - Les Archives" },
      { name: "Château des Monts", url: "https://www.mhl-monts.ch", desc: "Le Locle" }
    ]
  },
  {
    category: "L'Art du Geste",
    subtitle: "Formation & Excellence",
    icon: <GraduationCap className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
    links: [
      { name: "WOSTEP", url: "https://www.wostep.ch", desc: "Neuchâtel - Centre Indépendant" },
      { name: "École d'Horlogerie de Genève", url: "https://edu.ge.ch/cfpt/horlogerie", desc: "Tradition Genevoise" },
      { name: "École Technique (ETVJ)", url: "https://www.etvj.ch", desc: "Vallée de Joux" }
    ]
  }
];

const OfficialResources: React.FC = () => {
  return (
    <section className="py-32 bg-neutral-50 dark:bg-black border-t border-neutral-200 dark:border-neutral-900 transition-colors relative overflow-hidden">
      
      {/* Decorative Background Element */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-neutral-200/50 dark:from-neutral-900/50 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
            <span className="text-gold-600 dark:text-gold-400 uppercase tracking-[0.3em] text-xs font-bold border border-gold-500/30 px-4 py-1.5 rounded-full">Carnet d'Adresses</span>
            <h2 className="text-3xl md:text-5xl font-serif mt-6 mb-6 text-neutral-900 dark:text-white">Institutions de Référence</h2>
            <div className="w-24 h-0.5 bg-gold-500 mx-auto mb-8"></div>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto font-light leading-relaxed text-lg">
              L'écosystème horloger suisse repose sur trois piliers : la certification rigoureuse, la préservation du patrimoine et la transmission du savoir-faire.
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {resources.map((section, idx) => (
            <div 
              key={idx} 
              className="group relative flex flex-col bg-white dark:bg-neutral-900 rounded-sm overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-neutral-200 dark:hover:shadow-black/60 transition-all duration-500 border border-neutral-200 dark:border-neutral-800 hover:border-gold-500/50"
            >
               {/* Header Image Area */}
               <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-10"></div>
                  <img 
                    src={section.image} 
                    alt={section.category} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1.5s] ease-out grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-neutral-900 via-neutral-900/60 to-transparent z-20"></div>
                  
                  <div className="absolute bottom-6 left-6 z-30">
                    <div className="flex items-center gap-3 text-gold-400 mb-2">
                        {section.icon}
                        <span className="text-[10px] uppercase tracking-widest font-bold">{section.subtitle}</span>
                    </div>
                    <h3 className="font-serif text-2xl text-white">{section.category}</h3>
                  </div>
               </div>
               
               {/* Links Area */}
               <div className="flex-1 p-6 md:p-8 bg-white dark:bg-neutral-900">
                 <ul className="space-y-6">
                   {section.links.map((link, i) => (
                     <li key={i}>
                       <a 
                         href={link.url} 
                         target="_blank" 
                         rel="noopener noreferrer" 
                         className="group/link block"
                       >
                          <div className="flex justify-between items-start mb-1">
                             <span className="font-serif text-lg text-neutral-900 dark:text-neutral-200 group-hover/link:text-gold-600 dark:group-hover/link:text-gold-400 transition-colors">
                               {link.name}
                             </span>
                             <ExternalLink className="w-4 h-4 text-neutral-400 group-hover/link:text-gold-500 transition-colors transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                          </div>
                          <div className="flex items-center gap-2">
                             <div className="h-px w-4 bg-gold-500/50 group-hover/link:w-8 transition-all duration-300"></div>
                             <span className="text-xs text-neutral-500 dark:text-neutral-500 uppercase tracking-wider font-medium">
                               {link.desc}
                             </span>
                          </div>
                       </a>
                     </li>
                   ))}
                 </ul>
               </div>

               {/* Bottom Action Hint */}
               <div className="p-4 bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-100 dark:border-neutral-800 flex justify-end">
                   <span className="text-[10px] uppercase tracking-widest text-neutral-400 group-hover:text-gold-500 transition-colors flex items-center gap-1">
                     Découvrir <ChevronRight className="w-3 h-3" />
                   </span>
               </div>
            </div>
          ))}
        </div>
        
        <div className="mt-20 text-center">
            <p className="text-xs text-neutral-400 italic font-serif">
                "La tradition n'est pas le culte des cendres, mais la préservation du feu." — Gustav Mahler
            </p>
        </div>
      </div>
    </section>
  );
};

export default OfficialResources;
