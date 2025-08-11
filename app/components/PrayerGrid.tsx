import React from 'react';
import PrayerCard from './PrayerCard';
import { prayerIconsMapping, prayerIcons } from '../config/icons';
import { translations } from '../config/translations';
import type { PrayerTimes, Language } from '../types/prayer';

interface PrayerGridProps {
  prayers: PrayerTimes;
  nextPrayer: string;
  language: Language;
  arabicStyle: React.CSSProperties;
}

export default function PrayerGrid({ prayers, nextPrayer, language, arabicStyle }: PrayerGridProps) {
  const currentTranslations = translations[language];

  return (
    <div className="flex flex-col sm:grid sm:grid-cols-5 gap-2 md:gap-4 lg:gap-6">
      {Object.entries(prayers)
        .filter(([prayer]) => prayer !== 'Chorouk')
        .map(([prayer, time]) => {
          const prayerName = currentTranslations.prayerNames[prayer as keyof typeof currentTranslations.prayerNames];
          const prayerIcon = prayerIcons[prayer];
          
          return (
            <div key={prayer} className="w-full">
              {/* Layout mobile en row */}
              <div className="sm:hidden">
                <div className={`flex items-center justify-between p-3 rounded-2xl shadow-lg border-2 transition-all duration-300 ${
                  prayer === nextPrayer 
                    ? 'bg-gradient-to-r from-amber-400 to-orange-500 border-amber-300 text-white shadow-2xl transform scale-105' 
                    : 'bg-white/80 backdrop-blur-sm border-amber-200/50 text-amber-900 hover:shadow-xl hover:scale-102'
                }`}>
                  <div className={`flex items-center ${language === 'ar' ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      prayer === nextPrayer ? 'bg-white/20' : 'bg-amber-100'
                    }`}>
                      {(() => {
                        const IconComponent = prayerIconsMapping[prayer as keyof typeof prayerIconsMapping];
                        return <IconComponent className={`w-6 h-6 ${prayer === nextPrayer ? 'text-white' : 'text-amber-600'}`} />;
                      })()}
                    </div>
                    <span className="font-bold text-lg" style={arabicStyle}>
                      {prayerName}
                    </span>
                  </div>
                  <span className="font-bold text-xl font-mono">
                    {time}
                  </span>
                </div>
              </div>
              {/* Layout desktop utilisant PrayerCard */}
              <div className="hidden sm:block">
                <PrayerCard
                  name={prayerName}
                  time={time}
                  isNext={prayer === nextPrayer}
                  icon={prayerIcon}
                  language={language}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}