// app/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// Types
type NavigationItem = {
  label: string;
  href: string;
};

type Feature = {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
};

type Course = {
  id: number;
  title: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Expert';
  duration: string;
  price: string;
  image: string;
  students: number;
  rating: number;
};

type Testimonial = {
  name: string;
  role: string;
  content: string;
  rating: number;
};

// Données statiques
const NAV_ITEMS: NavigationItem[] = [
  { label: 'Accueil', href: '#home' },
  { label: 'Découvrir', href: '#discover' },
  { label: 'Formations', href: '#courses' },
  { label: 'Collections', href: '#collections' },
  { label: 'Actualités', href: '#news' },
  { label: 'Contact', href: '#contact' },
];

const FEATURES: Feature[] = [
  {
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6V12L15 15" />
      </svg>
    ),
    title: "Histoire & Patrimoine",
    description: "Explorez 600 ans d'évolution horlogère, des premières montres mécaniques aux smartwatches modernes.",
    link: "/histoire"
  },
  {
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="5" r="2" />
        <circle cx="19" cy="12" r="2" />
        <circle cx="5" cy="12" r="2" />
        <circle cx="12" cy="19" r="2" />
      </svg>
    ),
    title: "Mécanismes & Techniques",
    description: "Découvrez les secrets des mouvements, tourbillons, calendriers perpétuels et autres merveilles mécaniques.",
    link: "/mecanismes"
  },
  {
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Formations Certifiantes",
    description: "Apprenez avec des maîtres horlogers à travers nos cours en ligne et ateliers pratiques.",
    link: "/formations"
  }
];

const COURSES: Course[] = [
  {
    id: 1,
    title: "Introduction à l'Horlogerie",
    level: "Débutant",
    duration: "6 semaines",
    price: "299€",
    students: 2450,
    rating: 4.8,
    image: "/api/placeholder/400/300"
  },
  {
    id: 2,
    title: "Mouvements Mécaniques Avancés",
    level: "Intermédiaire",
    duration: "8 semaines",
    price: "499€",
    students: 1280,
    rating: 4.9,
    image: "/api/placeholder/400/300"
  },
  {
    id: 3,
    title: "Restauration de Montres Anciennes",
    level: "Expert",
    duration: "12 semaines",
    price: "899€",
    students: 850,
    rating: 5.0,
    image: "/api/placeholder/400/300"
  },
  {
    id: 4,
    title: "Complications Horlogères",
    level: "Avancé",
    duration: "10 semaines",
    price: "699€",
    students: 620,
    rating: 4.9,
    image: "/api/placeholder/400/300"
  }
];

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Marie Dubois",
    role: "Étudiante en horlogerie",
    content: "Une plateforme exceptionnelle qui m'a permis de découvrir ma passion pour l'horlogerie. Les cours sont d'une qualité remarquable.",
    rating: 5
  },
  {
    name: "Jean-Pierre Martin",
    role: "Collectionneur",
    content: "Les ressources disponibles sont incroyables. J'ai approfondi mes connaissances sur l'histoire des grandes maisons horlogères.",
    rating: 5
  },
  {
    name: "Sophie Laurent",
    role: "Horlogère professionnelle",
    content: "Les formations m'ont permis de me reconvertir dans l'horlogerie. Un parcours complet et très bien structuré.",
    rating: 5
  }
];

