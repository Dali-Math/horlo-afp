
import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeContext';
import { Theme } from '../types';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (href: string) => {
    setIsMobileMenuOpen(false);
    
    if (href.startsWith('/')) {
      navigate(href);
      window.scrollTo(0, 0);
      return;
    }

    if (location.pathname !== '/' && href.startsWith('#')) {
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (href === '#') {
      navigate('/');
      window.scrollTo(0, 0);
    } else {
      const element = document.querySelector(href);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Maison', href: '#history' },
    { name: 'Collections', href: '#collections' },
    { name: 'Mouvements', href: '#movements' },
    { name: 'Lexique', href: '/glossary' },
    { name: 'Terroir', href: '#terroir' },
  ];

  const isHomePage = location.pathname === '/';
  const textColorClass = (isHomePage && !isScrolled) 
    ? 'text-white' 
    : 'text-neutral-900 dark:text-white';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-lg py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo - Real Brand Identity */}
        <div 
          className="flex items-center gap-3 group cursor-pointer" 
          onClick={() => handleNavigation('#')}
        >
          {/* Custom Clock Icon (9:00 position) */}
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={`w-10 h-10 text-gold-500 transition-transform duration-500 group-hover:rotate-90`}
          >
             <circle cx="12" cy="12" r="9" strokeWidth="2" />
             <polyline points="12 6 12 12 8 12" strokeWidth="2" />
          </svg>

          <div className="flex flex-col">
             <span className={`font-sans text-2xl font-bold tracking-tight leading-none transition-colors duration-500 ${textColorClass}`}>
              HorloLearn
            </span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavigation(link.href)}
              className={`text-sm uppercase tracking-widest font-medium hover:text-gold-500 transition-colors relative group bg-transparent border-none cursor-pointer ${textColorClass}`}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-500 transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors">
            {theme === Theme.DARK 
              ? <Sun className="w-5 h-5 text-gold-400" /> 
              : <Moon className={`w-5 h-5 ${isHomePage && !isScrolled ? 'text-white' : 'text-neutral-600'}`} />
            }
          </button>
          <button className="bg-gold-500 text-white px-6 py-2 rounded-sm uppercase text-xs font-bold tracking-wider hover:bg-gold-600 transition-colors">
            Contact
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden p-2 ${textColorClass}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-white dark:bg-neutral-950 z-40 transform transition-transform duration-500 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden pt-24 px-8`}
      >
        <div className="flex flex-col gap-8 items-center">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavigation(link.href)}
              className="font-serif text-2xl text-neutral-900 dark:text-white hover:text-gold-500 transition-colors bg-transparent border-none"
            >
              {link.name}
            </button>
          ))}
          <div className="flex items-center gap-6 mt-8">
             <button onClick={toggleTheme} className="p-4 rounded-full bg-neutral-100 dark:bg-neutral-800">
                {theme === Theme.DARK ? <Sun className="w-6 h-6 text-gold-400" /> : <Moon className="w-6 h-6 text-neutral-600" />}
             </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
