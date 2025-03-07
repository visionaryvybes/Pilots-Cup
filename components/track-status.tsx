'use client';

import { useState, useEffect } from 'react';

type TrackStatus = 'open' | 'closed' | 'maintenance' | 'event';

interface TrackStatusInfo {
  status: TrackStatus;
  message: string;
  updatedAt: string;
}

export function TrackStatus() {
  // Use client-side only rendering to avoid hydration mismatch
  const [isClient, setIsClient] = useState(false);
  const [status, setStatus] = useState<TrackStatusInfo>({
    status: 'open',
    message: 'Track is open for racing until 10 PM today',
    updatedAt: new Date().toISOString(),
  });

  // Set isClient to true once component mounts on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // In a real implementation, this would fetch from an API
  useEffect(() => {
    if (!isClient) return;
    
    // Simulate status updates every 30 seconds
    const interval = setInterval(() => {
      // This is just for demo purposes - in production, you'd fetch from an API
      const currentHour = new Date().getHours();
      
      if (currentHour >= 22 || currentHour < 8) {
        setStatus({
          status: 'closed',
          message: 'Track is closed. Opens at 8 AM',
          updatedAt: new Date().toISOString(),
        });
      } else if (Math.random() > 0.9) {
        // Occasionally show maintenance or event status for demo
        const isEvent = Math.random() > 0.5;
        setStatus({
          status: isEvent ? 'event' : 'maintenance',
          message: isEvent 
            ? 'Private event in progress. Regular sessions resume at 2 PM' 
            : 'Track maintenance in progress. Reopening in 30 minutes',
          updatedAt: new Date().toISOString(),
        });
      } else {
        setStatus({
          status: 'open',
          message: 'Track is open for racing until 10 PM today',
          updatedAt: new Date().toISOString(),
        });
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [isClient]);

  const getStatusColor = () => {
    switch (status.status) {
      case 'open':
        return 'bg-green-500';
      case 'closed':
        return 'bg-red-600';
      case 'maintenance':
        return 'bg-red-600';
      case 'event':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = () => {
    switch (status.status) {
      case 'open':
        return 'OPEN';
      case 'closed':
        return 'CLOSED';
      case 'maintenance':
        return 'MAINTENANCE';
      case 'event':
        return 'EVENT';
      default:
        return 'UNKNOWN';
    }
  };

  // Format time for display - only on client side
  const formatTime = (timestamp: string) => {
    if (!isClient) return ''; // Return empty string during server rendering
    
    try {
      return new Date(timestamp).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } catch (e) {
      return '';
    }
  };

  if (!isClient) {
    return null; // Don't render anything on server
  }

  return (
    <div className="fixed bottom-4 left-4 z-40 max-w-xs">
      <div className="bg-black rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
        <div className="flex items-center p-3 border-b border-gray-800">
          <div className={`w-3 h-3 rounded-full mr-2 ${getStatusColor()}`}></div>
          <div className="text-white font-bold">Track Status: {getStatusText()}</div>
          <div className="ml-auto text-xs text-gray-400">
            {formatTime(status.updatedAt)}
          </div>
        </div>
        <div className="p-3">
          <p className="text-sm text-gray-300">{status.message}</p>
        </div>
      </div>
    </div>
  );
} 