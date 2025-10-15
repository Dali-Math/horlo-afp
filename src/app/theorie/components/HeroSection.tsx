"use client";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sky-400 via-blue-500 to-blue-600 min-h-[70vh] flex items-center">
      {/* Technical SVG Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='gears' x='0' y='0' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='25' cy='25' r='15' fill='none' stroke='%23000' stroke-width='1'/%3E%3Cpath d='M25,10 L27,10 L28,7 L22,7 L23,10 Z M40,25 L40,27 L43,28 L43,22 L40,23 Z M25,40 L23,40 L22,43 L28,43 L27,40 Z M10,25 L10,23 L7,22 L7,28 L10,27 Z' fill='%23000'/%3E%3Ccircle cx='75' cy='75' r='12' fill='none' stroke='%23000' stroke-width='0.8'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23gears)'/%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Decorative Technical Elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
      <div className="absolute top-40 right-20 w-1 h-1 bg-white/40 rounded-full animate-ping"></div>
      <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-gold-400 rounded-full animate-bounce"></div>

      <div className="relative max-w-7xl mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-gold-400 rounded-full animate-pulse"></div>
              <span className="text-white text-sm font-medium tracking-wide">
                EXCELLENCE HORLOGÈRE
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-gold-400 via-yellow-300 to-gold-500 bg-clip-text text-transparent">
                Théorie Horlogère
              </span>
              <br />
              <span className="text-white">Professionnelle</span>
            </h1>

            <div className="mb-8">
              <p className="text-xl md:text-2xl text-white mb-2 font-light">
                La Précision au Service de l'Excellence
              </p>
              <p className="text-lg text-white/90 max-w-xl leading-relaxed">
                Maîtrisez les fondamentaux théoriques de l'horlogerie avec nos ressources premium, 
                nos cours détaillés et l'expertise de professionnels reconnus.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-slate-900 font-semibold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
                <span className="relative z-10">Accéder aux Cours</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gold-600 to-gold-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <button className="group px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:border-gold-400 hover:text-gold-400 hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
                <span>Explorer les Ressources</span>
              </button>
            </div>
          </div>

          {/* Technical SVG Illustration */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              <svg
                className="w-full h-full"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g
                  className="animate-spin-slow"
                  style={{ transformOrigin: "100px 100px" }}
                >
                  <circle
                    cx="100"
                    cy="100"
                    r="60"
                    fill="none"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="2"
                  />
                  {[...Array(12)].map((_, i) => (
                    <rect
                      key={i}
                      x="98"
                      y="35"
                      width="4"
                      height="15"
                      fill="rgba(251, 191, 36, 0.6)"
                      style={{
                        transformOrigin: "100px 100px",
                        transform: `rotate(${i * 30}deg)`,
                      }}
                    />
                  ))}
                  <circle
                    cx="100"
                    cy="100"
                    r="15"
                    fill="rgba(251, 191, 36, 0.4)"
                    stroke="rgba(255,255,255,0.6)"
                    strokeWidth="2"
                  />
                </g>

                <path
                  d="M 60 80 Q 100 70 140 80 L 140 90 Q 100 80 60 90 Z"
                  fill="rgba(255,255,255,0.2)"
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="1.5"
                />
                <circle cx="65" cy="85" r="3" fill="rgba(251, 191, 36, 0.6)" />
                <circle cx="135" cy="85" r="3" fill="rgba(251, 191, 36, 0.6)" />

                <g className="opacity-70">
                  <line
                    x1="160"
                    y1="150"
                    x2="160"
                    y2="120"
                    stroke="rgba(255,255,255,0.6)"
                    strokeWidth="2"
                  />
                  <line
                    x1="160"
                    y1="120"
                    x2="175"
                    y2="155"
                    stroke="rgba(251, 191, 36, 0.6)"
                    strokeWidth="2"
                  />
                  <circle cx="160" cy="120" r="3" fill="rgba(255,255,255,0.8)" />
                </g>

                <g
                  className="animate-reverse-spin"
                  style={{ transformOrigin: "45px 160px" }}
                >
                  <circle
                    cx="45"
                    cy="160"
                    r="20"
                    fill="none"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="1.5"
                  />
                  {[...Array(8)].map((_, i) => (
                    <rect
                      key={i}
                      x="44"
                      y="138"
                      width="2"
                      height="8"
                      fill="rgba(255,255,255,0.4)"
                      style={{
                        transformOrigin: "45px 160px",
                        transform: `rotate(${i * 45}deg)`,
                      }}
                    />
                  ))}
                  <circle
                    cx="45"
                    cy="160"
                    r="6"
                    fill="rgba(251, 191, 36, 0.3)"
                  />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
