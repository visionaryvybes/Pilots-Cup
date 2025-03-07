'use client';

import { BookingForm } from '../../components/sections/booking-form';
import { BackToTop } from '../../components/back-to-top';

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Book Your Racing Experience</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Reserve your spot on the track and get ready for an unforgettable racing adventure.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <BookingForm />
          </div>
          
          <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Booking Information</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Reservation Policy</h3>
                <p className="text-gray-700">
                  Bookings can be made up to 30 days in advance. We recommend booking at least 48 hours before your 
                  desired session to ensure availability, especially during weekends and holidays.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Cancellation Policy</h3>
                <p className="text-gray-700">
                  Free cancellation up to 24 hours before your scheduled session. Cancellations within 24 hours 
                  may be subject to a 50% fee. No-shows will be charged the full amount.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What to Bring</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  <li>Comfortable clothing (avoid loose items)</li>
                  <li>Closed-toe shoes (required)</li>
                  <li>Valid ID</li>
                  <li>Confirmation email or booking reference</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Group Bookings</h3>
                <p className="text-gray-700">
                  For groups of 8 or more, please contact us directly at <a href="mailto:bookings@pilotscup.com" className="text-red-600 hover:underline">bookings@pilotscup.com</a> or 
                  call <a href="tel:+9715555555" className="text-red-600 hover:underline">+971 555 5555</a> for special rates and arrangements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <BackToTop />
    </div>
  );
} 