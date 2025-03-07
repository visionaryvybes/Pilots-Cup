'use client';

import { useEffect, useState } from 'react';
import { useWebSocket } from '../lib/hooks/use-websocket';
import { isWebSocketSupported } from '../lib/utils/websocket';

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

// Sample static updates for when WebSocket is disabled
const staticUpdates: Update[] = [
  {
    id: '1',
    type: 'track_status',
    message: 'Track is open for racing today until 10 PM',
    timestamp: new Date().toISOString()
  },
  {
    id: '2',
    type: 'booking_update',
    message: 'New Rotax Senior session booked for tomorrow at 2 PM',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString() // 5 minutes ago
  },
  {
    id: '3',
    type: 'track_status',
    message: 'Weather conditions: Clear skies, 28°C',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString() // 15 minutes ago
  }
];

export default function RealTimeUpdates() {
  // Use client-side only rendering to avoid hydration mismatch
  const [isClient, setIsClient] = useState(false);
  const [updates, setUpdates] = useState<Update[]>(staticUpdates);
  const [error, setError] = useState<string | null>(null);
  
  const { 
    connected, 
    error: wsError, 
    lastMessage, 
    sendMessage 
  } = useWebSocket();

  // Set isClient to true once component mounts on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isWebSocketSupported()) {
      setError('WebSocket is not supported in your browser.');
      return;
    }

    // Clear any previous errors when connection is established
    if (connected) {
      setError(null);
    }
  }, [connected]);

  // Handle incoming WebSocket messages
  useEffect(() => {
    if (!lastMessage) return;
    
    try {
      const data = JSON.parse(lastMessage);
      
      if (data.type === 'booking_update' || data.type === 'track_status') {
        const newUpdate: Update = {
          id: crypto.randomUUID(),
          type: data.type,
          message: data.message,
          timestamp: new Date().toISOString()
        };
        
        setUpdates(prev => {
          // Keep only the most recent 10 updates
          const updatedList = [newUpdate, ...prev];
          return updatedList.slice(0, 10);
        });
      }
    } catch (err) {
      console.error('Error parsing WebSocket message:', err);
    }
  }, [lastMessage]);

  // Set error message if WebSocket connection fails
  useEffect(() => {
    if (wsError) {
      // Don't show error to user, just use static updates
      console.log(`WebSocket error: ${wsError}`);
    }
  }, [wsError]);

  // Format the time for display
  const formatDisplayTime = (timestamp: string) => {
    if (!isClient) return ''; // Return empty string during server rendering
    
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString(); // Only use on client side
    } catch (e) {
      return '';
    }
  };

  if (error) {
    return (
      <div className="rounded-md bg-yellow-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">Real-time updates unavailable</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (updates.length === 0) {
    return (
      <div className="rounded-md bg-gray-50 p-4 text-center text-sm text-gray-500">
        No real-time updates available. Updates will appear here as they happen.
      </div>
    );
  }

  return (
    <div className="space-y-4 bg-neutral-900 p-6 rounded-lg">
      <h3 className="text-lg font-medium text-white">Real-time Updates</h3>
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
    </div>
  );
} 