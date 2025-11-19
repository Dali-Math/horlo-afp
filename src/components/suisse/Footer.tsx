
import React, { useState, useEffect } from 'react';
import { Facebook, Instagram, Twitter, Youtube, Clock } from 'lucide-react';

const Footer: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dateOptions: Intl.DateTimeFormatOptions = {
    timeZone: 'Europe/Zurich',
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    timeZone: 'Europe/Zurich',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };

  const formattedDate = new Intl.DateTimeFormat('fr-FR', dateOptions).format(time);
  const formattedTime = new Intl.DateTimeFormat('fr-FR', timeOptions).format(time).replace(' h ', ':');

  return (
    <footer className="bg-neutral-950 text-white pt-20 pb-10 border-t border-neutral-900 overflow-hidden">
      <style>{`
        @keyframes flutter {
          0% { transform: rotateY(0deg); }
          25% { transform: rotateY(12deg); }
          50% { transform: rotateY(0deg); }
          75% { transform: rotateY(-8deg); }
          100% { transform: rotateY(0deg); }
        }
        
        @keyframes cloth-ripple {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 0%; }
        }

        .flag-container-3d {
            perspective: 800px;
            transform-style: preserve-3d;
        }
        
        .swiss-flag {
            transform-origin: left center;
            animation: flutter 6s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
            backface-visibility: hidden;
            transform-style: preserve-3d;
            box-shadow: 10px 10px 30px rgba(0,0,0,0.5);
        }

        .light-reflection {
            background: linear-gradient(105deg, 
              rgba(0,0,0,0.3) 0%, 
              rgba(255,255,255,0.1) 20%, 
              rgba(0,0,0,0.1) 45%, 
              rgba(255,255,255,0.15) 55%, 
              rgba(0,0,0,0.3) 80%,
              rgba(255,255,255,0.05) 100%
            );
            background-size: 200% 100%;
            mix-blend-mode: overlay;
            animation: cloth-ripple 3s linear infinite;
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
             {/* Logo Image/Icon */}
             <div className="flex items-center gap-3 mb-6">
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="w-10 h-10 text-gold-500"
                >
                  <circle cx="12" cy="12" r="9" strokeWidth="2" />
                  <polyline points="12 6 12 12 8 12" strokeWidth="2" />
                </svg>
                <div className="flex flex-col">
                    <span className="font-sans text-2xl font-bold tracking-tight leading-none text-white">
                      HorloLearn
                    </span>
                    <span className="text-[9px] text-neutral-500 uppercase tracking-wide mt-1">
                      AFP • CFC • Autodidactes
                    </span>
                </div>
             </div>

            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              Pour les passionnés et les apprentis horlogers. Culture, savoir-faire et passion du temps.
            </p>
            <div className="flex gap-4">
              <Instagram className="w-5 h-5 text-neutral-400 hover:text-gold-500 cursor-pointer transition-colors" />
              <Facebook className="w-5 h-5 text-neutral-400 hover:text-gold-500 cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-neutral-400 hover:text-gold-500 cursor-pointer transition-colors" />
              <Youtube className="w-5 h-5 text-neutral-400 hover:text-gold-500 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-widest mb-6 text-gold-500">Collections</h4>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li className="hover:text-white cursor-pointer transition-colors">Aviation</li>
              <li className="hover:text-white cursor-pointer transition-colors">Plongée</li>
              <li className="hover:text-white cursor-pointer transition-colors">Classique</li>
              <li className="hover:text-white cursor-pointer transition-colors">Complications</li>
              <li className="hover:text-white cursor-pointer transition-colors">Éditions Limitées</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase font-bold tracking-widest mb-6 text-gold-500">Maison</h4>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li className="hover:text-white cursor-pointer transition-colors">Notre Histoire</li>
              <li className="hover:text-white cursor-pointer transition-colors">Savoir-Faire</li>
              <li className="hover:text-white cursor-pointer transition-colors">Manufacture</li>
              <li className="hover:text-white cursor-pointer transition-colors">Carrières</li>
              <li className="hover:text-white cursor-pointer transition-colors">Presse</li>
            </ul>
          </div>

          {/* Swiss Flag Animation */}
          <div>
             <h4 className="text-xs uppercase font-bold tracking-widest mb-6 text-gold-500">Origine Certifiée</h4>
             <div className="flex flex-col items-start">
               
               <div className="flag-container-3d relative h-32 w-32">
                 {/* Pole (Fixed) */}
                 <div className="absolute left-0 top-1 bottom-0 w-2.5 bg-gradient-to-r from-neutral-500 via-neutral-300 to-neutral-600 rounded-full shadow-2xl z-10">
                     <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-gold-300 to-gold-600 shadow-lg border border-gold-700"></div>
                 </div>

                 {/* Rotating Flag Canvas */}
                 <div className="absolute left-2.5 top-2 w-24 h-24 swiss-flag">
                    
                    {/* Flag Fabric - Red Background */}
                    <div className="absolute inset-0 bg-[#D52B1E] z-10 border-t border-b border-r border-white/10"></div>

                    {/* Fabric Texture */}
                    <div 
                        className="absolute inset-0 z-20 opacity-30 mix-blend-multiply"
                        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/fabric-of-squares.png')" }}
                    ></div>

                    {/* Swiss Cross (Official Proportions 7:6) */}
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                        {/* Using 60px total length for a 24x4 (96px) box.
                           Proportion calculation:
                           Total Size = 20 units.
                           Arm Thickness = 6 units.
                           Arm Length = 7 units.
                           Ratio Thickness/Total = 6/20 = 0.3
                           For 60px total cross size: Thickness = 18px.
                        */}
                        <div className="relative drop-shadow-sm">
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60px] h-[18px] bg-white"></div>
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[18px] h-[60px] bg-white"></div>
                        </div>
                    </div>
                    
                    {/* Lighting / Ripple Effect Layer */}
                    <div className="absolute inset-0 z-30 light-reflection pointer-events-none"></div>
                    
                    {/* Attachment Shadow (Near Pole) */}
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-r from-black/40 to-transparent z-20"></div>

                 </div>
               </div>

               <p className="text-neutral-400 text-sm mt-2 pl-1">
                 L'excellence du label <br/><span className="text-white font-serif italic text-lg">Swiss Made</span>.
               </p>
             </div>
          </div>
        </div>

        <div className="border-t border-neutral-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500 gap-6 md:gap-0">
          <p className="order-2 md:order-1">&copy; {new Date().getFullYear()} HorloLearn Genève. Tous droits réservés.</p>
          
          {/* Swiss Clock */}
          <div className="order-1 md:order-2 flex items-center gap-2 py-1 px-4 rounded-full bg-neutral-900 border border-neutral-800/50 shadow-inner">
             <Clock className="w-3 h-3 text-gold-600" />
             <span className="text-[10px] font-medium tracking-widest uppercase text-neutral-400 capitalize">
               {`Genève, ${formattedDate}, ${formattedTime}`}
             </span>
          </div>

          <div className="order-3 md:order-3 flex gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Mentions Légales</span>
            <span className="hover:text-white cursor-pointer transition-colors">Politique de Confidentialité</span>
            <span className="hover:text-white cursor-pointer transition-colors">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
