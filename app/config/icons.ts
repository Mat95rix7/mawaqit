import { Sun, Moon, Star, Sunrise, Sunset } from 'lucide-react';

export const prayerIconsMapping = {
  Fajr: Moon,
  Chorouk: Sunrise, 
  Dhuhr: Sun,
  Asr: Sun,
  Maghrib: Sunset,
  Isha: Moon,
};

export const prayerIcons: Record<string, 'fajr' | 'chorouk' | 'dhuhr' | 'asr' | 'maghrib' | 'isha'> = {
  Fajr: 'fajr',
  Chorouk: 'chorouk',
  Dhuhr: 'dhuhr',
  Asr: 'asr',
  Maghrib: 'maghrib',
  Isha: 'isha'
};