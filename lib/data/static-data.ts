/**
 * Static data for the application
 * This file contains mock data that was previously provided by the server
 */

// Mock kart data
export const mockKarts = [
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
        startTime: new Date('2025-03-06T14:00:00').toISOString(),
        endTime: new Date('2025-03-06T15:00:00').toISOString()
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
        startTime: new Date('2025-03-06T10:00:00').toISOString(),
        endTime: new Date('2025-03-06T12:00:00').toISOString()
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

// Mock updates data
export const mockUpdates = [
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

// Mock rankings data
export const mockRankings = [
  {
    position: 1,
    name: 'Ahmed Al-Mansoori',
    lapTime: '00:45.321',
    category: 'Senior Max',
    date: '2024-03-15',
    hours: 50,
  },
  {
    position: 2,
    name: 'Sarah Thompson',
    lapTime: '00:45.654',
    category: 'Senior Max',
    date: '2024-03-15',
    hours: 50,
  },
  {
    position: 3,
    name: 'Mohammed Al-Hashimi',
    lapTime: '00:45.987',
    category: 'Senior Max',
    date: '2024-03-14',
    hours: 50,
  },
  {
    position: 4,
    name: 'John Davidson',
    lapTime: '00:46.123',
    category: 'Senior Max',
    date: '2024-03-14',
    hours: 50,
  },
  {
    position: 5,
    name: 'Fatima Al-Sayed',
    lapTime: '00:46.432',
    category: 'Senior Max',
    date: '2024-03-13',
    hours: 50,
  },
  {
    position: 1,
    name: 'Khalid Al-Falasi',
    lapTime: '00:46.789',
    category: 'Junior Max',
    date: '2024-03-15',
    hours: 25,
  },
  {
    position: 2,
    name: 'Emma Wilson',
    lapTime: '00:47.012',
    category: 'Junior Max',
    date: '2024-03-14',
    hours: 25,
  },
  {
    position: 3,
    name: 'Rashid Al-Nuaimi',
    lapTime: '00:47.345',
    category: 'Junior Max',
    date: '2024-03-13',
    hours: 25,
  }
];

// Mock kart availability
export const mockAvailability = {
  bambino: { available: 4, total: 5, maintenance: 1 },
  micro: { available: 3, total: 4, maintenance: 1 },
  mini: { available: 5, total: 5, maintenance: 0 },
  junior: { available: 4, total: 6, maintenance: 2 },
  senior: { available: 7, total: 8, maintenance: 1 },
  dd2: { available: 3, total: 4, maintenance: 1 }
}; 