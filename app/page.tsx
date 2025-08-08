'use client';

import { useState, useEffect } from 'react';
import { Sun } from 'lucide-react';
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
    sunset: "Coucher du Soleil"
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
    sunset: "غروب الشمس"
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
    textAlign: language === 'ar' ? 'right' as const : 'left' as const,
    fontWeight: '500'
  };

  const containerStyle = {
    direction: language === 'ar' ? 'rtl' as const : 'ltr' as const,
  };

  // Fonction pour basculer la langue
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'fr' ? 'ar' : 'fr');
  };

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

  // Obtenir les données du jour actuel
  const today = new Date();
  const dateKey = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  // const todayData: DayData = (prayerData as any)[dateKey]
  const todayData: DayData = (prayerData as Record<string, DayData>)[dateKey]

  // Calculer la prochaine prière
  useEffect(() => {
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

    const nextPrayerName = prayers.find(prayer => prayer.time > currentTimeStr)?.name || 'Fajr';
    setNextPrayer(nextPrayerName);
  }, [currentTime, todayData.prayers]);

  // Dates
  const hijriDate = getHijriDate(today);
  const gregorianDate = today.toLocaleDateString(language === 'ar' ? 'ar-DZ' : 'fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const currentTranslations = translations[language];

  const prayerIcons: { [key: string]: 'fajr' | 'chorouk' | 'dhuhr' | 'asr' | 'maghrib' | 'isha' } = {
    Fajr: 'fajr',
    Chorouk: 'chorouk',
    Dhuhr: 'dhuhr',
    Asr: 'asr',
    Maghrib: 'maghrib',
    Isha: 'isha'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100" style={containerStyle}>
      {/* Bouton de changement de langue - Position fixe */}
      <div className="fixed top-4 z-50 right-4">
        <button
          onClick={toggleLanguage}
          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-3 shadow-lg transition-all duration-300 flex items-center space-x-2 border border-white/30"
        >
          <span className="font-semibold">
            {language === 'fr' ? 'عربي' : 'FR'}
          </span>
        </button>
      </div>

      {/* Header avec informations générales */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;80&quot; height=&quot;80&quot; viewBox=&quot;0 0 80 80&quot; fill=&quot;none&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Ccircle cx=&quot;40&quot; cy=&quot;40&quot; r=&quot;2.5&quot; fill=&quot;white&quot; fill-opacity=&quot;0.12&quot;/%3E%3Ccircle cx=&quot;20&quot; cy=&quot;20&quot; r=&quot;1.5&quot; fill=&quot;white&quot; fill-opacity=&quot;0.10&quot;/%3E%3Ccircle cx=&quot;60&quot; cy=&quot;60&quot; r=&quot;1.5&quot; fill=&quot;white&quot; fill-opacity=&quot;0.10&quot;/%3E%3Cpath d=&quot;M40 10 L44 20 L54 22 L46 28 L48 38 L40 32 L32 38 L34 28 L26 22 L36 20 Z&quot; fill=&quot;white&quot; fill-opacity=&quot;0.08&quot;/%3E%3C/svg%3E')] opacity-40 pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-4 py-6">
          <div className="text-center mb-8 pt-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center" style={arabicStyle}>
              {currentTranslations.title}
            </h1>
            <p className="text-blue-100 text-lg" style={arabicStyle}>
              {currentTranslations.subtitle}
            </p>
          </div>

          {/* Heure en grand et date alternante */}
          <div className='bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center'>
            <div className="flex flex-col items-center justify-center mb-4">
              <span className="text-6xl md:text-7xl font-mono font-bold text-white drop-shadow-lg">
                {currentTime.toLocaleTimeString(language === 'ar' ? 'ar-DZ' : 'fr-FR', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                })}
              </span>
              <span className="mt-2 text-lg md:text-xl font-semibold text-blue-100 transition-all duration-500" style={arabicStyle}>
                {showHijri
                  ? hijriDate
                  : gregorianDate}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Grille des prières */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
          <div className="grid grid-cols-5 gap-1 xs:gap-2 sm:gap-4 md:gap-6">
            {Object.entries(todayData.prayers)
              .filter(([prayer]) => prayer !== 'Chorouk')
              .map(([prayer, time]) => (
                <div key={prayer} className="min-w-0">
                  <PrayerCard
                    name={currentTranslations.prayerNames[prayer as keyof typeof currentTranslations.prayerNames]}
                    time={time}
                    isNext={prayer === nextPrayer}
                    icon={prayerIcons[prayer]}
                    language={language}
                  />
                </div>
              ))}
          </div>
        </div>

        {/* Informations supplémentaires */}
        <div className="mt-4 bg-white/60 backdrop-blur-sm rounded-3xl p-4 shadow-xl">
          <div className="flex items-center justify-center mb-6">
            <Sun className="w-8 h-8 text-orange-500 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800" style={arabicStyle}>
              {currentTranslations.solarInfo}
            </h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl p-4 text-white">
                <h3 className="text-lg font-semibold mb-2" style={arabicStyle}>
                  {currentTranslations.sunrise}
                </h3>
                <p className="text-3xl font-bold">{todayData.prayers.Chorouk}</p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-red-400 to-pink-600 rounded-2xl p-4 text-white">
                <h3 className="text-lg font-semibold mb-2" style={arabicStyle}>
                  {currentTranslations.sunset}
                </h3>
                <p className="text-3xl font-bold">{todayData.prayers.Maghrib}</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Import des polices arabes */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap');
      `}</style>
    </div>
  );
}