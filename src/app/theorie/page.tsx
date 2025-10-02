import HeroSection from './components/HeroSection';

export default function Theorie() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <HeroSection />
      
      {/* Premium Resources Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Cours PDF */}
          <div className="bg-white rounded-2xl shadow-lg border border-gold-200 hover:shadow-xl transition-all duration-300 p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-gold-400 to-gold-600 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800">Cours Académiques</h3>
            </div>
            <ul className="space-y-3">
              <li><a className="text-blue-600 hover:text-gold-600 transition-colors" href="https://www.hautehorlogerie.org/fr/encyclopedie/" target="_blank">Encyclopédie FHH</a></li>
              <li><a className="text-blue-600 hover:text-gold-600 transition-colors" href="https://www.federation-horlogerie.ch/fr/formation" target="_blank">Manuels FH</a></li>
              <li><a className="text-blue-600 hover:text-gold-600 transition-colors" href="https://archive.org/search?query=horology" target="_blank">Archives Techniques</a></li>
            </ul>
          </div>

          {/* Vidéos */}
          <div className="bg-white rounded-2xl shadow-lg border border-gold-200 hover:shadow-xl transition-all duration-300 p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800">Masterclass Vidéo</h3>
            </div>
            <ul className="space-y-3">
              <li><a className="text-blue-600 hover:text-gold-600 transition-colors" href="https://www.youtube.com/@Watchfinder" target="_blank">Watchfinder & Co.</a></li>
              <li><a className="text-blue-600 hover:text-gold-600 transition-colors" href="https://www.youtube.com/@WristwatchRevival" target="_blank">Wristwatch Revival</a></li>
              <li><a className="text-blue-600 hover:text-gold-600 transition-colors" href="https://www.youtube.com/@TheWatchmakers" target="_blank">The Watchmakers</a></li>
            </ul>
          </div>

          {/* Outils Interactifs */}
          <div className="bg-white rounded-2xl shadow-lg border border-gold-200 hover:shadow-xl transition-all duration-300 p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800">Laboratoire 3D</h3>
            </div>
            <ul className="space-y-3">
              <li><a className="text-blue-600 hover:text-gold-600 transition-colors" href="https://ciechanow.ski/mechanical-watch/" target="_blank">Montre Interactive</a></li>
              <li><a className="text-blue-600 hover:text-gold-600 transition-colors" href="https://sketchfab.com/search?q=watch+movement" target="_blank">Modèles 3D</a></li>
              <li><a className="text-blue-600 hover:text-gold-600 transition-colors" href="https://animagraffs.com/" target="_blank">Animations Tech</a></li>
            </ul>
          </div>

          {/* Quiz & Tests */}
          <div className="bg-white rounded-2xl shadow-lg border border-gold-200 hover:shadow-xl transition-all duration-300 p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800">Évaluations Pro</h3>
            </div>
            <ul className="space-y-3">
              <li><a className="text-blue-600 hover:text-gold-600 transition-colors" href="https://www.proprofs.com/quiz-school/topic/watches" target="_blank">Quiz Techniques</a></li>
              <li><a className="text-blue-600 hover:text-gold-600 transition-colors" href="https://quizlet.com/search?query=horology" target="_blank">Flashcards Pro</a></li>
              <li><a className="text-blue-600 hover:text-gold-600 transition-colors" href="https://kahoot.com/" target="_blank">Tests Interactifs</a></li>
            </ul>
          </div>

          {/* Dictionnaires */}
          <div className="bg-white rounded-2xl shadow-lg border border-gold-200 hover:shadow-xl transition-all duration-300 p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800">Référentiels</h3>
            </div>
            <ul className="space-y-3">
              <li><a className="text-blue-600 hover:text-gold-600 transition-colors" href="https://www.hautehorlogerie.org/fr/encyclopedie/lexique-de-lhorlogerie/" target="_blank">Lexique FHH</a></li>
              <li><a className="text-blue-600 hover:text-gold-600 transition-colors" href="https://www.chrono24.com/magazine/glossary/" target="_blank">Glossaire Chrono24</a></li>
              <li><a className="text-blue-600 hover:text-gold-600 transition-colors" href="https://monochrome-watches.com/watch-glossary/" target="_blank">Dictionnaire Complet</a></li>
            </ul>
          </div>

          {/* Communauté */}
          <div className="bg-white rounded-2xl shadow-lg border border-gold-200 hover:shadow-xl transition-all duration-300 p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800">Réseau Expert</h3>
            </div>
            <ul className="space-y-3">
              <li><a className="text-blue-600 hover:text-gold-600 transition-colors" href="https://www.watchuseek.com/" target="_blank">WatchUSeek</a></li>
              <li><a className="text-blue-600 hover:text-gold-600 transition-colors" href="https://www.reddit.com/r/Watchmaking/" target="_blank">r/Watchmaking</a></li>
              <li><a className="text-blue-600 hover:text-gold-600 transition-colors" href="https://www.timezone.com/" target="_blank">TimeZone Forum</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
