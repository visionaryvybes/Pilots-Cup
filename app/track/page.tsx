'use client';

import { ChevronRightIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { BackToTop } from '@/components/back-to-top';
import { TRACK_IMAGES, IMAGE_METADATA } from '@/lib/constants/track-images';

const trackFeatures = [
  {
    title: 'Professional Circuit',
    description: 'Al Forsan International Circuit is a world-class karting facility designed to FIA standards.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    title: 'Track Length',
    description: '1.2km of challenging track with multiple configurations available.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  },
  {
    title: 'Advanced Timing',
    description: 'State-of-the-art timing system providing accurate lap times and real-time tracking.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: 'Night Racing',
    description: 'Full track lighting system enabling exciting night racing experiences.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    )
  }
];

const trackRecords = [
  { category: 'Senior Max', time: '52.341', driver: 'Ahmed Al-Mansouri', date: '2023-11-15' },
  { category: 'Junior Max', time: '53.124', driver: 'Sarah Johnson', date: '2023-11-10' },
  { category: 'Mini Max', time: '54.567', driver: 'Mohammed Al-Qasimi', date: '2023-11-05' },
  { category: 'Micro Max', time: '55.789', driver: 'Emma Williams', date: '2023-10-30' }
];

export default function TrackPage() {
  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={TRACK_IMAGES.aerial}
            alt={IMAGE_METADATA.track.alt.aerial}
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={90}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzYvLy0vLi44QjhAOEA4Qi4tMkYyLlFUUVRAR0BXUFNMUE1HU1P/2wBDARUXFx4aHh8gIB8gU0IuQlNTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1P/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="max-w-4xl px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Al Forsan International Circuit
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Experience world-class karting at one of the UAE's premier racing facilities
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Track Overview */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8">Track Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-300 mb-6">
                Al Forsan International Circuit is a state-of-the-art karting facility that offers an exhilarating racing experience for drivers of all skill levels. The track features a challenging layout with technical corners, high-speed straights, and multiple racing lines.
              </p>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-center">
                  <ChevronRightIcon className="h-5 w-5 text-red-600 mr-2" />
                  1.2km track length with 12 challenging corners
                </li>
                <li className="flex items-center">
                  <ChevronRightIcon className="h-5 w-5 text-red-600 mr-2" />
                  CIK-FIA approved safety barriers and run-off areas
                </li>
                <li className="flex items-center">
                  <ChevronRightIcon className="h-5 w-5 text-red-600 mr-2" />
                  Multiple track configurations available
                </li>
                <li className="flex items-center">
                  <ChevronRightIcon className="h-5 w-5 text-red-600 mr-2" />
                  Professional timing system with live tracking
                </li>
              </ul>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden">
              <Image
                src={TRACK_IMAGES.layout}
                alt={IMAGE_METADATA.track.alt.layout}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={85}
              />
            </div>
          </div>
        </section>

        {/* Track Features */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8">Track Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trackFeatures.map((feature, index) => (
              <div key={index} className="bg-neutral-900 p-6 rounded-lg border border-neutral-800">
                <div className="text-red-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Track Records */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8">Track Records</h2>
          <div className="bg-neutral-900 rounded-lg border border-neutral-800 overflow-hidden">
            <table className="min-w-full divide-y divide-neutral-800">
              <thead>
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Lap Time</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Driver</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {trackRecords.map((record, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-sm text-white">{record.category}</td>
                    <td className="px-6 py-4 text-sm text-white font-mono">{record.time}</td>
                    <td className="px-6 py-4 text-sm text-white">{record.driver}</td>
                    <td className="px-6 py-4 text-sm text-gray-400">{record.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="bg-neutral-900 rounded-lg p-8 text-center border border-neutral-800">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Race?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Experience the thrill of racing at Al Forsan International Circuit. Book your session now or contact us for more information.
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