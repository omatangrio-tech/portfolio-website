import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/lib/lenis";
import Loader from "@/components/Loader";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Patel Om | Frontend Developer",
  description: "I'm Patel Om, a passionate Frontend Developer with 2.5 years of experience building modern, responsive web applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-background text-white font-sans`}>
        <LenisProvider>
          <Loader />
          <CustomCursor />
          <ScrollProgress />
          <Navbar />
          {children}
          <Footer />
          <BackToTop />
        </LenisProvider>
      </body>
    </html>
  );
}
