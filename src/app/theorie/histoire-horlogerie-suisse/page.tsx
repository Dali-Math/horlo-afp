'use client';
import React, { useState, useEffect } from 'react';
// ================================
// STYLES CSS INLINE AVEC AMÉLIORATIONS
// ================================
const styles = `
* { margin: 0; padding: 0; box-sizing: border-box; }
:root {
--bg-primary: #f7f7f7;
--bg-secondary: #ffffff;
--text-primary: #333333;
--text-secondary: #666666;
--text-muted: #999999;
--border-color: #e0e0e0;
--shadow-light: rgba(0,0,0,0.08);
--shadow-medium: rgba(0,0,0,0.15);
--accent-primary: #667eea;
--accent-secondary: #764ba2;
}
[data-theme="dark"] {
--bg-primary: #1a1a1a;
--bg-secondary: #2d2d2d;
--text-primary: #ffffff;
--text-secondary: #cccccc;
--text-muted: #888888;
--border-color: #444444;
--shadow-light: rgba(255,255,255,0.08);
--shadow-medium: rgba(255,255,255,0.15);
--accent-primary: #8b9cf5;
--accent-secondary: #9b7bc3;
}
body { 
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
line-height: 1.6; 
background-color: var(--bg-primary);
color: var(--text-primary);
transition: background-color 0.3s ease, color 0.3s ease;
}
.container { max-width: 1200px; margin: 0 auto; padding: 20px; }
.header { 
background: var(--bg-secondary); 
box-shadow: 0 2px 10px var(--shadow-light); 
position: sticky; 
top: 0; 
z-index: 100; 
transition: background-color 0.3s ease, box-shadow 0.3s ease;
}
.header-content { display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; }
.logo { font-size: 1.5rem; font-weight: 700; color: var(--accent-primary); cursor: pointer; }
.logo:hover { color: var(--accent-secondary); }
.nav { display: flex; gap: 2rem; list-style: none; }
.nav a { text-decoration: none; color: var(--text-secondary); font-weight: 500; cursor: pointer; position: relative; }
.nav a:hover { color: var(--accent-primary); }
.nav a::after { content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 2px; background: var(--accent-primary); transition: width 0.3s ease; }
.nav a:hover::after { width: 100%; }
/* Theme toggle button */
.theme-toggle {
background: none;
border: 2px solid var(--accent-primary);
color: var(--accent-primary);
padding: 8px 12px;
border-radius: 20px;
cursor: pointer;
font-size: 0.9rem;
font-weight: 600;
transition: all 0.3s ease;
display: flex;
align-items: center;
gap: 8px;
}
.theme-toggle:hover {
background: var(--accent-primary);
color: white;
transform: translateY(-1px);
}
.theme-icon {
font-size: 1.1rem;
}
.hero { background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%); color: white; padding: 4rem 0; text-align: center; position: relative; overflow: hidden; transition: background 0.3s ease; }
.hero::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" fill="white" opacity="0.05"><path d="M0,50 Q250,20 500,50 T1000,50 L1000,100 L0,100 Z"/></svg>'); z-index: 1; }
.hero-content { position: relative; z-index: 2; }
.hero h1 { font-size: 3.5rem; font-weight: 700; margin-bottom: 1rem; text-shadow: 0 2px 4px rgba(0,0,0,0.3); }
.hero p { font-size: 1.3rem; margin-bottom: 2rem; opacity: 0.9; }
.hero-svg { margin: 2rem auto; width: 200px; height: 200px; }
.hero-svg:hover { transform: scale(1.05); transition: transform 0.3s ease; }
.btn { background: white; color: var(--accent-primary); padding: 12px 30px; border: none; border-radius: 25px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; }
.btn:hover { transform: translateY(-2px); box-shadow: 0 4px 15px rgba(0,0,0,0.2); }
.section { padding: 4rem 0; transition: background-color 0.3s ease; }
.section:nth-child(even) { background: var(--bg-secondary); }
.section:nth-child(odd) { background: var(--bg-primary); }
.section h2 { font-size: 2.5rem; font-weight: 700; margin-bottom: 3rem; text-align: center; color: var(--text-primary); position: relative; }
.section h2::after { content: ''; position: absolute; left: 50%; transform: translateX(-50%); bottom: -10px; width: 60px; height: 4px; background: var(--accent-primary); border-radius: 2px; }
.grid { display: grid; gap: 2rem; margin-top: 3rem; }
.stats-grid { grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); }
.cards-grid { grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); }
.card { 
background: var(--bg-secondary); 
padding: 2rem; 
border-radius: 15px; 
box-shadow: 0 4px 15px var(--shadow-light); 
transition: all 0.3s ease; 
border: 1px solid var(--border-color);
}
.card:hover { transform: translateY(-8px); box-shadow: 0 12px 35px var(--shadow-medium); }
.card img { width: 100%; height: 250px; object-fit: cover; border-radius: 10px; margin-bottom: 1rem; transition: transform 0.3s ease; }
.card:hover img { transform: scale(1.05); }
.card h3 { font-size: 1.5rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem; }
.card .subtitle { color: var(--accent-primary); font-weight: 600; margin-bottom: 0.5rem; }
.card .since { color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1rem; }
.card .desc { color: var(--text-secondary); line-height: 1.7; }
.stat-card { 
background: var(--bg-secondary); 
padding: 2.5rem 1.5rem; 
border-radius: 15px; 
text-align: center; 
border: 1px solid var(--border-color); 
box-shadow: 0 4px 15px var(--shadow-light); 
transition: all 0.3s ease; 
position: relative; 
overflow: hidden; 
}
.stat-card:hover { transform: translateY(-5px); box-shadow: 0 8px 25px var(--shadow-medium); border-color: var(--accent-primary); }
.stat-card::before { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.1), transparent); transition: left 0.5s ease; }
.stat-card:hover::before { left: 100%; }
.stat-number { font-size: 2.8rem; font-weight: 700; color: var(--accent-primary); margin-bottom: 0.5rem; }
.stat-label { font-size: 0.95rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600; }
.timeline { position: relative; max-width: 900px; margin: 3rem auto; }
.timeline::before { content: ''; position: absolute; left: 50%; transform: translateX(-50%); width: 3px; height: 100%; background: linear-gradient(to bottom, var(--accent-primary), var(--accent-secondary)); border-radius: 2px; }
.timeline-item { position: relative; margin-bottom: 4rem; display: flex; align-items: center; }
.timeline-item:nth-child(odd) { flex-direction: row; }
.timeline-item:nth-child(even) { flex-direction: row-reverse; }
.timeline-content { 
flex: 1; 
padding: 2rem; 
background: var(--bg-secondary); 
border: 1px solid var(--border-color);
border-radius: 15px; 
box-shadow: 0 4px 20px var(--shadow-light); 
margin: 0 2rem; 
transition: all 0.3s ease; 
}
.timeline-content:hover { transform: translateY(-3px); box-shadow: 0 8px 30px var(--shadow-medium); }
.timeline-year { font-size: 2rem; font-weight: 700; color: var(--accent-primary); margin-bottom: 1rem; }
.timeline-title { font-size: 1.3rem; font-weight: 600; margin-bottom: 1rem; color: var(--text-primary); }
.timeline-desc { color: var(--text-secondary); line-height: 1.7; margin-bottom: 1rem; }
.timeline-image { width: 100%; height: 200px; border-radius: 10px; overflow: hidden; margin-top: 1rem; }
.timeline-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease; }
.timeline-content:hover .timeline-image img { transform: scale(1.05); }
.timeline-marker { width: 20px; height: 20px; background: var(--accent-primary); border: 4px solid var(--bg-secondary); border-radius: 50%; position: absolute; left: 50%; transform: translateX(-50%); z-index: 10; box-shadow: 0 0 0 6px rgba(102, 126, 234, 0.2); transition: all 0.3s ease; }
.timeline-marker:hover { transform: translateX(-50%) scale(1.1); box-shadow: 0 0 0 8px rgba(102, 126, 234, 0.3); }
.footer { 
background: var(--bg-secondary); 
border-top: 1px solid var(--border-color);
color: var(--text-primary); 
text-align: center; 
padding: 3rem 0; 
transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}
.footer a { color: var(--accent-primary); text-decoration: none; }
.footer a:hover { text-decoration: underline; }
@media (max-width: 768px) {
.hero h1 { font-size: 2.5rem; }
.hero p { font-size: 1.1rem; }
.nav { display: none; }
.section h2 { font-size: 2rem; }
.timeline::before { left: 30px; }
.timeline-item { flex-direction: column !important; align-items: flex-start; }
.timeline-content { margin: 0 0 0 60px; padding: 1.5rem; }
.timeline-marker { left: 30px; }
}
`;
// ================================
// DONNÉES COMPLÈTES AVEC IMAGES
// ================================
const data = {
stats: [
{ number: "500+", label: "Années d'Histoire" },
{ number: "21,7 MdsCHF", label: "CA (2019)" },
{ number: "N°1", label: "Mondial Luxe" },
{ number: "+2,4%", label: "Croissance 2018-19" }
],
timeline: [
{
year: "1541",
title: "Les Origines : Jean Calvin et la Naissance à Genève",
desc: "Jean Calvin bannit le port d'objets ornementaux à Genève, forçant orfèvres et joailliers à se reconvertir dans l'horlogerie, marquant la naissance de l'industrie horlogère suisse.",
img: ""
},
{
year: "1685",
title: "Les Réfugiés Huguenots : Expansion dans l'Arc Jurassien",
desc: "La révocation de l'Édit de Nantes entraîne l'arrivée de réfugiés huguenots français apportant capitaux, savoir-faire et réseaux commerciaux.",
img: ""
},
{
year: "1740",
title: "Vallée de Joux : Berceau de la Haute Horlogerie",
desc: "Les agriculteurs combiers fabriquent des pièces horlogères pendant les longs hivers. Naissance des 'fermes horlogères' avec fenêtres supplémentaires.",
img: "/imgs/Vallee_de_Joux_Swiss_Alps_Landscape_Lake_Forest.jpg"
},
{
year: "XIXe Siècle",
title: "L'Âge d'Or : Innovations et Production en Série",
desc: "Développement de nouvelles techniques, production en série, exportations massives. Invention du tourbillon par Abraham-Louis Breguet (1801).",
img: "/imgs/luxury_swiss_watch_tourbillon_complication_macro.jpg"
},
{
year: "1929",
title: "Grande Dépression : Naissance des Grands Groupes",
desc: "La crise économique force les petites maisons à se regrouper. Création de la SSIH (Omega + Tissot, 1930) et de l'ASUAG (1931).",
img: ""
},
{
year: "1970-1983",
title: "Crise du Quartz : La Swatch Sauve l'Industrie",
desc: "Les montres à quartz japonaises réduisent les parts de marché suisses de 50% à 15%. Fusion SSIH + ASUAG = Swatch Group (1983).",
img: ""
}
],
regions: [
{
name: "Genève",
subtitle: "Berceau de l'horlogerie",
since: "1541",
desc: "Capitale mondiale de l'horlogerie de luxe, siège de Patek Philippe, Rolex, Vacheron Constantin.",
img: "/imgs/geneva_luxury_watchmaking_craftsman_at_work.jpg"
},
{
name: "Vallée de Joux",
subtitle: "Haute horlogerie",
since: "1740",
desc: "Berceau des grandes complications horlogères. 26 fermes horlogères historiques.",
img: "/imgs/Vallee_de_Joux_Audemars_Piguet_Museum_Swiss_Alps_Landscape.jpg"
},
{
name: "Neuchâtel",
subtitle: "Innovation technique",
since: "XVIIe siècle",
desc: "Centre d'innovation et de recherche horlogère.",
img: "/imgs/Neuchatel_Switzerland_historic_city_lake_architecture_watchmaking_clock_tower.jpg"
},
{
name: "Bienne/Biel",
subtitle: "Production industrielle",
since: "XXe siècle",
desc: "Siège d'Omega, Swatch Group. Centre industriel majeur.",
img: "/imgs/Bienne_Switzerland_Old_Town_Square_Watchmaking_City.jpg"
},
{
name: "La Chaux-de-Fonds",
subtitle: "Patrimoine UNESCO",
since: "XVIIIe siècle",
desc: "Ville horlogère inscrite au patrimoine mondial UNESCO.",
img: "/imgs/la_chaux_de_fonds_swiss_watchmaking_cityscape_unesco_heritage.jpg"
},
{
name: "Schaffhouse",
subtitle: "Horlogerie allemande-suisse",
since: "XIXe siècle",
desc: "Siège d'IWC Schaffhausen, manufacture prestigieuse.",
img: "/imgs/Schaffhausen_Switzerland_Fronwagplatz_city_square.jpg"
}
],
manufactures: [
{
name: "Vacheron Constantin",
year: "1755",
location: "Genève",
desc: "La plus ancienne manufacture horlogère active au monde, 270 ans d'excellence continue.",
img: "/imgs/Vacheron_Constantin_Tourbillon_Green_Dial_Luxury_Swiss_Watch.jpg"
},
{
name: "Breguet",
year: "1775",
location: "Vallée de Joux",
desc: "Tourbillon (inventeur)",
img: "/imgs/luxury_swiss_watch_tourbillon_mechanism_macro.jpg"
},
{
name: "Jaeger-LeCoultre",
year: "1833",
location: "Le Sentier",
desc: "Reverso, calibres manufacture",
img: "/imgs/jaeger_lecoultre_reverso_blue_dial_luxury_watch.jpg"
},
{
name: "Patek Philippe",
year: "1839",
location: "Genève",
desc: "Grandes complications",
img: "/imgs/Patek_Philippe_Rose_Gold_Grand_Complications_Watch.jpg"
},
{
name: "Omega",
year: "1848",
location: "Bienne",
desc: "Speedmaster, précision",
img: "/imgs/Omega_Seamaster_Chronograph_Luxury_Watch_White_Background.jpg"
},
{
name: "Audemars Piguet",
year: "1875",
location: "Le Brassus",
desc: "Royal Oak, complications",
img: "/imgs/audemars_piguet_royal_oak_rose_gold_black_dial_luxury_swiss_watch.jpg"
},
{
name: "Rolex",
year: "1905",
location: "Genève",
desc: "Montres de sport, robustesse",
img: "/imgs/rolex_submariner_gold_luxury_swiss_watch_product_photo.jpg"
},
{
name: "Blancpain",
year: "1735",
location: "Le Brassus",
desc: "Fifty Fathoms, complications",
img: "/imgs/blancpain_fifty_fathoms_luxury_swiss_dive_watch_product_shot.jpg"
}
]
};
// ================================
// COMPOSANT PRINCIPAL FINAL
// ================================
export default function HorlogeriePage() {
const [isDarkMode, setIsDarkMode] = useState(false);
// Charger le thème depuis localStorage au démarrage
useEffect(() => {
const savedTheme = localStorage.getItem('horlolearn-theme');
if (savedTheme) {
setIsDarkMode(savedTheme === 'dark');
} else {
// Détecter la préférence système
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
setIsDarkMode(prefersDark);
}
}, []);
// Appliquer le thème au document
useEffect(() => {
document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
localStorage.setItem('horlolearn-theme', isDarkMode ? 'dark' : 'light');
}, [isDarkMode]);
const toggleTheme = () => {
setIsDarkMode(!isDarkMode);
};
const scrollToSection = (sectionId: string) => {
const element = document.getElementById(sectionId);
if (element) {
element.scrollIntoView({ behavior: 'smooth' });
}
};
const handleButtonClick = () => {
alert('Made in Club! 🎉');
};
return (
<div>
<style dangerouslySetInnerHTML={{ __html: styles }} />
{/* Header */}
<header className="header">
<div className="container">
<div className="header-content">
<div className="logo" onClick={() => scrollToSection('hero')}>
HorloLearn
</div>
<nav>
<ul className="nav">
<li><a onClick={() => scrollToSection('hero')}>HorloLearn</a></li>
<li><a onClick={() => scrollToSection('chronologie')}>Chronologie</a></li>
<li><a onClick={() => scrollToSection('regions')}>Régions</a></li>
<li><a onClick={() => scrollToSection('manufactures')}>Manufactures</a></li>
</ul>
</nav>
<button className="theme-toggle" onClick={toggleTheme}>
<span className="theme-icon">{isDarkMode ? '☀️' : '🌙'}</span>
<span>{isDarkMode ? 'Clair' : 'Sombre'}</span>
</button>
</div>
</div>
</header>
{/* Hero */}
<section id="hero" className="hero">
<div className="container">
<div className="hero-content">
<h1>L'Excellence Horlogère Suisse</h1>
<p>500+ Années d'Histoire</p>
{/* SVG Watch - Identique à la référence */}
<div className="hero-svg">
<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
<circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="3"/>
<circle cx="100" cy="100" r="60" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
<circle cx="100" cy="100" r="40" fill="rgba(255,255,255,0.1)"/>
<circle cx="100" cy="100" r="8" fill="rgba(255,255,255,0.9)"/>
{/* Hour markers */}
{[0, 60, 120, 180, 240, 300].map((angle, index) => (
<line
key={index}
x1="100"
y1="100"
x2={100 + 70 * Math.cos((angle * Math.PI) / 180)}
y2={100 + 70 * Math.sin((angle * Math.PI) / 180)}
stroke="rgba(255,255,255,0.8)"
strokeWidth="2"
/>
))}
{/* Watch hands */}
<line
x1="100"
y1="100"
x2={100 + 45 * Math.cos((90 * Math.PI) / 180)}
y2={100 + 45 * Math.sin((90 * Math.PI) / 180)}
stroke="rgba(255,255,255,0.9)"
strokeWidth="3"
strokeLinecap="round"
/>
<line
x1="100"
y1="100"
x2={100 + 30 * Math.cos((270 * Math.PI) / 180)}
y2={100 + 30 * Math.sin((270 * Math.PI) / 180)}
stroke="rgba(255,255,255,0.7)"
strokeWidth="2"
strokeLinecap="round"
/>
</svg>
</div>
<button className="btn" onClick={handleButtonClick}>Made in Club</button>
</div>
</div>
</section>
{/* Stats */}
<section className="section">
<div className="container">
<h2>Chiffres Clés</h2>
<div className="grid stats-grid">
{data.stats.map((stat, index) => (
<div key={index} className="stat-card">
<div className="stat-number">{stat.number}</div>
<div className="stat-label">{stat.label}</div>
</div>
))}
</div>
</div>
</section>
{/* Timeline */}
<section id="chronologie" className="section">
<div className="container">
<h2>500 Ans d'Excellence</h2>
<div className="timeline">
{data.timeline.map((item, index) => (
<div key={index} className="timeline-item">
<div className="timeline-content">
<div className="timeline-year">{item.year}</div>
<h3 className="timeline-title">{item.title}</h3>
<p className="timeline-desc">{item.desc}</p>
{item.img && (
<div className="timeline-image">
<img src={item.img} alt={`${item.title} - ${item.year}`} />
</div>
)}
</div>
<div className="timeline-marker"></div>
</div>
))}
</div>
</div>
</section>
{/* Regions */}
<section id="regions" className="section">
<div className="container">
<h2>Géographie Horlogère</h2>
<div className="grid cards-grid">
{data.regions.map((region, index) => (
<div key={index} className="card">
<img src={region.img} alt={`Région de ${region.name}`} />
<h3>{region.name}</h3>
<div className="subtitle">{region.subtitle}</div>
<div className="since">Depuis {region.since}</div>
<p className="desc">{region.desc}</p>
</div>
))}
</div>
</div>
</section>
{/* Manufactures */}
<section id="manufactures" className="section">
<div className="container">
<h2>Maisons Légendaires</h2>
<div className="grid cards-grid">
{data.manufactures.map((manufacture, index) => (
<div key={index} className="card">
<img src={manufacture.img} alt={`Montre ${manufacture.name}`} />
<h3>{manufacture.name}</h3>
<div className="subtitle">Fondée en {manufacture.year}</div>
<div className="since">{manufacture.location}</div>
<p className="desc">{manufacture.desc}</p>
</div>
))}
</div>
</div>
</section>
{/* Footer */}
<footer className="footer">
<div className="container">
<p>© 2025 HorloLearn - Éducation Horlogère de Prestige</p>
<p>
Une célébration de 500 ans d'excellence horlogère suisse | 
<a href="https://www.horlolearn.ch"> HorloLearn.ch</a>
</p>
<p style={{ marginTop: '1rem', fontSize: '0.85rem', opacity: 0.8 }}>
Created by MiniMax Agent
</p>
</div>
</footer>
</div>
);
}
