'use client';

import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import { ErrorBoundary } from '../components/error-boundary';
import { Footer } from '../components/layout/footer';
import { Navbar } from '../components/layout/navbar';
import { ScrollAnimations } from '../components/scroll-animations';
import './globals.css';
import './styles/animations.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-black text-white font-sans antialiased">
        <ErrorBoundary>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <ScrollAnimations />
          <Toaster position="bottom-right" />
        </ErrorBoundary>
      </body>
    </html>
  );
}
