'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Calendar, ExternalLink } from 'lucide-react';

export default function EvenementsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Retour à l'accueil
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            Agenda horloger mis à jour en temps réel
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Événements & Salons
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Découvrez l'agenda des salons, ateliers gratuits et journées portes ouvertes pour plonger dans l'univers de l'horlogerie
          </p>
        </div>

        {/* Google Calendar Embed */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
          <iframe
            src="https://calendar.google.com/calendar/embed?src=d7e5e27dadbbc3132a5433e7595a99ec7bd8646f28d1ded3860bea8e0865cf47%40group.calendar.google.com&ctz=Europe%2FZurich&mode=AGENDA&showTitle=0&showPrint=0&showTabs=1&showCalendars=0&showTz=0&height=600&wkst=2&bgcolor=%23ffffff"
            style={{ border: 0 }}
            width="100%"
            height="600"
            frameBorder="0"
            scrolling="no"
            className="w-full"
          ></iframe>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <a
            href="https://www.watches-and-wonders.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all border border-slate-200"
          >
            <div className="flex items-center justify-between mb-4">
              <Calendar className="w-8 h-8 text-blue-600" />
              <ExternalLink className="w-5 h-5 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Watches & Wonders</h3>
            <p className="text-sm text-slate-600">Le salon horloger le plus prestigieux au monde à Genève</p>
          </a>

          <a
            href="https://www.baselworld.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all border border-slate-200"
          >
            <div className="flex items-center justify-between mb-4">
              <Calendar className="w-8 h-8 text-purple-600" />
              <ExternalLink className="w-5 h-5 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Baselworld</h3>
            <p className="text-sm text-slate-600">Le rendez-vous mondial de l'horlogerie et de la joaillerie</p>
          </a>

          <a
            href="https://www.salonqp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all border border-slate-200"
          >
            <div className="flex items-center justify-between mb-4">
              <Calendar className="w-8 h-8 text-green-600" />
              <ExternalLink className="w-5 h-5 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">SalonQP London</h3>
            <p className="text-sm text-slate-600">Le salon horloger britannique de référence</p>
          </a>
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Votre événement n'est pas listé ?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Partagez vos événements horlogers avec la communauté
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all"
          >
            <Calendar className="w-5 h-5" />
            Proposer un événement
          </Link>
        </div>
      </main>

      <footer className="bg-slate-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400">© 2025 HorloLearn – Passion & Découverte Horlogère Suisse</p>
        </div>
      </footer>
    </div>
  );
}
