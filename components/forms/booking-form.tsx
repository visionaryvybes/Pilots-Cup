'use client';

import { useState } from 'react';
import { commonValidationRules, useForm } from '../../lib/hooks/use-form';
import { api } from '../../lib/services/api';
import { ButtonLink } from '../ui/button';

interface BookingFormData {
  date: string;
  time: string;
  duration: number;
  kartType: string;
  numberOfKarts: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  drivers: Array<{
    name: string;
    age: number;
    experience: string;
  }>;
}

const initialData: BookingFormData = {
  date: '',
  time: '',
  duration: 30,
  kartType: 'Rotax Senior',
  numberOfKarts: 1,
  customerName: '',
  customerEmail: '',
  customerPhone: '',
  drivers: [
    {
      name: '',
      age: 0,
      experience: 'beginner'
    }
  ]
};

const validationRules = {
  date: [commonValidationRules.required('Please select a date')],
  time: [commonValidationRules.required('Please select a time')],
  duration: [
    commonValidationRules.required('Please select duration'),
    {
      validate: (value: number) => value >= 30 && value <= 120,
      message: 'Duration must be between 30 and 120 minutes'
    }
  ],
  kartType: [commonValidationRules.required('Please select a kart type')],
  customerName: [commonValidationRules.required('Customer name is required')],
  customerEmail: [
    commonValidationRules.required('Email is required'),
    commonValidationRules.email('Please enter a valid email')
  ],
  customerPhone: [commonValidationRules.required('Phone number is required')],
  'drivers.0.name': [commonValidationRules.required('Driver name is required')],
  'drivers.0.age': [
    commonValidationRules.required('Driver age is required'),
    commonValidationRules.numeric('Age must be a number'),
    {
      validate: (value: number) => value >= 7,
      message: 'Driver must be at least 7 years old'
    }
  ]
};

