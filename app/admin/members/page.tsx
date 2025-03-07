'use client';

import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Mock data for members
const mockMembers = [
  { 
    id: 1, 
    name: 'Ahmed Al-Mansouri', 
    email: 'ahmed@example.com', 
    phone: '+971 50 123 4567', 
    membershipType: 'Gold', 
    joinDate: '2023-01-15', 
    status: 'Active',
    lastVisit: '2023-12-01'
  },
  { 
    id: 2, 
    name: 'Sarah Thompson', 
    email: 'sarah@example.com', 
    phone: '+971 55 987 6543', 
    membershipType: 'Silver', 
    joinDate: '2023-03-22', 
    status: 'Active',
    lastVisit: '2023-11-28'
  },
  { 
    id: 3, 
    name: 'Mohammed Al-Hashimi', 
    email: 'mohammed@example.com', 
    phone: '+971 52 456 7890', 
    membershipType: 'Gold', 
    joinDate: '2022-11-05', 
    status: 'Active',
    lastVisit: '2023-12-03'
  },
  { 
    id: 4, 
    name: 'Emma Williams', 
    email: 'emma@example.com', 
    phone: '+971 54 321 0987', 
    membershipType: 'Silver', 
    joinDate: '2023-06-10', 
    status: 'Inactive',
    lastVisit: '2023-10-15'
  },
  { 
    id: 5, 
    name: 'Rashed Al-Nuaimi', 
    email: 'rashed@example.com', 
    phone: '+971 56 789 0123', 
    membershipType: 'Family', 
    joinDate: '2023-02-18', 
    status: 'Active',
    lastVisit: '2023-11-30'
  },
  { 
    id: 6, 
    name: 'Fatima Al-Ali', 
    email: 'fatima@example.com', 
    phone: '+971 50 567 8901', 
    membershipType: 'Pair', 
    joinDate: '2023-04-30', 
    status: 'Active',
    lastVisit: '2023-11-25'
  },
  { 
    id: 7, 
    name: 'John Smith', 
    email: 'john@example.com', 
    phone: '+971 55 432 1098', 
    membershipType: 'Silver', 
    joinDate: '2023-07-12', 
    status: 'Inactive',
    lastVisit: '2023-09-20'
  },
];

export default function MembersPage() {
  const [members, setMembers] = useState(mockMembers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterMembership, setFilterMembership] = useState('All');
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

  // Filter members based on search term and filters
  const filteredMembers = members.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.includes(searchTerm);
    
    const matchesStatus = filterStatus === 'All' || member.status === filterStatus;
    const matchesMembership = filterMembership === 'All' || member.membershipType === filterMembership;
    
    return matchesSearch && matchesStatus && matchesMembership;
  });

  // Handle member deletion
  const handleDeleteMember = (id: number) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      setMembers(members.filter(member => member.id !== id));
    }
  };

  if (!isClient || isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading members...</p>
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
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Member Management</h1>
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
                    placeholder="Search members..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <select
                  className="rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <select
                  className="rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                  value={filterMembership}
                  onChange={(e) => setFilterMembership(e.target.value)}
                >
                  <option value="All">All Memberships</option>
                  <option value="Silver">Silver</option>
                  <option value="Gold">Gold</option>
                  <option value="Pair">Pair</option>
                  <option value="Family">Family</option>
                </select>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
                >
                  <UserIcon className="h-5 w-5 mr-2" />
                  Add Member
                </button>
              </div>
            </div>
          </div>

          {/* Members Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900">Name</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Phone</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Membership</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Join Date</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Last Visit</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredMembers.length > 0 ? (
                  filteredMembers.map((member) => (
                    <tr key={member.id}>
                      <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-gray-900">
                        {member.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{member.email}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{member.phone}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          member.membershipType === 'Gold' 
                            ? 'bg-yellow-100 text-yellow-800'
                            : member.membershipType === 'Silver'
                            ? 'bg-gray-100 text-gray-800'
                            : member.membershipType === 'Pair'
                            ? 'bg-blue-100 text-blue-800'
                            : member.membershipType === 'Family'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-white'
                        }`}>
                          {member.membershipType}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{member.joinDate}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{member.lastVisit}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          member.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {member.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-right">
                        <div className="flex justify-end space-x-2">
                          <button
                            type="button"
                            className="rounded-md bg-white p-1 text-gray-400 hover:text-blue-600"
                          >
                            <PencilSquareIcon className="h-5 w-5" />
                          </button>
                          <button
                            type="button"
                            className="rounded-md bg-white p-1 text-gray-400 hover:text-red-600"
                            onClick={() => handleDeleteMember(member.id)}
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
                      No members found matching your search criteria.
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
                  Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredMembers.length}</span> of{' '}
                  <span className="font-medium">{filteredMembers.length}</span> results
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