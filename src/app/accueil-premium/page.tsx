'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { 
  Clock, 
  Watch, 
  BookOpen, 
  Award, 
  History, 
  ChevronRight, 
  Menu, 
  X, 
  Users, 
  Search,
  Globe,
  PenTool
} from 'lucide-react'

// --- Composants Utilitaires ---

// Section Wrapper pour une apparition en douceur au scroll
const FadeInSection = ({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

// --- Page Principale ---
export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [time, setTime] = useState(new Date())
  const { scrollYProgress } = useScroll()
  
  // Rotation subtile des engrenages basée sur le scroll
  const gearRotate = useTransform(scrollYProgress, [0, 1], [0, 360])
  const gearRotateReverse = useTransform(scrollYProgress, [0, 1], [0, -360])

  // Mise à jour de l'horloge
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const secondsDegrees = (time.getSeconds() / 60) * 360
  const minutesDegrees = ((time.getMinutes() + time.getSeconds() / 60) / 60) * 360
  const hoursDegrees = ((time.getHours() % 12 + time.getMinutes() / 60) / 12) * 360

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans overflow-hidden">
      
      {/* --- Navigation --- */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <Watch className="w-8 h-8 text-amber-600" strokeWidth={1.5} />
              <span className="text-xl font-semibold tracking-tight text-slate-900">
                CHRONO<span className="text-amber-600">CULTURE</span>
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8 font-medium text-sm">
              <a href="#education" className="hover:text-amber-600 transition-colors">Formations</a>
              <a href="#culture" className="hover:text-amber-600 transition-colors">Patrimoine & Culture</a>
              <a href="#about" className="hover:text-amber-600 transition-colors">L'Institut</a>
              <a href="#contact" className="hover:text-amber-600 transition-colors">Contact</a>
              <button className="px-5 py-2.5 bg-slate-900 text-white rounded-full hover:bg-amber-600 transition-colors duration-300">
                Espace Membre
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-slate-600">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-20 w-full bg-white border-b border-slate-100 shadow-lg py-4 px-4 flex flex-col space-y-4"
          >
            <a href="#education" className="text-lg font-medium">Formations</a>
            <a href="#culture" className="text-lg font-medium">Patrimoine</a>
            <a href="#about" className="text-lg font-medium">L'Institut</a>
            <hr />
            <button className="w-full py-3 bg-amber-600 text-white rounded-md">
              Espace Membre
            </button>
          </motion.div>
        )}
      </nav>

      {/* --- Hero Section --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Décoration d'arrière-plan (Engrenage abstrait) */}
        <motion.div 
          style={{ rotate: gearRotate, opacity: 0.05 }}
          className="absolute top-0 right-[-20%] w-[600px] h-[600px] pointer-events-none hidden lg:block"
        >
           <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-slate-900">
             <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z" />
           </svg>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Texte Hero */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-50 border border-amber-100 rounded-full text-amber-700 text-sm font-medium">
              <SparklesIcon className="w-4 h-4" />
              <span>Excellence & Tradition depuis 1920</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-tight">
              L'Art de la <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-800">
                Mesure du Temps
              </span>
            </h1>
            <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
              Explorez l'univers fascinant de l'horlogerie. Une plateforme éducative et culturelle dédiée à la préservation du savoir-faire et à l'histoire des garde-temps.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition-all flex items-center group">
                Découvrir nos programmes
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white text-slate-900 border-2 border-slate-200 rounded-full font-medium hover:border-amber-600 hover:text-amber-600 transition-all">
                Explorer le musée virtuel
              </button>
            </div>
          </motion.div>

          {/* Animation Horloge Interactive */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative flex justify-center items-center h-[400px] lg:h-[500px]"
          >
            {/* Cadran de l'horloge */}
            <div className="relative w-80 h-80 lg:w-96 lg:h-96 bg-white rounded-full shadow-2xl shadow-slate-200/50 border-8 border-slate-50 flex items-center justify-center">
              {/* Marqueurs d'heures */}
              {[...Array(12)].map((_, i) => (
                <div 
                  key={i} 
                  className="absolute w-1 h-4 bg-slate-300" 
                  style={{ 
                    transform: `rotate(${i * 30}deg) translateY(-150px)` 
                  }} 
                />
              ))}
              {/* Marqueurs principaux (12, 3, 6, 9) */}
              {[0, 90, 180, 270].map((deg) => (
                <div 
                  key={deg} 
                  className="absolute w-2 h-6 bg-amber-600" 
                  style={{ 
                    transform: `rotate(${deg}deg) translateY(-145px)` 
                  }} 
                />
              ))}

              {/* Aiguille des heures */}
              <motion.div 
                className="absolute w-2 h-24 bg-slate-800 rounded-full origin-bottom"
                style={{ 
                  bottom: '50%',
                  rotate: hoursDegrees,
                }}
              />
              {/* Aiguille des minutes */}
              <motion.div 
                className="absolute w-1.5 h-32 bg-slate-600 rounded-full origin-bottom"
                style={{ 
                  bottom: '50%',
                  rotate: minutesDegrees,
                }}
              />
               {/* Aiguille des secondes (Trotteuse) - Animée en continu ou par tic-tac */}
              <motion.div 
                className="absolute w-0.5 h-36 bg-amber-600 rounded-full origin-bottom"
                style={{ 
                  bottom: '50%',
                  rotate: secondsDegrees,
                }}
                transition={{ ease: "linear", duration: 0.1 }} // Fluide
                // Pour un effet "tic-tac", retirez la transition ci-dessus.
              />
              {/* Point central */}
              <div className="absolute w-4 h-4 bg-amber-600 rounded-full z-10 border-2 border-white"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Section Valeurs / Piliers --- */}
      <FadeInSection className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Nos Piliers Fondamentaux</h2>
            <div className="w-20 h-1 bg-amber-600 mx-auto mt-4"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <FeatureCard 
              icon={<BookOpen className="w-8 h-8 text-amber-600" />}
              title="Éducation & Savoir"
              description="Des cursus allant de l'initiation aux techniques de haute complexité, dispensés par des maîtres horlogers."
            />
            <FeatureCard 
              icon={<History className="w-8 h-8 text-amber-600" />}
              title="Patrimoine Culturel"
              description="Une immersion dans l'histoire des manufactures, des innovations et des pièces iconiques qui ont marqué les siècles."
            />
            <FeatureCard 
              icon={<Users className="w-8 h-8 text-amber-600" />}
              title="Communauté Passionnée"
              description="Un réseau international d'experts, de collectionneurs et d'étudiants partageant la même passion pour la mécanique."
            />
          </div>
        </div>
      </FadeInSection>

      {/* --- Section Éducative --- */}
      <FadeInSection id="education" className="py-20 bg-slate-50 relative overflow-hidden">
         {/* Engrenage décoratif tournant en sens inverse */}
         <motion.div 
          style={{ rotate: gearRotateReverse, opacity: 0.03 }}
          className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] pointer-events-none"
        >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-slate-900">
              <path d="M12,12A10,10 0 0,0 22,2A10,10 0 0,0 12,12M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12Z" /> {/* Simplified gear representation */}
           </svg>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <span className="text-amber-600 font-semibold tracking-wider uppercase text-sm">Apprentissage</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">Formations & Ateliers</h2>
            </div>
            <a href="#" className="group flex items-center text-slate-700 font-medium mt-4 md:mt-0 hover:text-amber-600 transition-colors">
              Voir tout le catalogue <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"/>
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CourseCard 
              level="Débutant"
              title="Introduction à la Mécanique"
              duration="4 semaines"
              image="https://images.unsplash.com/photo-1590595978583-3967cf17d2ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" // Replace with local image if available
            />
             <CourseCard 
              level="Intermédiaire"
              title="Histoire des Complications"
              duration="8 semaines"
              image="https://images.unsplash.com/photo-1612810848197-663595e1b54d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            />
             <CourseCard 
              level="Avancé"
              title="Restauration de Garde-temps"
              duration="12 semaines"
              image="https://images.unsplash.com/photo-1580828834926-e3d40b893698?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            />
          </div>
        </div>
      </FadeInSection>

      {/* --- Section Culturelle (Parallaxe simple) --- */}
      <section id="culture" className="py-32 relative flex items-center justify-center text-center text-white">
        <div className="absolute inset-0 overflow-hidden">
           {/* Image de fond sombre et élégante */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1495314736236-4f46b5d864e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center bg-fixed grayscale brightness-[0.3]"></div>
          <div className="absolute inset-0 bg-amber-900/20 mix-blend-overlay"></div>
        </div>
        
        <FadeInSection className="relative z-10 max-w-3xl px-4 mx-auto">
          <Globe className="w-12 h-12 mx-auto mb-6 text-amber-400 opacity-80" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif">Le Musée Virtuel</h2>
          <p className="text-lg md:text-xl text-slate-200 mb-8 leading-relaxed">
            Voyagez à travers cinq siècles d'ingéniosité humaine. Notre collection numérique recense plus de 5000 pièces, des premières horloges de table aux chefs-d'œuvre contemporains.
          </p>
          <button className="px-8 py-4 bg-amber-600 text-white rounded-full font-medium hover:bg-amber-500 transition-colors">
            Commencer la visite
          </button>
        </FadeInSection>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-slate-900 text-slate-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <Watch className="w-6 h-6 text-amber-600" />
              <span className="text-xl font-semibold text-white">CHRONO<span className="text-amber-600">CULTURE</span></span>
            </div>
            <p className="max-w-sm mb-6">
              L'institution de référence pour l'éducation et la culture horlogère. Nous préservons le passé pour inspirer les créateurs de demain.
            </p>
            <div className="flex space-x-4">
              {/* Social placeholders */}
              <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors cursor-pointer"><Globe size={18}/></div>
              <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors cursor-pointer"><PenTool size={18}/></div>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-6 uppercase tracking-wider text-sm">Navigation</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-amber-500 transition-colors">Accueil</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Formations</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Musée & Collections</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Événements</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6 uppercase tracking-wider text-sm">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li>Genève, Suisse</li>
              <li>contact@chronoculture.edu</li>
              <li>+41 22 555 00 00</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-slate-800 text-sm text-center md:text-left flex flex-col md:flex-row justify-between">
          <p>© {new Date().getFullYear()} ChronoCulture. Tous droits réservés.</p>
          <div className="space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Mentions légales</a>
            <a href="#" className="hover:text-white">Politique de confidentialité</a>
          </div>
        </div>
      </footer>

    </div>
  )
}

