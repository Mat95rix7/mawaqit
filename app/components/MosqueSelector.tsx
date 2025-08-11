import React from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { mosqueesConfig } from '../config/mosques';
import { translations } from '../config/translations';
import type { Language, MosqueConfig } from '../types/prayer';

interface MosqueSelectorProps {
  selectedMosque: string;
  currentMosque: MosqueConfig;
  language: Language;
  showMosqueSelector: boolean;
  onToggle: () => void;
  onMosqueChange: (mosqueKey: string) => void;
  arabicStyle: React.CSSProperties;
  arabicStyleCentered: React.CSSProperties;
}

export default function MosqueSelector({
  selectedMosque,
  currentMosque,
  language,
  showMosqueSelector,
  onToggle,
  onMosqueChange,
  arabicStyle,
  arabicStyleCentered
}: MosqueSelectorProps) {
  const currentTranslations = translations[language];
  const isArabic = language === 'ar';

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="bg-amber-600/30 backdrop-blur-sm hover:bg-amber-500/40 text-white rounded-xl px-3 py-2 shadow-xl transition-all duration-300 border-2 border-amber-400/50 hover:border-amber-300/70 flex items-center space-x-2 h-10 md:h-12"
      >
        <MapPin className="w-4 h-4" />
        <span className="font-bold text-sm truncate max-w-20 md:max-w-none">
          {currentMosque.city[language]}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showMosqueSelector ? 'rotate-180' : ''}`} />
      </button>

      {showMosqueSelector && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-amber-200/50 z-30 overflow-hidden" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
          <div className="p-3 bg-amber-600 text-white" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
            <h3 className={`font-bold text-sm ${isArabic ? 'text-right' : 'text-left'}`} style={arabicStyleCentered}>
              {currentTranslations.selectMosque}
            </h3>
          </div>
          <div className="max-h-60 overflow-y-auto">
            {Object.entries(mosqueesConfig).map(([key, mosque]) => (
              <button
                key={key}
                onClick={() => onMosqueChange(key)}
                className={`w-full px-4 py-3 hover:bg-amber-300 transition-colors duration-200 border-b border-gray-100/50 ${
                  isArabic ? 'text-right' : 'text-left'
                } ${
                  selectedMosque === key 
                    ? `bg-amber-100 ${isArabic ?  'hover:border-r-4 hover:border-r-amber-500' : 'hover:border-l-4 hover:border-l-amber-500'}` 
                    : `${isArabic ? 'hover:border-r-4 hover:border-r-amber-500' : 'hover:border-l-4 hover:border-l-amber-500'}`
                }`}
              >
                <div className={`flex items-center ${isArabic ? 'flex-row-reverse justify-end gap-3' : 'gap-3'}`} style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
                  <div className={isArabic ? 'text-right' : 'text-left'}>
                    <div className="font-semibold text-gray-800 text-sm" style={arabicStyle}>
                      {mosque.name[language]}
                    </div>
                    <div className="text-xs text-gray-600" style={arabicStyle}>
                      {mosque.city[language]}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}