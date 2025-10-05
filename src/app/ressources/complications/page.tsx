"use client";

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Clock, Gauge, Calendar, Bell, Sparkles, Cog } from 'lucide-react';

const complications = [
  {
    id: 1,
    title: "Chronographe",
    icon: Gauge,
    description: "Fonction de chronométrage indépendante permettant de mesurer des intervalles de temps avec précision. Le chronographe ajoute des compteurs et poussoirs pour démarrer, arrêter et remettre à zéro le mécanisme.",
    technique: "Mécanisme additionnel avec roue à colonnes ou came, embrayage vertical ou horizontal",
    prestige: "Haute complexité"
  },
  {
    id: 2,
    title: "Tourbillon",
    icon: Cog,
    description: "Mécanisme compensant les effets de la gravité sur la précision de la montre, inventé par Abraham-Louis Breguet en 1795. Le balancier et l'échappement tournent dans une cage mobile.",
    technique: "Cage rotative effectuant un tour complet par minute",
    prestige: "Très haute horlogerie"
  },
  {
    id: 3,
    title: "Calendrier Perpétuel",
    icon: Calendar,
    description: "Affiche automatiquement la date en tenant compte des mois de différentes longueurs (28, 29, 30 ou 31 jours) et des années bissextiles, sans nécessiter d'ajustement manuel.",
    technique: "Système de cames et leviers programmés sur cycle de 4 ans",
    prestige: "Grande complication"
  },
  {
    id: 4,
    title: "Répétition Minutes",
    icon: Bell,
    description: "Complication sonore égrenant les heures, quarts et minutes sur demande par un système de marteaux frappant des timbres. Créée pour lire l'heure dans l'obscurité.",
    technique: "Timbres en acier trempé, marteaux à ressort, crémaillère",
    prestige: "Très haute horlogerie"
  },
  {
    id: 5,
    title: "Équation du Temps",
    icon: Clock,
    description: "Affiche la différence entre le temps solaire réel et le temps moyen civil, variation pouvant atteindre ±16 minutes selon la période de l'année.",
    technique: "Came en forme de huit reproduisant l'analemme solaire",
    prestige: "Grande complication"
  },
  {
    id: 6,
    title: "Phase de Lune",
    icon: Sparkles,
    description: "Indique la phase lunaire actuelle sur un cycle de 29,5 jours. Les modèles les plus précis utilisent un cycle de 122 ans avec seulement un jour d'écart.",
    technique: "Disque à deux lunes entraîné par roue de 59 dents",
    prestige: "Complication classique"
  }
];

export default function ComplicationsPage() {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 mb-12 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Retour aux ressources</span>
        </motion.button>

        {/* Hero section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <h1 className="text-5xl sm:text-7xl font-bold mb-6 tracking-tight" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
            <span className="bg-gradient-to-r from-amber-300 via-amber-500 to-amber-600 bg-clip-text text-transparent">
              Complications Horlogères
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Les complications horlogères représentent le summum de l'excellence en horlogerie suisse. 
            Au-delà du simple affichage de l'heure, elles incarnent des siècles de savoir-faire, 
            d'innovation technique et de maîtrise artisanale des plus grands horlogers.
          </motion.p>
        </motion.div>

        {/* Complications grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
        >
          {complications.map((complication) => {
            const IconComponent = complication.icon;
            return (
              <motion.div
                key={complication.id}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                className="group relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-amber-500/50 transition-all duration-300"
              >
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-500/10 to-transparent rounded-bl-full" />
                
                {/* Icon */}
                <div className="mb-6 flex items-start justify-between">
                  <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 group-hover:border-amber-500/40 transition-colors">
                    <IconComponent className="w-8 h-8 text-amber-400" />
                  </div>
                  <span className="text-xs font-semibold text-amber-500/70 uppercase tracking-wider">
                    {complication.prestige}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-4 text-amber-400" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                  {complication.title}
                </h3>

                {/* Description */}
                <p className="text-slate-300 leading-relaxed mb-6 text-sm">
                  {complication.description}
                </p>

                {/* Technical details */}
                <div className="pt-6 border-t border-slate-700/50">
                  <p className="text-xs text-slate-400 mb-1 font-semibold uppercase tracking-wider">
                    Technique
                  </p>
                  <p className="text-sm text-slate-300">
                    {complication.technique}
                  </p>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/0 via-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:via-amber-500/5 group-hover:to-transparent transition-all duration-300 pointer-events-none" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom info section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 sm:p-12 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-amber-400" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
            L'Art de la Haute Horlogerie
          </h2>
          <p className="text-slate-300 leading-relaxed max-w-3xl mx-auto mb-8">
            Chaque complication exige des centaines d'heures de travail minutieux par des maîtres horlogers. 
            Ces prouesses techniques témoignent de la tradition horlogère suisse et du génie mécanique 
            qui continue de fasciner les passionnés du monde entier.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="px-6 py-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
              <p className="text-amber-400 font-bold mb-1" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>300+</p>
              <p className="text-slate-400 text-xs">Heures de développement</p>
            </div>
            <div className="px-6 py-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
              <p className="text-amber-400 font-bold mb-1" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>500+</p>
              <p className="text-slate-400 text-xs">Composants mécaniques</p>
            </div>
            <div className="px-6 py-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
              <p className="text-amber-400 font-bold mb-1" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>0.01mm</p>
              <p className="text-slate-400 text-xs">Précision d'usinage</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
