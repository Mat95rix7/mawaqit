import React from 'react';
import type { Language } from '../types/prayer';

interface LanguageToggleProps {
  language: Language;
  onToggle: () => void;
  arabicStyleCentered: React.CSSProperties;
}

export default function LanguageToggle({ language, onToggle, arabicStyleCentered }: LanguageToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="bg-amber-600/30 backdrop-blur-sm hover:bg-amber-500/40 text-white rounded-xl px-10 py-2 shadow-xl transition-all duration-300 border-2 border-amber-400/50 hover:border-amber-300/70 h-10 md:h-12 flex items-center justify-center"
    >
      <span className="font-bold text-sm md:text-lg" style={arabicStyleCentered}>
        {language === 'fr' ? 'عربي' : 'FR'}
      </span>
    </button>
  );
}