'use client';

import { useEffect, useState } from 'react';
import { mockUpdates } from '../lib/data/static-data';

interface Update {
  id: string;
  type: 'booking_update' | 'track_status';
  message: string;
  timestamp: string;
}

// Format time consistently for both server and client
function formatTime(timestamp: string): string {
  // Use a fixed format that will be consistent between server and client
  try {
    const date = new Date(timestamp);
    return date.toISOString(); // Use ISO string which is consistent
  } catch (e) {
    return timestamp;
  }
}

export default function RealTimeUpdates() {
  // Use client-side only rendering to avoid hydration mismatch
  const [isClient, setIsClient] = useState(false);
  // Type assertion to ensure mockUpdates matches the Update interface
  const [updates, setUpdates] = useState<Update[]>(mockUpdates as Update[]);
  
  // Set isClient to true once component mounts on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Format the time for display
  const formatDisplayTime = (timestamp: string) => {
    if (!isClient) return ''; // Return empty string during server rendering
    
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString('en-US'); // Use consistent locale to prevent hydration errors
    } catch (e) {
      return '';
    }
  };

  if (updates.length === 0) {
    return (
      <div className="rounded-md bg-gray-50 p-4 text-center text-sm text-gray-500">
        No updates available. Check back later for updates.
      </div>
    );
  }

  return (
    <div className="space-y-4 bg-neutral-900 p-6 rounded-lg">
      <h3 className="text-lg font-medium text-white">Updates</h3>
      <div className="flow-root">
        <ul className="-mb-8">
          {isClient && updates.map((update, updateIdx) => (
            <li key={update.id}>
              <div className="relative pb-8">
                {updateIdx !== updates.length - 1 ? (
                  <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-neutral-700" aria-hidden="true" />
                ) : null}
                <div className="relative flex space-x-3">
                  <div>
                    <span
                      className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-neutral-800 ${
                        update.type === 'booking_update' ? 'bg-blue-500' : 'bg-green-500'
                      }`}
                    >
                      {update.type === 'booking_update' ? (
                        <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                      )}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 pt-1.5">
                    <p className="text-sm text-neutral-400">
                      {formatDisplayTime(update.timestamp)}
                    </p>
                    <p className="text-sm text-white">{update.message}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
          {!isClient && (
            <li>
              <div className="text-sm text-neutral-400">Loading updates...</div>
            </li>
          )}
        </ul>
      </div>
      <div className="mt-4 text-sm text-gray-400">
        <p>Last updated: {isClient ? new Date().toLocaleString('en-US') : ''}</p>
      </div>
    </div>
  );
} 