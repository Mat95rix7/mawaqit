'use client';
import React from 'react';
import { useCurrentTime } from '../hooks/useCurrentTime';
import { useLanguage } from '../hooks/useLanguage';
import { usePrayerTimes } from '../hooks/usePrayerTimes';
import { useMosqueSelector } from '../hooks/useMosqueSelector';
import { useHijriDate } from '../hooks/useHijriDate';

import PrayerTimesHeader from './PrayerTimesHeader';
import MosqueSelector from './MosqueSelector';
import LanguageToggle from './LanguageToggle';
import PrayerGrid from './PrayerGrid';
import SolarInfo from './SolarInfo';
import LoadingView from './LoadingView';

export default function PrayerTimesPage({ initialMosque }: { initialMosque: string }) {
  const currentTime = useCurrentTime();
  const { 
    language, 
    toggleLanguage, 
    getArabicStyle, 
    getArabicStyleCentered, 
    getContainerStyle, 
  } = useLanguage('fr');
  
  const {
    selectedMosque,
    showMosqueSelector,
    handleMosqueChange,
    toggleMosqueSelector,
    closeMosqueSelector,
  } = useMosqueSelector(initialMosque); // 👈 ici

  const { todayData, nextPrayer, currentMosque } = usePrayerTimes(selectedMosque, language);
  const { currentDate } = useHijriDate(language);

  const arabicStyle = getArabicStyle();
  const arabicStyleCentered = getArabicStyleCentered();
  const containerStyle = getContainerStyle();

  if (!todayData) {
    return (
      <LoadingView 
        language={language}
        containerStyle={containerStyle}
        arabicStyleCentered={arabicStyleCentered}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50" style={containerStyle}>
      {/* Header */}
      <div>
        <div className="relative max-w-7xl mx-auto">
          {/* Controls */}
          <div className="absolute top-2 left-2 md:top-4 md:left-4 z-20">
            <MosqueSelector
              selectedMosque={selectedMosque}
              currentMosque={currentMosque}
              language={language}
              showMosqueSelector={showMosqueSelector}
              onToggle={toggleMosqueSelector}
              onMosqueChange={handleMosqueChange}
              arabicStyle={arabicStyle}
              arabicStyleCentered={arabicStyleCentered}
            />
          </div>
          <div className="absolute top-2 right-2 md:top-4 md:right-4 z-20">
            <LanguageToggle
              language={language}
              onToggle={toggleLanguage}
              arabicStyleCentered={arabicStyleCentered}
            />
          </div>
        </div>
      
        <PrayerTimesHeader
          currentTime={currentTime}
          currentDate={currentDate}
          currentMosque={currentMosque}
          language={language}
          arabicStyleCentered={arabicStyleCentered}
          arabicStyle={arabicStyle}
        />
      </div>

      {/* Overlay pour fermer le sélecteur */}
      {showMosqueSelector && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={closeMosqueSelector}
        ></div>
      )}

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-3 py-4 md:px-4 md:py-8">
        <PrayerGrid
          prayers={todayData.prayers}
          nextPrayer={nextPrayer}
          language={language}
          arabicStyle={arabicStyle}
        />

        <SolarInfo
          sunriseTime={todayData.prayers.Chorouk}
          sunsetTime={todayData.prayers.Maghrib}
          language={language}
          arabicStyleCentered={arabicStyleCentered}
        />
      </div>
    </div>
  );
}
