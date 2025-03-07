'use client';

import { useState } from 'react';

interface TrackSection {
  id: string;
  name: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  bestTime: string;
  x: number;
  y: number;
}

const trackSections: TrackSection[] = [
  {
    id: 'turn1',
    name: 'Turn 1',
    description: 'Sharp right-hander after the main straight. Late braking point with a tight apex.',
    difficulty: 'medium',
    bestTime: '2.1s',
    x: 25,
    y: 30
  },
  {
    id: 'turn2',
    name: 'S-Curves',
    description: 'Technical S-section requiring precise steering inputs and smooth transitions.',
    difficulty: 'hard',
    bestTime: '4.3s',
    x: 40,
    y: 40
  },
  {
    id: 'turn3',
    name: 'Hairpin',
    description: 'Tight hairpin turn. Brake early and focus on a clean exit to maximize speed on the following straight.',
    difficulty: 'hard',
    bestTime: '3.2s',
    x: 60,
    y: 60
  },
  {
    id: 'turn4',
    name: 'Sweeper',
    description: 'Fast sweeping corner that can be taken at high speed with the right line.',
    difficulty: 'easy',
    bestTime: '1.8s',
    x: 75,
    y: 40
  },
  {
    id: 'turn5',
    name: 'Final Corner',
    description: 'Medium-speed corner leading onto the main straight. Good exit is crucial for lap times.',
    difficulty: 'medium',
    bestTime: '2.5s',
    x: 85,
    y: 20
  }
];

export function TrackMap() {
  const [selectedSection, setSelectedSection] = useState<TrackSection | null>(null);

  const handleSectionClick = (section: TrackSection) => {
    setSelectedSection(section);
  };

  const getDifficultyColor = (difficulty: TrackSection['difficulty']) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'hard':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="relative bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Track Map
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
            Explore our challenging track layout and master every corner
          </p>
        </div>

        <div className="mt-12 lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Track Visualization */}
          <div className="col-span-2">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-gray-100">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-gray-400">Track visualization</p>
                {/* This would be replaced with an actual track map image */}
                <div className="absolute inset-0 bg-gray-200 opacity-50 rounded-lg" />
                
                {/* Track Section Markers */}
                {trackSections.map((section) => (
                  <button
                    key={section.id}
                    className={`absolute h-6 w-6 rounded-full border-2 border-white shadow-md transition-transform hover:scale-110 ${getDifficultyColor(
                      section.difficulty
                    )}`}
                    style={{ left: `${section.x}%`, top: `${section.y}%` }}
                    onClick={() => handleSectionClick(section)}
                    aria-label={section.name}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Section Details */}
          <div className="mt-8 lg:mt-0">
            <div className="rounded-lg bg-gray-50 p-6 shadow-md">
              {selectedSection ? (
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedSection.name}</h3>
                  <div className="mt-2 flex items-center">
                    <span className="mr-2 text-sm font-medium text-gray-500">Difficulty:</span>
                    <span
                      className={`inline-block h-3 w-3 rounded-full ${getDifficultyColor(
                        selectedSection.difficulty
                      )}`}
                    />
                    <span className="ml-1 text-sm capitalize text-gray-700">
                      {selectedSection.difficulty}
                    </span>
                  </div>
                  <div className="mt-2">
                    <span className="text-sm font-medium text-gray-500">Best Sector Time:</span>
                    <span className="ml-1 text-sm font-bold text-gray-900">
                      {selectedSection.bestTime}
                    </span>
                  </div>
                  <p className="mt-4 text-sm text-gray-600">{selectedSection.description}</p>
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-500">Racing Tips</h4>
                    <ul className="mt-2 list-disc pl-5 text-sm text-gray-600">
                      {selectedSection.difficulty === 'hard' && (
                        <>
                          <li>Brake earlier than you think</li>
                          <li>Focus on a clean exit</li>
                          <li>Avoid aggressive steering inputs</li>
                        </>
                      )}
                      {selectedSection.difficulty === 'medium' && (
                        <>
                          <li>Balanced braking approach</li>
                          <li>Smooth steering through the apex</li>
                          <li>Progressive throttle on exit</li>
                        </>
                      )}
                      {selectedSection.difficulty === 'easy' && (
                        <>
                          <li>Maintain consistent speed</li>
                          <li>Use the full width of the track</li>
                          <li>Early throttle application</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <p className="text-gray-500">Select a section of the track to see details</p>
                </div>
              )}
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900">Track Facts</h3>
              <dl className="mt-2 divide-y divide-gray-200">
                <div className="flex justify-between py-2">
                  <dt className="text-sm font-medium text-gray-500">Length</dt>
                  <dd className="text-sm font-medium text-gray-900">1,200 meters</dd>
                </div>
                <div className="flex justify-between py-2">
                  <dt className="text-sm font-medium text-gray-500">Corners</dt>
                  <dd className="text-sm font-medium text-gray-900">12</dd>
                </div>
                <div className="flex justify-between py-2">
                  <dt className="text-sm font-medium text-gray-500">Lap Record</dt>
                  <dd className="text-sm font-medium text-gray-900">48.32s</dd>
                </div>
                <div className="flex justify-between py-2">
                  <dt className="text-sm font-medium text-gray-500">Surface</dt>
                  <dd className="text-sm font-medium text-gray-900">Asphalt</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 