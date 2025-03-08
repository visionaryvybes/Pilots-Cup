"use client";

import React, { useState } from 'react';
import { mockAvailability } from '../lib/data/static-data';

interface KartAvailabilityProps {
  kartCategory?: string;
}

export const KartAvailability: React.FC<KartAvailabilityProps> = ({ kartCategory }) => {
  const [date, setDate] = useState<string>(getTodayDate());
  const [loading, setLoading] = useState<boolean>(false);

  function getTodayDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const getAvailabilityColor = (category: string) => {
    if (!mockAvailability || !mockAvailability[category]) return 'bg-gray-200';
    
    const { available, total } = mockAvailability[category];
    const percentage = (available / total) * 100;
    
    if (percentage >= 70) return 'bg-green-500';
    if (percentage >= 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-white mb-4">Kart Availability</h3>
      
      <div className="mb-4">
        <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1">
          Select Date
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={handleDateChange}
          className="bg-gray-800 text-white rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>
      
      {loading ? (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
        </div>
      ) : mockAvailability ? (
        <div className="space-y-3">
          {Object.keys(mockAvailability)
            .filter(category => !kartCategory || category === kartCategory.toLowerCase())
            .map(category => (
              <div key={category} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${getAvailabilityColor(category)} mr-2`}></div>
                  <span className="text-gray-300 capitalize">{category}</span>
                </div>
                <div className="text-white">
                  {mockAvailability[category].available}/{mockAvailability[category].total} Available
                </div>
              </div>
            ))}
        </div>
      ) : null}
      
      <div className="mt-4 text-sm text-gray-400">
        <p>Note: Availability is subject to change. Please contact us for real-time updates.</p>
      </div>
    </div>
  );
}; 