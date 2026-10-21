// src/app/soutenir/page.tsx

"use client";

import React from "react";
import Link from "next/link";
import { Heart, Coffee, ShieldCheck, Sparkles, Wrench, CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function SoutenirPage() {
  const PAYPAL_BASE =
    "https://www.paypal.com/donate/?business=contact.horlogeries@gmail.com&currency_code=CHF";

  const tiers = [
    {
      amount: "5 CHF",
      title: "Un café à l'établi",
      icon: "☕",
      desc: "Un geste convivial pour encourager le travail bénévole et les nuits passées sur le code.",
      badge: "Soutien Convivial",
      url: `${PAYPAL_BASE}&amount=5&item_name=Un+cafe+a+l+etabli`,
      highlight: false,
    },
    {
      amount: "15 CHF",
      title: "Huiles & Outils d'Atelier",
      icon: "⚙️",
      desc: "Finance directement les coûts de serveurs et les requêtes de l'Analyseur de Montres IA.",
      badge: "Le Plus Populaire",
      url: `${PAYPAL_BASE}&amount=15&item_name=Soutien+Serveurs+et+IA`,
      highlight: true,
    },
    {
      amount: "50 CHF",
      title: "Mécène de la Transmission",
      icon: "🇨🇭",
      desc: "Permet de développer de nouveaux calibres interactifs, fiches de démontage et vidéos techniques.",
      badge: "Grand Mécénat",
      url: `${PAYPAL_BASE}&amount=50&item_name=Mecenat+Transmission+Horlogere`,
      highlight: false,
    },
  ];

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-white transition-colors duration-300 py-16 md:py-24 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* En-tête */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-800 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-6">
            🇨🇭 Transmission & Mécénat d'Atelier
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-slate-900 dark:text-white">
            Soutenir l'Indépendance de <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 dark:from-amber-400 dark:via-amber-300 dark:to-amber-500">
              HorloLearn
            </span>
          </h1>

          <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
            HorloLearn est une plateforme suisse indépendante, bénévole et sans publicité, créée pour partager l'excellence et la passion des métiers du temps avec tous les apprentis et horlogers.
          </p>

          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Paiement sécurisé par PayPal en Francs Suisses (CHF) ou devises internationales</span>
          </div>
        </motion.div>

        {/* 3 Formules de soutien */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {tiers.map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                tier.highlight
                  ? "bg-white dark:bg-slate-900 border-2 border-amber-500 shadow-xl scale-105 z-10"
                  : "bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-amber-500/50"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{tier.icon}</span>
                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                      tier.highlight
                        ? "bg-amber-500 text-slate-950 font-extrabold"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {tier.badge}
                  </span>
                </div>

                <div className="text-3xl font-black text-slate-900 dark:text-white mb-1">
                  {tier.amount}
                </div>
                <h3 className="text-lg font-bold text-amber-600 dark:text-amber-400 mb-3">
                  {tier.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  {tier.desc}
                </p>
              </div>

              <a
                href={tier.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  tier.highlight
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md hover:from-amber-400 hover:to-amber-500"
                    : "bg-slate-100 dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-amber-500/10 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-amber-300"
                }`}
              >
                <span>Choisir cette formule</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>
          ))}
        </div>

        {/* Montant Libre */}
        <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-center shadow-lg mb-16">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Vous souhaitez contribuer d'un autre montant ?
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 mb-6 max-w-lg mx-auto">
            Chaque contribution, petite ou grande, permet de maintenir HorloLearn libre, sans publicité et à la pointe de l'innovation horlogère.
          </p>
          <a
            href={`${PAYPAL_BASE}&item_name=Soutien+Libre+HorloLearn`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs shadow-md hover:bg-amber-600 dark:hover:bg-amber-400 transition-all"
          >
            <Heart className="w-4 h-4 text-rose-500" />
            <span>Faire une contribution du montant de votre choix &rarr;</span>
          </a>
        </div>

        {/* Engagements de l'Atelier */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 mb-2" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">100% Sans Publicité</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Aucun pop-up, aucun tracker publicitaire, focus pur sur l'apprentissage technique.</p>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 mb-2" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Outils Gratuits & Libres</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Calculateurs, simulateurs et analyseur d'images IA accessibles à tous les élèves.</p>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 mb-2" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Soutien aux Apprentis</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Ressources créées par des horlogers pour préparer les examens AFP et CFC suisses.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
