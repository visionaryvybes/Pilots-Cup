'use client';

import { ClockIcon, TrophyIcon, UserIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

// Types for our leaderboard
interface RaceResult {
  id: number;
  driverName: string;
  nationality: string;
  lapTime: string;
  position: number;
  date: string;
  kartType: string;
}

// Mock data for race results
const mockRaceResults: RaceResult[] = [
  { id: 1, driverName: 'Ahmed Al-Mansouri', nationality: 'UAE', lapTime: '00:44.876', position: 1, date: '2023-11-25', kartType: 'Rotax Senior' },
  { id: 2, driverName: 'Mohammed Al-Qasimi', nationality: 'UAE', lapTime: '00:45.112', position: 2, date: '2023-11-25', kartType: 'Rotax Senior' },
  { id: 3, driverName: 'Sarah Johnson', nationality: 'UK', lapTime: '00:45.321', position: 3, date: '2023-11-25', kartType: 'Rotax Senior' },
  { id: 4, driverName: 'John Smith', nationality: 'USA', lapTime: '00:45.543', position: 4, date: '2023-11-25', kartType: 'Rotax Senior' },
  { id: 5, driverName: 'Ali Hassan', nationality: 'UAE', lapTime: '00:45.789', position: 5, date: '2023-11-25', kartType: 'Rotax Senior' },
  { id: 6, driverName: 'Emma Williams', nationality: 'UK', lapTime: '00:46.012', position: 6, date: '2023-11-25', kartType: 'Rotax Senior' },
  { id: 7, driverName: 'Fatima Al-Ali', nationality: 'UAE', lapTime: '00:46.234', position: 7, date: '2023-11-25', kartType: 'Rotax Senior' },
  { id: 8, driverName: 'David Chen', nationality: 'China', lapTime: '00:46.456', position: 8, date: '2023-11-25', kartType: 'Rotax Senior' },
  { id: 9, driverName: 'Rashed Al-Nuaimi', nationality: 'UAE', lapTime: '00:46.678', position: 9, date: '2023-11-25', kartType: 'Rotax Senior' },
  { id: 10, driverName: 'Sophia Garcia', nationality: 'Spain', lapTime: '00:46.901', position: 10, date: '2023-11-25', kartType: 'Rotax Senior' },
];

// Categories for filtering
const categories = [
  { id: 'all', name: 'All Categories' },
  { id: 'rotax-junior', name: 'Rotax Junior' },
  { id: 'rotax-senior', name: 'Rotax Senior' },
  { id: 'rotax-dd2', name: 'Rotax DD2' },
];

// Time periods for filtering
const timePeriods = [
  { id: 'all-time', name: 'All Time' },
  { id: 'this-month', name: 'This Month' },
  { id: 'this-week', name: 'This Week' },
  { id: 'today', name: 'Today' },
];

export default function Leaderboard() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('all-time');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter results based on selected category, time period, and search query
  const filteredResults = mockRaceResults.filter(result => {
    // Filter by category
    if (selectedCategory !== 'all') {
      const categoryMatch = result.kartType.toLowerCase().replace(' ', '-') === selectedCategory;
      if (!categoryMatch) return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const nameMatch = result.driverName.toLowerCase().includes(searchQuery.toLowerCase());
      if (!nameMatch) return false;
    }
    
    // In a real app, we would filter by time period using actual dates
    // For now, we'll just return true for all time periods
    return true;
  });

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Race Leaderboard</h2>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          {/* Search */}
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search drivers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <UserIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          
          {/* Time Period Filter */}
          <select
            value={selectedTimePeriod}
            onChange={(e) => setSelectedTimePeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {timePeriods.map(period => (
              <option key={period.id} value={period.id}>
                {period.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Position
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Driver
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nationality
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lap Time
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kart Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredResults.map((result) => (
              <tr key={result.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className={`flex items-center justify-center h-8 w-8 rounded-full ${
                      result.position === 1 ? 'bg-yellow-100 text-yellow-800' : 
                      result.position === 2 ? 'bg-gray-100 text-gray-800' : 
                      result.position === 3 ? 'bg-orange-100 text-orange-800' : 
                      'bg-red-50 text-red-600'
                    }`}>
                      {result.position === 1 ? <TrophyIcon className="h-4 w-4" /> : result.position}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{result.driverName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{result.nationality}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-900">
                    <ClockIcon className="h-4 w-4 mr-1 text-red-500" />
                    {result.lapTime}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{result.kartType}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{result.date}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredResults.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No results found. Try adjusting your filters.</p>
        </div>
      )}

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Leaderboard is updated after each race. Times shown are best lap times.</p>
      </div>
    </div>
  );
} 