'use client';
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Collection from './components/Collection';
import WatchDetail from './components/WatchDetail';
import Footer from './components/Footer';
import Movements from './components/Movements';
import Glossary from './components/Glossary';
import History from './components/History';
import SwissMap from './components/SwissMap';
import OfficialResources from './components/OfficialResources';
import MasterQuotes from './components/MasterQuotes';

// Utility for optimizing static images in App
const optimize = (url: string, width = 1200) => {
  return `${url}&w=${width}&q=80&fm=webp`;
};

// Extracted Home Component to keep Routing clean
const HomePage: React.FC = () => (
  <>
    <Hero />
    
    {/* Quote Section */}
    <section className="py-24 md:py-32 px-6 bg-white dark:bg-neutral-950 text-center">
      <div className="max-w-4xl mx-auto">
        <p className="font-serif text-xl md:text-3xl lg:text-4xl italic leading-relaxed text-neutral-800 dark:text-neutral-200">
          "Nous ne fabriquons pas seulement des montres. Nous sommes les gardiens d'un temps qui ne passe pas, mais qui dure."
        </p>
        <div className="mt-10 w-16 h-[1px] bg-gold-500 mx-auto"></div>
      </div>
    </section>

    <Collection />
    
    <Movements />

    <Features />
    
    <History />

    {/* Interactive Swiss Watchmaking Map (Replaces Atelier) */}
    <SwissMap />

    {/* Official Resources */}
    <OfficialResources />

    {/* Inspirational Quotes Carousel */}
    <MasterQuotes />
  </>
);

// Main App Component
const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen flex flex-col relative overflow-x-hidden selection:bg-gold-500 selection:text-white bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 transition-colors duration-500">
          <Navbar />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/watch/:id" element={<WatchDetail />} />
              <Route path="/glossary" element={<Glossary />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