// --- Sous-composants pour la propreté du code ---

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
    >
      <div className="mb-5 p-3 bg-white inline-block rounded-xl shadow-sm">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">
        {description}
      </p>
    </motion.div>
  )
}

function CourseCard({ level, title, duration, image }: { level: string, title: string, duration: string, image: string }) {
  return (
    <div className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300">
      <div className="h-48 overflow-hidden relative">
        <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-bold text-amber-700 rounded-full z-10">
          {level}
        </div>
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center text-sm text-slate-500 mb-3 space-x-4">
          <span className="flex items-center"><Clock size={14} className="mr-1"/> {duration}</span>
          <span className="flex items-center"><Award size={14} className="mr-1"/> Certifiant</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-amber-700 transition-colors">
          {title}
        </h3>
        <p className="text-slate-600 text-sm line-clamp-2 mb-4">
          Une plongée approfondie dans les mécanismes et l'histoire de cette discipline...
        </p>
        <span className="text-amber-600 font-medium text-sm flex items-center">
          En savoir plus <ArrowRight size={16} className="ml-1" />
        </span>
      </div>
    </div>
  )
}

// Petit utilitaire pour l'icône manquante
const SparklesIcon = ({className}: {className?: string}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.394a.75.75 0 010 1.422l-1.183.394c-.447.15-.799.5-.948.948l-.394 1.183a.75.75 0 01-1.422 0l-.394-1.183a1.5 1.5 0 00-.948-.948l-1.183-.394a.75.75 0 010-1.422l1.183-.394a1.5 1.5 0 00.948-.948l.394-1.183A.75.75 0 0116.5 15z" clipRule="evenodd" />
  </svg>
)

const ArrowRight = ({size, className}: {size?:number, className?: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
)
