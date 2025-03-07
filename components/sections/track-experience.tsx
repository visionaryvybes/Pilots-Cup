'use client';

import Image from 'next/image';
import { ButtonLink } from '../ui/button';

interface TrackStat {
  value: string;
  label: string;
  icon: React.ReactNode;
}

const trackStats: TrackStat[] = [
  {
    value: '1.2km',
    label: 'Track Length',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="M18.4 9.6a9 9 0 1 1-12.8 0" />
      </svg>
    ),
  },
  {
    value: '12',
    label: 'Challenging Corners',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19h16" />
        <path d="M4 15h16" />
        <path d="M4 11h16" />
        <path d="M4 7h16" />
      </svg>
    ),
  },
  {
    value: '6',
    label: 'Kart Categories',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2" />
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <circle cx="9" cy="10" r="2" />
        <circle cx="15" cy="10" r="2" />
      </svg>
    ),
  },
  {
    value: '140km/h',
    label: 'Top Speed (DD2)',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v8" />
        <path d="m16 6-4 4-4-4" />
        <path d="M3 10h18" />
        <path d="M12 22v-8" />
        <path d="m16 18-4-4-4 4" />
        <path d="M3 14h18" />
      </svg>
    ),
  },
];

export function TrackExperience() {
  return (
    <section className="py-20 bg-gray-900 text-white relative overflow-hidden" id="track">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Experience Our Track</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our professional-grade track offers the perfect balance of technical challenges and high-speed straights for racers of all levels.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-xl overflow-hidden shadow-2xl group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
            <Image
              src="/images/track/track-aerial.jpg"
              alt="Pilots Cup Racing Track Aerial View"
              width={800}
              height={500}
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <h3 className="text-2xl font-bold mb-2">Professional Racing Circuit</h3>
              <p className="text-gray-300">
                Designed to international standards with perfect racing lines and safety features.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              {trackStats.map((stat, index) => (
                <div 
                  key={index} 
                  className="bg-black rounded-xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.2)]"
                >
                  <div className="text-red-600 mb-4">{stat.icon}</div>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="bg-black/50 rounded-xl p-6 border-l-4 border-red-600">
              <h3 className="text-xl font-bold mb-3">Track Features</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Professional timing system with live results
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Floodlit for night racing
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Trackside support and technical assistance
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Spectator areas with excellent visibility
                </li>
              </ul>
            </div>

            <ButtonLink
              href="/rentals"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 inline-flex items-center"
            >
              Book Track Time
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </ButtonLink>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
        <svg width="100%" height="100%" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <path d="M39.7,-67.1C51.9,-60.2,62.8,-50.5,70.8,-38.5C78.8,-26.5,83.9,-13.2,83.7,-0.1C83.5,13,78,26.1,70.1,37.4C62.2,48.7,51.9,58.3,39.7,64.5C27.5,70.7,13.8,73.5,0.2,73.2C-13.3,72.9,-26.6,69.5,-39.5,63.3C-52.4,57.1,-64.9,48.1,-72.1,36.1C-79.3,24.1,-81.3,9.1,-79.9,-5.8C-78.5,-20.7,-73.7,-35.3,-64.6,-46.5C-55.5,-57.7,-42.1,-65.4,-28.8,-71.2C-15.5,-77,-7.7,-80.9,2.5,-85.3C12.8,-89.7,25.5,-94.6,39.7,-67.1Z" transform="translate(200 200)" fill="#dc2626" />
        </svg>
      </div>
    </section>
  );
} 