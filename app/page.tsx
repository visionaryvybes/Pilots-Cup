'use client';

import { BackToTop } from '../components/back-to-top';
import { ReferralBanner } from '../components/referral-banner';
import { FeaturedKarts } from '../components/sections/featured-karts';
import { Gallery } from '../components/sections/gallery';
import { HeroSection } from '../components/sections/hero';
import { Rankings } from '../components/sections/rankings';
import { Testimonials } from '../components/sections/testimonials';
import { WhyChooseUs } from '../components/sections/why-choose-us';
import { AwardsAchievements } from '../components/sections/awards-achievements';
import { ButtonLink } from '../components/ui/button';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section - First impression */}
      <section id="hero" className="relative">
        <HeroSection />
      </section>

      {/* Why Choose Us - Immediately establish value proposition */}
      <section id="why-choose-us" className="relative">
        <WhyChooseUs />
      </section>

      {/* Featured Karts - Show products after establishing value */}
      <section id="karts" className="relative">
        <FeaturedKarts />
      </section>

      {/* Gallery - Visual showcase */}
      <section id="gallery" className="relative">
        <Gallery />
      </section>

      {/* Testimonials - Social proof */}
      <section id="testimonials" className="relative">
        <Testimonials />
      </section>

      {/* Rankings - Competitive aspect */}
      <section id="rankings" className="relative">
        <Rankings />
      </section>

      {/* Awards & Achievements - Build credibility */}
      <section id="awards" className="relative">
        <AwardsAchievements />
      </section>

      {/* Booking CTA - Final conversion point */}
      <section id="cta" className="relative py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center reveal">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Experience the Thrill?</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Book your racing session today and discover why Pilots Cup is the premier destination for karting enthusiasts.
          </p>
          <ButtonLink
            href="/book"
            className="bg-red-600 hover:bg-red-700 text-white text-xl px-10 py-4 rounded-lg font-medium transition-all duration-300 inline-flex items-center"
          >
            Book Now
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </ButtonLink>
        </div>
      </section>

      {/* Fixed Components */}
      <ReferralBanner />
      <BackToTop />
    </div>
  );
}
