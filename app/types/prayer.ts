export interface PrayerTimes {
  Fajr: string;
  Chorouk: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

export interface MosqueData {
  city: string;
  prayers: PrayerTimes;
}

export interface MosqueConfig {
  name: {
    fr: string;
    ar: string;
  };
  city: {
    fr: string;
    ar: string;
  };
  data: {
    // calendar: Record<number, Record<string, string[]>>;
    calendar: Record<string, string[]>[];
  };
}

export type Language = 'fr' | 'ar';
export type PrayerName = keyof PrayerTimes;