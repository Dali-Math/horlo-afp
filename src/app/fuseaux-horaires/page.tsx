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

interface HandCoordinates {
  x: number;
  y: number;
}

const calculateHandCoordinates = (angle: number, length: number): HandCoordinates => {
  const radians = (angle - 90) * (Math.PI / 180);
  return {
    x: 70 + length * Math.cos(radians),
    y: 70 + length * Math.sin(radians),
  };
};

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

  const hourHand = calculateHandCoordinates(hourAngle, 30);
  const minuteHand = calculateHandCoordinates(minuteAngle, 45);
  const secondHand = calculateHandCoordinates(secondAngle, 50);

  return (
    <div onClick={onClick} className="flex flex-col items-center cursor-pointer transition-transform hover:scale-105">
      <div
        className="relative w-36 h-36 rounded-full shadow-lg transition-colors"
        style={{
          backgroundColor: dayNight.bgColor,
          border: '3px solid #555555',
        }}
      >
        <div className="absolute top-2 right-2 text-xl">{dayNight.icon}</div>

        <svg className="w-full h-full" viewBox="0 0 140 140">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => {
            const angle = ((num - 3) * 30) * (Math.PI / 180);
            const x = 70 + 55 * Math.cos(angle);
            const y = 70 + 55 * Math.sin(angle);
            return (
              <text
                key={num}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="14"
                fontWeight="bold"
                fill={dayNight.textColor}
              >
                {num}
              </text>
            );
          })}

          {/* Hour hand */}
          <line
            x1="70"
            y1="70"
            x2={hourHand.x}
            y2={hourHand.y}
            stroke={dayNight.textColor}
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Minute hand */}
          <line
            x1="70"
            y1="70"
            x2={minuteHand.x}
            y2={minuteHand.y}
            stroke={dayNight.textColor}
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Second hand */}
          <line
            x1="70"
            y1="70"
            x2={secondHand.x}
            y2={secondHand.y}
            stroke="#cc0000"
            strokeWidth="1"
            strokeLinecap="round"
          />

          {/* Center dot */}
          <circle cx="70" cy="70" r="5" fill={dayNight.textColor} />
        </svg>
      </div>
      <p className="mt-3 font-bold text-lg" style={{ color: '#1a1a1a' }}>
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
      bgColor: isDaytime ? '#f5f5f5' : '#2a2a3a',
      textColor: isDaytime ? '#1a1a1a' : '#ffffff',
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
        <h1
          className="text-5xl font-bold text-center mb-16 text-[#1a1a1a]"
          style={{ letterSpacing: '1.5px', fontFamily: 'Playfair Display, Montserrat, sans-serif' }}
        >
          Fuseaux Horaires Mondiaux
        </h1>

        <div className="flex justify-center gap-16 mb-20 flex-wrap">
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

        <div className="flex justify-center gap-16 mb-20 flex-wrap">
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

        <div className="flex justify-center gap-16 mb-20 flex-wrap">
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

        {selectedDate && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-2xl p-6 max-w-md z-50">
            <p className="text-lg font-semibold text-[#1a1a1a]">{selectedCity}</p>
            <p className="text-2xl font-bold text-[#3a7ca5] mt-2">{selectedDate}</p>
            <button
              onClick={() => {
                setSelectedCity(null);
                setSelectedDate(null);
              }}
              className="mt-4 w-full px-4 py-2 bg-[#3a7ca5] text-white rounded hover:bg-[#2a5a8a] transition-colors"
            >
              Fermer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
