'use client';

import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';
import { addDays, addWeeks, format, isSameDay, startOfWeek } from 'date-fns';
import { useState } from 'react';

// Types for our booking system
interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  kartType: string;
}

interface DaySchedule {
  date: Date;
  slots: TimeSlot[];
}

// Mock data for available slots
const generateMockSchedule = (startDate: Date): DaySchedule[] => {
  const weekStart = startOfWeek(startDate, { weekStartsOn: 1 });
  const schedule: DaySchedule[] = [];

  // Generate 7 days of schedule
  for (let i = 0; i < 7; i++) {
    const day = addDays(weekStart, i);
    const slots: TimeSlot[] = [];

    // Generate slots from 10 AM to 10 PM
    for (let hour = 10; hour < 22; hour++) {
      // Add slots every 30 minutes
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        
        // Randomly determine availability (70% chance of being available)
        const available = Math.random() > 0.3;
        
        // Randomly assign kart types
        const kartTypes = ['Rotax Junior', 'Rotax Senior', 'Rotax DD2'];
        const kartType = kartTypes[Math.floor(Math.random() * kartTypes.length)] || '';
        
        slots.push({
          id: `${format(day, 'yyyy-MM-dd')}-${timeString}`,
          time: timeString,
          available,
          kartType: available ? kartType : ''
        });
      }
    }

    schedule.push({
      date: day,
      slots
    });
  }

  return schedule;
};

export default function BookingCalendar() {
  const [currentWeek, setCurrentWeek] = useState<Date>(new Date());
  const [schedule, setSchedule] = useState<DaySchedule[]>(generateMockSchedule(currentWeek));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  // Navigate to next week
  const goToNextWeek = () => {
    const nextWeek = addWeeks(currentWeek, 1);
    setCurrentWeek(nextWeek);
    setSchedule(generateMockSchedule(nextWeek));
    setSelectedDate(null);
    setSelectedSlot(null);
  };

  // Navigate to previous week
  const goToPreviousWeek = () => {
    const previousWeek = addWeeks(currentWeek, -1);
    setCurrentWeek(previousWeek);
    setSchedule(generateMockSchedule(previousWeek));
    setSelectedDate(null);
    setSelectedSlot(null);
  };

  // Select a date to view its slots
  const selectDate = (date: Date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  // Select a time slot
  const selectSlot = (slot: TimeSlot) => {
    if (slot.available) {
      setSelectedSlot(slot);
    }
  };

  // Get slots for the selected date
  const getSlotsForSelectedDate = () => {
    if (!selectedDate) return [];
    const daySchedule = schedule.find(day => isSameDay(day.date, selectedDate));
    return daySchedule ? daySchedule.slots : [];
  };

  // Book the selected slot
  const bookSelectedSlot = () => {
    if (!selectedSlot || !selectedDate) return;
    
    // In a real app, this would make an API call to book the slot
    alert(`Booking confirmed for ${format(selectedDate, 'MMMM d, yyyy')} at ${selectedSlot.time} for ${selectedSlot.kartType}`);
    
    // Update the schedule to mark the slot as unavailable
    const updatedSchedule = schedule.map(day => {
      if (isSameDay(day.date, selectedDate)) {
        return {
          ...day,
          slots: day.slots.map(slot => 
            slot.id === selectedSlot.id ? { ...slot, available: false } : slot
          )
        };
      }
      return day;
    });
    
    setSchedule(updatedSchedule);
    setSelectedSlot(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Book a Session</h2>
        <div className="flex space-x-2">
          <button 
            onClick={goToPreviousWeek}
            className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700"
          >
            Previous Week
          </button>
          <button 
            onClick={goToNextWeek}
            className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700"
          >
            Next Week
          </button>
        </div>
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-2 mb-6">
        {schedule.map((day) => (
          <button
            key={format(day.date, 'yyyy-MM-dd')}
            onClick={() => selectDate(day.date)}
            className={`p-4 rounded-lg text-center transition-colors ${
              selectedDate && isSameDay(day.date, selectedDate)
                ? 'bg-red-600 text-white'
                : 'bg-gray-50 hover:bg-gray-100 text-gray-900'
            }`}
          >
            <div className="font-medium">{format(day.date, 'EEE')}</div>
            <div className="text-lg font-bold">{format(day.date, 'd')}</div>
            <div className="text-sm mt-1">
              {day.slots.filter(slot => slot.available).length} slots
            </div>
          </button>
        ))}
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Available Times for {format(selectedDate, 'MMMM d, yyyy')}
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {getSlotsForSelectedDate().map((slot) => (
              <button
                key={slot.id}
                onClick={() => selectSlot(slot)}
                disabled={!slot.available}
                className={`p-2 rounded-md text-center ${
                  !slot.available
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : selectedSlot && selectedSlot.id === slot.id
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-900'
                }`}
              >
                <div className="flex items-center justify-center">
                  <ClockIcon className="h-4 w-4 mr-1" />
                  <span>{slot.time}</span>
                </div>
                {slot.available && (
                  <div className="text-xs mt-1">{slot.kartType}</div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Booking Form */}
      {selectedSlot && (
        <div className="mt-8 p-4 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Booking</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex items-center">
              <CalendarIcon className="h-5 w-5 text-gray-500 mr-2" />
              <span>{selectedDate && format(selectedDate, 'MMMM d, yyyy')}</span>
            </div>
            <div className="flex items-center">
              <ClockIcon className="h-5 w-5 text-gray-500 mr-2" />
              <span>{selectedSlot.time}</span>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kart Type
            </label>
            <div className="p-2 bg-gray-50 rounded-md">
              {selectedSlot.kartType}
            </div>
          </div>
          <button
            onClick={bookSelectedSlot}
            className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md"
          >
            Confirm Booking
          </button>
        </div>
      )}
    </div>
  );
} 