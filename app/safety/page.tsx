'use client';

import { ShieldCheckIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { BackToTop } from '@/components/back-to-top';

const safetyGuidelines = [
  {
    title: 'Required Safety Equipment',
    items: [
      'Full-face helmet (provided)',
      'Racing suit (provided)',
      'Closed-toe shoes (must be brought by driver)',
      'Neck support for junior drivers',
      'Hair nets for long hair',
      'Gloves (provided)'
    ]
  },
  {
    title: 'Track Rules',
    items: [
      'Follow all flag signals and marshal instructions',
      'No bumping or dangerous driving',
      'Maintain safe following distance',
      'Stay within track limits',
      'No overtaking in yellow flag zones',
      'Slow down and return to pits when shown red flag'
    ]
  },
  {
    title: 'Pre-Race Safety',
    items: [
      'Attend mandatory safety briefing',
      'Ensure proper fitting of safety equipment',
      'Check kart controls and familiarize with operation',
      'Report any concerns to track staff',
      'Stay hydrated before racing',
      'Remove loose items and jewelry'
    ]
  },
  {
    title: 'Emergency Procedures',
    items: [
      'Remain in kart unless instructed otherwise',
      'Raise hand if technical issues arise',
      'Follow marshal directions during incidents',
      'Know location of fire extinguishers',
      'First aid staff always on standby',
      'Emergency vehicle access points clearly marked'
    ]
  }
];

const flagSignals = [
  {
    color: 'Green',
    meaning: 'Track is clear, racing can begin/continue',
    bgColor: 'bg-green-600'
  },
  {
    color: 'Yellow',
    meaning: 'Caution, hazard ahead, no overtaking',
    bgColor: 'bg-yellow-400'
  },
  {
    color: 'Red',
    meaning: 'Session stopped, return to pits immediately',
    bgColor: 'bg-red-600'
  },
  {
    color: 'Blue',
    meaning: 'Faster kart approaching, prepare to be lapped',
    bgColor: 'bg-blue-600'
  },
  {
    color: 'Black',
    meaning: 'Return to pits for consultation with officials',
    bgColor: 'bg-black'
  },
  {
    color: 'Checkered',
    meaning: 'Session complete, return to pits',
    bgColor: 'bg-neutral-800'
  }
];

export default function SafetyPage() {
  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[40vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/safety/safety-briefing.jpg"
            alt="Safety Briefing"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="max-w-4xl px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Safety Guidelines
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Your safety is our top priority. Please review and follow these guidelines for a safe racing experience.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Safety Message */}
        <section className="mb-16">
          <div className="bg-neutral-900 rounded-lg p-8 border border-neutral-800">
            <div className="flex items-center mb-6">
              <ShieldCheckIcon className="h-12 w-12 text-red-600 mr-4" />
              <h2 className="text-2xl font-bold text-white">Safety First at Al Forsan</h2>
            </div>
            <p className="text-gray-300">
              At Al Forsan International Circuit, we maintain the highest safety standards in karting. Our facility is equipped with state-of-the-art safety features, and our staff is trained to ensure your safety at all times. Before every session, all drivers must attend a safety briefing and follow our comprehensive safety guidelines.
            </p>
          </div>
        </section>

        {/* Safety Guidelines Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Essential Safety Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {safetyGuidelines.map((section, index) => (
              <div key={index} className="bg-neutral-900 rounded-lg p-6 border border-neutral-800">
                <h3 className="text-xl font-bold text-white mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start text-gray-300">
                      <svg className="h-6 w-6 text-red-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Flag Signals */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Flag Signals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {flagSignals.map((flag, index) => (
              <div key={index} className="bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800">
                <div className={`h-20 ${flag.bgColor}`} />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white mb-2">{flag.color} Flag</h3>
                  <p className="text-gray-400">{flag.meaning}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Safety Equipment */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Safety Equipment</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800">
              <div className="relative h-48">
                <Image
                  src="/images/safety/helmet.jpg"
                  alt="Racing Helmet"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-white mb-2">Helmets</h3>
                <p className="text-gray-400">
                  DOT-approved full-face helmets provided for all drivers. Multiple sizes available.
                </p>
              </div>
            </div>
            <div className="bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800">
              <div className="relative h-48">
                <Image
                  src="/images/safety/suit.jpg"
                  alt="Racing Suit"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-white mb-2">Racing Suits</h3>
                <p className="text-gray-400">
                  Professional-grade racing suits designed for comfort and protection.
                </p>
              </div>
            </div>
            <div className="bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800">
              <div className="relative h-48">
                <Image
                  src="/images/safety/barriers.jpg"
                  alt="Track Barriers"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-white mb-2">Track Safety</h3>
                <p className="text-gray-400">
                  Professional barriers and run-off areas meeting international safety standards.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="bg-neutral-900 rounded-lg p-8 text-center border border-neutral-800">
            <h2 className="text-3xl font-bold text-white mb-4">Ready for a Safe Racing Experience?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Book your session now and experience safe, professional karting at Al Forsan International Circuit.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/book"
                className="inline-block rounded-md bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700"
              >
                Book Now
              </Link>
              <Link
                href="/contact"
                className="inline-block rounded-md border border-white px-8 py-3 text-base font-medium text-white hover:bg-white/10"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </div>

      <BackToTop />
    </div>
  );
} 