'use client';

import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  rating: number;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Ahmed Al-Mansouri',
    role: 'Racing Enthusiast',
    image: '/images/team/team-1.jpg',
    rating: 5,
    text: 'Pilots Cup offers the best karting experience in the UAE. The track is challenging and the karts are top-notch. I have been a member for 2 years and I am still improving my skills!'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'Parent of Junior Racer',
    image: '/images/team/team-2.jpg',
    rating: 5,
    text: 'My son has been racing in the junior category for 6 months. The staff is incredibly supportive and safety is clearly their priority. He has gained so much confidence!'
  },
  {
    id: 3,
    name: 'Mohammed Al-Qasimi',
    role: 'Professional Driver',
    image: '/images/team/team-3.jpg',
    rating: 4,
    text: 'As someone who races professionally, I can say that Pilots Cup has one of the most technical tracks I have experienced. Great for honing skills and the Rotax karts are perfectly maintained.'
  },
  {
    id: 4,
    name: 'Emma Williams',
    role: 'Corporate Event Organizer',
    image: '/images/team/team-4.jpg',
    rating: 5,
    text: 'We organized our company team-building event at Pilots Cup and it was a huge success! The staff was professional, the facilities are excellent, and everyone had an amazing time.'
  }
];

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative overflow-hidden bg-black py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            What Our Racers Say
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-xl text-neutral-400 sm:mt-4">
            Hear from our community of passionate kart racers
          </p>
        </div>

        <div className="mt-12 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="w-full flex-shrink-0 px-4 md:px-8"
              >
                <div className="mx-auto max-w-3xl rounded-lg bg-neutral-900 p-8 shadow-lg border border-neutral-800">
                  <div className="flex items-center">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full">
                      <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center text-neutral-300 font-bold">
                        {testimonial.name.charAt(0)}
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-white">{testimonial.name}</h3>
                      <p className="text-sm text-neutral-400">{testimonial.role}</p>
                      <div className="mt-1 flex">
                        {[...Array(5)].map((_, i) => (
                          i < testimonial.rating ? (
                            <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                          ) : (
                            <StarOutlineIcon key={i} className="h-5 w-5 text-yellow-400" />
                          )
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="mt-6 text-neutral-300 italic">&quot;{testimonial.text}&quot;</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="mt-8 flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-3 w-3 rounded-full transition-colors ${
                  currentIndex === index ? 'bg-red-600' : 'bg-neutral-700'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 