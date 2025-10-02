export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 min-h-[70vh] flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='27' cy='7' r='1'/%3E%3Ccircle cx='47' cy='7' r='1'/%3E%3Ccircle cx='7' cy='27' r='1'/%3E%3Ccircle cx='27' cy='27' r='1'/%3E%3Ccircle cx='47' cy='27' r='1'/%3E%3Ccircle cx='7' cy='47' r='1'/%3E%3Ccircle cx='27' cy='47' r='1'/%3E%3Ccircle cx='47' cy='47' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-gold-400 rounded-full animate-pulse"></div>
      <div className="absolute top-40 right-20 w-1 h-1 bg-blue-400 rounded-full animate-ping"></div>
      <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-gold-500 rounded-full animate-bounce"></div>

      <div className="relative max-w-7xl mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Content */}
          <div className="text-center lg:text-left">
            {/* Subtitle */}
            <div className="inline-flex items-center space-x-2 bg-gold-100/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-gold-400 rounded-full animate-pulse"></div>
              <span className="text-gold-300 text-sm font-medium tracking-wide">EXCELLENCE HORLOGÈRE</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 bg-clip-text text-transparent">
                Laboratoire
              </span>
              <br />
              <span className="text-white">Horloger</span>
            </h1>

            {/* Tagline */}
            <div className="mb-8">
              <p className="text-xl md:text-2xl text-slate-300 mb-2 font-light">
                La Science du Précis
              </p>
              <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
                Découvrez l'art et la science de l'horlogerie à travers nos ressources premium, 
                nos masterclass exclusives et notre communauté d'experts passionnés.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-slate-900 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <span className="relative z-10">Commencer l'Apprentissage</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gold-600 to-gold-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button className="group px-8 py-4 border-2 border-slate-400 text-slate-300 font-semibold rounded-xl hover:border-gold-400 hover:text-gold-400 transition-all duration-300 flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Explorer les Ressources</span>
              </button>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Large Central Circle */}
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              {/* Outer Ring */}
              <div className="absolute inset-0 border-2 border-gold-400/30 rounded-full animate-spin-slow"></div>
              
              {/* Middle Ring */}
              <div className="absolute inset-4 border border-blue-400/40 rounded-full animate-reverse-spin"></div>
              
              {/* Inner Ring */}
              <div className="absolute inset-8 border border-gold-500/50 rounded-full animate-pulse"></div>
              
              {/* Core */}
              <div className="absolute inset-16 bg-gradient-to-br from-gold-400/20 to-blue-500/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                {/* Watch Icon */}
                <div className="w-24 h-24 relative">
                  <svg className="w-full h-full text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeWidth="1.5"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2"/>
                    <circle cx="12" cy="12" r="1" fill="currentColor"/>
                  </svg>
                  
                  {/* Hour Markers */}
                  <div className="absolute inset-0">
                    {[...Array(12)].map((_, i) => (
                      <div 
                        key={i}
                        className="absolute w-0.5 h-3 bg-gold-400 transform -translate-x-1/2"
                        style={{
                          left: '50%',
                          top: '0%',
                          transformOrigin: '50% 48px',
                          transform: `rotate(${i * 30}deg) translateX(-50%)`
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Elements around the circle */}
              <div className="absolute -top-4 left-1/4 w-3 h-3 bg-gold-400 rounded-full animate-bounce"></div>
              <div className="absolute top-1/4 -right-4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 right-1/4 w-3 h-3 bg-gold-500 rounded-full animate-ping"></div>
              <div className="absolute bottom-1/4 -left-4 w-2 h-2 bg-blue-300 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 pt-12 border-t border-slate-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-gold-400 mb-2">50+</div>
              <div className="text-slate-400 text-sm">Ressources Premium</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">10k+</div>
              <div className="text-slate-400 text-sm">Étudiants Formés</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gold-400 mb-2">95%</div>
              <div className="text-slate-400 text-sm">Taux de Réussite</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">24/7</div>
              <div className="text-slate-400 text-sm">Support Expert</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
