'use client';

import React, { useState, useEffect } from 'react';

interface Watch {
  city: string;
  timezone: string;
  utcOffset: number;
  row: 'top' | 'middle' | 'bottom';
}

const watches: Watch[] = [
  { city: 'New York', timezone: 'America/New_York', utcOffset: -5, row: 'top' },
  { city: 'London', timezone: 'Europe/London', utcOffset: 0, row: 'top' },
  { city: 'Tokyo', timezone: 'Asia/Tokyo', utcOffset: 9, row: 'top' },
  { city: 'Paris', timezone: 'Europe/Paris', utcOffset: 1, row: 'top' },
  { city: 'Sydney', timezone: 'Australia/Sydney', utcOffset: 11, row: 'middle' },
  { city: 'Moscow', timezone: 'Europe/Moscow', utcOffset: 3, row: 'middle' },
  { city: 'Bern', timezone: 'Europe/Zurich', utcOffset: 1, row: 'middle' },
  { city: 'Dubai', timezone: 'Asia/Dubai', utcOffset: 4, row: 'middle' },
  { city: 'Vienna', timezone: 'Europe/Vienna', utcOffset: 1, row: 'bottom' },
  { city: 'Moscow', timezone: 'Europe/Moscow', utcOffset: 3, row: 'bottom' },
  { city: 'Beijing', timezone: 'Asia/Shanghai', utcOffset: 8, row: 'bottom' },
  { city: 'Berlin', timezone: 'Europe/Berlin', utcOffset: 1, row: 'bottom' },
];

interface ClockTime {
  hours: number;
  minutes: number;
  seconds: number;
}

interface DayNightInfo {
  isDaytime: boolean;
  icon: string;
  bgColor: string;
  textColor: string;
}

