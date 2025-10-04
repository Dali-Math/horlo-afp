import HeroSection from './components/HeroSection'

export default function Theorie() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero section on top */}
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
              <li>
                <a className="text-blue-600 hover:text-gold-600 transition-colors" href="https://www.hautehorlogerie.org/fr/encyclopedie/" target="_blank">
                  Encyclopédie FHH
                </a>
              </li>
              <li>
                <a className="text-blue-600 hover:text-gold-600 transition-colors" href="https://www.federation-horlogerie.ch/fr/formation" target="_blank">
                  Manuels FH
                </a>
              </li>
              <li>
                <a className="text-blue-600 hover:text-gold-600 transition-colors" href="https://archive.org/search?query=horology" target="_blank">
                  Archives Techniques
                </a>
              </li>
            </ul>
          </div>
          {/* Communication Technique */}
          <div className="bg-white rounded-2xl shadow-lg border border-gold-200 hover:shadow-xl transition-all duration-300 p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800">Communication Technique</h3>
            </div>
            <ul className="space-y-3">
              <li>
                <a className="text-blue-600 hover:text-gold-600 transition-colors flex items-center gap-2" href="/pdfs/communication-technique/ETA%206497.pdf" target="_blank">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  ETA-6497.pdf
                </a>
              </li>
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
              <h3 className="text-xl font-bold text-slate-800">Vidéos</h3>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}
