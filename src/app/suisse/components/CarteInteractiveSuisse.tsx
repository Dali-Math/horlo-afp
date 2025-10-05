"use client";
import { motion } from "framer-motion";
import { useState } from "react";

// Canton data with institutions
const cantonData = {
  geneve: {
    name: "Genève",
    institutions: [
      "École d'Horlogerie de Genève",
      "Patek Philippe Museum",
      "Vacheron Constantin Heritage",
      "Fondation de la Haute Horlogerie"
    ],
    link: "https://www.geneve-tourisme.ch/fr/que-faire/culture/musees/patek-philippe-museum"
  },
  jura: {
    name: "Jura",
    institutions: [
      "Centre de formation horlogère du Jura",
      "Musée de l'Horlogerie du Locle",
      "International Watchmaking Museum",
      "École technique de Porrentruy"
    ],
    link: "https://www.jura.ch/fr/Autorites/Administration/Departements/DFCS/SFP/Ecoles/Ecole-technique-de-Porrentruy.html"
  },
  neuchatel: {
    name: "Neuchâtel",
    institutions: [
      "Institut de Microtechnique (IMT)",
      "Musée d'Horlogerie du Locle",
      "Centre Suisse d'Électronique",
      "HE-Arc Ingénierie"
    ],
    link: "https://www.he-arc.ch/"
  }
};

interface TooltipProps {
  canton: keyof typeof cantonData;
  position: { x: number; y: number };
  onClose: () => void;
}

function Tooltip({ canton, position, onClose }: TooltipProps) {
  const data = cantonData[canton];
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
      className="absolute z-50 bg-[#1A1A1A] border border-[#E2B44F] rounded-lg p-4 shadow-2xl max-w-xs"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -100%)',
      }}
    >
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-[#E2B44F] hover:text-white transition-colors"
      >
        ×
      </button>
      
      <h3 className="text-[#E2B44F] font-bold text-lg mb-2">{data.name}</h3>
      
      <ul className="text-gray-300 text-sm space-y-1 mb-3">
        {data.institutions.map((institution, index) => (
          <li key={index} className="flex items-start">
            <span className="text-[#E2B44F] mr-2">•</span>
            {institution}
          </li>
        ))}
      </ul>
      
      <a
        href={data.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-[#E2B44F] hover:text-white transition-colors text-sm"
      >
        En savoir plus
        <svg className="ml-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </a>
    </motion.div>
  );
}

export default function CarteInteractiveSuisse() {
  const [tooltip, setTooltip] = useState<{ canton: keyof typeof cantonData; position: { x: number; y: number } } | null>(null);
  const [hoveredCanton, setHoveredCanton] = useState<string | null>(null);

  const handleCantonClick = (canton: keyof typeof cantonData, event: React.MouseEvent) => {
    const rect = (event.target as Element).getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;
    
    setTooltip({ canton, position: { x, y } });
  };

  const closeTooltip = () => {
    setTooltip(null);
  };

  return (
    <section className="py-20 px-6 bg-black relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-[#E2B44F] mb-12 text-center">
          Carte Interactive de la Suisse Horlogère
        </h2>
        
        <div className="bg-[#1A1A1A] p-8 rounded-lg border border-[#E2B44F]/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#E2B44F]/5 to-transparent"></div>
          
          <div className="relative flex justify-center">
            <svg
              viewBox="0 0 400 300"
              className="w-full max-w-2xl h-auto"
              style={{ filter: 'drop-shadow(0 0 20px rgba(226, 180, 79, 0.3))' }}
            >
              {/* Switzerland outline */}
              <path
                d="M50 150 L80 120 L120 110 L160 120 L200 115 L250 120 L300 130 L350 140 L370 160 L350 180 L320 200 L280 210 L240 215 L200 210 L160 205 L120 200 L90 185 L60 170 Z"
                fill="none"
                stroke="#E2B44F"
                strokeWidth="2"
                className="opacity-60"
              />
              
              {/* Geneva region */}
              <circle
                cx="80"
                cy="180"
                r="12"
                fill={hoveredCanton === 'geneve' ? '#E2B44F' : 'rgba(226, 180, 79, 0.7)'}
                stroke="#E2B44F"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-300 hover:filter hover:drop-shadow-[0_0_15px_rgba(226,180,79,0.8)]"
                onMouseEnter={() => setHoveredCanton('geneve')}
                onMouseLeave={() => setHoveredCanton(null)}
                onClick={(e) => handleCantonClick('geneve', e)}
              />
              <text
                x="80"
                y="205"
                textAnchor="middle"
                className="fill-[#E2B44F] text-sm font-medium"
              >
                Genève
              </text>
              
              {/* Jura region */}
              <circle
                cx="150"
                cy="140"
                r="12"
                fill={hoveredCanton === 'jura' ? '#E2B44F' : 'rgba(226, 180, 79, 0.7)'}
                stroke="#E2B44F"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-300 hover:filter hover:drop-shadow-[0_0_15px_rgba(226,180,79,0.8)]"
                onMouseEnter={() => setHoveredCanton('jura')}
                onMouseLeave={() => setHoveredCanton(null)}
                onClick={(e) => handleCantonClick('jura', e)}
              />
              <text
                x="150"
                y="165"
                textAnchor="middle"
                className="fill-[#E2B44F] text-sm font-medium"
              >
                Jura
              </text>
              
              {/* Neuchâtel region */}
              <circle
                cx="200"
                cy="155"
                r="12"
                fill={hoveredCanton === 'neuchatel' ? '#E2B44F' : 'rgba(226, 180, 79, 0.7)'}
                stroke="#E2B44F"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-300 hover:filter hover:drop-shadow-[0_0_15px_rgba(226,180,79,0.8)]"
                onMouseEnter={() => setHoveredCanton('neuchatel')}
                onMouseLeave={() => setHoveredCanton(null)}
                onClick={(e) => handleCantonClick('neuchatel', e)}
              />
              <text
                x="200"
                y="180"
                textAnchor="middle"
                className="fill-[#E2B44F] text-sm font-medium"
              >
                Neuchâtel
              </text>
              
              {/* Decorative elements */}
              <defs>
                <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" style={{ stopColor: '#E2B44F', stopOpacity: 0.3 }} />
                  <stop offset="100%" style={{ stopColor: '#E2B44F', stopOpacity: 0 }} />
                </radialGradient>
              </defs>
              
              {/* Glow effect for hovered canton */}
              {hoveredCanton === 'geneve' && (
                <circle cx="80" cy="180" r="25" fill="url(#glow)" />
              )}
              {hoveredCanton === 'jura' && (
                <circle cx="150" cy="140" r="25" fill="url(#glow)" />
              )}
              {hoveredCanton === 'neuchatel' && (
                <circle cx="200" cy="155" r="25" fill="url(#glow)" />
              )}
            </svg>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-lg mb-4">
              Cliquez sur les régions pour découvrir leurs institutions horlogères
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center text-[#E2B44F]">
                <div className="w-3 h-3 rounded-full bg-[#E2B44F] mr-2"></div>
                Centres horlogers principaux
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Tooltip */}
      {tooltip && (
        <Tooltip
          canton={tooltip.canton}
          position={tooltip.position}
          onClose={closeTooltip}
        />
      )}
      
      {/* Click outside to close tooltip */}
      {tooltip && (
        <div
          className="fixed inset-0 z-40"
          onClick={closeTooltip}
        />
      )}
    </section>
  );
}
