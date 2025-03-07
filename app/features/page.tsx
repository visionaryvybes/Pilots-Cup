'use client';

import { useState } from 'react';
import { BackToTop } from '../../components/back-to-top';
import BookingCalendar from '../../components/booking-calendar';
import EventCountdown from '../../components/event-countdown';
import LanguageSwitcher from '../../components/language-switcher';
import Leaderboard from '../../components/leaderboard';
import RacingTips from '../../components/racing-tips';
import VirtualTour from '../../components/virtual-tour';

export default function FeaturesPage() {
  const [activeTab, setActiveTab] = useState('booking');

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section */}
      <section className="bg-red-600 py-16 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Pilots Cup Features</h1>
          <p className="text-xl text-red-100 max-w-3xl">
            Explore our interactive features designed to enhance your karting experience.
          </p>
        </div>
      </section>

      {/* Language Switcher */}
      <div className="container mx-auto px-4 py-6 flex justify-end">
        <div className="w-48">
          <LanguageSwitcher />
        </div>
      </div>

      {/* Features Tabs */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('booking')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'booking'
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Booking Calendar
              </button>
              <button
                onClick={() => setActiveTab('leaderboard')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'leaderboard'
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Race Leaderboard
              </button>
              <button
                onClick={() => setActiveTab('tips')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'tips'
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Racing Tips
              </button>
              <button
                onClick={() => setActiveTab('events')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'events'
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Event Countdown
              </button>
              <button
                onClick={() => setActiveTab('tour')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'tour'
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Virtual Tour
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Booking Calendar */}
            {activeTab === 'booking' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Online Booking Calendar</h2>
                <p className="text-gray-600 mb-8">
                  Our interactive booking calendar allows you to see available slots in real-time and book your sessions instantly.
                </p>
                <BookingCalendar />
              </div>
            )}

            {/* Leaderboard */}
            {activeTab === 'leaderboard' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Race Results & Leaderboard</h2>
                <p className="text-gray-600 mb-8">
                  Track your performance and see how you rank against other racers with our comprehensive leaderboard.
                </p>
                <Leaderboard />
              </div>
            )}

            {/* Racing Tips */}
            {activeTab === 'tips' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Racing Tips & Tutorials</h2>
                <p className="text-gray-600 mb-8">
                  Improve your racing skills with expert tips, maintenance advice, and racing etiquette guidelines.
                </p>
                <RacingTips />
              </div>
            )}

            {/* Event Countdown */}
            {activeTab === 'events' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
                <p className="text-gray-600 mb-8">
                  Stay updated on our upcoming events with dynamic countdown timers and easy registration.
                </p>
                <EventCountdown />
              </div>
            )}

            {/* Virtual Tour */}
            {activeTab === 'tour' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Virtual Facility Tour</h2>
                <p className="text-gray-600 mb-8">
                  Explore our facility with an interactive 360° virtual tour before your visit.
                </p>
                <VirtualTour />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <BackToTop />
    </main>
  );
} 