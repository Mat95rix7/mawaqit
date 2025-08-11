import { useState } from 'react';
import type { Language } from '../types/prayer';

export function useLanguage(initialLanguage: Language = 'fr') {
  const [language, setLanguage] = useState<Language>(initialLanguage);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'fr' ? 'ar' : 'fr');
  };

  const getArabicStyle = () => ({
    fontFamily: "'Noto Sans Arabic', 'Cairo', 'Amiri', Arial, sans-serif",
    direction: language === 'ar' ? 'rtl' as const : 'ltr' as const,
    fontWeight: '500'
  });

  const getArabicStyleCentered = () => ({
    ...getArabicStyle(),
    textAlign: 'center' as const,
  });

  const getContainerStyle = () => ({
    direction: language === 'ar' ? 'rtl' as const : 'ltr' as const,
  });

  return {
    language,
    toggleLanguage,
    getArabicStyle,
    getArabicStyleCentered,
    getContainerStyle
  };
}