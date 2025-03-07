'use client';

import {
    CalendarIcon,
    ClockIcon,
    TrophyIcon
} from '@heroicons/react/24/outline';
import { IMAGES } from 'lib/constants/images';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

// Mock data for the member
const memberData = {
  name: 'Ahmed Al-Mansouri',
  email: 'ahmed@example.com',
  membershipType: 'Gold',
  memberSince: 'January 2023',
  hoursRemaining: 32,  // Out of 50 hours for Gold membership
  profileImage: IMAGES.team.member1,
  upcomingBookings: [
    { id: 1, date: '2023-12-15T14:00:00', duration: 2, kart: 'Rotax Senior', track: 'Main Circuit' },
    { id: 2, date: '2023-12-20T16:30:00', duration: 2, kart: 'Rotax Senior', track: 'Main Circuit' }
  ],
  raceHistory: [
    { id: 101, date: '2023-11-30T15:00:00', position: 2, lapTime: '00:45.321', kart: 'Rotax Senior', track: 'Main Circuit' },
    { id: 102, date: '2023-11-25T13:30:00', position: 1, lapTime: '00:44.876', kart: 'Rotax Senior', track: 'Main Circuit' },
    { id: 103, date: '2023-11-20T17:00:00', position: 3, lapTime: '00:45.112', kart: 'Rotax Senior', track: 'Main Circuit' },
    { id: 104, date: '2023-11-15T14:30:00', position: 2, lapTime: '00:45.543', kart: 'Rotax Senior', track: 'Main Circuit' }
  ],
  achievements: [
    { id: 201, title: 'First Win', date: '2023-06-15', description: 'First place in Rotax Senior category' },
    { id: 202, title: 'Fastest Lap', date: '2023-08-22', description: 'Set track record in Rotax Senior' },
    { id: 203, title: '10 Races Completed', date: '2023-10-05', description: 'Participated in 10 races' }
  ]
};

// Helper functions to safely get data
const getBestPosition = (raceHistory: any[] | undefined) => {
  if (!raceHistory || !raceHistory.length) return 'N/A';
  const positions = raceHistory.map((race: any) => race.position);
  return Math.min(...positions);
};

const getBestLapTime = (raceHistory: any[] | undefined) => {
  if (!raceHistory || !raceHistory.length) return 'N/A';
  return raceHistory.reduce((best: string, race: any) => 
    race.lapTime < best ? race.lapTime : best, 
    raceHistory[0].lapTime
  );
};

