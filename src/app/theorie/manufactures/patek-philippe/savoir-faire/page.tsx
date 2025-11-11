              to-yellow-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-white text-2xl">💎</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Sertissage Diamants</h3>
          <p className="text-gray-600 text-center mb-6">
            Chaque diamant est serti à la main par des experts joailliers selon les standards les plus exigeants de l'industrie horlogère.
          </p>
          <div className="space-y-4">
            <div className="mastery-indicator">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-700">Sertissage invisible</span>
                <span className="text-sm font-semibold text-yellow-600">100%</span>
              </div>
              <div className="mastery-progress" style={{width: '100%'}}></div>
            </div>
            <div className="mastery-indicator">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-700">Sélection IF-VVS</span>
                <span className="text-sm font-semibold text-yellow-600">100%</span>
              </div>
              <div className="mastery-progress" style={{width: '100%'}}></div>
            </div>
            <div className="mastery-indicator">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-700">Monture platine/or</span>
                <span className="text-sm font-semibold text-yellow-600">100%</span>
              </div>
              <div className="mastery-progress" style={{width: '100%'}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

      {/* Heritage Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 hero-title">Un Héritage Depuis 1839</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Plus de 180 ans d'innovations, de tradition et de passion pour l'horlogerie de haute précision
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center scroll-reveal">
              <div className="text-5xl font-bold text-yellow-600 mb-4">180+</div>
              <h3 className="text-xl font-semibold mb-2">Ans d'Histoire</h3>
              <p className="text-gray-400">Depuis l'Antoine Patek jusqu'à nos jours</p>
            </div>
            
            <div className="text-center scroll-reveal">
              <div className="text-5xl font-bold text-yellow-600 mb-4">100+</div>
              <h3 className="text-xl font-semibold mb-2">Brevets</h3>
              <p className="text-gray-400">Innovations qui ont façonné l'horlogerie moderne</p>
            </div>
            
            <div className="text-center scroll-reveal">
              <div className="text-5xl font-bold text-yellow-600 mb-4">50+</div>
              <h3 className="text-xl font-semibold mb-2">Calibre Maison</h3>
              <p className="text-gray-400">Mouvements entièrement développés et fabriqués en interne</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-yellow-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center scroll-reveal">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Découvrez la Collection</h2>
          <p className="text-xl mb-8 text-yellow-100">
            Chaque montre raconte une histoire d'excellence et de passion horlogère
          </p>
          <button className="bg-white text-yellow-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
            Explorer nos Créations
          </button>
        </div>
      </section>

      {/* 3D Watch Canvas - Hidden but functional */}
      <canvas id="watchCanvas" className="hidden"></canvas>
    </div>
  );
}
