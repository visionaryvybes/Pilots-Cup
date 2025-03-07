'use client';

import { useEffect, useRef, useState } from 'react';
import { getWebSocketUrl } from '../utils/websocket';

export interface WebSocketMessage {
  type: string;
  data: any;
}

interface UseWebSocketResult {
  connected: boolean;
  error: string | null;
  lastMessage: string | null;
  sendMessage: (message: string | object) => void;
}

export function useWebSocket(url?: string): UseWebSocketResult {
  const wsUrl = url || getWebSocketUrl();
  const socket = useRef<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastMessage, setLastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!wsUrl) {
      setError('WebSocket URL is not available');
      return;
    }

    // Create WebSocket connection
    const ws = new WebSocket(wsUrl);
    socket.current = ws;

    // Connection opened
    ws.addEventListener('open', () => {
      setConnected(true);
      setError(null);
      console.log('WebSocket connection established');
    });

    // Listen for messages
    ws.addEventListener('message', (event) => {
      try {
        setLastMessage(event.data);
      } catch (err) {
        console.error('Error parsing WebSocket message:', err);
        setError('Failed to parse message');
      }
    });

    // Listen for errors
    ws.addEventListener('error', (event) => {
      console.error('WebSocket error:', event);
      setError('WebSocket connection error');
      setConnected(false);
    });

    // Connection closed
    ws.addEventListener('close', (event) => {
      console.log('WebSocket connection closed:', event.code, event.reason);
      setConnected(false);
      
      if (!event.wasClean) {
        setError(`Connection closed unexpectedly: ${event.reason || 'Unknown reason'}`);
      }
    });

    // Clean up on unmount
    return () => {
      if (socket.current && socket.current.readyState === WebSocket.OPEN) {
        socket.current.close();
      }
    };
  }, [wsUrl]);

  // Function to send messages
  const sendMessage = (message: string | object) => {
    if (!socket.current || socket.current.readyState !== WebSocket.OPEN) {
      setError('WebSocket is not connected');
      return;
    }

    try {
      const messageString = typeof message === 'string' 
        ? message 
        : JSON.stringify(message);
      
      socket.current.send(messageString);
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message');
    }
  };

  return {
    connected,
    error,
    lastMessage,
    sendMessage
  };
} 