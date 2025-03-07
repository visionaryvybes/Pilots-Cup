'use client';

import {
    ArrowLeftIcon,
    CheckCircleIcon,
    MagnifyingGlassIcon,
    PencilSquareIcon,
    PlusIcon,
    TrashIcon,
    XCircleIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Booking {
  id: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  time: string;
  duration: string;
  kartType: string;
  status: string;
  paymentStatus: string;
  amount: string;
}

const mockBookings: Booking[] = [
  {
    id: 1,
    customerName: 'Ahmed Al-Mansouri',
    customerEmail: 'ahmed@example.com',
    customerPhone: '+971 50 123 4567',
    date: '2023-12-10',
    time: '14:00',
    duration: '30 mins',
    kartType: 'Rotax Senior',
    status: 'Completed',
    paymentStatus: 'Paid',
    amount: 'AED 150'
  },
  { 
    id: 2, 
    customerName: 'Sarah Johnson', 
    customerEmail: 'sarah@example.com', 
    customerPhone: '+971 55 987 6543', 
    date: '2023-12-15', 
    time: '15:30', 
    duration: '30 min',
    kartType: 'Rotax Junior',
    status: 'Confirmed',
    paymentStatus: 'Paid',
    amount: 'AED 120'
  },
  { 
    id: 3, 
    customerName: 'Mohammed Al-Qasimi', 
    customerEmail: 'mohammed@example.com', 
    customerPhone: '+971 52 456 7890', 
    date: '2023-12-16', 
    time: '10:00', 
    duration: '60 min',
    kartType: 'Rotax DD2',
    status: 'Pending',
    paymentStatus: 'Awaiting Payment',
    amount: 'AED 250'
  },
  { 
    id: 4, 
    customerName: 'Emma Williams', 
    customerEmail: 'emma@example.com', 
    customerPhone: '+971 54 321 0987', 
    date: '2023-12-16', 
    time: '11:30', 
    duration: '30 min',
    kartType: 'Rotax Senior',
    status: 'Confirmed',
    paymentStatus: 'Paid',
    amount: 'AED 150'
  },
  { 
    id: 5, 
    customerName: 'John Smith', 
    customerEmail: 'john@example.com', 
    customerPhone: '+971 55 432 1098', 
    date: '2023-12-17', 
    time: '16:00', 
    duration: '30 min',
    kartType: 'Rotax Senior',
    status: 'Cancelled',
    paymentStatus: 'Refunded',
    amount: 'AED 150'
  },
  { 
    id: 6, 
    customerName: 'Fatima Al-Ali', 
    customerEmail: 'fatima@example.com', 
    customerPhone: '+971 50 567 8901', 
    date: '2023-12-17', 
    time: '17:30', 
    duration: '60 min',
    kartType: 'Rotax Micro',
    status: 'Confirmed',
    paymentStatus: 'Paid',
    amount: 'AED 200'
  },
  { 
    id: 7, 
    customerName: 'David Chen', 
    customerEmail: 'david@example.com', 
    customerPhone: '+971 56 789 0123', 
    date: '2023-12-18', 
    time: '09:00', 
    duration: '30 min',
    kartType: 'Rotax Mini',
    status: 'Pending',
    paymentStatus: 'Awaiting Payment',
    amount: 'AED 120'
  },
];

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
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

  // Filter bookings based on search term and filters
  const filteredBookings = bookings.filter((booking: Booking) => {
    const matchesSearch = 
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customerPhone.includes(searchTerm);

    const matchesDate = !filterDate || booking.date === filterDate;
    const matchesStatus = filterStatus === 'All' || booking.status === filterStatus;

    return matchesSearch && matchesDate && matchesStatus;
  });

  // Handle booking deletion
  const handleDeleteBooking = (id: number) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      setBookings(bookings.filter(booking => booking.id !== id));
    }
  };

  // Handle booking confirmation
  const handleConfirmBooking = (id: number) => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status: 'Confirmed' } : booking
    ));
  };

  // Handle booking cancellation
  const handleCancelBooking = (id: number) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      setBookings(bookings.map(booking => 
        booking.id === id ? { ...booking, status: 'Cancelled' } : booking
      ));
    }
  };

  if (!isClient || isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading bookings...</p>
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
            <Link href="/admin/dashboard" className="flex items-center text-gray-500 hover:text-gray-700 mr-4">
              <ArrowLeftIcon className="h-5 w-5 mr-1" />
              <span>Back to Dashboard</span>
            </Link>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Booking Management</h1>
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
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Filters and Search */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full rounded-md border-0 py-2 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                    placeholder="Search bookings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="date"
                  className="rounded-md border-0 py-2 pl-3 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                />
                <select
                  className="rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="All">All Status</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pending">Pending</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
                >
                  <PlusIcon className="h-5 w-5 mr-2" />
                  New Booking
                </button>
              </div>
            </div>
          </div>

          {/* Bookings Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900">Customer</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date & Time</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Duration</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Kart Type</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Amount</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Payment</th>
                  <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm">
                        <div className="font-medium text-gray-900">{booking.customerName}</div>
                        <div className="text-gray-500">{booking.customerEmail}</div>
                        <div className="text-gray-500">{booking.customerPhone}</div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div>{booking.date}</div>
                        <div>{booking.time}</div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{booking.duration}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{booking.kartType}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{booking.amount}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          booking.status === 'Confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : booking.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          booking.paymentStatus === 'Paid' 
                            ? 'bg-green-100 text-green-800' 
                            : booking.paymentStatus === 'Awaiting Payment'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {booking.paymentStatus}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-right">
                        <div className="flex justify-end space-x-2">
                          {booking.status === 'Pending' && (
                            <button
                              type="button"
                              className="rounded-md bg-white p-1 text-gray-400 hover:text-green-600"
                              onClick={() => handleConfirmBooking(booking.id)}
                              title="Confirm Booking"
                            >
                              <CheckCircleIcon className="h-5 w-5" />
                            </button>
                          )}
                          {booking.status !== 'Cancelled' && (
                            <button
                              type="button"
                              className="rounded-md bg-white p-1 text-gray-400 hover:text-red-600"
                              onClick={() => handleCancelBooking(booking.id)}
                              title="Cancel Booking"
                            >
                              <XCircleIcon className="h-5 w-5" />
                            </button>
                          )}
                          <button
                            type="button"
                            className="rounded-md bg-white p-1 text-gray-400 hover:text-blue-600"
                            title="Edit Booking"
                          >
                            <PencilSquareIcon className="h-5 w-5" />
                          </button>
                          <button
                            type="button"
                            className="rounded-md bg-white p-1 text-gray-400 hover:text-red-600"
                            onClick={() => handleDeleteBooking(booking.id)}
                            title="Delete Booking"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500">
                      No bookings found matching your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
              <button className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                Previous
              </button>
              <button className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                Next
              </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredBookings.length}</span> of{' '}
                  <span className="font-medium">{filteredBookings.length}</span> results
                </p>
              </div>
              <div>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  <button className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    <span className="sr-only">Previous</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button aria-current="page" className="relative z-10 inline-flex items-center bg-red-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                    1
                  </button>
                  <button className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    <span className="sr-only">Next</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 