export default function HomePage() {
  // États
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [subscribed, setSubscribed] = useState(false);

  // Effets
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(
      () => setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length),
      6000
    );
    return () => clearInterval(interval);
  }, []);

  // Calcul des angles pour l'horloge
  const seconds = currentTime.getSeconds();
  const minutes = currentTime.getMinutes() + seconds / 60;
  const hours = (currentTime.getHours() % 12) + minutes / 60;

  const degSecond = seconds * 6;
  const degMinute = minutes * 6;
  const degHour = hours * 30;

  // Formatage de l'heure
  const formatTime = (date: Date) =>
    date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

  // Style des badges de niveau
  const getLevelStyle = (level: Course['level']) => {
    const styles = {
      'Débutant': 'bg-green-100 text-green-800 border-green-300',
      'Intermédiaire': 'bg-blue-100 text-blue-800 border-blue-300',
      'Avancé': 'bg-purple-100 text-purple-800 border-purple-300',
      'Expert': 'bg-red-100 text-red-800 border-red-300'
    };
    return styles[level];
  };

  // Gestion de l'inscription à la newsletter
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'
      }`}>
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          {/* Logo animé */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 border-2 border-amber-400 rounded-full animate-spin-slow"></div>
              <div className="absolute inset-2 bg-amber-400 rounded-full flex items-center justify-center">
                <div className="w-1 h-4 bg-white rounded-full transform rotate-45"></div>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold">
                Chrono<span className="text-amber-400">sophia</span>
              </h1>
              <p className="text-xs text-amber-300">L'Art du Temps</p>
            </div>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden lg:flex gap-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-gray-300 hover:text-amber-400 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#contact"
              className="bg-amber-400 text-gray-900 px-5 py-2 rounded-full hover:bg-amber-300 transition-colors"
            >
              Inscription
            </Link>
          </nav>

          {/* Bouton menu mobile */}
          <button
            className="lg:hidden text-amber-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Menu mobile */}
        {mobileMenuOpen && (
          <nav className="lg:hidden bg-gray-900/95 border-t border-gray-800 py-4">
            <div className="container mx-auto flex flex-col gap-3 px-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block py-2 text-gray-300 hover:text-amber-400 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="#contact"
                className="mt-2 bg-amber-400 text-gray-900 px-5 py-2 rounded-full hover:bg-amber-300 transition-colors text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Inscription
              </Link>
            </div>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Décor animé */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 border-4 border-amber-500/20 rounded-full animate-spin-slow"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 border-4 border-amber-400/20 rounded-full animate-spin-reverse-slow"></div>
        </div>

        <div className="relative z-10 max-w-4xl text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
              L'Art du Temps
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Découvrez l'univers fascinant de l'horlogerie : histoire, technique et passion.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="#discover"
              className="px-8 py-3 bg-amber-400 text-gray-900 rounded-full font-semibold hover:bg-amber-300 transition-all"
            >
              Explorer
            </Link>
            <Link
              href="#courses"
              className="px-8 py-3 border border-amber-400 rounded-full font-semibold hover:bg-amber-400 hover:text-gray-900 transition-all"
            >
              Formations
            </Link>
          </div>

          {/* Horloge animée */}
          <div className="inline-block bg-gray-800/50 backdrop-blur-sm p-4 rounded-full">
            <div className="relative w-24 h-24">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="45" stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="none"/>
                {/* Aiguille des heures */}
                <line x1="50" y1="50" x2="50" y2="30" stroke="amber-400" strokeWidth="3" transform={`rotate(${degHour} 50 50)`}/>
                {/* Aiguille des minutes */}
                <line x1="50" y1="50" x2="50" y2="20" stroke="amber-300" strokeWidth="2" transform={`rotate(${degMinute} 50 50)`}/>
                {/* Aiguille des secondes */}
                <line x1="50" y1="50" x2="50" y2="15" stroke="#ef4444" strokeWidth="1" transform={`rotate(${degSecond} 50 50)`}/>
                <circle cx="50" cy="50" r="2" fill="amber-400"/>
              </svg>
            </div>
            <div className="mt-2 text-sm font-mono">{formatTime(currentTime)}</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="discover" className="py-20 bg-gray-900/60">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Univers</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Trois axes pour comprendre l'horlogerie : histoire, technique et transmission.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {FEATURES.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-lg hover:shadow-lg transition-all animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="text-amber-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-300 mb-4">{feature.description}</p>
                <Link
                  href={feature.link}
                  className="text-amber-400 hover:text-amber-300 transition-colors"
                >
                  En savoir plus →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Mechanism */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Mécanisme Interactif</h2>
              <p className="text-gray-300 mb-8">
                Explorez en détail les composants d'un mouvement horloger.
                Survolez les éléments pour découvrir leur fonction.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center">
                    <span className="font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Balancier</h4>
                    <p className="text-gray-400 text-sm">Le cœur battant de la montre</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center">
                    <span className="font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Échappement</h4>
                    <p className="text-gray-400 text-sm">Régule la libération d'énergie</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center">
                    <span className="font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Barillet</h4>
                    <p className="text-gray-400 text-sm">Stocke l'énergie du mouvement</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="relative">
              <svg viewBox="0 0 400 400" className="w-full h-full">
                {/* Engrenage principal */}
                <g className="animate-spin-slow" style={{ transformOrigin: '200px 200px' }}>
                  <circle cx="200" cy="200" r="60" fill="none" stroke="#F59E0B" strokeWidth="2"/>
                  {[...Array(12)].map((_, i) => {
                    const angle = (i * 30) * (Math.PI / 180);
                    const x1 = 200 + 60 * Math.cos(angle);
                    const y1 = 200 + 60 * Math.sin(angle);
                    const x2 = 200 + 70 * Math.cos(angle);
                    const y2 = 200 + 70 * Math.sin(angle);
                    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#F59E0B" strokeWidth="2" />;
                  })}
                </g>

                {/* Engrenage secondaire */}
                <g className="animate-spin-reverse-slow" style={{ transformOrigin: '280px 200px' }}>
                  <circle cx="280" cy="200" r="40" fill="none" stroke="#FCD34D" strokeWidth="2"/>
                  {[...Array(8)].map((_, i) => {
                    const angle = (i * 45) * (Math.PI / 180);
                    const x1 = 280 + 40 * Math.cos(angle);
                    const y1 = 200 + 40 * Math.sin(angle);
                    const x2 = 280 + 45 * Math.cos(angle);
                    const y2 = 200 + 45 * Math.sin(angle);
                    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FCD34D" strokeWidth="2" />;
                  })}
                </g>

                {/* Balancier */}
                <g className="animate-pendulum" style={{ transformOrigin: '200px 300px' }}>
                  <circle cx="200" cy="300" r="30" fill="none" stroke="#EF4444" strokeWidth="2"/>
                  <line x1="200" y1="270" x2="200" y2="330" stroke="#EF4444" strokeWidth="2"/>
                  <line x1="170" y1="300" x2="230" y2="300" stroke="#EF4444" strokeWidth="2"/>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20 bg-gray-900/60">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Formations</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Des cours conçus par des experts pour maîtriser l'art horloger.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {COURSES.map((course) => (
              <div
                key={course.id}
                className="bg-gray-800 rounded-xl shadow-lg overflow-hidden group transition-all hover:scale-[1.02]"
              >
                <div className="relative h-48 bg-gray-700 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-700/50 to-gray-900/50 opacity-90"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl opacity-30">⌚</span>
                  </div>
                  <div className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full border ${getLevelStyle(course.level)}`}>
                    {course.level}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-amber-300 mb-2">{course.title}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <span>Durée: {course.duration}</span>
                    <span className="text-lg font-bold text-amber-500">{course.price}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mb-4">
                    <span>{course.students.toLocaleString()} apprenants</span>
                    <span>⭐ {course.rating} / 5</span>
                  </div>
                  <Link
                    href={`/cours/${course.id}`}
                    className="w-full block text-center bg-amber-400 text-gray-900 py-2 rounded-lg hover:bg-amber-300 transition-colors"
                  >
                    S'inscrire
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Témoignages</h2>
            <p className="text-gray-300">
              Ce que nos apprenants disent de leur expérience.
            </p>
          </div>

          <div className="relative h-64">
            {TESTIMONIALS.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  index === activeTestimonial ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="bg-gray-800 rounded-2xl p-8 md:p-12 text-center shadow-2xl border border-gray-700">
                  <div className="flex justify-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-6 h-6 text-amber-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-xl text-gray-200 mb-6 italic">
                    “{testimonial.content}”
                  </p>
                  <div>
                    <p className="font-bold text-gray-100">{testimonial.name}</p>
                    <p className="text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === activeTestimonial ? 'bg-amber-400' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-to-r from-amber-900 to-amber-800">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Restez Informé</h2>
          <p className="text-gray-200 mb-8">
            Recevez nos dernières actualités, offres exclusives et nouveaux cours.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-6 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            />
            <button
              type="submit"
              className="bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors font-semibold"
            >
              S'abonner
            </button>
          </form>
          {subscribed && (
            <div className="mt-4 text-green-400">
              Merci pour votre inscription !
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="relative w-10 h-10">
                  <div className="absolute inset-0 border-2 border-amber-400 rounded-full animate-spin-slow" style={{ animationDuration: '15s' }}></div>
                  <div className="absolute inset-2 bg-amber-400 rounded-full"></div>
                </div>
                <h3 className="font-bold text-xl">Chronosophia</h3>
              </div>
              <p className="text-gray-400">
                Plateforme éducative et culturelle dédiée à l'horlogerie.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Navigation</h4>
              <ul className="space-y-2">
                {NAV_ITEMS.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-gray-400 hover:text-amber-400 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Contact</h4>
              <p className="text-gray-400">contact@chronosophia.example</p>
              <p className="text-gray-400">+33 1 23 45 67 89</p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Suivez-nous</h4>
              <div className="flex gap-4">
                {['Facebook', 'Twitter', 'Instagram'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-400 transition-colors"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="w-5 h-5 bg-white rounded-sm"></div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Chronosophia. Tous droits réservés.
          </div>
        </div>
      </footer>

      {/* Animations globales */}
      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes pendulum {
          0%, 100% { transform: rotate(-10deg); }
          50% { transform: rotate(10deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-spin-slow { animation: spin-slow 30s linear infinite; }
        .animate-spin-reverse-slow { animation: spin-reverse-slow 20s linear infinite; }
        .animate-pendulum { animation: pendulum 2s ease-in-out infinite; }
        .animate-fade-in {
          opacity: 0;
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
