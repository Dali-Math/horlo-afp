'use client'

import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTheme } from 'next-themes'
import {
  Clock, MapPin, Building2, Users, TrendingUp, Award, Download,
  BookOpen, ExternalLink, ChevronRight, Factory, Globe, Star,
  Crown, Shield, Trophy, GraduationCap, Lightbulb, Eye, Heart,
  Target, Zap, ArrowRight, FileText
} from 'lucide-react'

// ============================================================================
// INTERFACES TYPESCRIPT
// ============================================================================

interface FadeInSectionProps {
  children: React.ReactNode
  className?: string
  id?: string
}

interface StatCardProps {
  icon: React.ElementType
  value: string
  label: string
  color: string
  delay?: number
}

interface RegionData {
  name: string
  cities: string[]
  description: string
  manufactures: number
  emplois: number
  speciality: string
  icon: React.ElementType
  color: string
}

interface RegionCardProps {
  region: RegionData
  delay?: number
}

interface BrandData {
  name: string
  founded: number
  employees: number
  location: string
}

interface BrandCardProps {
  brand: BrandData
  delay?: number
}

// ============================================================================
// COMPOSANTS RÉUTILISABLES
// ============================================================================

const FadeInSection: React.FC<FadeInSectionProps> = ({ children, className = "", id }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, value, label, color, delay = 0 }) => {
  const { theme } = useTheme()
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.05, y: -8 }}
      className={`group relative p-8 rounded-2xl backdrop-blur-xl border transition-all duration-500 overflow-hidden ${
        theme === 'dark' 
          ? 'bg-slate-900/60 border-slate-700/50 hover:border-amber-400/60 hover:shadow-2xl hover:shadow-amber-500/20' 
          : 'bg-white/90 border-slate-200 hover:border-amber-400/60 hover:shadow-2xl hover:shadow-amber-300/30'
      }`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
      
      <div className={`relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
        theme === 'dark' ? 'bg-amber-500/10' : 'bg-amber-100'
      }`}>
        <Icon className="w-8 h-8 text-amber-400 group-hover:scale-110 transition-transform duration-300" />
      </div>
      
      <motion.h3 
        className="text-5xl font-extrabold mb-3 relative z-10 bg-gradient-to-br from-amber-400 to-amber-600 bg-clip-text text-transparent"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: delay + 0.2 }}
      >
        {value}
      </motion.h3>
      
      <p className={`text-base font-semibold relative z-10 ${
        theme === 'dark' ? 'text-gray-300' : 'text-slate-700'
      }`}>
        {label}
      </p>
    </motion.div>
  )
}

