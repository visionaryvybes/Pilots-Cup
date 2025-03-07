'use client';

import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { BackToTop } from '@/components/back-to-top';

const faqs = [
  {
    category: 'General',
    questions: [
      {
        question: 'What is the minimum age requirement for karting?',
        answer: 'The minimum age requirement varies by kart type: Mini Karts (7-12 years), Junior Karts (12-15 years), and Adult Karts (15+ years). All drivers must meet minimum height requirements for safety.'
      },
      {
        question: 'Do I need prior karting experience?',
        answer: 'No prior experience is needed. We provide comprehensive safety briefings and instructions for beginners. Our track marshals will guide you throughout your session.'
      },
      {
        question: 'What should I wear for karting?',
        answer: 'Wear comfortable, close-fitting clothes and closed-toe shoes (mandatory). We provide racing suits, helmets, and gloves. Avoid loose clothing and scarves.'
      },
      {
        question: 'How long is a typical karting session?',
        answer: 'Standard sessions are 15 minutes, but we offer various packages from 15 to 60 minutes. Special event and endurance race durations may vary.'
      }
    ]
  },
  {
    category: 'Bookings & Pricing',
    questions: [
      {
        question: 'How do I book a karting session?',
        answer: 'You can book online through our website, call us directly, or visit our facility. We recommend booking in advance, especially for weekends and holidays.'
      },
      {
        question: 'What is your cancellation policy?',
        answer: 'Free cancellation up to 24 hours before your scheduled session. Cancellations within 24 hours may incur a 50% fee. No-shows will be charged the full amount.'
      },
      {
        question: 'Do you offer group bookings?',
        answer: 'Yes, we offer special packages for groups, corporate events, and private functions. Contact our events team for custom packages and pricing.'
      },
      {
        question: 'Are there any membership options?',
        answer: 'Yes, we offer various membership packages with benefits like discounted rates, priority booking, and exclusive events. Visit our membership page for details.'
      }
    ]
  },
  {
    category: 'Safety & Equipment',
    questions: [
      {
        question: 'What safety equipment is provided?',
        answer: 'We provide DOT-approved full-face helmets, racing suits, and gloves. All equipment is regularly sanitized and maintained to ensure safety and hygiene.'
      },
      {
        question: 'How safe are your karts?',
        answer: 'Our karts are professional Rotax karts with safety features like roll bars, padded steering wheels, and safety belts. They undergo daily maintenance checks and regular servicing.'
      },
      {
        question: 'What happens in case of emergency?',
        answer: 'Our track is monitored by trained marshals, and we have first aid staff on-site. Emergency protocols are in place, and all staff are trained in emergency procedures.'
      },
      {
        question: 'Are there any health restrictions?',
        answer: 'Pregnant women and individuals with heart conditions, back problems, or other serious health issues should not participate. Consult your doctor if unsure.'
      }
    ]
  },
  {
    category: 'Track & Facilities',
    questions: [
      {
        question: 'What are your operating hours?',
        answer: 'We are open Monday-Thursday 10:00 AM - 10:00 PM, Friday 2:00 PM - 11:00 PM, and Saturday-Sunday 9:00 AM - 11:00 PM. Hours may vary during holidays and special events.'
      },
      {
        question: 'Do you operate in bad weather?',
        answer: 'We operate in most weather conditions, but may close temporarily during severe weather for safety. Indoor facilities remain open during light rain.'
      },
      {
        question: 'Are there food and beverage options available?',
        answer: 'Yes, our café serves refreshments, snacks, and light meals. Outside food and beverages are not permitted in the facility.'
      },
      {
        question: 'Is there parking available?',
        answer: 'Yes, we offer free parking for all visitors. Special parking areas are designated for members and event participants.'
      }
    ]
  }
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Find answers to common questions about karting at Al Forsan International Circuit
          </p>
        </div>

        {/* FAQ Sections */}
        <div className="max-w-4xl mx-auto space-y-12">
          {faqs.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h2 className="text-2xl font-bold text-white mb-6">{section.category}</h2>
              <div className="space-y-4">
                {section.questions.map((faq, faqIndex) => (
                  <Disclosure key={faqIndex}>
                    {({ open }) => (
                      <div className="bg-neutral-900 rounded-lg border border-neutral-800">
                        <Disclosure.Button className="w-full px-6 py-4 text-left flex justify-between items-center">
                          <span className="text-lg font-medium text-white">{faq.question}</span>
                          <ChevronDownIcon
                            className={`${
                              open ? 'transform rotate-180' : ''
                            } w-5 h-5 text-red-600 transition-transform duration-200`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-6 pb-4">
                          <p className="text-gray-300">{faq.answer}</p>
                        </Disclosure.Panel>
                      </div>
                    )}
                  </Disclosure>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="mt-16">
          <div className="bg-neutral-900 rounded-lg p-8 text-center border border-neutral-800">
            <h2 className="text-2xl font-bold text-white mb-4">Still Have Questions?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Can't find what you're looking for? Contact our team and we'll be happy to help.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="inline-block rounded-md bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700"
              >
                Contact Us
              </Link>
              <Link
                href="/book"
                className="inline-block rounded-md border border-white px-8 py-3 text-base font-medium text-white hover:bg-white/10"
              >
                Book a Session
              </Link>
            </div>
          </div>
        </div>
      </div>

      <BackToTop />
    </div>
  );
} 