import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mawaqity',
  description: 'Created by Mat95rix7',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="font-sans" style={{ fontFamily: 'Inter, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