const RegionCard: React.FC<RegionCardProps> = ({ region, delay = 0 }) => {
  const { theme } = useTheme()
  const Icon = region.icon
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -10, scale: 1.02 }}
      className={`group relative h-full p-8 rounded-3xl backdrop-blur-xl border transition-all duration-500 overflow-hidden ${
        theme === 'dark'
          ? 'bg-slate-900/60 border-slate-700/50 hover:border-amber-400/50'
          : 'bg-white/90 border-slate-200 hover:border-amber-400/50 hover:shadow-xl'
      }`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${region.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div className={`w-20 h-20 rounded-2xl flex items-center justify-center ${
            theme === 'dark' ? 'bg-amber-500/10' : 'bg-amber-100'
          }`}>
            <Icon className="w-10 h-10 text-amber-400" />
          </div>
          
          <div className="text-right">
            <div className="text-3xl font-bold text-amber-400">{region.manufactures}</div>
            <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
              Manufactures
            </div>
          </div>
        </div>

        <h3 className={`text-2xl font-bold mb-3 ${
          theme === 'dark' ? 'text-white' : 'text-slate-900'
        }`}>
          {region.name}
        </h3>

        <p className={`text-sm mb-4 leading-relaxed ${
          theme === 'dark' ? 'text-gray-400' : 'text-slate-600'
        }`}>
          {region.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {region.cities.map((city, i) => (
            <span
              key={i}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                theme === 'dark'
                  ? 'bg-slate-800 text-gray-300'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              {city}
            </span>
          ))}
        </div>

        <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
          theme === 'dark' ? 'bg-amber-500/10' : 'bg-amber-50'
        }`}>
          <Star className="w-4 h-4 text-amber-400" />
          <span className={`text-sm font-medium ${
            theme === 'dark' ? 'text-amber-300' : 'text-amber-700'
          }`}>
            {region.speciality}
          </span>
        </div>

        <div className="mt-4 flex items-center space-x-2">
          <Users className="w-5 h-5 text-amber-400" />
          <span className={`text-sm font-semibold ${
            theme === 'dark' ? 'text-gray-300' : 'text-slate-700'
          }`}>
            {region.emplois.toLocaleString()} emplois
          </span>
        </div>
      </div>
    </motion.div>
  )
}

const BrandCard: React.FC<BrandCardProps> = ({ brand, delay = 0 }) => {
  const { theme } = useTheme()
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.03, y: -5 }}
      className={`p-6 rounded-xl border transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-slate-900/50 border-slate-700 hover:border-amber-400/50'
          : 'bg-white border-slate-200 hover:border-amber-400/50 hover:shadow-lg'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h4 className={`text-lg font-bold ${
          theme === 'dark' ? 'text-white' : 'text-slate-900'
        }`}>
          {brand.name}
        </h4>
        <Crown className="w-5 h-5 text-amber-400" />
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className={theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}>
            Fondée en
          </span>
          <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            {brand.founded}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className={theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}>
            Employés
          </span>
          <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            {brand.employees.toLocaleString()}
          </span>
        </div>
        
        <div className="flex items-center space-x-2 pt-2">
          <MapPin className="w-4 h-4 text-amber-400" />
          <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
            {brand.location}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

// ============================================================================
// DONNÉES
// ============================================================================

const regions: RegionData[] = [
  {
    name: "Arc Jurassien",
    cities: ["La Chaux-de-Fonds", "Le Locle", "Neuchâtel", "Bienne"],
    description: "Berceau historique de l'horlogerie suisse depuis le XVIe siècle. Centre névralgique de la haute horlogerie mondiale.",
    manufactures: 180,
    emplois: 12500,
    speciality: "Haute horlogerie et complications",
    icon: Crown,
    color: "from-amber-500 to-yellow-600"
  },
  {
    name: "Vallée de Joux",
    cities: ["Le Brassus", "Le Sentier"],
    description: "Capitale mondiale des complications horlogères ultra-complexes. Terre des plus grandes manufactures de prestige.",
    manufactures: 45,
    emplois: 3500,
    speciality: "Complications ultra-complexes",
    icon: Trophy,
    color: "from-blue-500 to-cyan-600"
  },
  {
    name: "Genève",
    cities: ["Genève", "Plan-les-Ouates", "Meyrin"],
    description: "Centre du luxe horloger et du célèbre Poinçon de Genève. Capitale mondiale du raffinement horloger.",
    manufactures: 95,
    emplois: 8900,
    speciality: "Haute joaillerie horlogère",
    icon: Star,
    color: "from-purple-500 to-pink-600"
  },
  {
    name: "Canton de Vaud",
    cities: ["Lausanne", "Morges", "Yverdon"],
    description: "Pôle d'innovation et de technologies horlogères de pointe. Centre de recherche et développement.",
    manufactures: 60,
    emplois: 4200,
    speciality: "Innovation & R&D",
    icon: Zap,
    color: "from-green-500 to-emerald-600"
  }
]

const majorBrands: BrandData[] = [
  { name: "Rolex", founded: 1905, employees: 9000, location: "Genève" },
  { name: "Patek Philippe", founded: 1839, employees: 2000, location: "Genève" },
  { name: "Audemars Piguet", founded: 1875, employees: 1850, location: "Le Brassus" },
  { name: "Omega", founded: 1848, employees: 2500, location: "Bienne" },
  { name: "Jaeger-LeCoultre", founded: 1833, employees: 1300, location: "Le Sentier" },
  { name: "IWC Schaffhausen", founded: 1868, employees: 1100, location: "Schaffhouse" },
  { name: "TAG Heuer", founded: 1860, employees: 1500, location: "La Chaux-de-Fonds" },
  { name: "Breitling", founded: 1884, employees: 1700, location: "La Chaux-de-Fonds" }
]

// ============================================================================
// PAGE PRINCIPALE
// ============================================================================

export default function HorlogerieSuissePage() {
  const { theme } = useTheme()
  const [pdfView, setPdfView] = useState<'embedded' | 'download'>('embedded')

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      theme === 'dark'
        ? 'bg-gradient-to-b from-[#0a0a0a] via-slate-950 to-[#0a0a0a] text-white'
        : 'bg-gradient-to-b from-white via-slate-50 to-white text-slate-900'
    }`}>
      
      {/* ======================== HERO MONUMENTALE ======================== */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 py-20 overflow-hidden">
        {/* Fond animé avec engrenages */}
        <div className="absolute inset-0 opacity-[0.03]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 right-20 w-[600px] h-[600px]"
          >
            <Clock className="w-full h-full text-amber-400" />
          </motion.div>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 left-20 w-[400px] h-[400px]"
          >
            <Clock className="w-full h-full text-blue-400" />
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            {/* Badge */}
            <div className="inline-flex items-center px-6 py-3 rounded-full mb-8 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-400/30 backdrop-blur-sm">
              <Shield className="w-5 h-5 text-amber-400 mr-2" />
              <span className="text-amber-400 font-bold text-sm tracking-wider">
                🇨🇭 RÉFÉRENCE MONDIALE • SWISS MADE EXCELLENCE
              </span>
            </div>

            {/* Titre principal */}
            <h1 
              className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-[1.1]"
              style={{ fontFamily: 'Bebas Neue, Oswald, sans-serif' }}
            >
              <span className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>
                L&apos;Horlogerie
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 animate-gradient">
                Suisse
              </span>
            </h1>

            {/* Sous-titre */}
            <p className={`text-2xl md:text-3xl font-light mb-12 max-w-4xl mx-auto leading-relaxed ${
              theme === 'dark' ? 'text-gray-300' : 'text-slate-700'
            }`}>
              La <span className="font-bold text-amber-400">référence absolue mondiale</span> en matière de 
              <span className="font-bold text-amber-400"> précision</span>, 
              d&apos;<span className="font-bold text-amber-400">excellence</span> et de 
              <span className="font-bold text-amber-400"> savoir-faire</span> horloger
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(251, 191, 36, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="group px-10 py-5 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 rounded-2xl font-bold text-lg text-black shadow-2xl transition-all duration-300 flex items-center justify-center relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  <GraduationCap className="mr-3 w-6 h-6" />
                  Guide Complet de Formation
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('pdf-section')?.scrollIntoView({ behavior: 'smooth' })}
                className={`px-10 py-5 border-2 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center ${
                  theme === 'dark'
                    ? 'border-amber-400/60 hover:bg-amber-500/10 hover:border-amber-400'
                    : 'border-amber-500/60 hover:bg-amber-50 hover:border-amber-600'
                }`}
              >
                <FileText className="mr-3 w-6 h-6" />
                Accéder au PDF Officiel
              </motion.button>
            </div>
          </motion.div>

          {/* Stats rapides */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-8 text-center"
          >
            {[
              { icon: Factory, value: "380+", label: "Manufactures" },
              { icon: Users, value: "29'000", label: "Emplois directs" },
              { icon: TrendingUp, value: "22.5 Mrd", label: "CHF exportés" },
              { icon: Globe, value: "150+", label: "Pays clients" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className={`flex items-center space-x-3 px-6 py-4 rounded-xl backdrop-blur-sm ${
                  theme === 'dark'
                    ? 'bg-slate-900/50 border border-slate-700'
                    : 'bg-white border border-slate-200 shadow-lg'
                }`}
              >
                <stat.icon className="w-6 h-6 text-amber-400" />
                <div className="text-left">
                  <div className="text-2xl font-bold text-amber-400">{stat.value}</div>
                  <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Indicateur de scroll */}
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <ChevronRight className="w-12 h-12 text-amber-400 rotate-90" />
        </motion.div>
      </section>

      {/* ======================== STATISTIQUES CLÉS ======================== */}
      <FadeInSection className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 px-5 py-2 bg-amber-500/10 border border-amber-400/30 rounded-full mb-6"
            >
              <TrendingUp className="w-5 h-5 text-amber-400" />
              <span className="text-amber-400 font-bold text-sm">CHIFFRES CLÉS 2024</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              L&apos;Impact <span className="text-amber-400">Économique</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              icon={TrendingUp}
              value="22.5 Mrd"
              label="CHF Exportations"
              color="from-green-500 to-emerald-600"
              delay={0}
            />
            <StatCard
              icon={Factory}
              value="380+"
              label="Manufactures actives"
              color="from-blue-500 to-cyan-600"
              delay={0.1}
            />
            <StatCard
              icon={Users}
              value="29'000"
              label="Emplois directs"
              color="from-purple-500 to-pink-600"
              delay={0.2}
            />
            <StatCard
              icon={Globe}
              value="150+"
              label="Pays exportateurs"
              color="from-amber-500 to-yellow-600"
              delay={0.3}
            />
          </div>
        </div>
      </FadeInSection>

      {/* ======================== RÉGIONS HORLOGÈRES ======================== */}
      <FadeInSection className={`py-32 px-4 ${
        theme === 'dark' ? 'bg-slate-950/50' : 'bg-slate-50/50'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 px-5 py-2 bg-amber-500/10 border border-amber-400/30 rounded-full mb-6"
            >
              <MapPin className="w-5 h-5 text-amber-400" />
              <span className="text-amber-400 font-bold text-sm">GÉOGRAPHIE HORLOGÈRE</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Les <span className="text-amber-400">4 Régions</span> Légendaires
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              theme === 'dark' ? 'text-gray-400' : 'text-slate-600'
            }`}>
              Chaque région possède son identité, son histoire et ses spécialités uniques
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {regions.map((region, i) => (
              <RegionCard key={i} region={region} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* ======================== GRANDES MARQUES ======================== */}
      <FadeInSection className="py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 px-5 py-2 bg-amber-500/10 border border-amber-400/30 rounded-full mb-6"
            >
              <Crown className="w-5 h-5 text-amber-400" />
              <span className="text-amber-400 font-bold text-sm">MANUFACTURES LÉGENDAIRES</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Les <span className="text-amber-400">Grands Noms</span> de l&apos;Horlogerie
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              theme === 'dark' ? 'text-gray-400' : 'text-slate-600'
            }`}>
              Les maisons horlogères qui font rayonner la Suisse dans le monde entier
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {majorBrands.map((brand, i) => (
              <BrandCard key={i} brand={brand} delay={i * 0.05} />
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* ======================== PDF INTÉGRÉ ======================== */}
      <FadeInSection id="pdf-section" className={`py-32 px-4 ${
        theme === 'dark' ? 'bg-gradient-to-b from-slate-950 to-[#0a0a0a]' : 'bg-gradient-to-b from-white to-slate-50'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 px-5 py-2 bg-amber-500/10 border border-amber-400/30 rounded-full mb-6"
            >
              <FileText className="w-5 h-5 text-amber-400" />
              <span className="text-amber-400 font-bold text-sm">DOCUMENT OFFICIEL</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Guide <span className="text-amber-400">Complet</span> de l&apos;Horlogerie Suisse
            </h2>
            <p className={`text-xl max-w-3xl mx-auto mb-8 ${
              theme === 'dark' ? 'text-gray-400' : 'text-slate-600'
            }`}>
              Document officiel PDF intégré directement dans la page pour votre formation
            </p>

            {/* Toggle View / Download */}
            <div className="flex justify-center gap-4 mb-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPdfView('embedded')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  pdfView === 'embedded'
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black shadow-lg'
                    : theme === 'dark'
                    ? 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Eye className="w-5 h-5 inline mr-2" />
                Voir dans la page
              </motion.button>

              <motion.a
                href="/swiss_horlogerie_2019.pdf"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  theme === 'dark'
                    ? 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Download className="w-5 h-5 inline mr-2" />
                Télécharger le PDF
              </motion.a>
            </div>
          </div>

          {/* Visualiseur PDF */}
          {pdfView === 'embedded' && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`rounded-3xl overflow-hidden border-4 shadow-2xl ${
                theme === 'dark' ? 'border-amber-500/30' : 'border-amber-400/40'
              }`}
              style={{ height: '1200px' }}
            >
              <iframe
                src="/swiss_horlogerie_2019.pdf"
                className="w-full h-full"
                title="Guide Horlogerie Suisse"
              />
            </motion.div>
          )}
        </div>
      </FadeInSection>

      {/* ======================== RESSOURCES POUR ÉTUDIANTS ======================== */}
      <FadeInSection className="py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 px-5 py-2 bg-amber-500/10 border border-amber-400/30 rounded-full mb-6"
            >
              <Lightbulb className="w-5 h-5 text-amber-400" />
              <span className="text-amber-400 font-bold text-sm">POUR LES ÉTUDIANTS</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ressources <span className="text-amber-400">Pédagogiques</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Cours Théoriques",
                description: "Modules complets sur l'histoire et les techniques",
                link: "/theorie"
              },
              {
                icon: Target,
                title: "Exercices Pratiques",
                description: "Tutoriels pas-à-pas et démontages virtuels",
                link: "/pratique"
              },
              {
                icon: Trophy,
                title: "Quiz & Certifications",
                description: "Testez vos connaissances et obtenez des diplômes",
                link: "/quiz"
              }
            ].map((resource, i) => (
              <motion.a
                key={i}
                href={resource.link}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className={`group p-8 rounded-2xl border transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-slate-900/50 border-slate-700 hover:border-amber-400/50'
                    : 'bg-white border-slate-200 hover:border-amber-400/50 hover:shadow-xl'
                }`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                  theme === 'dark' ? 'bg-amber-500/10' : 'bg-amber-100'
                }`}>
                  <resource.icon className="w-8 h-8 text-amber-400" />
                </div>

                <h3 className={`text-2xl font-bold mb-3 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  {resource.title}
                </h3>

                <p className={`mb-6 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-slate-600'
                }`}>
                  {resource.description}
                </p>

                <div className="flex items-center text-amber-400 font-semibold group-hover:translate-x-2 transition-transform">
                  Découvrir
                  <ArrowRight className="ml-2 w-5 h-5" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* ======================== CTA FINAL ======================== */}
      <FadeInSection className={`py-32 px-4 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950'
          : 'bg-gradient-to-br from-slate-100 via-white to-slate-100'
      }`}>
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative p-16 rounded-3xl overflow-hidden"
            style={{
              background: theme === 'dark'
                ? 'linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(217, 119, 6, 0.1))'
                : 'linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(251, 146, 60, 0.2))'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/5 to-transparent animate-pulse" />

            <div className="relative z-10">
              <Heart className="w-20 h-20 text-amber-400 mx-auto mb-8" />

              <h2 className="text-5xl font-bold mb-6">
                Rejoignez l&apos;Excellence Horlogère
              </h2>

              <p className={`text-2xl mb-12 max-w-3xl mx-auto ${
                theme === 'dark' ? 'text-gray-300' : 'text-slate-700'
              }`}>
                Devenez maître horloger et perpétuez une tradition d&apos;excellence vieille de 500 ans
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-6 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-2xl font-bold text-xl text-black shadow-2xl"
              >
                Commencer Votre Formation
                <ArrowRight className="inline ml-3 w-6 h-6" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </FadeInSection>

      {/* Scroll to top */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.9 }}
        className={`fixed bottom-8 right-8 z-50 p-4 rounded-full backdrop-blur-xl border shadow-2xl transition-all ${
          theme === 'dark'
            ? 'bg-slate-900/80 border-amber-500/30 hover:border-amber-400'
            : 'bg-white/80 border-amber-300 hover:border-amber-500'
        }`}
      >
        <ChevronRight className="w-6 h-6 text-amber-400 -rotate-90" />
      </motion.button>

      {/* Styles globaux */}
      <style jsx global>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  )
}
