'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ButtonLink } from '../ui/button';

interface KartCategory {
  id: string;
  name: string;
  tagline: string;
  ageRange: string;
  image: string;
  specs: {
    engine: string;
    power: string;
    topSpeed: string;
  };
}

const kartCategories: KartCategory[] = [
  {
    id: 'bambino',
    name: 'Bambino',
    tagline: 'Start Young, Race Smart',
    ageRange: '5-7 years',
    image: '/images/karts/PHOTO-2025-03-04-08-53-03.jpg',
    specs: {
      engine: 'Comer C50',
      power: '3.5 HP',
      topSpeed: '45 km/h',
    },
  },
  {
    id: 'micro',
    name: 'Rotax Micro',
    tagline: 'Small Size, Big Thrills',
    ageRange: '7-11 years',
    image: '/images/karts/PHOTO-2025-03-04-08-54-44.jpg',
    specs: {
      engine: 'Rotax Micro MAX',
      power: '6 HP',
      topSpeed: '60 km/h',
    },
  },
  {
    id: 'mini',
    name: 'Rotax Mini',
    tagline: 'Level Up Your Racing',
    ageRange: '10-13 years',
    image: '/images/karts/PHOTO-2025-03-04-08-55-18.jpg',
    specs: {
      engine: 'Rotax Mini MAX',
      power: '15 HP',
      topSpeed: '80 km/h',
    },
  },
  {
    id: 'junior',
    name: 'Rotax Junior',
    tagline: 'Serious Speed for Teens',
    ageRange: '12-15 years',
    image: '/images/karts/PHOTO-2025-03-04-08-55-50.jpg',
    specs: {
      engine: 'Rotax Junior MAX',
      power: '23 HP',
      topSpeed: '100 km/h',
    },
  },
  {
    id: 'senior',
    name: 'Rotax Senior',
    tagline: 'Professional Performance',
    ageRange: '15+ years',
    image: '/images/karts/rotax-senior.jpg',
    specs: {
      engine: 'Rotax Senior MAX',
      power: '30 HP',
      topSpeed: '120 km/h',
    },
  },
  {
    id: 'dd2',
    name: 'Rotax DD2',
    tagline: 'Ultimate Racing Experience',
    ageRange: '15+ years (experienced)',
    image: '/images/karts/PHOTO-2025-03-04-08-55-50.jpg',
    specs: {
      engine: 'Rotax DD2',
      power: '34 HP',
      topSpeed: '140 km/h',
    },
  },
];

export function FeaturedKarts() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((current) => (current === kartCategories.length - 1 ? 0 : current + 1));
  };

  const prevSlide = () => {
    setActiveIndex((current) => (current === 0 ? kartCategories.length - 1 : current - 1));
  };

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="py-20 bg-black text-white" id="karts">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Karts</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From beginners to professionals, we have the perfect kart for every age and skill level.
          </p>
        </div>

        {/* Kart Carousel */}
        <div className="relative max-w-6xl mx-auto">
          {/* Carousel Controls */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg -ml-5 focus:outline-none"
            aria-label="Previous kart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg -mr-5 focus:outline-none"
            aria-label="Next kart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Kart Cards */}
          <div className="overflow-hidden rounded-xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {kartCategories.map((kart) => (
                <div key={kart.id} className="min-w-full">
                  <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(220,38,38,0.3)]">
                    <div className="md:flex">
                      <div className="md:w-1/2 relative h-64 md:h-auto">
                        <Image
                          src={kart.image}
                          alt={`${kart.name} kart`}
                          fill
                          className="object-cover"
                          loading="lazy"
                          unoptimized
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/images/placeholder.jpg';
                            target.onerror = null;
                          }}
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute top-0 left-0 bg-red-600 text-white px-4 py-2 rounded-br-lg font-bold">
                          {kart.ageRange}
                        </div>
                      </div>
                      <div className="md:w-1/2 p-8 flex flex-col justify-between">
                        <div>
                          <h3 className="text-3xl font-bold mb-2">{kart.name}</h3>
                          <p className="text-red-500 text-xl mb-6">{kart.tagline}</p>
                          
                          <div className="space-y-3 mb-8">
                            <div className="flex items-center">
                              <span className="w-24 text-gray-400">Engine:</span>
                              <span className="font-medium">{kart.specs.engine}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="w-24 text-gray-400">Power:</span>
                              <span className="font-medium">{kart.specs.power}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="w-24 text-gray-400">Top Speed:</span>
                              <span className="font-medium">{kart.specs.topSpeed}</span>
                            </div>
                          </div>
                        </div>
                        
                        <ButtonLink
                          href={`/rentals?kart=${kart.id}`}
                          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 inline-flex items-center justify-center"
                        >
                          Book This Kart
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </ButtonLink>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {kartCategories.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none ${
                  index === activeIndex ? 'bg-red-600 w-6' : 'bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <ButtonLink
            href="/rentals"
            className="bg-transparent border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-3 rounded-lg font-medium transition-all duration-300"
          >
            View All Karts & Pricing
          </ButtonLink>
        </div>
      </div>
    </section>
  );
} 