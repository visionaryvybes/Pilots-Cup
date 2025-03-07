'use client';

import { ArrowLeftIcon, ArrowRightIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

// Types for our tour locations
interface TourLocation {
  id: string;
  name: string;
  description: string;
  embedUrl: string;
  hotspots: Hotspot[];
}

interface Hotspot {
  id: string;
  title: string;
  description: string;
  x: number;
  y: number;
  linkedLocationId?: string;
}

// Mock data for tour locations
const tourLocations: TourLocation[] = [
  {
    id: 'main-track',
    name: 'Main Racing Track',
    description: 'Our professional-grade karting track features challenging corners and a long straight for maximum speed.',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0',
    hotspots: [
      {
        id: 'track-turn1',
        title: 'Turn 1',
        description: 'A sharp right-hander that tests your late braking skills.',
        x: 35,
        y: 45
      },
      {
        id: 'track-straight',
        title: 'Main Straight',
        description: 'Reach top speeds on our 150-meter straight.',
        x: 65,
        y: 30
      },
      {
        id: 'to-pit-lane',
        title: 'To Pit Lane',
        description: 'Navigate to the pit lane area.',
        x: 85,
        y: 70,
        linkedLocationId: 'pit-lane'
      }
    ]
  },
  {
    id: 'pit-lane',
    name: 'Pit Lane & Garage',
    description: 'Our professional pit lane and garage area where karts are prepared and maintained.',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0',
    hotspots: [
      {
        id: 'kart-maintenance',
        title: 'Kart Maintenance Area',
        description: 'Where our technicians ensure every kart is in perfect condition.',
        x: 25,
        y: 55
      },
      {
        id: 'to-main-track',
        title: 'To Main Track',
        description: 'Return to the main racing track.',
        x: 75,
        y: 40,
        linkedLocationId: 'main-track'
      },
      {
        id: 'to-lobby',
        title: 'To Lobby',
        description: 'Go to the main lobby and reception area.',
        x: 50,
        y: 80,
        linkedLocationId: 'lobby'
      }
    ]
  },
  {
    id: 'lobby',
    name: 'Main Lobby & Reception',
    description: 'Our welcoming lobby where you can register, book sessions, and get equipped for racing.',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0',
    hotspots: [
      {
        id: 'reception-desk',
        title: 'Reception Desk',
        description: 'Check in, book sessions, and get information about our services.',
        x: 40,
        y: 60
      },
      {
        id: 'equipment-area',
        title: 'Racing Equipment',
        description: 'Get fitted with helmets, suits, and other safety gear.',
        x: 70,
        y: 50
      },
      {
        id: 'to-pit-lane-from-lobby',
        title: 'To Pit Lane',
        description: 'Head to the pit lane and garage area.',
        x: 20,
        y: 40,
        linkedLocationId: 'pit-lane'
      },
      {
        id: 'to-cafe',
        title: 'To Café',
        description: 'Visit our café for refreshments and snacks.',
        x: 60,
        y: 30,
        linkedLocationId: 'cafe'
      }
    ]
  },
  {
    id: 'cafe',
    name: 'Trackside Café',
    description: 'Enjoy refreshments and meals while watching the action on the track.',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0',
    hotspots: [
      {
        id: 'cafe-seating',
        title: 'Café Seating',
        description: 'Comfortable seating with a view of the track.',
        x: 50,
        y: 50
      },
      {
        id: 'to-lobby-from-cafe',
        title: 'To Lobby',
        description: 'Return to the main lobby and reception area.',
        x: 30,
        y: 70,
        linkedLocationId: 'lobby'
      }
    ]
  }
];

export default function VirtualTour() {
  // Ensure we have a default location
  const defaultLocation = tourLocations[0] || {
    id: 'default',
    name: 'Default Location',
    description: 'No locations available',
    embedUrl: '',
    hotspots: []
  };
  
  const [currentLocation, setCurrentLocation] = useState<TourLocation>(defaultLocation);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  // Navigate to a different location
  const navigateToLocation = (locationId: string) => {
    const location = tourLocations.find(loc => loc.id === locationId);
    if (location) {
      setCurrentLocation(location);
      setActiveHotspot(null);
    }
  };

  // Handle hotspot click
  const handleHotspotClick = (hotspot: Hotspot) => {
    if (hotspot.linkedLocationId) {
      navigateToLocation(hotspot.linkedLocationId);
    } else {
      setActiveHotspot(hotspot);
    }
  };

  // Navigate to next or previous location
  const navigateToNextLocation = () => {
    const currentIndex = tourLocations.findIndex(loc => loc.id === currentLocation.id);
    const nextIndex = (currentIndex + 1) % tourLocations.length;
    const nextLocation = tourLocations[nextIndex];
    if (nextLocation) {
      setCurrentLocation(nextLocation);
      setActiveHotspot(null);
    }
  };

  const navigateToPrevLocation = () => {
    const currentIndex = tourLocations.findIndex(loc => loc.id === currentLocation.id);
    const prevIndex = (currentIndex - 1 + tourLocations.length) % tourLocations.length;
    const prevLocation = tourLocations[prevIndex];
    if (prevLocation) {
      setCurrentLocation(prevLocation);
      setActiveHotspot(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Tour Header */}
      <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">{currentLocation.name}</h2>
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="p-2 rounded-full hover:bg-gray-700"
          aria-label="Toggle information"
        >
          <InformationCircleIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Information Panel */}
      {showInfo && (
        <div className="bg-gray-100 p-4">
          <p className="text-gray-700">{currentLocation.description}</p>
        </div>
      )}

      {/* Tour Viewer */}
      <div className="relative">
        {/* Embedded 360 View or Video */}
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src={currentLocation.embedUrl}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>

        {/* Hotspots */}
        {currentLocation.hotspots.map((hotspot) => (
          <button
            key={hotspot.id}
            onClick={() => handleHotspotClick(hotspot)}
            className={`absolute w-8 h-8 rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 ${
              hotspot.linkedLocationId
                ? 'bg-blue-500 hover:bg-blue-600'
                : 'bg-red-500 hover:bg-red-600'
            }`}
            style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
            aria-label={hotspot.title}
          >
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-white"></span>
            <span className="text-white text-xs">{hotspot.linkedLocationId ? '→' : 'i'}</span>
          </button>
        ))}

        {/* Hotspot Information */}
        {activeHotspot && (
          <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-75 text-white p-4 rounded-lg">
            <h3 className="text-lg font-semibold">{activeHotspot.title}</h3>
            <p>{activeHotspot.description}</p>
            <button
              onClick={() => setActiveHotspot(null)}
              className="mt-2 text-sm text-red-300 hover:text-red-100"
            >
              Close
            </button>
          </div>
        )}

        {/* Navigation Controls */}
        <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4 transform -translate-y-1/2">
          <button
            onClick={navigateToPrevLocation}
            className="bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full"
            aria-label="Previous location"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
          <button
            onClick={navigateToNextLocation}
            className="bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full"
            aria-label="Next location"
          >
            <ArrowRightIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Location Selector */}
      <div className="p-4 bg-gray-100">
        <div className="flex overflow-x-auto space-x-2 pb-2">
          {tourLocations.map((location) => (
            <button
              key={location.id}
              onClick={() => navigateToLocation(location.id)}
              className={`px-4 py-2 rounded-md whitespace-nowrap ${
                currentLocation.id === location.id
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {location.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 