'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '../ui/button';

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  category: string;
  duration: string;
  participants: string;
}

const initialFormData: BookingFormData = {
  name: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  category: 'Senior',
  duration: '30',
  participants: '1',
};

export function BookingForm() {
  const [formData, setFormData] = useState<BookingFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real application, you would send this data to your API
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSuccess(true);
      setFormData(initialFormData);
    } catch (error) {
      console.error('Error submitting booking:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-black" id="book">
      <div className="container px-4 mx-auto">
        <div className="max-w-2xl mx-auto mb-16 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Book Your Racing Experience
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Reserve your kart session today and experience the thrill of racing on our professional track.
            All bookings include safety gear and track orientation.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto bg-white/5 backdrop-blur-sm rounded-xl p-8"
        >
          {isSuccess ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Booking Confirmed!</h3>
              <p className="text-gray-300 mb-6">
                Thank you for your booking. We've sent a confirmation email with all the details.
              </p>
              <Button
                onClick={() => setIsSuccess(false)}
                className="bg-red-500 hover:bg-red-600"
              >
                Book Another Session
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md bg-white/10 border border-white/20 py-2 px-3 text-white shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md bg-white/10 border border-white/20 py-2 px-3 text-white shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md bg-white/10 border border-white/20 py-2 px-3 text-white shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-300">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md bg-white/10 border border-white/20 py-2 px-3 text-white shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-300">
                    Time
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    required
                    value={formData.time}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md bg-white/10 border border-white/20 py-2 px-3 text-white shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-300">
                    Kart Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md bg-white/10 border border-white/20 py-2 px-3 text-white shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                  >
                    <option value="Bambino">Bambino</option>
                    <option value="Micro">Micro</option>
                    <option value="Mini">Mini</option>
                    <option value="Junior">Junior</option>
                    <option value="Senior">Senior</option>
                    <option value="DD2">DD2</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-300">
                    Duration (minutes)
                  </label>
                  <select
                    id="duration"
                    name="duration"
                    required
                    value={formData.duration}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md bg-white/10 border border-white/20 py-2 px-3 text-white shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                  >
                    <option value="30">30 minutes</option>
                    <option value="60">60 minutes</option>
                    <option value="90">90 minutes</option>
                    <option value="120">120 minutes</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="participants" className="block text-sm font-medium text-gray-300">
                    Number of Participants
                  </label>
                  <select
                    id="participants"
                    name="participants"
                    required
                    value={formData.participants}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md bg-white/10 border border-white/20 py-2 px-3 text-white shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                  >
                    <option value="1">1 person</option>
                    <option value="2">2 people</option>
                    <option value="3">3 people</option>
                    <option value="4">4 people</option>
                    <option value="5+">5+ people</option>
                  </select>
                </div>
              </div>

              <div className="mt-8">
                <Button
                  type="submit"
                  className="w-full bg-red-500 hover:bg-red-600 py-3 text-lg"
                  isLoading={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Book Now'}
                </Button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}