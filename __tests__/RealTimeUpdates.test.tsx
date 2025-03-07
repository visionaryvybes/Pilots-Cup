import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import RealTimeUpdates from '../components/RealTimeUpdates';
import { useWebSocket } from '../lib/hooks/use-websocket';

// Mock the useWebSocket hook
jest.mock('../lib/hooks/use-websocket', () => ({
  useWebSocket: jest.fn(),
}));

describe('RealTimeUpdates', () => {
  const mockSubscribe = jest.fn();
  
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Mock the useWebSocket implementation
    (useWebSocket as jest.Mock).mockReturnValue({
      connected: true,
      error: null,
      lastMessage: null,
      sendMessage: jest.fn()
    });
  });

  it('renders without crashing', () => {
    render(<RealTimeUpdates />);
    expect(screen.getByText('Real-time Updates')).toBeInTheDocument();
    expect(screen.getByText('No real-time updates available. Updates will appear here as they happen.')).toBeInTheDocument();
  });

  it('displays updates when messages are received', () => {
    const { rerender } = render(<RealTimeUpdates />);
    
    // Mock the useWebSocket to return a message
    (useWebSocket as jest.Mock).mockReturnValue({
      connected: true,
      error: null,
      lastMessage: JSON.stringify({
        type: 'booking_update',
        message: 'Booking 123 confirmed'
      }),
      sendMessage: jest.fn()
    });
    
    // Re-render with the new mock
    rerender(<RealTimeUpdates />);
    
    expect(screen.getByText('Booking 123 confirmed')).toBeInTheDocument();
  });

  it('displays error when WebSocket connection fails', () => {
    // Mock the useWebSocket to return an error
    (useWebSocket as jest.Mock).mockReturnValue({
      connected: false,
      error: 'Connection failed',
      lastMessage: null,
      sendMessage: jest.fn()
    });
    
    render(<RealTimeUpdates />);
    
    expect(screen.getByText('Real-time updates unavailable')).toBeInTheDocument();
    expect(screen.getByText('WebSocket error: Connection failed')).toBeInTheDocument();
  });
}); 