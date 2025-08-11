import React from 'react';
import { Star } from 'lucide-react';
import type { Language, MosqueConfig } from '../types/prayer';
import { translations } from '../config/translations';

interface PrayerTimesHeaderProps {
  currentTime: Date;
  currentDate: string;
  currentMosque: MosqueConfig;
  language: Language;
  arabicStyleCentered: React.CSSProperties;
  arabicStyle: React.CSSProperties;
}

export default function PrayerTimesHeader({
  currentTime,
  currentDate,
  currentMosque,
  language,
  arabicStyleCentered,
  arabicStyle
}: PrayerTimesHeaderProps) {
  const currentTranslations = translations[language];

  return (
    <div className="relative overflow-hidden">
      {/* Fond avec motifs islamiques */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-800 via-orange-700 to-red-800"></div>
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Motifs décoratifs d'arrière-plan */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-16 left-8">
          <Star className="w-4 h-4 md:w-8 md:h-8 text-amber-400 transform rotate-12 animate-twinkle" />
        </div>
        <div className="absolute top-32 right-8">
          <Star className="w-3 h-3 md:w-6 md:h-6 text-orange-400 transform -rotate-45 animate-twinkle" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-3 py-4 md:px-4 md:py-8">
        {/* Titre compact */}
        <div className="text-center mb-4 pt-4 md:pt-16">
          {/* Dôme décoratif */}
          <div className="flex justify-center mb-3 md:mb-6">
            <div className="relative">
              <div className="w-20 h-10 md:w-32 md:h-16 bg-gradient-to-b from-amber-300 to-amber-500 rounded-t-full opacity-80 shadow-2xl border-2 md:border-4 border-amber-200"></div>
              <div className="absolute -top-2 md:-top-3 left-1/2 transform -translate-x-1/2 w-6 h-3 md:w-8 md:h-4 bg-gradient-to-b from-orange-400 to-orange-600 rounded-t-full border-2 border-orange-300"></div>
              <div className="absolute -top-4 md:-top-6 left-1/2 transform -translate-x-1/2 w-3 h-3 md:w-4 md:h-4 border-2 border-amber-300 rounded-full border-b-transparent border-r-transparent rotate-45"></div>
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2 md:mb-4 drop-shadow-lg" style={arabicStyleCentered}>
            {currentTranslations.title}
          </h1>
          
          <p className="text-amber-100 text-sm md:text-xl mb-2 md:mb-4 px-2" style={arabicStyleCentered}>
            {currentTranslations.subtitle}
          </p>

          {/* Affichage de la mosquée actuelle */}
          <div className="inline-flex items-center space-x-2 bg-yellow-500 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/30">
            <span className="text-gray-900 font-bold text-md" style={arabicStyle}>
              {currentMosque.name[language]}
            </span>
          </div>
        </div>

        {/* Heure */}
        <div className="relative bg-white/10 backdrop-blur-md rounded-2xl md:rounded-3xl p-3 md:p-6 text-center border-2 md:border-4 border-amber-400/30 shadow-2xl">
          <div className="bg-gradient-to-br from-amber-700/20 to-orange-700/20 rounded-xl md:rounded-2xl p-3 md:p-6 border border-amber-300/20 relative">
            {/* Coins décoratifs */}
            <div className="absolute top-1 left-1 md:top-2 md:left-2 w-3 h-3 md:w-4 md:h-4 border-t-2 border-l-2 border-amber-300/60"></div>
            <div className="absolute top-1 right-1 md:top-2 md:right-2 w-3 h-3 md:w-4 md:h-4 border-t-2 border-r-2 border-amber-300/60"></div>
            <div className="absolute bottom-1 left-1 md:bottom-2 md:left-2 w-3 h-3 md:w-4 md:h-4 border-b-2 border-l-2 border-amber-300/60"></div>
            <div className="absolute bottom-1 right-1 md:bottom-2 md:right-2 w-3 h-3 md:w-4 md:h-4 border-b-2 border-r-2 border-amber-300/60"></div>

            <span className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold text-white drop-shadow-2xl font-mono">
              {currentTime.toLocaleTimeString(language === 'ar' ? 'ar-DZ' : 'fr-FR', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
              })}
            </span>
            <div className="mt-2 md:mt-4 text-sm sm:text-lg md:text-xl lg:text-2xl font-semibold text-amber-100 transition-all duration-500" style={arabicStyleCentered}>
              {currentDate}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}