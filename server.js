const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require("socket.io");
const { calculateAvailability } = require('./utils/availability');

// Mock data for demonstration purposes
// In a real application, this would come from a database
const mockKarts = [
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
  {
    id: '3',
    category: 'micro',
    status: 'available',
    kartNumber: 3,
    bookings: [],
    maintenance: []
  },
  {
    id: '4',
    category: 'micro',
    status: 'maintenance',
    kartNumber: 4,
    bookings: [],
    maintenance: []
  },
  {
    id: '5',
    category: 'mini',
    status: 'available',
    kartNumber: 5,
    bookings: [],
    maintenance: [
      {
        startTime: new Date('2025-03-06T10:00:00'),
        endTime: new Date('2025-03-06T12:00:00')
      }
    ]
  },
  {
    id: '6',
    category: 'mini',
    status: 'available',
    kartNumber: 6,
    bookings: [],
    maintenance: []
  },
  {
    id: '7',
    category: 'junior',
    status: 'available',
    kartNumber: 7,
    bookings: [],
    maintenance: []
  },
  {
    id: '8',
    category: 'junior',
    status: 'available',
    kartNumber: 8,
    bookings: [],
    maintenance: []
  },
  {
    id: '9',
    category: 'senior',
    status: 'available',
    kartNumber: 9,
    bookings: [],
    maintenance: []
  },
  {
    id: '10',
    category: 'senior',
    status: 'available',
    kartNumber: 10,
    bookings: [],
    maintenance: []
  },
  {
    id: '11',
    category: 'dd2',
    status: 'available',
    kartNumber: 11,
    bookings: [],
    maintenance: []
  },
  {
    id: '12',
    category: 'dd2',
    status: 'available',
    kartNumber: 12,
    bookings: [],
    maintenance: []
  }
];

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(server, {
    cors: {
      origin: process.env.NEXT_PUBLIC_APP_URL || '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('Client connected');

    // Listen for availability check requests
    socket.on('check-availability', async (data) => {
      const { category, date } = data;
      
      try {
        console.log(`Checking availability for ${category} on ${date}`);
        
        // Get all karts in the requested category
        const karts = mockKarts.filter(kart => kart.category === category);
        
        if (karts.length === 0) {
          socket.emit('error', { message: `No karts found in category: ${category}` });
          return;
        }

        // Calculate availability
        const availability = calculateAvailability(karts, new Date(date));
        
        // Send availability back to client
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

  const PORT = process.env.PORT || 3002;
  
  // Add error handling for port conflicts
  const startServer = (port = PORT, retryCount = 0) => {
    try {
      server.once('error', (err) => {
        if (err.code === 'EADDRINUSE' && retryCount < 3) {
          console.log(`Port ${port} is busy, trying ${port + 1}...`);
          startServer(port + 1, retryCount + 1);
        } else {
          console.error('Error starting server:', err);
          process.exit(1);
        }
      });
      
      server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`);
      });
    } catch (err) {
      console.error('Error starting server:', err);
      process.exit(1);
    }
  };

  startServer();
}); 