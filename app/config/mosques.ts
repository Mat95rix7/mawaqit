import type { MosqueConfig } from '../types/prayer';

// Import des données de mosquées
import vaurealData from '../data/vaureal.json'
import sidiKhaledData from '../data/sidi_khaled.json'
import ermontData from '../data/eaubonne.json'
import algerData from '../data/alger.json'
import oranData from '../data/oran.json'

export const mosqueesConfig: Record<string, MosqueConfig> = {
  vaureal: {
    name: {
      fr: 'Mosquée de Vauréal',
      ar: 'مسجد فوريال'
    },
    city: {
      fr: 'Vauréal',
      ar: 'فوريال'
    },
    data: vaurealData as { calendar: Record<string, string[]>[] }
  },
  sidiKhaled: {
    name: {
      fr: 'Mosquée de Sidi-Khaled',
      ar: 'مسجد سيدي خالد'
    },
    city: {
      fr: 'Sidi Khaled',
      ar: 'سيدي خالد'
    },
    data: sidiKhaledData as { calendar: Record<string, string[]>[] }
  },
  alger: {
    name: {
      fr: 'Mosquée d\'Alger',
      ar: 'مسجد الجزائر '
    },
    city: {
      fr: 'Alger',
      ar: 'الجزائر '
    },
    data: algerData as { calendar: Record<string, string[]>[] }
  },
  oran: {
    name: {
      fr: 'Mosquée d\'Oran',
      ar: 'مسجد وهران '
    },
    city: {
      fr: 'Oran',
      ar: 'وهران '
    },
    data: oranData as { calendar: Record<string, string[]>[] }
  },
    eaubonne: {
    name: {
      fr: 'Mosquée d\'Eaubonne',
      ar: 'مسجد إوبون'
    },
    city: {
      fr: 'Eaubonne',
      ar: 'إوبون'
    },
    data: ermontData as { calendar: Record<string, string[]>[] }
  },
};