// Netlify function to handle Socket.IO functionality
const { calculateAvailability } = require('../../utils/availability');

// Mock data from server.js
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
  // Add more karts as needed
];

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' })
    };
  }

  try {
    // Parse the request body
    const data = JSON.parse(event.body);
    const { action, category, date } = data;

    // Handle different actions
    if (action === 'check-availability') {
      console.log(`Checking availability for ${category} on ${date}`);
      
      // Get all karts in the requested category
      const karts = mockKarts.filter(kart => kart.category === category);
      
      if (karts.length === 0) {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: `No karts found in category: ${category}` })
        };
      }

      // Calculate availability
      const availability = calculateAvailability(karts, new Date(date));
      
      // Return availability
      return {
        statusCode: 200,
        body: JSON.stringify({ availability })
      };
    }

    // Default response for unknown actions
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Unknown action' })
    };
  } catch (error) {
    console.error('Error processing request:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' })
    };
  }
}; 