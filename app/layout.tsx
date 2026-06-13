import type { Metadata } from 'next';
import './globals.css';
import LenisProvider from '@/lib/lenis';
import dynamic from 'next/dynamic';
import ScrollProgress from '@/components/ScrollProgress';
import BackToTop from '@/components/BackToTop';
import Loader from '@/components/Loader';
import AnimatedBlobBackground from '@/components/AnimatedBlobBackground';

const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false });

export const metadata: Metadata = {
  title: 'Patel Om | Frontend Developer',
  description: 'Frontend Developer specializing in React.js, Next.js, Angular and Ionic. Building modern web experiences.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="futuristic-page-shell" aria-hidden="true">
          <div className="futuristic-ambient-orb orb-blue" />
          <div className="futuristic-ambient-orb orb-orange" />
          <div className="futuristic-ambient-grid" />
          <div className="futuristic-noise" />
        </div>
        <AnimatedBlobBackground />
        <LenisProvider>
          <Loader />
          <CustomCursor />
          <ScrollProgress />
          <BackToTop />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
