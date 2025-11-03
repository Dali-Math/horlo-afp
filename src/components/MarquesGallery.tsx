import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Award, Star, ArrowRight } from 'lucide-react';

interface Marque {
  id: string;
  name: string;
  founded: string;
  description: string;
  specialties: string[];
  achievements: string[];
  image: string;
  logo: string;
  rarity: 'legendary' | 'prestigious' | 'exclusive';
}

const MarquesGallery: React.FC = () => {
  const [selectedMarque, setSelectedMarque] = useState<Marque | null>(null);

  const marques: Marque[] = [
    {
      id: 'patek-philippe',
      name: 'Patek Philippe',
      founded: '1839',
      description: 'La quintessence de l\'horlogerie suisse depuis 185 ans',
      specialties: ['Grand Complication', 'Perpetual Calendar', 'Minute Repeater', 'Sky Moon Tourbillon'],
      achievements: [
        'Double patented the perpetual calendar (1887)',
        'Created the first Swiss wristwatch (1868)',
        'Record price: $24 million at auction',
        'Royal warrant of Queen Victoria'
      ],
      image: '/images/Patek_Philippe_Nautilus_Steel_Blue_Dial_Luxury_Watch.jpg',
      logo: 'PP',
      rarity: 'legendary'
    },
    {
      id: 'audemars-piguet',
      name: 'Audemars Piguet',
      founded: '1875',
      description: 'Le créateur du concept de montre de luxe sportive',
      specialties: ['Royal Oak', 'Grande Complication', 'Skeletal watches', 'Jewels'],
      achievements: [
        'Invented the Royal Oak (1972)',
        'First luxury sports watch ever made',
        'Pioneer in precious metal combinations',
        'Michele Kooms watchmaker history'
      ],
      image: '/images/audemars-piguet-royal-oak-perpetual-calendar-blue-dial-steel.jpg',
      logo: 'AP',
      rarity: 'legendary'
    },
    {
      id: 'vacheron-constantin',
      name: 'Vacheron Constantin',
      founded: '1755',
      description: 'La plus ancienne horlogerie encore en activité au monde',
      specialties: ['Métiers d\'Art', 'Tourbillon', 'Perpetual Calendar', 'Thin watches'],
      achievements: [
        'Oldest continuously operating watchmaker',
        'Royal warrant of King Louis XV',
        'Created the first minute repeater watch',
        'Innovator in ultra-thin movements'
      ],
      image: '/images/Vacheron_Constantin_Rose_Gold_Perpetual_Calendar_Tourbillon_Watch.jpg',
      logo: 'VC',
      rarity: 'legendary'
    },
    {
      id: 'iwc',
      name: 'IWC Schaffhausen',
      founded: '1868',
      description: 'Le pionnier de l\'horlogerie technique suisse',
      specialties: ['Pilot Watches', 'Portuguese Collection', 'Da Vinci', 'Big Pilot'],
      achievements: [
        'Pioneer of aviation watches (1936)',
        'Royal Air Force official supplier',
        'Innovator in anti-magnetic movements',
        'Big Pilot watch world record'
      ],
      image: '/images/IWC_Portugieser_Chronograph_Automatic_Blue_Dial_Luxury_Watch.jpg',
      logo: 'IWC',
      rarity: 'prestigious'
    },
    {
      id: 'grand-seiko',
      name: 'Grand Seiko',
      founded: '1960',
      description: 'La perfection nippone dans l\'art horloger',
      specialties: ['Spring Drive', 'High-Beat movements', 'Elegance Collection', 'Shunbun'],
      achievements: [
        'Inventor of Spring Drive technology',
        'Most accurate mechanical watches',
        'Micro-Alloying steel innovation',
        'Crown Prince Award winner'
      ],
      image: '/images/grand-seiko-tourbillon-watch-complication-technical-illustration.jpg',
      logo: 'GS',
      rarity: 'prestigious'
    },
    {
      id: 'laurent-ferrier',
      name: 'Laurent Ferrier',
      founded: '2009',
      description: 'L\'artisanat d\'exception contemporain',
      specialties: ['Galet', 'Classic', 'Micro-rotor', 'Hand-finishing'],
      achievements: [
        'Founded by ex-Patek Philippe watchmaker',
        'Revolutionary micro-rotor design',
        'GPHG Horlogerie Prize winner',
        'Limited to 500 watches annually'
      ],
      image: '/images/laurent-ferrier-swiss-watch-movement-macro-precision-caliber.jpg',
      logo: 'LF',
      rarity: 'exclusive'
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-purple-500 to-pink-500';
      case 'prestigious': return 'from-blue-500 to-cyan-500';
      case 'exclusive': return 'from-amber-500 to-orange-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getRarityBadge = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return { icon: Crown, text: 'Légendaire', color: 'text-purple-400' };
      case 'prestigious': return { icon: Award, text: 'Prestigieux', color: 'text-blue-400' };
      case 'exclusive': return { icon: Star, text: 'Exclusif', color: 'text-amber-400' };
      default: return { icon: Star, text: 'Rare', color: 'text-gray-400' };
    }
  };

  return (
    <section id="marques" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-6">
            Marques Prestigieuses
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Découvrez les légendes horlogères qui façonnent l'art de la précision depuis des siècles
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {marques.map((marque, index) => {
            const rarityInfo = getRarityBadge(marque.rarity);
            const RarityIcon = rarityInfo.icon;

            return (
              <motion.div
                key={marque.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setSelectedMarque(marque)}
              >
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden hover:bg-white/20 transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-2xl">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={marque.image}
                      alt={marque.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    
                    {/* Rarity Badge */}
                    <div className="absolute top-4 right-4">
                      <div className={`bg-gradient-to-r ${getRarityColor(marque.rarity)} px-3 py-1 rounded-full flex items-center space-x-2`}>
                        <RarityIcon className="w-4 h-4 text-white" />
                        <span className="text-white text-xs font-semibold">{rarityInfo.text}</span>
                      </div>
                    </div>

                    {/* Logo */}
                    <div className="absolute bottom-4 left-4">
                      <div className="bg-white/20 backdrop-blur-lg rounded-lg px-4 py-2">
                        <span className="text-white font-bold text-lg">{marque.logo}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{marque.name}</h3>
                    <p className="text-amber-400 font-semibold mb-3">{marque.founded}</p>
                    <p className="text-white/70 text-sm mb-4 leading-relaxed">{marque.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {marque.specialties.slice(0, 2).map((specialty) => (
                          <span
                            key={specialty}
                            className="bg-white/10 text-white/80 px-2 py-1 rounded text-xs"
                          >
                            {specialty}
                          </span>
                        ))}
                        {marque.specialties.length > 2 && (
                          <span className="text-white/50 text-xs">+{marque.specialties.length - 2} more</span>
                        )}
                      </div>
                      <ArrowRight className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Marque Detail Modal */}
      <AnimatePresence>
        {selectedMarque && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedMarque(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-slate-900/95 backdrop-blur-lg border border-white/20 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                {/* Hero Image */}
                <div className="relative h-64 overflow-hidden rounded-t-2xl">
                  <img
                    src={selectedMarque.image}
                    alt={selectedMarque.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Logo */}
                  <div className="absolute bottom-6 left-6">
                    <div className="bg-white/20 backdrop-blur-lg rounded-xl px-6 py-3">
                      <span className="text-white font-bold text-2xl">{selectedMarque.logo}</span>
                    </div>
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedMarque(null)}
                    className="absolute top-6 right-6 bg-white/20 hover:bg-white/30 backdrop-blur-lg rounded-full p-2 transition-colors"
                  >
                    ×
                  </button>
                </div>

                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-4xl font-bold text-white mb-2">{selectedMarque.name}</h3>
                      <p className="text-amber-400 text-xl font-semibold">Fondée en {selectedMarque.founded}</p>
                    </div>
                    <div className={`bg-gradient-to-r ${getRarityColor(selectedMarque.rarity)} px-4 py-2 rounded-full flex items-center space-x-2`}>
                      <Crown className="w-5 h-5 text-white" />
                      <span className="text-white font-semibold">{getRarityBadge(selectedMarque.rarity).text}</span>
                    </div>
                  </div>

                  <p className="text-white/80 text-lg mb-8 leading-relaxed">{selectedMarque.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Specialties */}
                    <div>
                      <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                        <Star className="w-5 h-5 text-amber-400 mr-2" />
                        Spécialités
                      </h4>
                      <div className="space-y-3">
                        {selectedMarque.specialties.map((specialty, index) => (
                          <div key={index} className="bg-white/10 rounded-lg p-3">
                            <span className="text-white/90">{specialty}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div>
                      <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                        <Award className="w-5 h-5 text-amber-400 mr-2" />
                        Réalisations
                      </h4>
                      <div className="space-y-3">
                        {selectedMarque.achievements.map((achievement, index) => (
                          <div key={index} className="bg-white/10 rounded-lg p-3">
                            <span className="text-white/90 text-sm">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MarquesGallery;
