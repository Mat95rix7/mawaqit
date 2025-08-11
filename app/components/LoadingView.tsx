import React from 'react';
import { Moon } from 'lucide-react';
import { translations } from '../config/translations';
import type { Language } from '../types/prayer';

interface LoadingViewProps {
  language: Language;
  containerStyle: React.CSSProperties;
  arabicStyleCentered: React.CSSProperties;
}

export default function LoadingView({ language, containerStyle, arabicStyleCentered }: LoadingViewProps) {
  const currentTranslations = translations[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center p-4" style={containerStyle}>
      <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border-4 border-amber-200/50 max-w-sm">
        <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
          <Moon className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-bold text-amber-900 mb-4" style={arabicStyleCentered}>
          {currentTranslations.title}
        </h1>
        <p className="text-base text-amber-700" style={arabicStyleCentered}>
          {currentTranslations.dataUnavailable}
        </p>
      </div>
    </div>
  );
}