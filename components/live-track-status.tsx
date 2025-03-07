'use client';

import { ClockIcon, CloudIcon, SunIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

// Mock data for track status
const initialTrackData = {
  currentOccupancy: 12,
  maxCapacity: 20,
  upcomingSessions: [
    { id: 1, time: '14:00', type: 'Open Session', availability: 'Limited Spots' },
    { id: 2, time: '16:00', type: 'Junior Training', availability: 'Available' },
    { id: 3, time: '18:00', type: 'Race Night', availability: 'Filling Fast' }
  ],
  weather: {
    condition: 'Sunny',
    temperature: 32,
    windSpeed: 8,
    trackCondition: 'Dry'
  }
};

export function LiveTrackStatus() {
  const [trackData, setTrackData] = useState(initialTrackData);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    // Update current time every minute
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

    // In a real app, we would fetch track data from an API
    // For demo purposes, we'll simulate data changes
    const dataInterval = setInterval(() => {
      setTrackData((prev) => ({
        ...prev,
        currentOccupancy: Math.floor(Math.random() * (prev.maxCapacity + 1))
      }));
    }, 10000);

    return () => {
      clearInterval(interval);
      clearInterval(dataInterval);
    };
  }, []);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <SunIcon className="h-6 w-6 text-yellow-500" />;
      case 'cloudy':
        return <CloudIcon className="h-6 w-6 text-gray-500" />;
      case 'rainy':
        return <CloudIcon className="h-6 w-6 text-blue-500" />;
      default:
        return <SunIcon className="h-6 w-6 text-yellow-500" />;
    }
  };

  const getOccupancyColor = () => {
    const percentage = (trackData.currentOccupancy / trackData.maxCapacity) * 100;
    if (percentage < 50) return 'text-green-600';
    if (percentage < 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability.toLowerCase()) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'limited spots':
        return 'bg-yellow-100 text-yellow-800';
      case 'filling fast':
        return 'bg-orange-100 text-orange-800';
      case 'full':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Live Track Status</h3>
          <div className="flex items-center text-sm text-gray-500">
            <ClockIcon className="mr-1 h-4 w-4" />
            <span>Updated at {currentTime}</span>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {/* Current Occupancy */}
          <div className="rounded-lg bg-gray-50 p-4">
            <div className="flex items-center">
              <UserGroupIcon className="h-8 w-8 text-gray-400" />
              <div className="ml-4">
                <h4 className="text-sm font-medium text-gray-500">Current Occupancy</h4>
                <div className="mt-1 flex items-baseline">
                  <p className={`text-2xl font-semibold ${getOccupancyColor()}`}>
                    {trackData.currentOccupancy}
                  </p>
                  <p className="ml-2 text-sm text-gray-500">/ {trackData.maxCapacity} karts</p>
                </div>
                <div className="mt-2">
                  <div className="relative h-2 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className={`absolute h-full rounded-full ${
                        getOccupancyColor().replace('text-', 'bg-')
                      }`}
                      style={{
                        width: `${(trackData.currentOccupancy / trackData.maxCapacity) * 100}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Weather Conditions */}
          <div className="rounded-lg bg-gray-50 p-4">
            <h4 className="text-sm font-medium text-gray-500">Weather Conditions</h4>
            <div className="mt-2 flex items-center">
              {getWeatherIcon(trackData.weather.condition)}
              <div className="ml-3">
                <p className="text-lg font-medium text-gray-900">
                  {trackData.weather.condition}, {trackData.weather.temperature}°C
                </p>
                <p className="text-sm text-gray-500">
                  Wind: {trackData.weather.windSpeed} km/h • Track: {trackData.weather.trackCondition}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-lg bg-gray-50 p-4">
            <h4 className="text-sm font-medium text-gray-500">Quick Actions</h4>
            <div className="mt-2 space-y-2">
              <button className="w-full rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700">
                Book a Session
              </button>
              <button className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                Check Lap Times
              </button>
            </div>
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-500">Upcoming Sessions Today</h4>
          <ul className="mt-2 divide-y divide-gray-200">
            {trackData.upcomingSessions.map((session) => (
              <li key={session.id} className="py-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{session.time} - {session.type}</p>
                  </div>
                  <div>
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getAvailabilityColor(
                        session.availability
                      )}`}
                    >
                      {session.availability}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 