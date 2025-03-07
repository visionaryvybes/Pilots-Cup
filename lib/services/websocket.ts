import { EventEmitter } from 'events';

export interface WebSocketMessage {
  type: string;
  payload: any;
}

export class WebSocketService {
  private ws: WebSocket | null = null;
  private eventEmitter: EventEmitter;
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;
  private reconnectDelay: number = 1000;

  constructor(private url: string) {
    this.eventEmitter = new EventEmitter();
  }

  connect(): void {
    try {
      this.ws = new WebSocket(this.url);
      this.setupEventListeners();
    } catch (error) {
      console.error('WebSocket connection error:', error);
      this.handleReconnect();
    }
  }

  private setupEventListeners(): void {
    if (!this.ws) return;

    this.ws.onopen = () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
    };

    this.ws.onmessage = (event) => {
      try {
        const message: WebSocketMessage = JSON.parse(event.data);
        this.eventEmitter.emit(message.type, message.payload);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    this.ws.onclose = () => {
      console.log('WebSocket disconnected');
      this.handleReconnect();
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  private handleReconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
      setTimeout(() => this.connect(), this.reconnectDelay * this.reconnectAttempts);
    } else {
      console.error('Max reconnection attempts reached');
    }
  }

  send(type: string, payload: any): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      const message: WebSocketMessage = { type, payload };
      this.ws.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not connected');
    }
  }

  subscribe(type: string, callback: (payload: any) => void): void {
    this.eventEmitter.on(type, callback);
  }

  unsubscribe(type: string, callback: (payload: any) => void): void {
    this.eventEmitter.off(type, callback);
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

// Example usage:
/*
// Subscribe to track status updates
const unsubscribe = ws.subscribe<TrackStatus>('track_status', (status) => {
  console.log('Track status updated:', status);
});

// Subscribe to booking updates
ws.subscribe('booking_update', (booking) => {
  console.log('Booking updated:', booking);
});

// Handle errors
ws.onError((error) => {
  console.error('WebSocket error:', error);
});

// Send a message
ws.send('request_track_status', { requestId: '123' });

// Cleanup on component unmount
unsubscribe();
ws.disconnect();
*/ 