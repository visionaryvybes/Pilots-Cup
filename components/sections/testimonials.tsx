'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Ahmed Al-Mansouri',
    role: 'Racing Enthusiast',
    avatar: '/images/team/team-member-1.jpg',
    quote: 'Pilots Cup offers the most professional karting experience in the UAE. The track is challenging and the karts are top-notch. My family and I have been members for 6 months and we love it!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'Parent of Junior Racer',
    avatar: '/images/team/team-member-2.jpg',
    quote: 'My son has improved his racing skills tremendously since joining Pilots Cup. The instructors are patient and knowledgeable, and the facility is always clean and well-maintained.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Mohammed Al-Qasimi',
    role: 'Professional Driver',
    avatar: '/images/team/team-member-3.jpg',
    quote: "As someone who races professionally, I can say that Pilots Cup has the best karts and track in the region. The DD2 category is particularly impressive - it's as close as you can get to professional racing.",
    rating: 5,
  },
  {
    id: 4,
    name: 'Emma Williams',
    role: 'Corporate Event Organizer',
    avatar: '/images/team/team-member-4.jpg',
    quote: 'We organized our company team-building event at Pilots Cup and it was a huge success! The staff was incredibly helpful and everyone had a blast. Will definitely be coming back!',
    rating: 4,
  },
];

export function Testimonials() {
  // Use client-side only rendering to avoid hydration mismatch
  const [isClient, setIsClient] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Set isClient to true once component mounts on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Auto-advance testimonials
  useEffect(() => {
    if (!isClient) return;
    
    const interval = setInterval(() => {
      setActiveIndex((current) => (current === testimonials.length - 1 ? 0 : current + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isClient]);

  if (!isClient) {
    return (
      <section className="py-20 bg-black text-white relative overflow-hidden" id="testimonials">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">What Our Racers Say</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Don't just take our word for it - hear from our community of passionate racers.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900 rounded-xl p-8 shadow-xl">
              <p className="text-center text-gray-400">Loading testimonials...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-black text-white relative overflow-hidden" id="testimonials">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">What Our Racers Say</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Don't just take our word for it - hear from our community of passionate racers.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Testimonial Cards */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="min-w-full px-4">
                    <div className="bg-gray-900 rounded-xl p-8 shadow-xl">
                      <div className="flex items-center mb-6">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-red-600">
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{testimonial.name}</h3>
                          <p className="text-red-500">{testimonial.role}</p>
                          <div className="flex mt-1">
                            {[...Array(5)].map((_, i) => (
                              <svg 
                                key={i} 
                                xmlns="http://www.w3.org/2000/svg" 
                                className={`h-5 w-5 ${i < testimonial.rating ? 'text-red-600' : 'text-gray-600'}`} 
                                viewBox="0 0 20 20" 
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                      <blockquote className="text-lg italic text-gray-300 leading-relaxed">
                        "{testimonial.quote}"
                      </blockquote>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Controls */}
            <button 
              onClick={() => setActiveIndex((current) => (current === 0 ? testimonials.length - 1 : current - 1))}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg -ml-5 focus:outline-none"
              aria-label="Previous testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              onClick={() => setActiveIndex((current) => (current === testimonials.length - 1 ? 0 : current + 1))}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg -mr-5 focus:outline-none"
              aria-label="Next testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none ${
                  index === activeIndex ? 'bg-red-600 w-6' : 'bg-gray-600'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute bottom-0 left-0 w-1/3 h-full opacity-10">
        <svg width="100%" height="100%" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <path d="M39.7,-67.1C51.9,-60.2,62.8,-50.5,70.8,-38.5C78.8,-26.5,83.9,-13.2,83.7,-0.1C83.5,13,78,26.1,70.1,37.4C62.2,48.7,51.9,58.3,39.7,64.5C27.5,70.7,13.8,73.5,0.2,73.2C-13.3,72.9,-26.6,69.5,-39.5,63.3C-52.4,57.1,-64.9,48.1,-72.1,36.1C-79.3,24.1,-81.3,9.1,-79.9,-5.8C-78.5,-20.7,-73.7,-35.3,-64.6,-46.5C-55.5,-57.7,-42.1,-65.4,-28.8,-71.2C-15.5,-77,-7.7,-80.9,2.5,-85.3C12.8,-89.7,25.5,-94.6,39.7,-67.1Z" transform="translate(200 200)" fill="#dc2626" />
        </svg>
      </div>
    </section>
  );
} 