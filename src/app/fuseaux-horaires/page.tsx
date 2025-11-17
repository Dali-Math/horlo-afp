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
  // Convertir les heures 24h en 12h
  const hours12 = time.hours % 12;

  // Calculer les angles des aiguilles
  const secondAngle = time.seconds * 6;
  const minuteAngle = time.minutes * 6 + time.seconds * 0.1;
  const hourAngle = hours12 * 30 + time.minutes * 0.5 + time.seconds * 0.00833;
  return (
    <div onClick={onClick} className="flex flex-col items-center cursor-pointer transition-transform hover:scale-105">
      <div
        className="relative w-36 h-36 rounded-full shadow-lg transition-colors"
