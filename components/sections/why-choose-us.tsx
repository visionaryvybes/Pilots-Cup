'use client';

import Image from 'next/image';
import { ButtonLink } from '../ui/button';

interface Benefit {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const benefits: Benefit[] = [
  {
    title: 'Premium Racing Experience',
    description: 'State-of-the-art facilities with professional-grade karts and equipment for racers of all levels.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
    ),
  },
  {
    title: 'Expert Coaching & Training',
    description: 'Learn from professional racers with personalized coaching sessions for beginners to advanced drivers.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
  },
  {
    title: 'Flexible Membership Options',
    description: 'Choose from various membership plans designed to fit your schedule and racing goals.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
    ),
  },
  {
    title: 'Safety First Approach',
    description: 'Comprehensive safety measures with professional track marshals and top-quality safety equipment.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
    ),
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-gray-900 text-white relative overflow-hidden" id="why-choose-us">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 reveal">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Pilots Cup</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the thrill of professional karting with our world-class facilities and expert team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 reveal-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="bg-black rounded-xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.2)]"
                >
                  <div className="text-red-600 mb-4">{benefit.icon}</div>
                  <div className="text-xl font-bold mb-2">{benefit.title}</div>
                  <div className="text-gray-400">{benefit.description}</div>
                </div>
              ))}
            </div>

            <div className="bg-black/50 rounded-xl p-6 border-l-4 border-red-600">
              <h3 className="text-xl font-bold mb-3">Our Commitment</h3>
              <p className="text-gray-300 mb-4">
                At Pilots Cup, we're dedicated to providing an exceptional racing experience for enthusiasts of all ages and skill levels. Our professional staff ensures every visit is memorable, safe, and exhilarating.
              </p>
              <ButtonLink
                href="/about"
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 inline-flex items-center"
              >
                Learn More About Us
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </ButtonLink>
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden shadow-2xl group reveal-right">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
            <Image
              src="/images/facilities/PHOTO-2025-03-04-08-58-25.jpg"
              alt="Pilots Cup Racing Facility"
              width={800}
              height={500}
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <h3 className="text-2xl font-bold mb-2">World-Class Facilities</h3>
              <p className="text-gray-300">
                Our state-of-the-art racing center features professional equipment, comfortable amenities, and expert staff.
              </p>
            </div>
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