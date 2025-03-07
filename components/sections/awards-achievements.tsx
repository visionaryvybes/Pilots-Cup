'use client';

import Image from 'next/image';

interface Award {
  title: string;
  organization: string;
  year: string;
  description: string;
  icon: string;
}

const awards: Award[] = [
  {
    title: 'Best Karting Facility',
    organization: 'Racing Excellence Awards',
    year: '2024',
    description: 'Recognized for outstanding track design, safety measures, and overall customer experience.',
    icon: '/images/icons/trophy-gold.svg'
  },
  {
    title: 'Top Racing Academy',
    organization: 'Motorsport Education Council',
    year: '2023',
    description: 'Awarded for our comprehensive training programs and development of young racing talent.',
    icon: '/images/icons/medal-silver.svg'
  },
  {
    title: 'Safety Excellence',
    organization: 'International Karting Federation',
    year: '2023',
    description: 'Highest rating for safety protocols, equipment maintenance, and staff training.',
    icon: '/images/icons/shield-check.svg'
  },
  {
    title: 'Community Engagement',
    organization: 'Local Business Association',
    year: '2022',
    description: 'Recognized for our youth programs and community involvement initiatives.',
    icon: '/images/icons/community.svg'
  }
];

export function AwardsAchievements() {
  return (
    <section id="awards" className="bg-neutral-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Awards & Recognition
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-300">
            Our commitment to excellence has been recognized by industry leaders and organizations.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {awards.map((award) => (
            <div key={award.title} className="flex flex-col bg-neutral-800 p-6 rounded-lg border border-neutral-700">
              <time className="text-sm leading-6 text-red-500">{award.year}</time>
              <h3 className="mt-3 text-lg font-semibold leading-8 text-white">{award.title}</h3>
              <p className="text-sm text-gray-300">{award.organization}</p>
              <p className="mt-4 text-sm leading-6 text-gray-300">{award.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-neutral-700 pt-10">
          <h3 className="text-2xl font-bold tracking-tight text-white text-center">
            Racing Excellence Since 2015
          </h3>
          <p className="mt-6 text-lg leading-8 text-gray-300 text-center max-w-3xl mx-auto">
            Our dedication to providing the best racing experience has made us a leader in the karting industry. Join the thousands of satisfied racers who have experienced the Pilots Cup difference.
          </p>

          <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-3 lg:grid-cols-3">
            <div className="flex flex-col-reverse bg-neutral-800 p-8 rounded-lg border border-neutral-700">
              <dt className="text-base leading-7 text-gray-300">Years in Business</dt>
              <dd className="text-4xl font-bold leading-9 tracking-tight text-white">9+</dd>
            </div>
            <div className="flex flex-col-reverse bg-neutral-800 p-8 rounded-lg border border-neutral-700">
              <dt className="text-base leading-7 text-gray-300">Happy Racers</dt>
              <dd className="text-4xl font-bold leading-9 tracking-tight text-white">15k+</dd>
            </div>
            <div className="flex flex-col-reverse bg-neutral-800 p-8 rounded-lg border border-neutral-700">
              <dt className="text-base leading-7 text-gray-300">Customer Rating</dt>
              <dd className="text-4xl font-bold leading-9 tracking-tight text-white">4.9★</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
} 