const AnalogClock: React.FC<{ watch: Watch; time: ClockTime; dayNight: DayNightInfo; onClick: () => void }> = ({
  watch,
  time,
  dayNight,
  onClick,
}) => {
  const hours12 = time.hours % 12;
  const secondAngle = time.seconds * 6;
  const minuteAngle = time.minutes * 6 + time.seconds * 0.1;
  const hourAngle = hours12 * 30 + time.minutes * 0.5 + time.seconds * (0.5 / 60);

  const secondHandX = 70 + 50 * Math.cos(((secondAngle - 90) * Math.PI) / 180);
  const secondHandY = 70 + 50 * Math.sin(((secondAngle - 90) * Math.PI) / 180);
  const minuteHandX = 70 + 45 * Math.cos(((minuteAngle - 90) * Math.PI) / 180);
  const minuteHandY = 70 + 45 * Math.sin(((minuteAngle - 90) * Math.PI) / 180);
  const hourHandX = 70 + 30 * Math.cos(((hourAngle - 90) * Math.PI) / 180);
  const hourHandY = 70 + 30 * Math.sin(((hourAngle - 90) * Math.PI) / 180);

  return (
    <div onClick={onClick} className="flex flex-col items-center cursor-pointer transition-transform hover:scale-105">
      <div
        className="relative w-40 h-40 rounded-full shadow-2xl flex items-center justify-center"
        style={{
          backgroundColor: dayNight.bgColor,
          border: '5px solid #777777',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2), inset 0 2px 5px rgba(255,255,255,0.2)',
        }}
      >
        {/* Day/Night Icon */}
        <div className="absolute top-3 right-3 text-2xl">{dayNight.icon}</div>

        {/* SVG Clock Face */}
        <svg className="absolute w-full h-full" viewBox="0 0 140 140" style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.1))' }}>
          {/* Background */}
          <circle cx="70" cy="70" r="67" fill={dayNight.bgColor} stroke={dayNight.textColor} strokeWidth="1" opacity="0.1" />

          {/* Hour markers */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
            const angle = (i * 30) * (Math.PI / 180);
            const x1 = 70 + 58 * Math.cos(angle);
            const y1 = 70 + 58 * Math.sin(angle);
            const x2 = 70 + 63 * Math.cos(angle);
            const y2 = 70 + 63 * Math.sin(angle);
            return (
              <line
                key={`marker-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={dayNight.textColor}
                strokeWidth="2"
              />
            );
          })}

          {/* Numbers 1-12 */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => {
            const angle = ((num - 3) * 30) * (Math.PI / 180);
            const x = 70 + 50 * Math.cos(angle);
            const y = 70 + 50 * Math.sin(angle);
            return (
              <text
                key={`number-${num}`}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="16"
                fontWeight="600"
                fill={dayNight.textColor}
                fontFamily="Arial, sans-serif"
              >
                {num}
              </text>
            );
          })}

          {/* Hour hand */}
          <line x1="70" y1="70" x2={hourHandX} y2={hourHandY} stroke={dayNight.textColor} strokeWidth="5" strokeLinecap="round" />

          {/* Minute hand */}
          <line
            x1="70"
            y1="70"
            x2={minuteHandX}
            y2={minuteHandY}
            stroke={dayNight.textColor}
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Second hand - RED */}
          <line x1="70" y1="70" x2={secondHandX} y2={secondHandY} stroke="#cc0000" strokeWidth="2" strokeLinecap="round" />

          {/* Center dot */}
          <circle cx="70" cy="70" r="7" fill={dayNight.textColor} />
          <circle cx="70" cy="70" r="3" fill={dayNight.bgColor} />
        </svg>
      </div>
      <p className="mt-4 font-bold text-lg text-center" style={{ color: '#1a1a1a', minWidth: '120px' }}>
        {watch.city}
      </p>
    </div>
  );
};

export default function FuseauxHoraires() {
  const [times, setTimes] = useState<Map<string, ClockTime>>(new Map());
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      const newTimes = new Map<string, ClockTime>();

      watches.forEach((watch) => {
        const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
        const localTime = new Date(utcTime + watch.utcOffset * 60 * 60 * 1000);

        newTimes.set(watch.city + watch.timezone, {
          hours: localTime.getHours(),
          minutes: localTime.getMinutes(),
          seconds: localTime.getSeconds(),
        });
      });

      setTimes(newTimes);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  const getDayNightInfo = (hours: number): DayNightInfo => {
    const isDaytime = hours >= 6 && hours < 18;
    return {
      isDaytime,
      icon: isDaytime ? '☀️' : '🌙',
      bgColor: isDaytime ? '#ffffff' : '#2a2a3a',
      textColor: isDaytime ? '#000000' : '#ffffff',
    };
  };

  const handleWatchClick = (watch: Watch) => {
    const time = times.get(watch.city + watch.timezone);
    if (time) {
      const utcTime = new Date();
      utcTime.setUTCHours(utcTime.getUTCHours() + watch.utcOffset);

      const formatter = new Intl.DateTimeFormat('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      setSelectedCity(watch.city);
      setSelectedDate(formatter.format(utcTime));
    }
  };

  const topRow = watches.filter((w) => w.row === 'top');
  const middleRow = watches.filter((w) => w.row === 'middle');
  const bottomRow = watches.filter((w) => w.row === 'bottom');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f8f8] to-[#f0f0f0] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h1
          className="text-6xl font-bold text-center mb-20 text-[#1a1a1a]"
          style={{
            letterSpacing: '2px',
            fontFamily: "'Playfair Display', 'Montserrat', sans-serif",
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          Fuseaux Horaires Mondiaux
        </h1>

        {/* Top Row */}
        <div className="flex justify-center gap-20 mb-24 flex-wrap">
          {topRow.map((watch) => {
            const time = times.get(watch.city + watch.timezone) || { hours: 0, minutes: 0, seconds: 0 };
            const dayNight = getDayNightInfo(time.hours);
            return (
              <AnalogClock
                key={watch.city + watch.timezone}
                watch={watch}
                time={time}
                dayNight={dayNight}
                onClick={() => handleWatchClick(watch)}
              />
            );
          })}
        </div>

        {/* Middle Row */}
        <div className="flex justify-center gap-20 mb-24 flex-wrap">
          {middleRow.map((watch) => {
            const time = times.get(watch.city + watch.timezone) || { hours: 0, minutes: 0, seconds: 0 };
            const dayNight = getDayNightInfo(time.hours);
            return (
              <AnalogClock
                key={watch.city + watch.timezone}
                watch={watch}
                time={time}
                dayNight={dayNight}
                onClick={() => handleWatchClick(watch)}
              />
            );
          })}
        </div>

        {/* Bottom Row */}
        <div className="flex justify-center gap-20 mb-24 flex-wrap">
          {bottomRow.map((watch) => {
            const time = times.get(watch.city + watch.timezone) || { hours: 0, minutes: 0, seconds: 0 };
            const dayNight = getDayNightInfo(time.hours);
            return (
              <AnalogClock
                key={watch.city + watch.timezone}
                watch={watch}
                time={time}
                dayNight={dayNight}
                onClick={() => handleWatchClick(watch)}
              />
            );
          })}
        </div>

        {/* Date Modal */}
        {selectedDate && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-2xl p-8 max-w-md z-50 border border-gray-200">
            <p className="text-xl font-semibold text-[#1a1a1a]">{selectedCity}</p>
            <p className="text-3xl font-bold text-[#3a7ca5] mt-4 capitalize">{selectedDate}</p>
            <button
              onClick={() => {
                setSelectedCity(null);
                setSelectedDate(null);
              }}
              className="mt-6 w-full px-4 py-3 bg-[#3a7ca5] text-white rounded-lg hover:bg-[#2a5a8a] transition-all font-semibold"
            >
              Fermer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
