"use client";

import React, { useState, useEffect } from 'react';

interface KartAvailabilityProps {
  kartCategory?: string;
}

export const KartAvailability: React.FC<KartAvailabilityProps> = ({ kartCategory }) => {
  const [date, setDate] = useState<string>(getTodayDate());
  const [availability, setAvailability] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  function getTodayDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  useEffect(() => {
    // This is a simplified version that doesn't rely on WebSockets
    // Instead, we'll show mock data
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockAvailability = {
        bambino: { available: 4, total: 5, maintenance: 1 },
        micro: { available: 3, total: 4, maintenance: 1 },
        mini: { available: 5, total: 5, maintenance: 0 },
        junior: { available: 4, total: 6, maintenance: 2 },
        senior: { available: 7, total: 8, maintenance: 1 },
        dd2: { available: 3, total: 4, maintenance: 1 }
      };
      
      setAvailability(mockAvailability);
      setLoading(false);
    }, 1000);
  }, [date]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const getAvailabilityColor = (category: string) => {
    if (!availability || !availability[category]) return 'bg-gray-200';
    
    const { available, total } = availability[category];
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
      ) : error ? (
        <div className="text-red-500 text-center py-4">{error}</div>
      ) : availability ? (
        <div className="space-y-3">
          {Object.keys(availability)
            .filter(category => !kartCategory || category === kartCategory.toLowerCase())
            .map(category => (
              <div key={category} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${getAvailabilityColor(category)} mr-2`}></div>
                  <span className="text-gray-300 capitalize">{category}</span>
                </div>
                <div className="text-white">
                  {availability[category].available}/{availability[category].total} Available
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