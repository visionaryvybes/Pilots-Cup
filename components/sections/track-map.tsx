'use client';

import Image from 'next/image';
import { useState } from 'react';

interface Hotspot {
  id: string;
  name: string;
  description: string;
  x: number;
  y: number;
}

const trackHotspots: Hotspot[] = [
  {
    id: 'start',
    name: 'Start/Finish Line',
    description: 'Where the action begins and ends. Our electronic timing system records your lap times with precision.',
    x: 20,
    y: 50,
  },
  {
    id: 'turn1',
    name: 'Turn 1 - The Hairpin',
    description: 'A challenging hairpin turn that tests your braking and acceleration skills.',
    x: 35,
    y: 30,
  },
  {
    id: 'straight',
    name: 'Main Straight',
    description: 'The fastest section of the track where DD2 karts can reach speeds of up to 140km/h.',
    x: 60,
    y: 70,
  },
  {
    id: 'chicane',
    name: 'Technical Chicane',
    description: 'A series of quick left-right turns that require precise steering and throttle control.',
    x: 80,
    y: 40,
  },
  {
    id: 'pits',
    name: 'Pit Lane',
    description: 'Where our technical team provides support and maintenance for your kart.',
    x: 15,
    y: 80,
  },
];

export function TrackMap() {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleHotspotClick = (hotspot: Hotspot) => {
    setActiveHotspot(hotspot);
    setIsTooltipVisible(true);
  };

  const closeTooltip = () => {
    setIsTooltipVisible(false);
  };

  return (
    <section className="py-20 bg-black text-white" id="track-map">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Interactive Track Map</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our professional racing circuit and discover the key features that make it challenging and exciting.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Track Map Image */}
          <div className="relative rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/images/track/track-overview.jpg"
              alt="Pilots Cup Racing Track Map"
              width={1200}
              height={800}
              className="w-full h-auto"
            />

            {/* Hotspots */}
            {trackHotspots.map((hotspot) => (
              <button
                key={hotspot.id}
                className={`absolute w-8 h-8 rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 z-10 ${
                  activeHotspot?.id === hotspot.id
                    ? 'bg-red-600 scale-125'
                    : 'bg-red-500 hover:bg-red-600 hover:scale-110'
                }`}
                style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                onClick={() => handleHotspotClick(hotspot)}
                aria-label={`View information about ${hotspot.name}`}
              >
                <span className="text-white font-bold">{hotspot.id.charAt(0).toUpperCase()}</span>
              </button>
            ))}

            {/* Tooltip */}
            {isTooltipVisible && activeHotspot && (
              <div 
                className="absolute bg-black p-4 rounded-lg shadow-xl max-w-xs z-20 transform transition-all duration-300 animate-fade-in"
                style={{ 
                  left: `${activeHotspot.x > 50 ? activeHotspot.x - 30 : activeHotspot.x + 10}%`, 
                  top: `${activeHotspot.y > 50 ? activeHotspot.y - 30 : activeHotspot.y + 10}%` 
                }}
              >
                <button 
                  className="absolute top-2 right-2 text-gray-400 hover:text-white"
                  onClick={closeTooltip}
                  aria-label="Close information"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <h3 className="text-lg font-bold text-red-500 mb-2">{activeHotspot.name}</h3>
                <p className="text-sm text-gray-300">{activeHotspot.description}</p>
              </div>
            )}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-400 italic">Click on the hotspots to learn more about our track features</p>
          </div>
        </div>
      </div>
    </section>
  );
} 