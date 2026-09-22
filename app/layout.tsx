import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';

const serifFont = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
});

const sansFont = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://soilawyers.com'),
  title: 'SIL - Society of Indian Lawyers',
  description:
    'The Society of Indian Lawyers (SIL) is a non-political, not-for-profit learned society committed to advancing the rule of law, legal education, and professional collaboration among members of the Indian and international legal fraternity.',
  keywords: [
    'Society of Indian Lawyers',
    'SIL',
    'Indian Bar',
    'Chandigarh Lawyers',
    'Legal Society India',
    'Rule of Law',
    'Legal Education',
    'Pro Bono Justice',
  ],
  authors: [{ name: 'Society of Indian Lawyers (SIL)' }],
  openGraph: {
    title: 'SIL - Society of Indian Lawyers',
    description:
      'Advancing the rule of law, legal education, and professional collaboration across Indian and international jurisdictions.',
    url: 'https://soilawyers.com',
    siteName: 'SIL',
    images: [
      {
        url: '/images/hero_law.jpg',
        width: 1563,
        height: 1563,
        alt: 'Society of Indian Lawyers Emblem',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SIL - Society of Indian Lawyers',
    description:
      'Advancing the rule of law, legal education, and professional collaboration among members of the Indian and international legal fraternity.',
    images: ['/images/hero_law.jpg'],
  },
  icons: {
    icon: '/images/logo_sil.png',
    apple: '/images/logo_sil.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" className={`${serifFont.variable} ${sansFont.variable} scroll-smooth`}>
      <body className="bg-legal-950 text-slate-100 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
