'use client';

import { MembershipTiers } from '../../components/sections/membership-tiers';
import { BackToTop } from '../../components/back-to-top';

export default function MembershipPage() {
  return (
    <div className="min-h-screen">
      <div className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Membership Plans</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Join our racing community with flexible membership options designed for every skill level.
          </p>
        </div>
        </div>

      <div className="py-12">
        <MembershipTiers />
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div id="benefits" className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Membership Benefits</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Priority Access</h3>
                <p className="text-gray-700 mb-4">
                  Members get priority booking for track sessions and special events. Book your preferred time slots before they open to the general public.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Exclusive Events</h3>
                <p className="text-gray-700 mb-4">
                  Access to member-only racing events, competitions, and social gatherings throughout the year.
                </p>
          </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Professional Coaching</h3>
                <p className="text-gray-700 mb-4">
                  Receive personalized coaching from professional racers to improve your skills and racing techniques.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Discounts & Rewards</h3>
                <p className="text-gray-700 mb-4">
                  Enjoy special discounts on merchandise, equipment rentals, and additional track time. Earn loyalty points with every visit.
                </p>
          </div>
            </div>
        </div>
          
          <div id="join" className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">How to Join</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose Your Plan</h3>
                  <p className="text-gray-700">
                    Select the membership plan that best fits your racing goals and budget.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Complete Registration</h3>
                  <p className="text-gray-700">
                    Fill out our membership application form with your personal details and racing experience.
                  </p>
                </div>
          </div>
              
              <div className="flex items-start">
                <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Safety Briefing</h3>
                  <p className="text-gray-700">
                    Attend a mandatory safety briefing session to learn about track rules and safety protocols.
                  </p>
                      </div>
                  </div>
              
              <div className="flex items-start">
                <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="font-bold">4</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Start Racing</h3>
                  <p className="text-gray-700">
                    Receive your membership card and start enjoying all the benefits of being a Pilots Cup member!
                  </p>
                </div>
              </div>
            </div>
            </div>
          </div>
      </div>
      
      <BackToTop />
    </div>
  );
} 