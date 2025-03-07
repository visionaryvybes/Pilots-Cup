import { NextRequest, NextResponse } from 'next/server';
import { BookingData } from '../../../lib/services/api';

// In a real app, this would be stored in a database
let bookings: Array<BookingData & { id: string }> = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.date || !body.time || !body.duration || !body.kartType || !body.drivers?.length) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate date is in the future
    const bookingDate = new Date(`${body.date}T${body.time}`);
    if (bookingDate < new Date()) {
      return NextResponse.json(
        { error: 'Booking date must be in the future' },
        { status: 400 }
      );
    }

    // Check for availability
    const existingBooking = bookings.find(
      (booking) =>
        booking.date === body.date &&
        booking.time === body.time &&
        booking.kartType === body.kartType
    );

    if (existingBooking) {
      return NextResponse.json(
        { error: 'This time slot is already booked' },
        { status: 409 }
      );
    }

    // Create new booking
    const newBooking = {
      ...body,
      id: Math.random().toString(36).substring(7),
    };

    bookings.push(newBooking);

    // In a real app, we would:
    // 1. Save to database
    // 2. Send confirmation email
    // 3. Update track status
    // 4. Notify admin dashboard

    return NextResponse.json({ id: newBooking.id }, { status: 201 });
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // In a real app, we would:
    // 1. Authenticate the request
    // 2. Filter by user ID
    // 3. Implement pagination
    // 4. Add query parameters for filtering

    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const kartType = searchParams.get('kartType');

    let filteredBookings = [...bookings];

    if (date) {
      filteredBookings = filteredBookings.filter(
        (booking) => booking.date === date
      );
    }

    if (kartType) {
      filteredBookings = filteredBookings.filter(
        (booking) => booking.kartType === kartType
      );
    }

    return NextResponse.json(filteredBookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Booking ID is required' },
        { status: 400 }
      );
    }

    const bookingIndex = bookings.findIndex((booking) => booking.id === id);

    if (bookingIndex === -1) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    // In a real app, we would:
    // 1. Authenticate the request
    // 2. Check if the user has permission to delete
    // 3. Implement soft delete
    // 4. Update track status
    // 5. Notify relevant parties

    bookings.splice(bookingIndex, 1);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting booking:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Enable CORS
export const runtime = 'edge';
export const dynamic = 'force-dynamic'; 