const getNextBookingDate = (bookings: any[] | undefined) => {
  if (!bookings || !bookings.length) return 'No upcoming bookings';
  const nextBooking = bookings[0];
  return new Date(nextBooking.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export default function MemberDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Safe access to data with fallbacks
  const member = memberData || {} as any;
  const bookings = member.upcomingBookings || [];
  const raceHistory = member.raceHistory || [];
  const achievements = member.achievements || [];

  // Check if we're on the client side to avoid hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, this would check for a valid auth token
        const isAuthenticated = localStorage.getItem('memberAuthenticated');
        
        if (!isAuthenticated && isClient) {
          // Redirect to login if not authenticated
          window.location.href = '/member-login';
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        window.location.href = '/member-login';
      }
    };

    if (isClient) {
      checkAuth();
    }
  }, [isClient]);

  if (!isClient || isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen pb-12">
      {/* Hero Section */}
      <section className="bg-red-600 py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Member Dashboard</h1>
              <p className="text-red-100">Manage your bookings, view race history, and track your progress</p>
            </div>
            <button 
              onClick={() => {
                localStorage.removeItem('memberAuthenticated');
                window.location.href = '/member-login';
              }}
              className="bg-white text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </section>

      {/* Member Info */}
      <section className="container mx-auto px-4 -mt-8">
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative h-24 w-24 rounded-full overflow-hidden border-4 border-white shadow">
            <Image 
              src={member.profileImage || IMAGES.team.member1} 
              alt={member.name || 'Member'} 
              fill
              className="object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-900">{member.name || 'Member'}</h2>
            <p className="text-gray-600">{member.email || 'No email provided'}</p>
            <div className="mt-2 flex flex-wrap justify-center md:justify-start gap-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                {member.membershipType || 'Standard'} Member
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                Member since {member.memberSince || 'N/A'}
              </span>
            </div>
          </div>
          <div className="ml-auto flex-shrink-0 hidden md:block">
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <h3 className="text-lg font-semibold text-red-800">Hours Remaining</h3>
              <p className="text-3xl font-bold text-red-600">{member.hoursRemaining || 0}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Tabs */}
      <section className="container mx-auto px-4 mt-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'bookings'
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Bookings
              </button>
              <button
                onClick={() => setActiveTab('raceHistory')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'raceHistory'
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Race History
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'profile'
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Profile
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gray-50 rounded-lg p-4 flex items-center">
                    <div className="rounded-full bg-red-100 p-3 mr-4">
                      <CalendarIcon className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Next Booking</h3>
                      <p className="text-lg font-semibold text-gray-900">{getNextBookingDate(bookings)}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 flex items-center">
                    <div className="rounded-full bg-red-100 p-3 mr-4">
                      <TrophyIcon className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Best Position</h3>
                      <p className="text-lg font-semibold text-gray-900">{getBestPosition(raceHistory)}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 flex items-center">
                    <div className="rounded-full bg-red-100 p-3 mr-4">
                      <ClockIcon className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Best Lap Time</h3>
                      <p className="text-lg font-semibold text-gray-900">{getBestLapTime(raceHistory)}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Recent Activity */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                    <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
                      {raceHistory.slice(0, 3).map((race) => (
                        <div key={race.id} className="p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium text-gray-900">Race on {formatDate(race.date)}</p>
                              <p className="text-sm text-gray-500">Position: {race.position} | Lap Time: {race.lapTime}</p>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              race.position === 1 ? 'bg-yellow-100 text-yellow-800' : 
                              race.position === 2 ? 'bg-gray-100 text-gray-800' : 
                              race.position === 3 ? 'bg-orange-100 text-orange-800' : 
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {race.position === 1 ? '1st Place' : 
                               race.position === 2 ? '2nd Place' : 
                               race.position === 3 ? '3rd Place' : 
                               `${race.position}th Place`}
                            </span>
                          </div>
                        </div>
                      ))}
                      {(!raceHistory || raceHistory.length === 0) && (
                        <div className="p-4 text-center text-gray-500">
                          No race history available
                        </div>
                      )}
                    </div>
                    {raceHistory && raceHistory.length > 0 && (
                      <div className="mt-4 text-center">
                        <button 
                          onClick={() => setActiveTab('raceHistory')}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          View All Race History →
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Achievements */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
                    <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
                      {achievements.map((achievement) => (
                        <div key={achievement.id} className="p-4 flex items-start">
                          <div className="rounded-full bg-yellow-100 p-2 mr-4">
                            <TrophyIcon className="h-5 w-5 text-yellow-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{achievement.title}</p>
                            <p className="text-sm text-gray-500">{achievement.description}</p>
                            <p className="text-xs text-gray-400 mt-1">{formatDate(achievement.date)}</p>
                          </div>
                        </div>
                      ))}
                      {(!achievements || achievements.length === 0) && (
                        <div className="p-4 text-center text-gray-500">
                          No achievements yet
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Upcoming Bookings</h3>
                  <Link href="/rentals" className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                    Book New Session
                  </Link>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date & Time
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Duration
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Kart
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Track
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {bookings.map((booking) => (
                        <tr key={booking.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(booking.date).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {booking.duration} minutes
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {booking.kart}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {booking.track}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-red-600 hover:text-red-900 mr-4">Reschedule</button>
                            <button className="text-gray-600 hover:text-gray-900">Cancel</button>
                          </td>
                        </tr>
                      ))}
                      {(!bookings || bookings.length === 0) && (
                        <tr>
                          <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                            No upcoming bookings
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Race History Tab */}
            {activeTab === 'raceHistory' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Race History</h3>
                
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Position
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Lap Time
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Kart
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Track
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {raceHistory.map((race) => (
                        <tr key={race.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatDate(race.date)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              race.position === 1 ? 'bg-yellow-100 text-yellow-800' : 
                              race.position === 2 ? 'bg-gray-100 text-gray-800' : 
                              race.position === 3 ? 'bg-orange-100 text-orange-800' : 
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {race.position === 1 ? '1st Place' : 
                               race.position === 2 ? '2nd Place' : 
                               race.position === 3 ? '3rd Place' : 
                               `${race.position}th Place`}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {race.lapTime}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {race.kart}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {race.track}
                          </td>
                        </tr>
                      ))}
                      {(!raceHistory || raceHistory.length === 0) && (
                        <tr>
                          <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                            No race history available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Settings</h3>
                
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                        defaultValue={member.name}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                        defaultValue={member.email}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                        defaultValue="+971 50 123 4567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                        defaultValue="1990-01-01"
                      />
                    </div>
                  </div>

                  <div className="mt-8">
                    <h4 className="text-md font-medium text-gray-900 mb-4">Membership Information</h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-500">Current Plan</p>
                          <p className="text-lg font-medium text-gray-900">{member.membershipType} Membership</p>
                        </div>
                        <Link href="/membership" className="text-red-600 hover:text-red-800 text-sm font-medium">
                          Upgrade Plan
                        </Link>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-gray-500">Member Since</p>
                        <p className="text-md text-gray-900">{member.memberSince}</p>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-gray-500">Hours Remaining</p>
                        <p className="text-md text-gray-900">{member.hoursRemaining} hours</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}