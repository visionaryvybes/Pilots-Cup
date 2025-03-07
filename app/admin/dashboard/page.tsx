'use client';

import {
    CalendarIcon,
    ChartBarIcon,
    ClockIcon,
    Cog6ToothIcon,
    CurrencyDollarIcon,
    UserIcon,
    UsersIcon,
    WrenchScrewdriverIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Mock data for the dashboard
const mockStats = [
  { name: 'Total Members', value: '342', icon: <UserIcon className="h-6 w-6" />, change: '+12%', changeType: 'increase' },
  { name: 'Monthly Bookings', value: '1,245', icon: <CalendarIcon className="h-6 w-6" />, change: '+23%', changeType: 'increase' },
  { name: 'Revenue', value: 'AED 85,400', icon: <CurrencyDollarIcon className="h-6 w-6" />, change: '+18%', changeType: 'increase' },
  { name: 'Active Karts', value: '24/30', icon: <WrenchScrewdriverIcon className="h-6 w-6" />, change: '-2', changeType: 'decrease' },
];

const mockRecentBookings = [
  { id: 1, customer: 'Ahmed Al-Mansouri', date: '2023-12-10', time: '14:00', kartType: 'Rotax Senior', status: 'Completed' },
  { id: 2, customer: 'Sarah Johnson', date: '2023-12-10', time: '15:30', kartType: 'Rotax Junior', status: 'Completed' },
  { id: 3, customer: 'Mohammed Al-Qasimi', date: '2023-12-11', time: '10:00', kartType: 'Rotax DD2', status: 'Confirmed' },
  { id: 4, customer: 'Emma Williams', date: '2023-12-11', time: '11:30', kartType: 'Rotax Senior', status: 'Confirmed' },
  { id: 5, customer: 'John Smith', date: '2023-12-12', time: '16:00', kartType: 'Rotax Senior', status: 'Pending' },
];

const mockNewMembers = [
  { id: 1, name: 'Fatima Al-Ali', email: 'fatima@example.com', joinDate: '2023-12-08', plan: 'Gold' },
  { id: 2, name: 'David Chen', email: 'david@example.com', joinDate: '2023-12-07', plan: 'Silver' },
  { id: 3, name: 'Rashed Al-Nuaimi', email: 'rashed@example.com', joinDate: '2023-12-05', plan: 'Platinum' },
];

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check if we're on the client side to avoid hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Simulate authentication check
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, this would check for a valid auth token
        const isAuthenticated = localStorage.getItem('adminAuthenticated');
        
        if (!isAuthenticated && isClient) {
          // Redirect to login if not authenticated
          window.location.href = '/admin';
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        window.location.href = '/admin';
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
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <div className="relative h-10 w-10 mr-3">
              <div className="absolute inset-0 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xs">PC</div>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Admin Dashboard</h1>
          </div>
          <div className="flex items-center">
            <span className="mr-4 text-sm text-gray-700">Admin User</span>
            <button 
              onClick={() => {
                localStorage.removeItem('adminAuthenticated');
                window.location.href = '/admin';
              }}
              className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 bg-white rounded-lg shadow">
            <nav className="p-4">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className={`w-full flex items-center p-2 text-base font-normal rounded-lg ${
                      activeTab === 'dashboard' 
                        ? 'bg-red-100 text-red-700' 
                        : 'text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <ChartBarIcon className="h-6 w-6 mr-3" />
                    <span>Dashboard</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('members')}
                    className={`w-full flex items-center p-2 text-base font-normal rounded-lg ${
                      activeTab === 'members' 
                        ? 'bg-red-100 text-red-700' 
                        : 'text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <UsersIcon className="h-6 w-6 mr-3" />
                    <span>Members</span>
                  </button>
                </li>
                <li>
                  <Link
                    href="/admin/members"
                    className="w-full flex items-center p-2 text-base font-normal rounded-lg text-gray-900 hover:bg-gray-100"
                  >
                    <UsersIcon className="h-6 w-6 mr-3" />
                    <span>Members Management</span>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className={`w-full flex items-center p-2 text-base font-normal rounded-lg ${
                      activeTab === 'bookings' 
                        ? 'bg-red-100 text-red-700' 
                        : 'text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <CalendarIcon className="h-6 w-6 mr-3" />
                    <span>Bookings</span>
                  </button>
                </li>
                <li>
                  <Link
                    href="/admin/bookings"
                    className="w-full flex items-center p-2 text-base font-normal rounded-lg text-gray-900 hover:bg-gray-100"
                  >
                    <CalendarIcon className="h-6 w-6 mr-3" />
                    <span>Bookings Management</span>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('sessions')}
                    className={`w-full flex items-center p-2 text-base font-normal rounded-lg ${
                      activeTab === 'sessions' 
                        ? 'bg-red-100 text-red-700' 
                        : 'text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <ClockIcon className="h-6 w-6 mr-3" />
                    <span>Sessions</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('maintenance')}
                    className={`w-full flex items-center p-2 text-base font-normal rounded-lg ${
                      activeTab === 'maintenance' 
                        ? 'bg-red-100 text-red-700' 
                        : 'text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <WrenchScrewdriverIcon className="h-6 w-6 mr-3" />
                    <span>Maintenance</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`w-full flex items-center p-2 text-base font-normal rounded-lg ${
                      activeTab === 'settings' 
                        ? 'bg-red-100 text-red-700' 
                        : 'text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Cog6ToothIcon className="h-6 w-6 mr-3" />
                    <span>Settings</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Overview</h2>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {mockStats.map((stat, index) => (
                    <div key={index} className="overflow-hidden rounded-lg bg-white shadow">
                      <div className="p-5">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-red-100 text-red-600">
                              {stat.icon}
                            </div>
                          </div>
                          <div className="ml-5 w-0 flex-1">
                            <dl>
                              <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                              <dd>
                                <div className="text-lg font-medium text-gray-900">{stat.value}</div>
                              </dd>
                            </dl>
                          </div>
                        </div>
                      </div>
                      <div className={`bg-gray-50 px-5 py-3 ${
                        stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        <div className="text-sm">
                          {stat.change} from last month
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent Bookings */}
                <div className="overflow-hidden rounded-lg bg-white shadow">
                  <div className="p-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Bookings</h3>
                    <div className="mt-6 flow-root">
                      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                          <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                              <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Customer</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Time</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Kart Type</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {mockRecentBookings.map((booking) => (
                                <tr key={booking.id}>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{booking.customer}</td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{booking.date}</td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{booking.time}</td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{booking.kartType}</td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                                    <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                      booking.status === 'Completed' 
                                        ? 'bg-green-100 text-green-800' 
                                        : booking.status === 'Confirmed' 
                                        ? 'bg-blue-100 text-blue-800' 
                                        : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                      {booking.status}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Link
                        href="/admin/bookings"
                        className="text-sm font-medium text-red-600 hover:text-red-500"
                      >
                        View all bookings
                      </Link>
                    </div>
                  </div>
                </div>

                {/* New Members */}
                <div className="overflow-hidden rounded-lg bg-white shadow">
                  <div className="p-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">New Members</h3>
                    <div className="mt-6 flow-root">
                      <ul className="divide-y divide-gray-200">
                        {mockNewMembers.map((member) => (
                          <li key={member.id} className="py-4">
                            <div className="flex items-center space-x-4">
                              <div className="flex-shrink-0">
                                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                                  {member.name.charAt(0)}
                                </div>
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium text-gray-900">{member.name}</p>
                                <p className="truncate text-sm text-gray-500">{member.email}</p>
                              </div>
                              <div>
                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                  member.plan === 'Platinum' 
                                    ? 'bg-purple-100 text-purple-800' 
                                    : member.plan === 'Gold' 
                                    ? 'bg-yellow-100 text-yellow-800' 
                                    : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {member.plan}
                                </span>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-6">
                      <Link
                        href="/admin/members"
                        className="text-sm font-medium text-red-600 hover:text-red-500"
                      >
                        View all members
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Members Tab */}
            {activeTab === 'members' && (
              <div className="bg-white shadow rounded-lg p-6">
                <div className="sm:flex sm:items-center">
                  <div className="sm:flex-auto">
                    <h2 className="text-xl font-semibold text-gray-900">Members</h2>
                    <p className="mt-2 text-sm text-gray-700">
                      A list of all members including their name, email, membership plan, and status.
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700"
                    >
                      Add member
                    </button>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Search members..."
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                    />
                  </div>
                  <div className="ml-4">
                    <select
                      className="rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                    >
                      <option>All Plans</option>
                      <option>Platinum</option>
                      <option>Gold</option>
                      <option>Silver</option>
                    </select>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-center text-gray-500 py-8">
                    Member management functionality would be implemented here.
                  </p>
                </div>
              </div>
            )}

            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <div className="bg-white shadow rounded-lg p-6">
                <div className="sm:flex sm:items-center">
                  <div className="sm:flex-auto">
                    <h2 className="text-xl font-semibold text-gray-900">Bookings</h2>
                    <p className="mt-2 text-sm text-gray-700">
                      Manage all bookings, check-ins, and session details.
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700"
                    >
                      Create booking
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-center text-gray-500 py-8">
                    Booking management functionality would be implemented here.
                  </p>
                </div>
              </div>
            )}

            {/* Sessions Tab */}
            {activeTab === 'sessions' && (
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900">Sessions</h2>
                <p className="mt-2 text-sm text-gray-700">
                  Track and manage racing sessions, lap times, and results.
                </p>
                <div className="mt-6">
                  <p className="text-center text-gray-500 py-8">
                    Session management functionality would be implemented here.
                  </p>
                </div>
              </div>
            )}

            {/* Maintenance Tab */}
            {activeTab === 'maintenance' && (
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900">Maintenance</h2>
                <p className="mt-2 text-sm text-gray-700">
                  Track kart maintenance, repairs, and inventory.
                </p>
                <div className="mt-6">
                  <p className="text-center text-gray-500 py-8">
                    Maintenance management functionality would be implemented here.
                  </p>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900">Settings</h2>
                <p className="mt-2 text-sm text-gray-700">
                  Configure system settings, user permissions, and preferences.
                </p>
                <div className="mt-6">
                  <p className="text-center text-gray-500 py-8">
                    Settings functionality would be implemented here.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 