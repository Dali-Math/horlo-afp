'use client';

import { useEffect, useRef, useState } from 'react';

interface ClockData {
  id: string;
  city: string;
  timezone: string;
  hours: number;
  minutes: number;
  seconds: number;
  isDaytime: boolean;
}

interface SelectedDateInfo {
  city: string;
  timezone: string;
  dateString: string;
  hours: number;
  minutes: number;
  seconds: number;
}

const topRowCities = [
  { name: 'New York', timezone: 'America/New_York' },
  { name: 'London', timezone: 'Europe/London' },
  { name: 'Tokyo', timezone: 'Asia/Tokyo' },
  { name: 'Paris', timezone: 'Europe/Paris' }
];

const middleCities = [
  { name: 'Sydney', timezone: 'Australia/Sydney' },
  { name: 'Moscow', timezone: 'Europe/Moscow' },
  { name: 'Bern', timezone: 'Europe/Zurich' },
  { name: 'Dubai', timezone: 'Asia/Dubai' }
];

const bottomRowCities = [
  { name: 'Vienna', timezone: 'Europe/Vienna' },
  { name: 'Rome', timezone: 'Europe/Rome' },
  { name: 'Beijing', timezone: 'Asia/Shanghai' },
  { name: 'Berlin', timezone: 'Europe/Berlin' }
];

