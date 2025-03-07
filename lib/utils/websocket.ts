'use client';

export const getWebSocketUrl = (): string => {
  if (typeof window === 'undefined') {
    return '';
  }
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const host = window.location.host;
  return `${protocol}//${host}/api/ws`;
};

export const isWebSocketSupported = (): boolean => {
  return typeof window !== 'undefined' && 'WebSocket' in window;
}; 