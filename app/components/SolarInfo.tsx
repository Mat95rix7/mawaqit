import React from 'react';
import { Sun, Sunrise, Sunset } from 'lucide-react';
import { translations } from '../config/translations';
import type { Language } from '../types/prayer';

interface SolarInfoProps {
  sunriseTime: string;
  sunsetTime: string;
  language: Language;
  arabicStyleCentered: React.CSSProperties;
}

export default function SolarInfo({ sunriseTime, sunsetTime, language, arabicStyleCentered }: SolarInfoProps) {
  const currentTranslations = translations[language];

  return (
    <div className="mt-4 md:mt-8">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-2xl border-2 md:border-4 border-amber-200/50 relative">
        {/* Desktop: titre visible */}
        <div className="hidden sm:block text-center mb-6 relative z-10">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl px-6 py-3 shadow-xl border-2 border-amber-300">
            <Sun className="w-8 h-8 text-white" />
            <h2 className="text-2xl font-bold text-white" style={arabicStyleCentered}>
              {currentTranslations.solarInfo}
            </h2>
          </div>
        </div>
        
        {/* Layout adaptatif pour lever/coucher */}
        <div className="grid grid-cols-2 gap-3 md:gap-6">
          {/* Lever du soleil */}
          <div className="relative">
            {/* Layout mobile en row */}
            <div className="sm:hidden">
              <div className="flex items-center justify-between bg-gradient-to-br from-amber-400 via-orange-400 to-pink-500 rounded-2xl p-3 text-white shadow-2xl border-2 border-orange-200/50">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Sunrise className="w-5 h-5 text-white" />
                  </div>
                </div>
                <span className="font-bold text-lg font-mono">{sunriseTime}</span>
              </div>
            </div>
            {/* Layout desktop en colonne */}
            <div className="hidden sm:block text-center">
              <div className="bg-gradient-to-br from-amber-400 via-orange-400 to-pink-500 rounded-3xl py-6 px-2 text-white shadow-2xl border-4 border-orange-200/50 transform hover:scale-105 transition-all duration-300">
                <div className="bg-white/20 rounded-2xl py-2 mb-4 border border-white/30">
                  <div className="flex items-center justify-center mb-2">
                    <Sunrise className="w-8 h-8 text-white" />
                    <h3 className="text-xl font-bold ml-2" style={arabicStyleCentered}>
                      {currentTranslations.sunrise}
                    </h3>
                  </div>
                  <p className="text-2xl lg:text-4xl font-bold font-mono">{sunriseTime}</p>
                </div>
                <div className="w-16 h-8 border-b-2 border-white/40 rounded-b-full mx-auto"></div>
              </div>
            </div>
          </div>
          
          {/* Coucher du soleil */}
          <div className="relative">
            {/* Layout mobile en row */}
            <div className="sm:hidden">
              <div className="flex items-center justify-between bg-gradient-to-br from-red-500 via-pink-500 to-purple-600 rounded-2xl p-3 text-white shadow-2xl border-2 border-red-200/50">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Sunset className="w-5 h-5 text-white" />
                  </div>
                </div>
                <span className="font-bold text-lg font-mono">{sunsetTime}</span>
              </div>
            </div>
            {/* Layout desktop en colonne */}
            <div className="hidden sm:block text-center">
              <div className="bg-gradient-to-br from-red-500 via-pink-500 to-purple-600 rounded-3xl py-6 px-2 text-white shadow-2xl border-4 border-red-200/50 transform hover:scale-105 transition-all duration-300">
                <div className="bg-white/20 rounded-2xl py-2 mb-4 border border-white/30">
                  <div className="flex items-center justify-center mb-2">
                    <Sunset className="w-8 h-8 text-white" />
                    <h3 className="text-xl font-bold ml-2" style={arabicStyleCentered}>
                      {currentTranslations.sunset}
                    </h3>
                  </div>
                  <p className="text-2xl lg:text-4xl font-bold font-mono">{sunsetTime}</p>
                </div>
                <div className="w-16 h-8 border-b-2 border-white/40 rounded-b-full mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}