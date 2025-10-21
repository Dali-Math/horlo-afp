"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Environment, PerspectiveCamera, Text } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// ==========================================
// COMPOSANT 3D - MOUVEMENT HORLOGER
// ==========================================
function WatchMovement() {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Animation de rotation continue
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
      if (hovered) {
        meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1;
      }
    }
  });

  // Créer un mouvement simplifié avec des primitives Three.js
  return (
    <group ref={meshRef} scale={2}>
      {/* Platine principale */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.1, 64]} />
        <meshStandardMaterial color="#C5A572" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Barillet */}
      <mesh position={[-0.5, 0.1, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.15, 32]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Roue de centre */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.1, 32]} />
        <meshStandardMaterial color="#B8860B" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Balancier */}
      <group position={[0.6, 0.15, 0]}>
        <mesh>
          <torusGeometry args={[0.2, 0.02, 16, 32]} />
          <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh>
          <boxGeometry args={[0.4, 0.01, 0.02]} />
          <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
      
      {/* Rubis (pierres) */}
      {[[-0.3, 0.12, 0.2], [0.3, 0.12, -0.2], [0, 0.12, 0.3]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshStandardMaterial color="#DC143C" metalness={0.3} roughness={0.1} emissive="#DC143C" emissiveIntensity={0.2} />
        </mesh>
      ))}
      
      {/* Vis bleues */}
      {[[0.8, 0.06, 0.8], [-0.8, 0.06, -0.8], [0.8, 0.06, -0.8], [-0.8, 0.06, 0.8]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <cylinderGeometry args={[0.02, 0.02, 0.1, 16]} />
          <meshStandardMaterial color="#4169E1" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
}

// ==========================================
// COMPOSANT PRINCIPAL
// ==========================================
export default function HorloLearnPremiumPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [currentTime, setCurrentTime] = useState("");
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  // Horloge temps réel
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("fr-CH", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Données du site
  const stats = [
    { value: "300+", label: "Calibres Étudiés", detail: "De 1700 à aujourd'hui" },
    { value: "50K+", label: "Étudiants Actifs", detail: "Dans 127 pays" },
    { value: "∞", label: "Accès Illimité", detail: "Sans abonnement" },
    { value: "24/7", label: "Disponible", detail: "Sur tous supports" },
  ];

  const courses = [
    {
      icon: "🎯",
      title: "Mouvements Mécaniques",
      subtitle: "Du simple au tourbillon",
      description: "Maîtrisez l'anatomie complète des calibres : échappement, spiral, complications.",
      duration: "120 heures",
      level: "Tous niveaux",
    },
    {
      icon: "🏛️",
      title: "Histoire Horlogère",
      subtitle: "5 siècles d'innovation",
      description: "De l'horloge astronomique aux montres connectées, une épopée technique.",
      duration: "80 heures",
      level: "Débutant",
    },
    {
      icon: "🔧",
      title: "Atelier Pratique",
      subtitle: "Mains dans le cambouis",
      description: "Démontage, nettoyage, réglage : les gestes qui sauvent une montre.",
      duration: "200 heures",
      level: "Intermédiaire",
    },
    {
      icon: "💎",
      title: "Grandes Complications",
      subtitle: "L'art de l'impossible",
      description: "Quantième perpétuel, répétition minutes, équation du temps décryptés.",
      duration: "150 heures",
      level: "Expert",
    },
  ];

  const testimonials = [
    {
      name: "Philippe M.",
      role: "Horloger indépendant",
      quote: "La qualité des modèles 3D est stupéfiante. J'ai enfin compris le fonctionnement du tourbillon volant.",
      avatar: "PM",
    },
    {
      name: "Marie-Claire L.",
      role: "Collectionneuse",
      quote: "Ce site m'a permis d'apprécier mes montres à leur juste valeur technique. Un trésor pédagogique.",
      avatar: "ML",
    },
    {
      name: "Takeshi Y.",
      role: "Étudiant WOSTEP",
      quote: "Les animations 3D complètent parfaitement ma formation. C'est comme avoir un mentor disponible 24/7.",
      avatar: "TY",
    },
  ];

  return (
    <div className={`min-h-screen transition-all duration-700 ${darkMode ? "bg-[#0a0a0a] text-[#f5f5f5]" : "bg-[#fafafa] text-[#0a0a0a]"}`}>
      
      {/* ========== HEADER PREMIUM ========== */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${darkMode ? "bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-[#d4af37]/10" : "bg-white/95 backdrop-blur-xl border-b border-gray-200"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Premium */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 rounded-full border-2 border-[#d4af37]"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[#d4af37] text-2xl font-serif">⌚</span>
                </div>
              </div>
              <div>
                <span className="text-xl font-light tracking-wider">Académie Horlogère</span>
                <span className="block text-xs opacity-60 -mt-1">Excellence Suisse depuis 1735</span>
              </div>
            </Link>

            {/* Navigation Élégante */}
            <nav className="hidden lg:flex items-center gap-10 text-sm">
              {["Formations", "Mouvements 3D", "Histoire", "Ateliers", "Certifications"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="relative group py-2"
                >
                  <span className="relative z-10">{item}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#d4af37] group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                aria-label="Changer de thème"
                className={`w-14 h-7 rounded-full flex items-center px-1 transition-all ${darkMode ? "bg-gray-800 justify-end" : "bg-gray-200 justify-start"}`}
              >
                <motion.div layout className={`w-5 h-5 rounded-full ${darkMode ? "bg-[#d4af37]" : "bg-gray-800"}`} />
              </button>
              <Link
                href="/inscription"
                className="px-6 py-2.5 bg-[#d4af37] text-[#0a0a0a] rounded-md text-sm font-medium hover:bg-[#b8941f] transition-all"
              >
                Inscription Gratuite
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ========== HERO AVEC MOUVEMENT 3D ========== */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex items-center pt-20 overflow-hidden"
      >
        {/* Fond avec pattern subtil */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #d4af37 0%, transparent 50%),
                             radial-gradient(circle at 80% 80%, #d4af37 0%, transparent 50%)`,
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          {/* Contenu Textuel */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#d4af37]/10 rounded-full text-sm mb-6"
            >
              <span className="w-2 h-2 bg-[#d4af37] rounded-full animate-pulse" />
              <span>Nouveau : Calibre Patek Philippe 240 en 3D</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-light leading-tight mb-6"
            >
              Maîtrisez l'Art<br />
              <span className="font-serif italic text-[#d4af37]">du Temps</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl opacity-80 mb-8 leading-relaxed"
            >
              Explorez les secrets des plus grands calibres horlogers en 3D interactif. 
              Une formation d'excellence accessible à tous, de l'amateur au professionnel.
            </motion.p>

            {/* Horloge en temps réel */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="text-4xl font-mono text-[#d4af37] tracking-wider">{currentTime}</div>
              <div className="text-sm opacity-60">
                <div>Heure Suisse</div>
                <div>UTC+1</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/demo-3d"
                className="px-8 py-4 bg-[#d4af37] text-[#0a0a0a] rounded-lg font-medium hover:bg-[#b8941f] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                Essayer la Démo 3D
              </Link>
              <Link
                href="/catalogue"
                className="px-8 py-4 border-2 border-[#d4af37] rounded-lg font-medium hover:bg-[#d4af37]/10 transition-all duration-300"
              >
                Voir le Catalogue
              </Link>
            </motion.div>
          </div>

          {/* Mouvement 3D */}
          <div className="relative h-[500px] lg:h-[600px]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/5 to-transparent rounded-3xl" />
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <Suspense fallback={null}>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />
                <WatchMovement />
                <Environment preset="studio" />
                <OrbitControls
                  enablePan={false}
                  enableZoom={true}
                  minDistance={3}
                  maxDistance={8}
                  autoRotate
                  autoRotateSpeed={0.5}
                />
              </Suspense>
            </Canvas>
            <div className="absolute bottom-4 left-4 text-sm opacity-60">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Modèle 3D Interactif</span>
              </div>
              <div className="text-xs mt-1">Utilisez la souris pour explorer</div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ========== STATISTIQUES PREMIUM ========== */}
      <section className="py-24 px-4 bg-gradient-to-b from-transparent via-[#d4af37]/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-4">L'Excellence en Chiffres</h2>
            <p className="text-xl opacity-60">Une académie reconnue mondialement</p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="text-5xl md:text-6xl font-light text-[#d4af37] mb-2 group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <div className="text-lg font-medium mb-1">{stat.label}</div>
                <div className="text-sm opacity-60">{stat.detail}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FORMATIONS DISPONIBLES ========== */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-4">Parcours de Formation</h2>
            <p className="text-xl opacity-60">De l'initiation à l'expertise, un chemin tracé pour vous</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <Link href={`/formations/${course.title.toLowerCase().replace(/\s+/g, '-')}`}>
                  <div className="p-8 rounded-2xl border border-[#d4af37]/20 bg-gradient-to-br from-[#1a1a1a]/50 to-transparent hover:border-[#d4af37]/50 transition-all duration-300">
                    <div className="flex items-start gap-6">
                      <div className="text-5xl">{course.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-medium mb-1 group-hover:text-[#d4af37] transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-[#d4af37] text-sm mb-3">{course.subtitle}</p>
                        <p className="opacity-80 mb-4">{course.description}</p>
                        <div className="flex items-center gap-4 text-sm opacity-60">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {course.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                            {course.level}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TÉMOIGNAGES ========== */}
      <section className="py-24 px-4 bg-gradient-to-b from-transparent via-[#d4af37]/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-4">Ils Nous Font Confiance</h2>
            <p className="text-xl opacity-60">La voix de notre communauté mondiale</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#1a1a1a]/50 to-transparent p-6 rounded-2xl border border-[#d4af37]/10"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#d4af37]/20 flex items-center justify-center text-[#d4af37] font-medium">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-sm opacity-60">{testimonial.role}</div>
                  </div>
                </div>
                <p className="italic opacity-80">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA FINAL PREMIUM ========== */}
      <section className="py-32 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/10 via-transparent to-[#d4af37]/10" />
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-light mb-6"
          >
            Votre Voyage Horloger<br />
            <span className="text-[#d4af37] font-serif italic">Commence Maintenant</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl opacity-80 mb-10 max-w-2xl mx-auto"
          >
            Rejoignez une communauté mondiale de passionnés et d'experts. 
            Accès gratuit, illimité, sans engagement.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/inscription"
              className="px-10 py-4 bg-[#d4af37] text-[#0a0a0a] rounded-lg text-lg font-medium hover:bg-[#b8941f] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              Commencer Gratuitement
            </Link>
            <Link
              href="/demo-live"
              className="px-10 py-4 border-2 border-[#d4af37] rounded-lg text-lg font-medium hover:bg-[#d4af37]/10 transition-all duration-300"
            >
              Voir une Démo Live
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ========== FOOTER PREMIUM ========== */}
      <footer className="py-16 px-4 border-t border-[#d4af37]/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full border-2 border-[#d4af37] flex items-center justify-center">
                  <span className="text-[#d4af37] text-xl">⌚</span>
                </div>
                <div>
                  <div className="text-xl font-light">Académie Horlogère</div>
                  <div className="text-xs opacity-60">Excellence & Tradition depuis 1735</div>
                </div>
              </div>
              <p className="opacity-60 mb-6 max-w-md">
                La première plateforme mondiale dédiée à l'enseignement de l'horlogerie haute gamme. 
                Certifiée par les plus grandes manufactures suisses.
              </p>
              <div className="flex gap-4">
                {["instagram", "youtube", "linkedin", "twitter"].map((social) => (
                  <a
                    key={social}
                    href={`#${social}`}
                    className="w-10 h-10 rounded-full border border-[#d4af37]/30 flex items-center justify-center hover:bg-[#d4af37]/10 hover:border-[#d4af37] transition-all"
                  >
                    <span className="text-xs uppercase">{social[0]}</span>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-4">Formation</h3>
              <ul className="space-y-2 text-sm opacity-60">
                <li><Link href="/formations" className="hover:text-[#d4af37] transition-colors">Catalogue Complet</Link></li>
                <li><Link href="/certifications" className="hover:text-[#d4af37] transition-colors">Certifications</Link></li>
                <li><Link href="/ateliers" className="hover:text-[#d4af37] transition-colors">Ateliers Pratiques</Link></li>
                <li><Link href="/masterclass" className="hover:text-[#d4af37] transition-colors">Masterclass</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Ressources</h3>
              <ul className="space-y-2 text-sm opacity-60">
                <li><Link href="/bibliotheque" className="hover:text-[#d4af37] transition-colors">Bibliothèque 3D</Link></li>
                <li><Link href="/glossaire" className="hover:text-[#d4af37] transition-colors">Glossaire Technique</Link></li>
                <li><Link href="/outils" className="hover:text-[#d4af37] transition-colors">Outils & Logiciels</Link></li>
                <li><Link href="/forum" className="hover:text-[#d4af37] transition-colors">Forum d'Entraide</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#d4af37]/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm opacity-60">
            <p>© {new Date().getFullYear()} Académie Horlogère. Tous droits réservés.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="/mentions-legales" className="hover:text-[#d4af37] transition-colors">Mentions Légales</Link>
              <Link href="/confidentialite" className="hover:text-[#d4af37] transition-colors">Confidentialité</Link>
              <Link href="/accessibilite" className="hover:text-[#d4af37] transition-colors">Accessibilité</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
