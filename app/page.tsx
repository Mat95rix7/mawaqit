import { cookies } from 'next/headers';
import PrayerTimesPage from './components/PrayerTimes';

export default async function Page() {
  const cookieStore = await cookies();
  const selectedMosque = cookieStore.get('selectedMosque')?.value || 'vaureal';

  return <PrayerTimesPage initialMosque={selectedMosque} />;
}
