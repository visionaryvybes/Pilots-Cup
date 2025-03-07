import { Server } from 'socket.io';
import { calculateAvailability } from '../../../utils/availability';

interface Kart {
  id: string;
  category: string;
  status: string;
  kartNumber: number;
  bookings: Array<{
    startTime: Date;
    endTime: Date;
  }>;
  maintenance: Array<{
    startTime: Date;
    endTime: Date;
  }>;
}

const mockKarts: Kart[] = [
  {
    id: '1',
    category: 'bambino',
    status: 'available',
    kartNumber: 1,
    bookings: [],
    maintenance: []
  },
  {
    id: '2',
    category: 'bambino',
    status: 'available',
    kartNumber: 2,
    bookings: [
      {
        startTime: new Date('2025-03-06T14:00:00'),
        endTime: new Date('2025-03-06T15:00:00')
      }
    ],
    maintenance: []
  },
  // ... Add the rest of your karts here
];

const ioHandler = (req: any, res: any) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server, {
      path: '/socket.io',
      addTrailingSlash: false,
      cors: {
        origin: process.env.NEXT_PUBLIC_APP_URL || '*',
        methods: ['GET', 'POST'],
      },
    });

    io.on('connection', (socket) => {
      console.log('Client connected');

      socket.on('check-availability', async (data: { category: string; date: string }) => {
        const { category, date } = data;
        
        try {
          console.log(`Checking availability for ${category} on ${date}`);
          
          const karts = mockKarts.filter(kart => kart.category === category);
          
          if (karts.length === 0) {
            socket.emit('error', { message: `No karts found in category: ${category}` });
            return;
          }

          const availability = calculateAvailability(karts, new Date(date));
          socket.emit('availability-update', availability);
        } catch (error) {
          console.error('Error checking availability:', error);
          socket.emit('error', { message: 'Failed to check availability' });
        }
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });

    res.socket.server.io = io;
  }

  res.end();
};

export const GET = ioHandler;
export const POST = ioHandler; 