'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon, Star } from 'lucide-react';
import PrayerCard from '../components/PrayerCard';
import { getHijriDate } from '../utils/hidjri-date';
import prayerData from '../data/prayer-times.json';

interface PrayerTimes {
  Fajr: string;
  Chorouk: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

interface DayData {
  city: string;
  prayers: PrayerTimes;
}

// Traductions
const translations = {
  fr: {
    title: "Horaires de Prière",
    subtitle: "Restez connecté avec les moments sacrés de la journée",
    prayerNames: {
      Fajr: 'Fajr',
      Chorouk: 'Lever du Soleil',
      Dhuhr: 'Dhuhr',
      Asr: 'Asr',
      Maghrib: 'Maghrib',
      Isha: 'Isha'
    },
    solarInfo: "Informations Solaires",
    sunrise: "Lever du Soleil",
    sunset: "Coucher du Soleil",
    dataUnavailable: "Données de prière non disponibles pour aujourd'hui"
  },
  ar: {
    title: "مواقيت الصلاة",
    subtitle: "ابق متصلاً مع الله",
    prayerNames: {
      Fajr: 'الفجر',
      Chorouk: 'الشروق',
      Dhuhr: 'الظهر',
      Asr: 'العصر',
      Maghrib: 'المغرب',
      Isha: 'العشاء'
    },
    solarInfo: "معلومات شمسية",
    sunrise: "شروق الشمس",
    sunset: "غروب الشمس",
    dataUnavailable: "بيانات الصلاة غير متوفرة لهذا اليوم"
  }
};

export default function PrayerTimesPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextPrayer, setNextPrayer] = useState<string>('');
  const [showHijri, setShowHijri] = useState(false);
  const [language, setLanguage] = useState<'fr' | 'ar'>('fr');

  const arabicStyle = {
    fontFamily: "'Noto Sans Arabic', 'Cairo', 'Amiri', Arial, sans-serif",
    direction: language === 'ar' ? 'rtl' as const : 'ltr' as const,
    fontWeight: '500'
  };

  const arabicStyleCentered = {
    fontFamily: "'Noto Sans Arabic', 'Cairo', 'Amiri', Arial, sans-serif",
    direction: language === 'ar' ? 'rtl' as const : 'ltr' as const,
    textAlign: 'center' as const,
    fontWeight: '500'
  };

  const containerStyle = {
    direction: language === 'ar' ? 'rtl' as const : 'ltr' as const,
  };

  // Fonction pour basculer la langue
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'fr' ? 'ar' : 'fr');
  };

  // Obtenir les données du jour actuel
  const today = new Date();
  const dateKey = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const todayData: DayData | undefined = (prayerData as Record<string, DayData>)[dateKey];

  // Protection contre les données manquantes
  const currentTranslations = translations[language];

  // Mise à jour de l'heure toutes les secondes
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Alterner la date affichée toutes les 3 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setShowHijri((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Calculer la prochaine prière
  useEffect(() => {
    if (!todayData?.prayers) return;
    
    const now = currentTime;
    const currentTimeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    const prayers = [
      { name: 'Fajr', time: todayData.prayers.Fajr },
      { name: 'Chorouk', time: todayData.prayers.Chorouk },
      { name: 'Dhuhr', time: todayData.prayers.Dhuhr },
      { name: 'Asr', time: todayData.prayers.Asr },
      { name: 'Maghrib', time: todayData.prayers.Maghrib },
      { name: 'Isha', time: todayData.prayers.Isha },
    ];

    const nextPrayerFound = prayers.find(prayer => prayer.time > currentTimeStr);
    const nextPrayerName = nextPrayerFound ? nextPrayerFound.name : 'Fajr';
    setNextPrayer(nextPrayerName);
  }, [currentTime, todayData?.prayers]);

  if (!todayData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center" style={containerStyle}>
        <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border-4 border-amber-200/50">
          <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Moon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-amber-900 mb-4" style={arabicStyleCentered}>
            {currentTranslations.title}
          </h1>
          <p className="text-lg text-amber-700" style={arabicStyleCentered}>
            {currentTranslations.dataUnavailable}
          </p>
        </div>
      </div>
    );
  }

  // Dates
  const hijriDate = getHijriDate(today);
  const gregorianDate = today.toLocaleDateString(language === 'ar' ? 'ar-DZ' : 'fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const prayerIcons: Record<string, 'fajr' | 'chorouk' | 'dhuhr' | 'asr' | 'maghrib' | 'isha'> = {
    Fajr: 'fajr',
    Chorouk: 'chorouk',
    Dhuhr: 'dhuhr',
    Asr: 'asr',
    Maghrib: 'maghrib',
    Isha: 'isha'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50" style={containerStyle}>
      {/* Motifs décoratifs d'arrière-plan avec architecture orientale */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        {/* Arcs et dômes */}
        <div className="absolute top-10 left-10 w-32 h-16 border-4 border-amber-400 rounded-t-full"></div>
        <div className="absolute top-32 right-20 w-24 h-24 border-3 border-orange-400 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-40 h-20 border-2 border-red-300 rounded-t-full"></div>
        <div className="absolute bottom-40 right-10 w-20 h-20 border-4 border-amber-500 rounded-full"></div>
        
        {/* Minarets stylisés */}
        <div className="absolute top-1/4 left-1/4">
          <div className="w-2 h-32 bg-amber-400 mx-auto"></div>
          <div className="w-8 h-8 bg-orange-400 rounded-full -mt-2 mx-auto"></div>
          <div className="w-1 h-6 bg-amber-500 -mt-1 mx-auto"></div>
        </div>
        
        <div className="absolute top-1/3 right-1/3">
          <div className="w-2 h-24 bg-red-400 mx-auto"></div>
          <div className="w-6 h-6 bg-amber-400 rounded-full -mt-1 mx-auto"></div>
          <div className="w-1 h-4 bg-orange-500 mx-auto"></div>
        </div>

        {/* Étoiles décoratives */}
        <div className="absolute top-20 left-1/3">
          <Star className="w-8 h-8 text-amber-400 transform rotate-12 animate-twinkle" />
        </div>
        <div className="absolute top-60 right-1/4">
          <Star className="w-6 h-6 text-orange-400 transform -rotate-45 animate-twinkle" />
        </div>
        <div className="absolute bottom-32 left-1/2">
          <Star className="w-10 h-10 text-red-400 transform rotate-180 animate-twinkle" />
        </div>
      </div>

      {/* Header avec style oriental */}
      <div className="relative overflow-hidden">
        {/* Fond avec motifs islamiques */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-800 via-orange-700 to-red-800"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Motifs géométriques orientaux avec architecture */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" 
               style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M60 60c0-16.569-13.431-30-30-30s-30 13.431-30 30 13.431 30 30 30 30-13.431 30-30zm30 0c0-16.569-13.431-30-30-30s-30 13.431-30 30 13.431 30 30 30 30-13.431 30-30z'/%3E%3Cpath d='M60 15c0 8.284-6.716 15-15 15s-15-6.716-15-15S36.716 0 45 0s15 6.716 15 15zm30 0c0 8.284-6.716 15-15 15s-15-6.716-15-15S66.716 0 75 0s15 6.716 15 15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                 backgroundSize: '120px 120px'
               }}>
          </div>
        </div>

        {/* Arcs décoratifs dans le header */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-32 h-16 border-t-4 border-amber-300 rounded-t-full"></div>
          <div className="absolute top-0 right-1/4 w-32 h-16 border-t-4 border-orange-300 rounded-t-full"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-20 border-t-4 border-amber-400 rounded-t-full"></div>
          
          {/* Colonnes et piliers */}
          <div className="absolute bottom-0 left-10 w-3 h-20 bg-amber-300/30"></div>
          <div className="absolute bottom-0 left-20 w-3 h-24 bg-orange-300/30"></div>
          <div className="absolute bottom-0 right-10 w-3 h-20 bg-amber-300/30"></div>
          <div className="absolute bottom-0 right-20 w-3 h-24 bg-orange-300/30"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-8">
          {/* Bouton de langue avec style oriental */}
          <div className="absolute top-4 right-4 z-20">
            <button
              onClick={toggleLanguage}
              className="bg-amber-600/30 backdrop-blur-sm hover:bg-amber-500/40 text-white rounded-2xl px-4 py-3 shadow-xl transition-all duration-300 border-2 border-amber-400/50 hover:border-amber-300/70"
            >
              <span className="font-bold text-lg" style={arabicStyleCentered}>
                {language === 'fr' ? 'عربي' : 'FR'}
              </span>
            </button>
          </div>

          {/* Titre avec ornements et architecture */}
          <div className="text-center mb-8 pt-16">
            {/* Dôme décoratif au-dessus du titre */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                {/* Grand dôme central */}
                <div className="w-32 h-16 bg-gradient-to-b from-amber-300 to-amber-500 rounded-t-full opacity-80 shadow-2xl border-4 border-amber-200"></div>
                {/* Petit dôme au sommet */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-gradient-to-b from-orange-400 to-orange-600 rounded-t-full border-2 border-orange-300"></div>
                {/* Croissant au sommet */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-4 h-4 border-2 border-amber-300 rounded-full border-b-transparent border-r-transparent rotate-45"></div>
              </div>
            </div>

            {/* Arcs décoratifs autour du titre */}
            <div className="relative">
              <div className="absolute -top-8 left-1/4 w-24 h-12 border-t-4 border-amber-300/50 rounded-t-full"></div>
              <div className="absolute -top-8 right-1/4 w-24 h-12 border-t-4 border-amber-300/50 rounded-t-full"></div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg relative z-10" style={arabicStyleCentered}>
                {currentTranslations.title}
              </h1>
            </div>
            
            <p className="text-amber-100 text-xl mb-8" style={arabicStyleCentered}>
              {currentTranslations.subtitle}
            </p>

            {/* Arcade décorative */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                {/* Arc principal */}
                <div className="w-48 h-24 border-t-4 border-amber-300 rounded-t-full"></div>
                {/* Colonnes */}
                <div className="absolute bottom-0 left-0 w-3 h-8 bg-amber-400"></div>
                <div className="absolute bottom-0 right-0 w-3 h-8 bg-amber-400"></div>
                {/* Détails décoratifs */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-amber-300 rounded-full animate-pulse"></div>
                    <div className="w-12 h-0.5 bg-amber-300"></div>
                    <div className="w-4 h-4 bg-amber-400 rounded-full animate-pulse"></div>
                    <div className="w-12 h-0.5 bg-amber-300"></div>
                    <div className="w-3 h-3 bg-amber-300 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Heure avec cadre architectural oriental */}
          <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-6 text-center border-4 border-amber-400/30 shadow-2xl">
            {/* Minarets décoratifs sur les côtés */}
            <div className="absolute -top-4 left-8">
              <div className="w-2 h-12 bg-amber-400 mx-auto"></div>
              <div className="w-6 h-6 bg-orange-400 rounded-full -mt-1 mx-auto border-2 border-amber-300"></div>
              <div className="w-1 h-3 bg-amber-500 mx-auto"></div>
            </div>
            <div className="absolute -top-4 right-8">
              <div className="w-2 h-12 bg-amber-400 mx-auto"></div>
              <div className="w-6 h-6 bg-orange-400 rounded-full -mt-1 mx-auto border-2 border-amber-300"></div>
              <div className="w-1 h-3 bg-amber-500 mx-auto"></div>
            </div>

            {/* Arc décoratif au-dessus de l'heure */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-32 h-16 border-t-4 border-amber-300/40 rounded-t-full"></div>

            <div className="bg-gradient-to-br from-amber-700/20 to-orange-700/20 rounded-2xl p-6 border border-amber-300/20 relative">
              {/* Coins décoratifs */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-300/60"></div>
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-300/60"></div>
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-300/60"></div>
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-300/60"></div>

              <span className="text-6xl md:text-8xl font-bold text-white drop-shadow-2xl font-mono">
                {currentTime.toLocaleTimeString(language === 'ar' ? 'ar-DZ' : 'fr-FR', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: false
                })}
              </span>
              <div className="mt-4 text-xl md:text-2xl font-semibold text-amber-100 transition-all duration-500" style={arabicStyleCentered}>
                {showHijri ? hijriDate : gregorianDate}
              </div>
            </div>

            {/* Base architecturale */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-40 h-2 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-60"></div>
          </div>
        </div>
      </div>

      {/* Grille des prières avec style oriental */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-5 gap-2 sm:gap-4 md:gap-6">
          {Object.entries(todayData.prayers)
            .filter(([prayer]) => prayer !== 'Chorouk')
            .map(([prayer, time]) => {
              const prayerName = currentTranslations.prayerNames[prayer as keyof typeof currentTranslations.prayerNames];
              const prayerIcon = prayerIcons[prayer];
              
              return (
                <div key={prayer} className="min-w-0">
                  <PrayerCard
                    name={prayerName}
                    time={time}
                    isNext={prayer === nextPrayer}
                    icon={prayerIcon}
                    language={language}
                  />
                </div>
              );
            })}
        </div>

        {/* Section solaire avec architecture de mosquée */}
        <div className="mt-8 relative">
          {/* Dôme décoratif au-dessus */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <div className="w-20 h-10 bg-gradient-to-b from-amber-400 to-orange-500 rounded-t-full opacity-90 shadow-lg"></div>
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-gradient-to-b from-orange-500 to-red-500 rounded-t-full"></div>
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-3 h-3 border-2 border-amber-400 rounded-full border-b-transparent border-r-transparent rotate-45"></div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border-4 border-amber-200/50 relative">
            {/* Arcs décoratifs sur les côtés */}
            <div className="absolute top-4 left-4 w-16 h-8 border-t-2 border-amber-400/40 rounded-t-full"></div>
            <div className="absolute top-4 right-4 w-16 h-8 border-t-2 border-amber-400/40 rounded-t-full"></div>

            <div className="text-center mb-6 relative z-10">
              <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl px-6 py-3 shadow-xl border-2 border-amber-300">
                <Sun className="w-8 h-8 text-white" />
                <h2 className="text-2xl font-bold text-white" style={arabicStyleCentered}>
                  {currentTranslations.solarInfo}
                </h2>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center relative">
                {/* Mini minaret */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="w-1 h-6 bg-orange-400"></div>
                  <div className="w-3 h-3 bg-amber-400 rounded-full -mt-1 mx-auto"></div>
                </div>
                
                <div className="bg-gradient-to-br from-amber-400 via-orange-400 to-pink-500 rounded-3xl py-6 px-2 text-white shadow-2xl border-4 border-orange-200/50 transform hover:scale-105 transition-all duration-300">
                  <div className="bg-white/20 rounded-2xl py-2 mb-4 border-2 border-white/30">
                    <h3 className="text-sm md:text-xl font-bold mb-2" style={arabicStyleCentered}>
                      {currentTranslations.sunrise}
                    </h3>
                    <p className="text-xl md:text-4xl font-bold font-mono">{todayData.prayers.Chorouk}</p>
                  </div>
                  {/* Arc décoratif en bas */}
                  <div className="w-16 h-8 border-b-2 border-white/40 rounded-b-full mx-auto"></div>
                </div>
              </div>
              
              <div className="text-center relative">
                {/* Mini minaret */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="w-1 h-6 bg-red-400"></div>
                  <div className="w-3 h-3 bg-pink-400 rounded-full -mt-1 mx-auto"></div>
                </div>
                
                <div className="bg-gradient-to-br from-red-500 via-pink-500 to-purple-600 rounded-3xl py-6 px-2 text-white shadow-2xl border-4 border-red-200/50 transform hover:scale-105 transition-all duration-300">
                  <div className="bg-white/20 rounded-2xl py-2 mb-4 border-2 border-white/30">
                    <h3 className="text-sm md:text-xl font-bold mb-2" style={arabicStyleCentered}>
                      {currentTranslations.sunset}
                    </h3>
                    <p className="text-xl md:text-4xl font-bold font-mono">{todayData.prayers.Maghrib}</p>
                  </div>
                  {/* Arc décoratif en bas */}
                  <div className="w-16 h-8 border-b-2 border-white/40 rounded-b-full mx-auto"></div>
                </div>
              </div>
            </div>

            {/* Base architecturale */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-48 h-3 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-50 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Import des polices arabes */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap');
        
        /* Animation pour les étoiles décoratives */
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
        
        /* Effet de brillance sur les bordures */
        @keyframes shimmer {
          0% { box-shadow: 0 0 20px rgba(245, 158, 11, 0.3); }
          50% { box-shadow: 0 0 40px rgba(245, 158, 11, 0.6); }
          100% { box-shadow: 0 0 20px rgba(245, 158, 11, 0.3); }
        }
        
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}