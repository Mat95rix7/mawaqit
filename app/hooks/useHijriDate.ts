import { useState, useEffect } from 'react';
import { getHijriDate } from '../utils/hidjri-date';
import type { Language } from '../types/prayer';

export function useHijriDate(language: Language) {
  const [showHijri, setShowHijri] = useState(false);
  const today = new Date();

  // Alterner la date affichée toutes les 3 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setShowHijri((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const hijriDate = getHijriDate(today);
  const gregorianDate = today.toLocaleDateString(language === 'ar' ? 'ar-DZ' : 'fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return {
    currentDate: showHijri ? hijriDate : gregorianDate,
    showHijri
  };
}