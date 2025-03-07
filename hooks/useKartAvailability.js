import { useEffect, useState } from 'react';
import io from 'socket.io-client';

export function useKartAvailability(category, date) {
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Create a socket connection
    let socket;
    
    try {
      socket = io();
      
      // Request availability data when component mounts
      socket.emit('check-availability', { category, date: date.toISOString() });

      // Listen for availability updates
      socket.on('availability-update', (data) => {
        setAvailability(data);
        setLoading(false);
      });

      // Handle errors
      socket.on('error', (err) => {
        setError(err.message);
        setLoading(false);
      });
      
      // Handle connection errors
      socket.on('connect_error', (err) => {
        console.error('Socket connection error:', err);
        setError('Failed to connect to server. Please try again later.');
        setLoading(false);
      });
    } catch (err) {
      console.error('Socket initialization error:', err);
      setError('Failed to initialize connection. Please try again later.');
      setLoading(false);
    }

    // Clean up on unmount
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [category, date]);

  return { availability, loading, error };
} 