function createClockSVG(hours: number, minutes: number, seconds: number, clockId: string) {
  const secondAngle = seconds * 6;
  const minuteAngle = minutes * 6 + seconds * 0.1;
  const hourAngle = ((hours % 12) * 30) + (minutes * 0.5) + (seconds * 0.5 / 60);
  
  const centerX = 70;
  const centerY = 70;
  const secondLength = 54;
  
  const numbers = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const numberRadius = 48;
  let numbersSVG = '';
  
  numbers.forEach((num, i) => {
    const angle = (i * 30 - 90) * Math.PI / 180;
    const x = centerX + numberRadius * Math.cos(angle);
    const y = centerY + numberRadius * Math.sin(angle);
    numbersSVG += `<text x="${x}" y="${y + 0.5}" font-size="10" font-weight="700" font-family="'Georgia', serif" text-anchor="middle" dominant-baseline="middle" fill="#555555" opacity="0.3">${num}</text>`;
    numbersSVG += `<text x="${x}" y="${y}" font-size="10" font-weight="700" font-family="'Georgia', serif" text-anchor="middle" dominant-baseline="middle" fill="#1a1a1a">${num}</text>`;
  });
  
  let minuteMarkersSVG = '';
  for (let i = 0; i < 60; i++) {
    const angle = (i * 6 - 90) * Math.PI / 180;
    const isHourMark = i % 5 === 0;
    const innerR = isHourMark ? 54 : 57;
    const outerR = 59;
    const x1 = centerX + innerR * Math.cos(angle);
    const y1 = centerY + innerR * Math.sin(angle);
    const x2 = centerX + outerR * Math.cos(angle);
    const y2 = centerY + outerR * Math.sin(angle);
    const strokeWidth = isHourMark ? 2.5 : 0.8;
    const strokeColor = isHourMark ? '#2a2a2a' : '#808080';
    minuteMarkersSVG += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-linecap="round"/>`;
  }
  
  return `
    <svg class="clock-svg" viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bezelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#d4d4d4;stop-opacity:1" />
          <stop offset="25%" style="stop-color:#a8a8a8;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#e8e8e8;stop-opacity:1" />
          <stop offset="75%" style="stop-color:#9a9a9a;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#c8c8c8;stop-opacity:1" />
        </linearGradient>
        <radialGradient id="dialFace" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style="stop-color:#ffffff;stop-opacity:1" />
          <stop offset="70%" style="stop-color:#f5f5f5;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#e8e8e8;stop-opacity:1" />
        </radialGradient>
        <linearGradient id="steelHand" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#b0b0b0;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#2a2a2a;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#b0b0b0;stop-opacity:1" />
        </linearGradient>
        <radialGradient id="jewelGrad" cx="30%" cy="30%" r="70%">
          <stop offset="0%" style="stop-color:#f0f0f0;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#a8a8a8;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#606060;stop-opacity:1" />
        </radialGradient>
      </defs>
      <circle cx="70" cy="72" r="66" fill="rgba(0, 0, 0, 0.15)"/>
      <circle cx="70" cy="70" r="68" fill="url(#bezelGrad)" stroke="#a0a0a0" stroke-width="0.5"/>
      <circle cx="70" cy="70" r="65" fill="#c0c0c0" stroke="#989898" stroke-width="1"/>
      <circle cx="70" cy="70" r="63" fill="none" stroke="url(#bezelGrad)" stroke-width="3"/>
      <circle cx="70" cy="70" r="61.5" fill="none" stroke="#888888" stroke-width="0.5"/>
      <circle cx="70" cy="70" r="60" fill="url(#dialFace)" stroke="#d0d0d0" stroke-width="0.5"/>
      <circle cx="70" cy="70" r="59" fill="none" stroke="#e0e0e0" stroke-width="0.3"/>
      ${minuteMarkersSVG}
      ${numbersSVG}
      <g id="hour-hand-${clockId}" style="transform-origin: ${centerX}px ${centerY}px; transform: rotate(${hourAngle}deg); transition: transform 0.5s cubic-bezier(0.4, 0.0, 0.2, 1);">
        <path d="M ${centerX - 3.5},${centerY + 1} L ${centerX - 1.5},${centerY - 4} L ${centerX - 1.2},${centerY - 32} L ${centerX},${centerY - 33} L ${centerX + 1.2},${centerY - 32} L ${centerX + 1.5},${centerY - 4} L ${centerX + 3.5},${centerY + 1} Z" fill="rgba(0, 0, 0, 0.15)"/>
        <path d="M ${centerX - 3.5},${centerY} L ${centerX - 1.5},${centerY - 5} L ${centerX - 1.2},${centerY - 32} L ${centerX},${centerY - 33} L ${centerX + 1.2},${centerY - 32} L ${centerX + 1.5},${centerY - 5} L ${centerX + 3.5},${centerY} Z" fill="url(#steelHand)" stroke="#1a1a1a" stroke-width="0.5"/>
        <circle cx="${centerX}" cy="${centerY - 32}" r="1.5" fill="#c8e6c9" stroke="#1a1a1a" stroke-width="0.3"/>
      </g>
      <g id="minute-hand-${clockId}" style="transform-origin: ${centerX}px ${centerY}px; transform: rotate(${minuteAngle}deg); transition: transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);">
        <path d="M ${centerX - 2.2},${centerY + 1} L ${centerX - 1},${centerY - 10} L ${centerX - 0.8},${centerY - 50} L ${centerX},${centerY - 51.2} L ${centerX + 0.8},${centerY - 50} L ${centerX + 1},${centerY - 10} L ${centerX + 2.2},${centerY + 1} Z" fill="rgba(0, 0, 0, 0.15)"/>
        <path d="M ${centerX - 2.2},${centerY} L ${centerX - 1},${centerY - 10} L ${centerX - 0.8},${centerY - 50} L ${centerX},${centerY - 51.2} L ${centerX + 0.8},${centerY - 50} L ${centerX + 1},${centerY - 10} L ${centerX + 2.2},${centerY} Z" fill="url(#steelHand)" stroke="#1a1a1a" stroke-width="0.5"/>
        <circle cx="${centerX}" cy="${centerY - 50}" r="1.2" fill="#c8e6c9" stroke="#1a1a1a" stroke-width="0.3"/>
      </g>
      <g id="second-hand-${clockId}" style="transform-origin: ${centerX}px ${centerY}px; transform: rotate(${secondAngle}deg); transition: transform 0.05s linear;">
        <line x1="${centerX}" y1="${centerY}" x2="${centerX}" y2="${centerY + 12}" stroke="#cc0000" stroke-width="1.2" stroke-linecap="round"/>
        <line x1="${centerX}" y1="${centerY}" x2="${centerX}" y2="${centerY - secondLength}" stroke="#cc0000" stroke-width="1.2" stroke-linecap="round"/>
        <circle cx="${centerX}" cy="${centerY - secondLength}" r="1.5" fill="#cc0000"/>
        <circle cx="${centerX}" cy="${centerY + 8}" r="2.5" fill="#cc0000" stroke="#990000" stroke-width="0.5"/>
      </g>
      <circle cx="${centerX}" cy="${centerY}" r="6" fill="#b0b0b0" stroke="#808080" stroke-width="0.5"/>
      <circle cx="${centerX}" cy="${centerY}" r="5" fill="url(#jewelGrad)"/>
      <circle cx="${centerX}" cy="${centerY}" r="3.5" fill="#2a2a2a" stroke="#505050" stroke-width="0.3"/>
      <circle cx="${centerX}" cy="${centerY}" r="2.5" fill="#3a3a3a"/>
      <circle cx="${centerX - 0.8}" cy="${centerY - 0.8}" r="1" fill="#888888" opacity="0.6"/>
      <circle cx="70" cy="10" r="1.5" fill="#a0a0a0" stroke="#707070" stroke-width="0.3"/>
      <line x1="69" y1="10" x2="71" y2="10" stroke="#505050" stroke-width="0.3"/>
      <circle cx="70" cy="130" r="1.5" fill="#a0a0a0" stroke="#707070" stroke-width="0.3"/>
      <line x1="69" y1="130" x2="71" y2="130" stroke="#505050" stroke-width="0.3"/>
      <circle cx="10" cy="70" r="1.5" fill="#a0a0a0" stroke="#707070" stroke-width="0.3"/>
      <line x1="10" y1="69" x2="10" y2="71" stroke="#505050" stroke-width="0.3"/>
      <circle cx="130" cy="70" r="1.5" fill="#a0a0a0" stroke="#707070" stroke-width="0.3"/>
      <line x1="130" y1="69" x2="130" y2="71" stroke="#505050" stroke-width="0.3"/>
    </svg>
  `;
}

function getTimeInTimezone(timezone: string) {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    timeZone: timezone,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false
  };
  const formatter = new Intl.DateTimeFormat('en-US', options);
  const parts = formatter.formatToParts(now);
  
  const hours = parseInt(parts.find(p => p.type === 'hour')?.value || '0');
  const minutes = parseInt(parts.find(p => p.type === 'minute')?.value || '0');
  const seconds = parseInt(parts.find(p => p.type === 'second')?.value || '0');
  
  return { hours, minutes, seconds };
}

function getDateInTimezone(timezone: string): string {
  const options: Intl.DateTimeFormatOptions = {
    timeZone: timezone,
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  const formatter = new Intl.DateTimeFormat('fr-FR', options);
  return formatter.format(new Date());
}

export default function WorldClocksPage(): JSX.Element {
  const clockCounter = useRef(0);
  const [clocks, setClocks] = useState<ClockData[]>([]);
  const [selectedDate, setSelectedDate] = useState<SelectedDateInfo | null>(null);

  // ✅ URL de votre image locale dans le dossier public/images/
  const mapImageUrl = "/images/fuseaux-horaires.jpg";

  useEffect(() => {
    const createClockData = (city: typeof topRowCities[0]) => {
      const clockId = `clock-${clockCounter.current++}`;
      const time = getTimeInTimezone(city.timezone);
      const isDaytime = time.hours >= 6 && time.hours < 18;
      
      return {
        id: clockId,
        city: city.name,
        timezone: city.timezone,
        ...time,
        isDaytime
      };
    };

    const initialClocks = [
      ...topRowCities.map(createClockData),
      ...middleCities.map(createClockData),
      ...bottomRowCities.map(createClockData)
    ];
    
    setClocks(initialClocks);

    const interval = setInterval(() => {
      setClocks(prevClocks => 
        prevClocks.map(clock => {
          const time = getTimeInTimezone(clock.timezone);
          const isDaytime = time.hours >= 6 && time.hours < 18;
          return { ...clock, ...time, isDaytime };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!selectedDate) return;

    const interval = setInterval(() => {
      const time = getTimeInTimezone(selectedDate.timezone);
      setSelectedDate(prev => prev ? {
        ...prev,
        hours: time.hours,
        minutes: time.minutes,
        seconds: time.seconds
      } : null);
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedDate?.timezone]);

  const handleClockClick = (city: string, timezone: string) => {
    const time = getTimeInTimezone(timezone);
    const dateString = getDateInTimezone(timezone);
    setSelectedDate({
      city,
      timezone,
      dateString,
      ...time
    });
  };

  const topClocks = clocks.slice(0, 4);
  const middleClocks = clocks.slice(4, 8);
  const bottomClocks = clocks.slice(8, 12);

  return (
    <>
      {/* Carte du monde en arrière-plan avec image locale */}
      <div 
        className="map-container" 
        style={{ 
          backgroundImage: `url('${mapImageUrl}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      <header>
        <h1>Fuseaux Horaires Mondiaux</h1>
      </header>

      <div className="container">
        <div className="main-content">
          <div className="top-row">
            {topClocks.map(clock => (
              <div 
                key={clock.id} 
                className={`clock-item ${clock.isDaytime ? 'daytime' : 'nighttime'}`}
                data-timezone={clock.timezone}
                data-clock-id={clock.id}
                onClick={() => handleClockClick(clock.city, clock.timezone)}
                role="button"
                tabIndex={0}
              >
                <div className="day-night-indicator">{clock.isDaytime ? '☀️' : '🌙'}</div>
                <div dangerouslySetInnerHTML={{ 
                  __html: createClockSVG(clock.hours, clock.minutes, clock.seconds, clock.id) 
                }} />
                <div className="city-name">{clock.city}</div>
              </div>
            ))}
          </div>

          <div className="middle-row">
            {middleClocks.map(clock => (
              <div 
                key={clock.id} 
                className={`clock-item ${clock.isDaytime ? 'daytime' : 'nighttime'}`}
                data-timezone={clock.timezone}
                data-clock-id={clock.id}
                onClick={() => handleClockClick(clock.city, clock.timezone)}
                role="button"
                tabIndex={0}
              >
                <div className="day-night-indicator">{clock.isDaytime ? '☀️' : '🌙'}</div>
                <div dangerouslySetInnerHTML={{ 
                  __html: createClockSVG(clock.hours, clock.minutes, clock.seconds, clock.id) 
                }} />
                <div className="city-name">{clock.city}</div>
              </div>
            ))}
          </div>

          <div className="bottom-row">
            {bottomClocks.map(clock => (
              <div 
                key={clock.id} 
                className={`clock-item ${clock.isDaytime ? 'daytime' : 'nighttime'}`}
                data-timezone={clock.timezone}
                data-clock-id={clock.id}
                onClick={() => handleClockClick(clock.city, clock.timezone)}
                role="button"
                tabIndex={0}
              >
                <div className="day-night-indicator">{clock.isDaytime ? '☀️' : '🌙'}</div>
                <div dangerouslySetInnerHTML={{ 
                  __html: createClockSVG(clock.hours, clock.minutes, clock.seconds, clock.id) 
                }} />
                <div className="city-name">{clock.city}</div>
              </div>
            ))}
          </div>

          {selectedDate && (
            <div className="date-display">
              <div className="date-content">
                <div className="date-label">Date et heure à {selectedDate.city}</div>
                <div className="date-value">{selectedDate.dateString}</div>
                <div className="time-value">
                  {String(selectedDate.hours).padStart(2, '0')}:
                  {String(selectedDate.minutes).padStart(2, '0')}:
                  {String(selectedDate.seconds).padStart(2, '0')}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;600;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', 'Segoe UI', 'Roboto', sans-serif;
          background-color: #f8f8f8;
          color: #2a2a2a;
          padding: 0;
          margin: 0;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Carte du monde en arrière-plan avec image */
        .map-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          overflow: hidden;
          pointer-events: none;
          opacity: 0.08;
          filter: grayscale(30%);
        }

        @media (prefers-color-scheme: dark) {
          .map-container {
            opacity: 0.05;
            filter: grayscale(30%) brightness(0.7);
          }
        }

        header {
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.95) 0%, rgba(249, 249, 249, 0.95) 100%);
          padding: 40px 20px 60px;
          text-align: center;
          border-bottom: 1px solid #d0d0d0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
          position: relative;
          backdrop-filter: blur(5px);
        }

        header::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 3px;
          background: linear-gradient(to right, transparent, #1a1a1a, transparent);
        }

        h1 {
          font-family: 'Playfair Display', 'Georgia', serif;
          font-size: 46px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0;
          letter-spacing: 1.5px;
          text-transform: none;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          line-height: 1.3;
          position: relative;
          display: inline-block;
        }

        h1::before {
          content: '';
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 2px;
          background: linear-gradient(to right, transparent, #1a1a1a, transparent);
        }

        @media (prefers-color-scheme: dark) {
          header {
            background: linear-gradient(to bottom, rgba(31, 33, 33, 0.95) 0%, rgba(26, 28, 28, 0.95) 100%);
            border-bottom: 1px solid #3a3a3a;
          }

          header::after {
            background: linear-gradient(to right, transparent, #f5f5f5, transparent);
          }

          h1 {
            color: #f5f5f5;
            text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
          }

          h1::before {
            background: linear-gradient(to right, transparent, #f5f5f5, transparent);
          }
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 60px 20px;
          position: relative;
        }

        .main-content {
          position: relative;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          z-index: 1;
        }

        .top-row {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 50px;
          margin-bottom: 60px;
        }

        .middle-row {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 50px;
          margin-bottom: 60px;
        }

        .bottom-row {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 50px;
        }

        .clock-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          padding: 24px;
          border-radius: 16px;
          transition: all 0.5s ease;
          position: relative;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(208, 208, 208, 0.3);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        
        .clock-item:hover {
          transform: translateY(-4px);
          background: rgba(255, 255, 255, 0.85);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
        }
        
        .clock-item.daytime {
          background: rgba(245, 245, 245, 0.7);
        }
        
        .clock-item.nighttime {
          background: rgba(42, 42, 58, 0.7);
        }
        
        .clock-item.nighttime:hover {
          background: rgba(42, 42, 58, 0.85);
        }
        
        .clock-item.nighttime .city-name {
          color: #ffffff;
        }
        
        .day-night-indicator {
          position: absolute;
          top: 8px;
          right: 8px;
          font-size: 20px;
          opacity: 0.9;
          transition: opacity 0.3s ease;
        }
        
        .clock-item:hover .day-night-indicator {
          opacity: 1;
        }

        .clock-svg {
          width: 140px;
          height: 140px;
          filter: drop-shadow(0 4px 16px rgba(0, 0, 0, 0.15));
          transition: transform 0.3s ease;
        }

        .clock-item:hover .clock-svg {
          transform: scale(1.05);
        }

        .city-name {
          font-size: 16px;
          font-weight: 600;
          color: #3a3a3a;
          text-align: center;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .date-display {
          margin-top: 80px;
          display: flex;
          justify-content: center;
          opacity: 0;
          animation: fadeIn 0.5s ease forwards;
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }

        .date-content {
          background: linear-gradient(to bottom, #ffffff 0%, #f9f9f9 100%);
          padding: 30px 50px;
          border-radius: 16px;
          border: 1px solid #d0d0d0;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
          text-align: center;
          min-width: 300px;
          max-width: 90%;
          backdrop-filter: blur(10px);
        }

        .date-label {
          font-family: 'Playfair Display', serif;
          font-size: 18px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 12px;
          letter-spacing: 0.5px;
        }

        .date-value {
          font-size: 20px;
          font-weight: 600;
          color: #3a3a3a;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }

        .time-value {
          font-size: 28px;
          font-weight: 700;
          color: #1a1a1a;
          font-family: 'Playfair Display', serif;
          letter-spacing: 1px;
        }

        @media (prefers-color-scheme: dark) {
          .date-content {
            background: linear-gradient(to bottom, #1f2121 0%, #1a1c1c 100%);
            border: 1px solid #3a3a3a;
          }

          .date-label {
            color: #f5f5f5;
          }

          .date-value {
            color: #e0e0e0;
          }

          .time-value {
            color: #f5f5f5;
          }

          .clock-item {
            background: rgba(31, 33, 33, 0.7);
            border: 1px solid rgba(58, 58, 58, 0.3);
          }

          .clock-item:hover {
            background: rgba(31, 33, 33, 0.85);
          }

          .clock-item.daytime {
            background: rgba(26, 28, 28, 0.7);
          }

          .clock-item.daytime:hover {
            background: rgba(26, 28, 28, 0.85);
          }
        }

        @media (max-width: 768px) {
          .container {
            padding: 40px 15px;
          }

          header {
            padding: 40px 20px 30px;
          }

          h1 {
            font-size: 32px;
            letter-spacing: 1px;
          }

          h1::before {
            top: -12px;
            width: 50px;
          }

          .top-row,
          .middle-row,
          .bottom-row {
            flex-wrap: wrap;
            gap: 35px;
          }

          .clock-svg {
            width: 100px;
            height: 100px;
          }

          .city-name {
            font-size: 14px;
          }

          .date-content {
            padding: 20px 30px;
          }

          .date-label {
            font-size: 16px;
          }

          .date-value {
            font-size: 18px;
          }

          .time-value {
            font-size: 24px;
          }
        }
      `}</style>
    </>
  );
}
