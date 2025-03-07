'use client';

import { BookOpenIcon, LightBulbIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useState } from 'react';

// Types for our tips
interface Tip {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: 'technique' | 'maintenance' | 'etiquette';
  author: string;
  date: string;
}

// Mock data for racing tips
const racingTips: Tip[] = [
  {
    id: 1,
    title: 'The Racing Line: Mastering the Perfect Path',
    excerpt: 'Learn how to find and follow the optimal racing line to improve your lap times.',
    content: `
      <p>The racing line is the theoretical ideal path around a race track. It's designed to minimize lap time by optimizing speed through corners and maximizing the use of the track.</p>
      
      <h3>Key Principles:</h3>
      <ul>
        <li><strong>Late Apex:</strong> Turn in later than feels natural to set up a better exit.</li>
        <li><strong>Track Out:</strong> Use all available track on exit to maintain maximum speed.</li>
        <li><strong>Straight Line Braking:</strong> Always try to brake in a straight line before turning in.</li>
      </ul>
      
      <p>Practice following the racing line at a comfortable pace before pushing for speed. Consistency is more important than raw speed when learning.</p>
    `,
    image: '/images/misc/dr frame.jpg',
    category: 'technique',
    author: 'Mohammed Al-Qasimi',
    date: '2023-10-15'
  },
  {
    id: 2,
    title: 'Kart Maintenance: Pre-Race Checklist',
    excerpt: 'Essential checks to perform before hitting the track to ensure safety and performance.',
    content: `
      <p>Even though our staff maintains the karts, it's good practice to do a quick check before your session.</p>
      
      <h3>Pre-Race Checklist:</h3>
      <ul>
        <li><strong>Tire Pressure:</strong> Ensure tires are properly inflated.</li>
        <li><strong>Steering:</strong> Check for any play in the steering wheel.</li>
        <li><strong>Seat Position:</strong> Adjust for comfort and proper reach to pedals.</li>
        <li><strong>Safety Equipment:</strong> Ensure helmet, gloves, and suit fit properly.</li>
      </ul>
      
      <p>If you notice any issues, inform our staff immediately. Safety should always be your top priority.</p>
    `,
    image: '/images/misc/dr frame.jpg',
    category: 'maintenance',
    author: 'Sarah Johnson',
    date: '2023-09-28'
  },
  {
    id: 3,
    title: 'Racing Etiquette: Respectful Overtaking',
    excerpt: 'How to pass other drivers safely and respectfully during a race.',
    content: `
      <p>Good racing etiquette is essential for everyone's safety and enjoyment on the track.</p>
      
      <h3>Overtaking Guidelines:</h3>
      <ul>
        <li><strong>Patience:</strong> Wait for a safe opportunity to pass.</li>
        <li><strong>Signaling:</strong> Make your intentions clear with consistent positioning.</li>
        <li><strong>Clean Passes:</strong> Avoid contact and leave space for the other driver.</li>
        <li><strong>Defensive Driving:</strong> It's okay to defend your position, but only make one move.</li>
      </ul>
      
      <p>Remember, the best racers are respected not just for their speed, but for their sportsmanship.</p>
    `,
    image: '/images/misc/dr frame.jpg',
    category: 'etiquette',
    author: 'Ahmed Al-Mansouri',
    date: '2023-11-05'
  },
  {
    id: 4,
    title: 'Braking Techniques for Faster Lap Times',
    excerpt: 'Advanced braking methods to shave seconds off your lap time.',
    content: `
      <p>Mastering braking is often what separates good drivers from great ones.</p>
      
      <h3>Advanced Braking Techniques:</h3>
      <ul>
        <li><strong>Trail Braking:</strong> Gradually release the brake as you turn in to maintain balance.</li>
        <li><strong>Threshold Braking:</strong> Brake at the maximum force without locking up.</li>
        <li><strong>Brake Markers:</strong> Use visual references to consistently hit your braking points.</li>
      </ul>
      
      <p>Practice these techniques gradually. Start at 80% of your usual pace and slowly build up as you gain confidence.</p>
    `,
    image: '/images/misc/dr frame.jpg',
    category: 'technique',
    author: 'Emma Williams',
    date: '2023-10-22'
  },
];

export default function RacingTips() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTip, setSelectedTip] = useState<Tip | null>(null);

  // Filter tips based on selected category
  const filteredTips = selectedCategory === 'all' 
    ? racingTips 
    : racingTips.filter(tip => tip.category === selectedCategory);

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'technique':
        return <LightBulbIcon className="h-5 w-5 text-yellow-500" />;
      case 'maintenance':
        return <BookOpenIcon className="h-5 w-5 text-blue-500" />;
      case 'etiquette':
        return <ShieldCheckIcon className="h-5 w-5 text-green-500" />;
      default:
        return <LightBulbIcon className="h-5 w-5 text-yellow-500" />;
    }
  };

  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'technique':
        return 'bg-yellow-100 text-yellow-800';
      case 'maintenance':
        return 'bg-blue-100 text-blue-800';
      case 'etiquette':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Racing Tips & Tutorials</h2>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-md ${
              selectedCategory === 'all' 
                ? 'bg-red-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedCategory('technique')}
            className={`px-4 py-2 rounded-md flex items-center ${
              selectedCategory === 'technique' 
                ? 'bg-yellow-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <LightBulbIcon className="h-4 w-4 mr-1" />
            Techniques
          </button>
          <button
            onClick={() => setSelectedCategory('maintenance')}
            className={`px-4 py-2 rounded-md flex items-center ${
              selectedCategory === 'maintenance' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <BookOpenIcon className="h-4 w-4 mr-1" />
            Maintenance
          </button>
          <button
            onClick={() => setSelectedCategory('etiquette')}
            className={`px-4 py-2 rounded-md flex items-center ${
              selectedCategory === 'etiquette' 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <ShieldCheckIcon className="h-4 w-4 mr-1" />
            Etiquette
          </button>
        </div>
      </div>

      {selectedTip ? (
        // Tip Detail View
        <div>
          <button
            onClick={() => setSelectedTip(null)}
            className="mb-4 text-red-600 hover:text-red-800 flex items-center"
          >
            ← Back to all tips
          </button>
          
          <div className="relative h-64 w-full mb-6 rounded-lg overflow-hidden">
            <Image 
              src={selectedTip.image} 
              alt={selectedTip.title}
              fill
              className="object-cover"
              loading="lazy"
              unoptimized
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/images/placeholder.jpg';
                target.onerror = null;
              }}
            />
          </div>
          
          <div className="flex items-center mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${getCategoryColor(selectedTip.category)}`}>
              {getCategoryIcon(selectedTip.category)}
              <span className="ml-1 capitalize">{selectedTip.category}</span>
            </span>
            <span className="ml-4 text-sm text-gray-500">
              By {selectedTip.author} • {selectedTip.date}
            </span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedTip.title}</h1>
          
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: selectedTip.content }}
          />
        </div>
      ) : (
        // Tips List View
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTips.map((tip) => (
            <div 
              key={tip.id} 
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedTip(tip)}
            >
              <div className="relative h-48 w-full">
                <Image 
                  src={tip.image} 
                  alt={tip.title}
                  fill
                  className="object-cover"
                  loading="lazy"
                  unoptimized
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/placeholder.jpg';
                    target.onerror = null;
                  }}
                />
              </div>
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center ${getCategoryColor(tip.category)}`}>
                    {getCategoryIcon(tip.category)}
                    <span className="ml-1 capitalize">{tip.category}</span>
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{tip.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">{tip.date}</span>
                  <span className="text-sm text-red-600 hover:text-red-800">Read More →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 