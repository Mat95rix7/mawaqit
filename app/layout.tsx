// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Noto_Sans_Arabic, Cairo, Amiri } from 'next/font/google';

const noto = Noto_Sans_Arabic({ subsets: ['arabic'], weight: ['400', '500', '600', '700'] });
const cairo = Cairo({ subsets: ['arabic'], weight: ['400', '500', '600', '700'] });
const amiri = Amiri({ subsets: ['arabic'], weight: ['400', '700'] });

export const metadata: Metadata = {
  title: 'Mawaqity',
  description: 'Created by Mat95rix7',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${noto.className} ${cairo.className} ${amiri.className}`}>
      <body>{children}</body>
    </html>
  );
}
