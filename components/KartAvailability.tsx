'use client';

import { useState } from 'react';
import { useKartAvailability } from '@/hooks/useKartAvailability';

export function KartAvailability({ category }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { availability, loading, error } = useKartAvailability(category, selectedDate);

  // Function to format date for input
  const formatDateForInput = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Function to handle date change
  const handleDateChange = (e) => {
    setSelectedDate(new Date(e.target.value));
  };

  return (
    <div className="bg-neutral-900 p-6 rounded-lg border border-neutral-800">
      <h3 className="text-xl font-bold text-white mb-4">Real-Time Availability</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-neutral-300 mb-2">
          Select Date
        </label>
        <input
          type="date"
          value={formatDateForInput(selectedDate)}
          onChange={handleDateChange}
          className="block w-full rounded-md border-neutral-700 bg-neutral-800 text-white py-2 px-3 focus:border-red-500 focus:ring-red-500"
        />
      </div>

      {loading ? (
        <div className="p-4 text-center">
          <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-red-500 border-r-transparent"></div>
          <p className="mt-2 text-neutral-300">Loading availability...</p>
        </div>
      ) : error ? (
        <div className="p-4 text-center text-red-500">
          <p>{error}</p>
          <p className="mt-2 text-sm text-neutral-400">
            Please try again or contact support if the problem persists.
          </p>
        </div>
      ) : (
        <>
          <h4 className="text-lg font-semibold text-white mb-2">Available Time Slots</h4>
          {availability && availability.length > 0 ? (
            <div className="grid grid-cols-4 gap-2 mb-4">
              {availability.map((slot) => (
                <button
                  key={slot.time}
                  className={`p-2 rounded-md text-center text-sm ${
                    slot.available 
                      ? 'bg-green-800 hover:bg-green-700 text-white' 
                      : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                  }`}
                  disabled={!slot.available}
                >
                  {slot.time}
                  {slot.available && slot.availableCount && (
                    <span className="block text-xs mt-1">
                      {slot.availableCount} available
                    </span>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-neutral-400 text-center py-4">
              No availability data found for the selected date.
            </p>
          )}
          
          <div className="mt-4">
            <button
              className="w-full rounded-md bg-red-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-red-700"
              onClick={() => alert('Booking functionality will be implemented soon!')}
            >
              Book Selected Time
            </button>
          </div>
        </>
      )}
    </div>
  );
} 