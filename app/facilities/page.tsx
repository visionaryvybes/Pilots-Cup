'use client';

import { FC } from 'react';
import { MapPinIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { BackToTop } from '@/components/back-to-top';
import { FacilitiesGrid } from '@/components/FacilityCard';

const facilities = [
  {
    title: 'Professional Racing Track',
    description: 'Our FIA-approved 1.2km track features 12 challenging corners, multiple configurations, and state-of-the-art timing systems.',
    image: '/images/track/track-aerial.jpg'
  },
  {
    title: 'Kart Service Center',
    description: 'Fully equipped maintenance facility with professional technicians ensuring our karts are always in top racing condition.',
    image: '/images/facilities/service-center.jpg'
  },
  {
    title: 'Briefing Room',
    description: 'Modern briefing room for safety instructions, race briefings, and driver education sessions.',
    image: '/images/facilities/briefing-room.jpg'
  },
  {
    title: 'Pit Lane & Garages',
    description: 'Professional pit lane setup with covered garages for kart preparation and maintenance.',
    image: '/images/facilities/pit-lane.jpg'
  },
  {
    title: 'Café & Lounge',
    description: 'Comfortable café and lounge area serving refreshments and light meals with a view of the track.',
    image: '/images/facilities/cafe.jpg'
  },
  {
    title: 'Pro Shop',
    description: 'Well-stocked shop offering racing gear, accessories, and merchandise for karting enthusiasts.',
    image: '/images/facilities/pro-shop.jpg'
  }
];

const amenities = [
  {
    title: 'Changing Rooms',
    description: 'Clean and spacious changing facilities with lockers',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  },
  {
    title: 'Prayer Room',
    description: 'Dedicated prayer facilities for our guests',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  },
  {
    title: 'Parking',
    description: 'Ample parking space for visitors and participants',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    )
  },
  {
    title: 'First Aid Station',
    description: 'Fully equipped medical facility with trained staff',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: 'Viewing Areas',
    description: 'Multiple spectator areas with excellent track views',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    )
  },
  {
    title: 'WiFi Coverage',
    description: 'Free high-speed WiFi throughout the facility',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
      </svg>
    )
  }
];

export default function FacilitiesPage() {
  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/track/entrance-gate.jpg"
            alt="Al Forsan International Circuit Entrance"
            fill
            priority
            unoptimized
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="max-w-4xl px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              World-Class Facilities
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Experience premium karting facilities at Al Forsan International Circuit
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Track Overview Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Track Overview</h2>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <p className="text-lg text-gray-300">
                Al Forsan International Circuit is a state-of-the-art karting facility that offers an exhilarating racing
                experience for drivers of all skill levels. The track features a challenging layout with technical
                corners, high-speed straights, and multiple racing lines.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center text-red-400">
                  <span className="mr-2">›</span>
                  1.2km track length with 12 challenging corners
                </li>
                <li className="flex items-center text-red-400">
                  <span className="mr-2">›</span>
                  CIK-FIA approved safety barriers and run-off areas
                </li>
                <li className="flex items-center text-red-400">
                  <span className="mr-2">›</span>
                  Multiple track configurations available
                </li>
                <li className="flex items-center text-red-400">
                  <span className="mr-2">›</span>
                  Professional timing system with live tracking
                </li>
              </ul>
            </div>
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-gray-900">
              <Image
                src="/images/track/entrance-gate.jpg"
                alt="Al Forsan International Circuit Entrance Gate"
                fill
                className="object-cover"
                unoptimized
                priority
              />
            </div>
          </div>
        </div>

        {/* Location Info */}
        <section className="mb-16">
          <div className="bg-neutral-900 rounded-lg p-8 border border-neutral-800">
            <div className="flex items-center mb-6">
              <MapPinIcon className="h-12 w-12 text-red-600 mr-4" />
              <div>
                <h2 className="text-2xl font-bold text-white">Al Forsan International Circuit</h2>
                <p className="text-gray-400">Khalifa City A - Abu Dhabi - United Arab Emirates</p>
              </div>
            </div>
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3631.6747342874604!2d54.53808731544383!3d24.442133984239843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e4f1e8df1b655%3A0x23cc26560dd4668e!2sAl%20Forsan%20International%20Sports%20Resort!5e0!3m2!1sen!2sae!4v1629890543854!5m2!1sen!2sae"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </section>

        {/* Facilities Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-white mb-8">Our Facilities</h2>
          <FacilitiesGrid />
        </div>

        {/* Additional Info */}
        <div className="rounded-2xl bg-white/5 p-8">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Professional Racing Environment
          </h2>
          <p className="text-gray-300">
            Our state-of-the-art facilities are designed to provide the ultimate karting experience. 
            From our professional service center to our comfortable trackside café, every aspect 
            of our facility is maintained to the highest standards. Whether you're a beginner or 
            a seasoned racer, our facilities are equipped to meet all your karting needs.
          </p>
        </div>

        {/* Additional Amenities */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Additional Amenities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {amenities.map((amenity, index) => (
              <div key={index} className="bg-neutral-900 p-6 rounded-lg border border-neutral-800">
                <div className="text-red-600 mb-4">{amenity.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{amenity.title}</h3>
                <p className="text-gray-400">{amenity.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Opening Hours */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Opening Hours</h2>
          <div className="bg-neutral-900 rounded-lg p-8 border border-neutral-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Track Hours</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex justify-between">
                    <span>Monday - Thursday</span>
                    <span>10:00 AM - 10:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Friday</span>
                    <span>2:00 PM - 11:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday - Sunday</span>
                    <span>9:00 AM - 11:00 PM</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Café & Pro Shop</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex justify-between">
                    <span>Monday - Thursday</span>
                    <span>9:00 AM - 10:30 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Friday</span>
                    <span>1:30 PM - 11:30 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday - Sunday</span>
                    <span>8:30 AM - 11:30 PM</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="bg-neutral-900 rounded-lg p-8 text-center border border-neutral-800">
            <h2 className="text-3xl font-bold text-white mb-4">Experience Our Facilities</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Book a session now or contact us to learn more about our world-class karting facilities.
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