/**
 * Calculate availability slots for karts based on bookings and maintenance
 * @param {Array} karts - Array of kart objects with bookings and maintenance
 * @param {Date} date - The date to check availability for
 * @returns {Array} - Array of time slots with availability status
 */
export function calculateAvailability(karts, date) {
  // Define operating hours (9:00 AM to 10:00 PM)
  const operatingHours = Array.from({ length: 13 }, (_, i) => i + 9);
  
  // Initialize availability slots
  const slots = operatingHours.map(hour => {
    const timeString = `${hour.toString().padStart(2, '0')}:00`;
    return {
      time: timeString,
      available: true,
      availableKarts: [...karts]
    };
  });

  // Process each kart's bookings and maintenance
  karts.forEach(kart => {
    // Check if kart is generally available
    if (kart.status !== 'available') {
      // Remove unavailable karts from all slots
      slots.forEach(slot => {
        slot.availableKarts = slot.availableKarts.filter(k => k.id !== kart.id);
      });
      return;
    }

    // Process bookings
    kart.bookings.forEach(booking => {
      const bookingStart = new Date(booking.startTime);
      const bookingEnd = new Date(booking.endTime);
      
      // Find affected time slots
      slots.forEach(slot => {
        const [hour] = slot.time.split(':').map(Number);
        const slotStart = new Date(date);
        slotStart.setHours(hour, 0, 0, 0);
        const slotEnd = new Date(date);
        slotEnd.setHours(hour + 1, 0, 0, 0);

        // Check if booking overlaps with this slot
        if (
          (bookingStart < slotEnd && bookingEnd > slotStart)
        ) {
          // Remove this kart from available karts for this slot
          slot.availableKarts = slot.availableKarts.filter(k => k.id !== kart.id);
        }
      });
    });

    // Process maintenance
    kart.maintenance.forEach(maintenance => {
      const maintenanceStart = new Date(maintenance.startTime);
      const maintenanceEnd = new Date(maintenance.endTime);
      
      // Find affected time slots
      slots.forEach(slot => {
        const [hour] = slot.time.split(':').map(Number);
        const slotStart = new Date(date);
        slotStart.setHours(hour, 0, 0, 0);
        const slotEnd = new Date(date);
        slotEnd.setHours(hour + 1, 0, 0, 0);

        // Check if maintenance overlaps with this slot
        if (
          (maintenanceStart < slotEnd && maintenanceEnd > slotStart)
        ) {
          // Remove this kart from available karts for this slot
          slot.availableKarts = slot.availableKarts.filter(k => k.id !== kart.id);
        }
      });
    });
  });

  // Update availability based on available karts
  slots.forEach(slot => {
    slot.available = slot.availableKarts.length > 0;
    slot.availableCount = slot.availableKarts.length;
    // Don't send the full kart objects to the client
    delete slot.availableKarts;
  });

  return slots;
} 