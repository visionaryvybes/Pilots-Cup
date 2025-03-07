import { NextResponse } from 'next/server';

// In a real app, this would come from a database
let currentTrackStatus = {
  currentOccupancy: 12,
  maxCapacity: 20,
  weather: {
    condition: 'Sunny',
    temperature: 32,
    windSpeed: 8,
    trackCondition: 'Dry'
  },
  upcomingSessions: [
    { id: 1, time: '14:00', type: 'Open Session', availability: 'Limited Spots' },
    { id: 2, time: '16:00', type: 'Junior Training', availability: 'Available' },
    { id: 3, time: '18:00', type: 'Race Night', availability: 'Filling Fast' }
  ]
};

// Simulate real-time updates
setInterval(() => {
  currentTrackStatus = {
    ...currentTrackStatus,
    currentOccupancy: Math.floor(Math.random() * (currentTrackStatus.maxCapacity + 1)),
    weather: {
      ...currentTrackStatus.weather,
      temperature: 30 + Math.floor(Math.random() * 5),
      windSpeed: 5 + Math.floor(Math.random() * 10)
    }
  };
}, 60000); // Update every minute

export async function GET() {
  return NextResponse.json(currentTrackStatus);
}

export async function HEAD() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// Enable CORS
export const runtime = 'edge';
export const dynamic = 'force-dynamic'; 