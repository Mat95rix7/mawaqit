'use client';

import { Sun, Moon, Sunrise, Sunset } from 'lucide-react';

interface PrayerCardProps {
  name: string;
  time: string;
  isNext: boolean;
  icon: 'fajr' | 'chorouk' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';
  language: "fr" | "ar";
}

const prayerIcons = {
  fajr: Moon,
  chorouk: Sunrise,
  dhuhr: Sun,
  asr: Sun,
  maghrib: Sunset,
  isha: Moon,
};

const prayerColors = {
  fajr: 'from-indigo-500 to-purple-600',
  chorouk: 'from-orange-400 to-pink-500',
  dhuhr: 'from-yellow-400 to-orange-500',
  asr: 'from-amber-400 to-orange-600',
  maghrib: 'from-red-400 to-pink-600',
  isha: 'from-blue-600 to-indigo-700',
};

export default function PrayerCard({ name, time, isNext, icon, language }: PrayerCardProps) {
  const IconComponent = prayerIcons[icon];
  const gradientColor = prayerColors[icon];

  // Style conditionnel basé sur la langue
  const containerStyle = {
    direction: language === 'ar' ? 'rtl' as const : 'ltr' as const,
    fontFamily: language === 'ar' ? "'Noto Sans Arabic', 'Cairo', 'Amiri', Arial, sans-serif" : 'inherit'
  };

  return (
    <div 
      className={`
        relative overflow-hidden rounded-xl sm:rounded-2xl 
        p-3 sm:p-4 md:p-6 
        transition-all duration-300 hover:scale-105 hover:shadow-2xl
        ${isNext 
          ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-xl ring-2 sm:ring-4 ring-emerald-200' 
          : 'bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white shadow-lg'
        }
      `}
      style={containerStyle}
    >
      
      <div className="flex items-center justify-center mb-2 sm:mb-3 md:mb-4">
        <div className={`
          p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl
          ${isNext ? 'bg-white/20' : `bg-gradient-to-br ${gradientColor}`}
        `}>
          <IconComponent className={`
            w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 
            ${isNext ? 'text-white' : 'text-white'}
          `} />
        </div>
      </div>
      
      <div className="text-center">
        <h3 className={`
          text-sm sm:text-base md:text-lg 
          font-bold mb-1 leading-tight
          ${isNext ? 'text-white' : 'text-gray-800'}
        `}>
          {name}
        </h3>
        <p className={`
          text-lg sm:text-xl md:text-2xl 
          font-bold
          ${isNext ? 'text-white' : 'text-gray-900'}
        `}>
          {time}
        </p>
      </div>
      
      {isNext && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
      )}
    </div>
  );
}