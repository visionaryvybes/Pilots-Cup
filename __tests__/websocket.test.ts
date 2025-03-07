import { getWebSocketUrl, isWebSocketSupported } from '../lib/utils/websocket';

describe('WebSocket Utils', () => {
  describe('getWebSocketUrl', () => {
    const originalLocation = window.location;

    beforeEach(() => {
      delete (window as any).location;
      window.location = {
        ...originalLocation,
        protocol: 'http:',
        host: 'localhost:3000',
      };
    });

    afterEach(() => {
      window.location = originalLocation;
    });

    it('should return ws:// URL for http protocol', () => {
      expect(getWebSocketUrl()).toBe('ws://localhost:3000/api/ws');
    });

    it('should return wss:// URL for https protocol', () => {
      window.location = {
        ...window.location,
        protocol: 'https:',
      };
      expect(getWebSocketUrl()).toBe('wss://localhost:3000/api/ws');
    });
  });

  describe('isWebSocketSupported', () => {
    const originalWebSocket = window.WebSocket;

    afterEach(() => {
      window.WebSocket = originalWebSocket;
    });

    it('should return true when WebSocket is supported', () => {
      expect(isWebSocketSupported()).toBe(true);
    });

    it('should return false when WebSocket is not supported', () => {
      delete (window as any).WebSocket;
      expect(isWebSocketSupported()).toBe(false);
    });
  });
}); 