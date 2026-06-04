import type { Metadata } from 'next';
import './globals.css';
import LenisProvider from '@/lib/lenis';
import dynamic from 'next/dynamic';
import ScrollProgress from '@/components/ScrollProgress';
import BackToTop from '@/components/BackToTop';
import Loader from '@/components/Loader';

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