export default function BookingForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const {
    data,
    errors,
    isSubmitting,
    setFieldValue,
    handleSubmit,
    reset
  } = useForm<BookingFormData>({
    initialData,
    validationRules,
    onSubmit: async (formData: BookingFormData) => {
      try {
        // Map form data to API data structure
        const apiData = {
          date: formData.date,
          time: formData.time,
          duration: formData.duration,
          kartType: formData.kartType,
          numberOfKarts: formData.numberOfKarts,
          customerName: formData.customerName,
          customerEmail: formData.customerEmail,
          customerPhone: formData.customerPhone
        };
        
        const response = await api.createBooking(apiData);
        if (response.error) {
          setServerError(response.error);
          return;
        }
        setIsSuccess(true);
        reset();
      } catch (error) {
        setServerError('An unexpected error occurred. Please try again.');
      }
    }
  });

  if (isSuccess) {
  return (
      <div className="rounded-lg bg-green-900 p-6 text-center">
        <h3 className="text-lg font-medium text-green-100">Booking Confirmed!</h3>
        <p className="mt-2 text-sm text-green-200">
          Your booking has been successfully confirmed. We'll send you a confirmation email shortly.
        </p>
        <div className="mt-4">
          <ButtonLink
            href="/dashboard"
            className="bg-green-600 hover:bg-green-700"
          >
            View My Bookings
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-neutral-900 p-6 rounded-lg">
      {serverError && (
        <div className="rounded-md bg-red-900 p-4">
          <p className="text-sm text-red-100">{serverError}</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {/* Date Selection */}
      <div>
          <label htmlFor="date" className="block text-sm font-medium text-white">
          Date
        </label>
        <input
          type="date"
          id="date"
            value={data.date}
            onChange={(e) => setFieldValue('date', e.target.value)}
          min={new Date().toISOString().split('T')[0]}
            className="mt-1 block w-full rounded-md bg-neutral-800 border-neutral-700 text-white shadow-sm focus:border-red-500 focus:ring-red-500"
        />
          {errors.date && (
            <p className="mt-1 text-sm text-red-400">{errors.date}</p>
          )}
      </div>

      {/* Time Selection */}
      <div>
          <label htmlFor="time" className="block text-sm font-medium text-white">
          Time
        </label>
        <select
          id="time"
            value={data.time}
            onChange={(e) => setFieldValue('time', e.target.value)}
            className="mt-1 block w-full rounded-md bg-neutral-800 border-neutral-700 text-white shadow-sm focus:border-red-500 focus:ring-red-500"
        >
          <option value="">Select a time</option>
            {Array.from({ length: 24 }, (_, i) => {
              const hour = i.toString().padStart(2, '0');
              return (
                <>
                  <option value={`${hour}:00`}>{`${hour}:00`}</option>
                  <option value={`${hour}:30`}>{`${hour}:30`}</option>
                </>
              );
            })}
        </select>
          {errors.time && (
            <p className="mt-1 text-sm text-red-400">{errors.time}</p>
          )}
      </div>

      {/* Duration Selection */}
      <div>
          <label htmlFor="duration" className="block text-sm font-medium text-white">
            Duration (minutes)
        </label>
        <select
          id="duration"
            value={data.duration}
            onChange={(e) => setFieldValue('duration', Number(e.target.value))}
            className="mt-1 block w-full rounded-md bg-neutral-800 border-neutral-700 text-white shadow-sm focus:border-red-500 focus:ring-red-500"
          >
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
            <option value="90">1.5 hours</option>
            <option value="120">2 hours</option>
        </select>
          {errors.duration && (
            <p className="mt-1 text-sm text-red-400">{errors.duration}</p>
          )}
      </div>

        {/* Kart Type Selection */}
      <div>
          <label htmlFor="kartType" className="block text-sm font-medium text-white">
            Kart Type
        </label>
        <select
            id="kartType"
            value={data.kartType}
            onChange={(e) => setFieldValue('kartType', e.target.value)}
            className="mt-1 block w-full rounded-md bg-neutral-800 border-neutral-700 text-white shadow-sm focus:border-red-500 focus:ring-red-500"
          >
            <option value="">Select a kart type</option>
            <option value="Rotax Micro">Rotax Micro (7-11 years)</option>
            <option value="Rotax Mini">Rotax Mini (10-13 years)</option>
            <option value="Rotax Junior">Rotax Junior (12-15 years)</option>
            <option value="Rotax Senior">Rotax Senior (15+ years)</option>
            <option value="Rotax DD2">Rotax DD2 (15+ years, experienced)</option>
        </select>
          {errors.kartType && (
            <p className="mt-1 text-sm text-red-400">{errors.kartType}</p>
          )}
        </div>
      </div>

      {/* Customer Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Customer Information</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
            <label htmlFor="customerName" className="block text-sm font-medium text-white">
              Name
            </label>
            <input
              type="text"
              id="customerName"
              value={data.customerName}
              onChange={(e) => setFieldValue('customerName', e.target.value)}
              className="mt-1 block w-full rounded-md bg-neutral-800 border-neutral-700 text-white shadow-sm focus:border-red-500 focus:ring-red-500"
            />
            {errors.customerName && (
              <p className="mt-1 text-sm text-red-400">{errors.customerName}</p>
            )}
            </div>

          <div>
            <label htmlFor="customerEmail" className="block text-sm font-medium text-white">
              Email
            </label>
            <input
              type="email"
              id="customerEmail"
              value={data.customerEmail}
              onChange={(e) => setFieldValue('customerEmail', e.target.value)}
              className="mt-1 block w-full rounded-md bg-neutral-800 border-neutral-700 text-white shadow-sm focus:border-red-500 focus:ring-red-500"
            />
            {errors.customerEmail && (
              <p className="mt-1 text-sm text-red-400">{errors.customerEmail}</p>
            )}
            </div>

          <div>
            <label htmlFor="customerPhone" className="block text-sm font-medium text-white">
              Phone
            </label>
            <input
              type="tel"
              id="customerPhone"
              value={data.customerPhone}
              onChange={(e) => setFieldValue('customerPhone', e.target.value)}
              className="mt-1 block w-full rounded-md bg-neutral-800 border-neutral-700 text-white shadow-sm focus:border-red-500 focus:ring-red-500"
            />
            {errors.customerPhone && (
              <p className="mt-1 text-sm text-red-400">{errors.customerPhone}</p>
            )}
          </div>
        </div>
      </div>

      {/* Driver Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Driver Information</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="driverName" className="block text-sm font-medium text-white">
              Name
            </label>
            <input
              type="text"
              id="driverName"
              value={data.drivers[0]?.name || ''}
              onChange={(e) => setFieldValue('drivers.0.name', e.target.value)}
              className="mt-1 block w-full rounded-md bg-neutral-800 border-neutral-700 text-white shadow-sm focus:border-red-500 focus:ring-red-500"
            />
            {errors['drivers.0.name'] && (
              <p className="mt-1 text-sm text-red-400">{errors['drivers.0.name']}</p>
            )}
          </div>

          <div>
            <label htmlFor="driverAge" className="block text-sm font-medium text-white">
              Age
            </label>
            <input
              type="number"
              id="driverAge"
              value={data.drivers[0]?.age || ''}
              onChange={(e) => setFieldValue('drivers.0.age', Number(e.target.value))}
              min="7"
              className="mt-1 block w-full rounded-md bg-neutral-800 border-neutral-700 text-white shadow-sm focus:border-red-500 focus:ring-red-500"
            />
            {errors['drivers.0.age'] && (
              <p className="mt-1 text-sm text-red-400">{errors['drivers.0.age']}</p>
            )}
          </div>

          <div>
            <label htmlFor="driverExperience" className="block text-sm font-medium text-white">
              Experience Level
            </label>
            <select
              id="driverExperience"
              value={data.drivers[0]?.experience || 'beginner'}
              onChange={(e) => setFieldValue('drivers.0.experience', e.target.value)}
              className="mt-1 block w-full rounded-md bg-neutral-800 border-neutral-700 text-white shadow-sm focus:border-red-500 focus:ring-red-500"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="professional">Professional</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
      <button
        type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
      >
          {isSubmitting ? 'Booking...' : 'Book Now'}
      </button>
      </div>
    </form>
  );
} 