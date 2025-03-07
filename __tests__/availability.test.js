import { calculateAvailability } from '@/utils/availability';

describe('Availability Calculation', () => {
  test('correctly identifies available slots', () => {
    const karts = [
      {
        id: '1',
        category: 'senior',
        status: 'available',
        bookings: [],
        maintenance: []
      },
      {
        id: '2',
        category: 'senior',
        status: 'available',
        bookings: [
          {
            startTime: new Date('2025-03-06T14:00:00'),
            endTime: new Date('2025-03-06T15:00:00')
          }
        ],
        maintenance: []
      }
    ];

    const date = new Date('2025-03-06');
    const availability = calculateAvailability(karts, date);

    // Expect all time slots to be available since at least one kart is free
    expect(availability.find(slot => slot.time === '14:00').available).toBe(true);
    // But with reduced count
    expect(availability.find(slot => slot.time === '14:00').availableCount).toBe(1);
    // Other slots should have full availability
    expect(availability.find(slot => slot.time === '13:00').availableCount).toBe(2);
  });

  test('handles maintenance schedules correctly', () => {
    const karts = [
      {
        id: '1',
        category: 'senior',
        status: 'available',
        bookings: [],
        maintenance: [
          {
            startTime: new Date('2025-03-06T10:00:00'),
            endTime: new Date('2025-03-06T12:00:00')
          }
        ]
      }
    ];

    const date = new Date('2025-03-06');
    const availability = calculateAvailability(karts, date);

    // Kart is in maintenance during these hours
    expect(availability.find(slot => slot.time === '10:00').availableCount).toBe(0);
    expect(availability.find(slot => slot.time === '11:00').availableCount).toBe(0);
    // Kart is available during these hours
    expect(availability.find(slot => slot.time === '09:00').availableCount).toBe(1);
    expect(availability.find(slot => slot.time === '12:00').availableCount).toBe(1);
  });

  test('handles unavailable karts correctly', () => {
    const karts = [
      {
        id: '1',
        category: 'senior',
        status: 'maintenance', // Kart is completely unavailable
        bookings: [],
        maintenance: []
      }
    ];

    const date = new Date('2025-03-06');
    const availability = calculateAvailability(karts, date);

    // All slots should show the kart as unavailable
    availability.forEach(slot => {
      expect(slot.available).toBe(false);
      expect(slot.availableCount).toBe(0);
    });
  });
}); 