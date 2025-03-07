'use client';

import Image from 'next/image';
import { ButtonLink } from '../ui/button';

interface Program {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
}

const programs: Program[] = [
  {
    id: 'recreational',
    title: 'Recreational Racing',
    description: 'Perfect for casual racers looking for fun and excitement on the track.',
    image: '/images/karts/PHOTO-2025-03-04-08-53-03.jpg',
    features: [
      'Open sessions for all skill levels',
      'Family-friendly environment',
      'No experience necessary',
      'Equipment provided',
      'Flexible scheduling'
    ]
  },
  {
    id: 'competitive',
    title: 'Competitive Racing',
    description: 'For serious racers looking to improve their skills and compete against others.',
    image: '/images/karts/PHOTO-2025-03-04-08-55-50.jpg',
    features: [
      'Regular race events',
      'Professional timing system',
      'Rankings and leaderboards',
      'Seasonal championships',
      'Performance analysis'
    ]
  },
  {
    id: 'junior',
    title: 'Junior Development',
    description: 'Specialized program for young racers to develop their skills and passion for racing.',
    image: '/images/karts/PHOTO-2025-03-04-08-54-44.jpg',
    features: [
      'Age-appropriate training',
      'Safety-focused instruction',
      'Skill development path',
      'Junior competitions',
      'Parent involvement'
    ]
  },
  {
    id: 'corporate',
    title: 'Corporate Events',
    description: 'Team building and corporate events that combine excitement with professional organization.',
    image: '/images/facilities/PHOTO-2025-03-04-08-59-06.jpg',
    features: [
      'Customizable packages',
      'Private track sessions',
      'Team building activities',
      'Catering options',
      'Event coordination'
    ]
  }
];

export function RacingPrograms() {
  return (
    <section className="py-20 bg-white" id="programs">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 reveal">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Racing Programs</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From casual fun to competitive racing, we offer programs for every type of racer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {programs.map((program, index) => (
            <div 
              key={program.id}
              className={`bg-gray-50 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
                index % 2 === 0 ? 'reveal-left' : 'reveal-right'
              }`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-64">
                <Image
                  src={program.image}
                  alt={program.title}
                  fill
                  className="object-cover"
                  loading="lazy"
                  unoptimized
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/placeholder.jpg';
                    target.onerror = null;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white">{program.title}</h3>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-700 mb-4">{program.description}</p>
                
                <h4 className="font-semibold text-gray-900 mb-3">Program Features:</h4>
                <ul className="space-y-2 mb-6">
                  {program.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-red-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <ButtonLink
                  href={`/programs/${program.id}`}
                  className="w-full bg-red-600 hover:bg-red-700 text-white text-center py-3 rounded-lg transition-colors"
                >
                  Learn More
                </ButtonLink>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12 reveal">
          <ButtonLink
            href="/programs"
            className="bg-transparent border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-3 rounded-lg font-medium transition-all duration-300"
          >
            View All Programs
          </ButtonLink>
        </div>
      </div>
    </section>
  );
} 