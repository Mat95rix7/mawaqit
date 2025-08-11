import { useState, useEffect } from 'react';
import type { PrayerTimes, MosqueData, Language } from '../types/prayer';
import { mosqueesConfig } from '../config/mosques';

export function usePrayerTimes(selectedMosque: string, language: Language) {
  const [nextPrayer, setNextPrayer] = useState<string>('');

  // Obtenir les données du jour actuel selon la mosquée sélectionnée
  const currentMosqueData = mosqueesConfig[selectedMosque].data;
  const today = new Date();
  const monthIndex = today.getMonth();
  const day = today.getDate();

  const monthData = currentMosqueData.calendar[monthIndex];
  const dayTimes = monthData ? (monthData as Record<string, string[]>)[day.toString()] : null;
  
  const todayData: MosqueData | undefined = dayTimes
    ? {
        city: mosqueesConfig[selectedMosque].city[language],
        prayers: {
          Fajr: dayTimes[0],
          Chorouk: dayTimes[1],
          Dhuhr: dayTimes[2],
          Asr: dayTimes[3],
          Maghrib: dayTimes[4],
          Isha: dayTimes[5],
        }
      }
    : undefined;

  // Calculer la prochaine prière
  useEffect(() => {
    if (!todayData?.prayers) return;
    
    const now = new Date();
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
  }, [todayData?.prayers]);

  return {
    todayData,
    nextPrayer,
    currentMosque: mosqueesConfig[selectedMosque]
  };
}