'use client';

import { PlayIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ButtonLink } from '../ui/button';

interface QuickInfoTile {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const quickInfoTiles: QuickInfoTile[] = [
  {
    title: '6 Kart Categories',
    description: 'From Bambino to DD2, we have karts for all ages and skill levels',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
      </svg>
    ),
  },
  {
    title: '25/50 Hour Plans',
    description: 'Flexible membership options for individuals and families',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
    ),
  },
  {
    title: 'Win a Kart!',
    description: 'Top racers can win complete karts, helmets, and more',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
    ),
  },
];

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const preloadImage = new globalThis.Image();
    preloadImage.src = '/images/facilities/PHOTO-2025-03-04-08-59-06.jpg';
    preloadImage.onload = () => setIsLoaded(true);
  }, []);

  return (
    <div className="relative min-h-screen" ref={ref}>
      {/* Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-black flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-600"></div>
        </div>
      )}

      {/* Dynamic Background with Parallax Effect */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        style={{ y, opacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black z-10"></div>
        <Image
          src="/images/facilities/PHOTO-2025-03-04-08-59-06.jpg"
          alt="Pilots Cup racing facility"
          fill
          priority
          className={`object-cover transition-opacity duration-1000 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          sizes="100vw"
          quality={90}
          onLoad={() => setIsLoaded(true)}
        />
      </motion.div>

      {/* Hero Content */}
      <div className="relative h-full container mx-auto px-4 flex flex-col items-center justify-center text-center min-h-screen z-20">
        <motion.h1 
          className="text-6xl md:text-8xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Pilots Cup
        </motion.h1>
        <motion.p 
          className="text-2xl md:text-3xl text-white mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="text-red-600 font-semibold">Ignite Your Racing Spirit</span>
        </motion.p>
        <motion.p 
          className="text-xl text-gray-300 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Rentals for All Ages • Membership Rewards • Race to Win!
        </motion.p>
        <motion.div 
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <ButtonLink
            href="/rentals"
            className="bg-red-600 hover:bg-red-700 text-xl px-8 py-4 rounded-lg transition-all hover:scale-105 group"
            aria-label="Book your kart now"
          >
            Book Your Kart
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </ButtonLink>
          <ButtonLink
            href="/membership"
            className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-xl px-8 py-4 rounded-lg transition-all flex items-center"
            aria-label="Join our membership program"
          >
            Join Now
            <PlayIcon className="w-5 h-5 ml-2" />
          </ButtonLink>
        </motion.div>

        {/* Quick Info Tiles */}
        <motion.div 
          className="absolute bottom-20 left-0 right-0 grid grid-cols-1 md:grid-cols-3 gap-6 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {quickInfoTiles.map((tile, index) => (
            <motion.div
              key={tile.title}
              className="bg-black/50 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-red-600/50 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
            >
              <div className="text-red-600 mb-4">{tile.icon}</div>
              <h3 className="text-white text-xl font-semibold mb-2">{tile.title}</h3>
              <p className="text-gray-300">{tile.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="w-6 h-10 border-2 border-red-600 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-red-600 rounded-full animate-scroll"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 