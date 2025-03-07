'use client';

import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

// Types for our events
interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
  registrationUrl: string;
}

// Mock data for upcoming events
const upcomingEvents: Event[] = [
  {
    id: 1,
    title: 'Dubai Karting Championship',
    description: 'The premier karting event in Dubai with competitors from across the UAE and beyond.',
    date: '2023-12-25T09:00:00',
    image: '/images/misc/dr frame.jpg',
    registrationUrl: '/events/register/1'
  },
  {
    id: 2,
    title: 'Junior Racers Tournament',
    description: 'A special event for our junior racers aged 8-14, showcasing the future stars of karting.',
    date: '2023-12-15T14:00:00',
    image: '/images/misc/dr frame.jpg',
    registrationUrl: '/events/register/2'
  },
  {
    id: 3,
    title: 'Corporate Challenge Cup',
    description: 'Teams from leading UAE companies compete for glory and bragging rights in this team-based event.',
    date: '2024-01-10T16:00:00',
    image: '/images/misc/dr frame.jpg',
    registrationUrl: '/events/register/3'
  }
];

// Function to calculate time remaining
const calculateTimeRemaining = (eventDate: string) => {
  const difference = new Date(eventDate).getTime() - new Date().getTime();
  
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }
  
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  
  return { days, hours, minutes, seconds, isExpired: false };
};

// Format date to readable string
const formatEventDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Individual countdown timer component
function CountdownTimer({ eventDate }: { eventDate: string }) {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(eventDate));
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(eventDate));
    }, 1000);
    
    return () => clearInterval(timer);
  }, [eventDate]);
  
  if (timeRemaining.isExpired) {
    return <div className="text-red-600 font-medium">Event has started!</div>;
  }
  
  return (
    <div className="flex space-x-3 text-center">
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-red-600">{timeRemaining.days}</span>
        <span className="text-xs text-gray-500">Days</span>
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-red-600">{timeRemaining.hours}</span>
        <span className="text-xs text-gray-500">Hours</span>
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-red-600">{timeRemaining.minutes}</span>
        <span className="text-xs text-gray-500">Mins</span>
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-red-600">{timeRemaining.seconds}</span>
        <span className="text-xs text-gray-500">Secs</span>
      </div>
    </div>
  );
}

export default function EventCountdown() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {upcomingEvents.map((event) => (
          <div key={event.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <div 
              className="h-48 bg-cover bg-center" 
              style={{ backgroundImage: `url(${event.image})` }}
            >
              <div className="h-full w-full bg-black bg-opacity-40 p-4 flex items-end">
                <h3 className="text-xl font-bold text-white">{event.title}</h3>
              </div>
            </div>
            
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-4">{event.description}</p>
              
              <div className="flex items-center mb-4">
                <CalendarIcon className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-sm text-gray-700">{formatEventDate(event.date)}</span>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <ClockIcon className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-700">Countdown:</span>
                </div>
                <CountdownTimer eventDate={event.date} />
              </div>
              
              <a 
                href={event.registrationUrl}
                className="block w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md text-center"
              >
                Register Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 