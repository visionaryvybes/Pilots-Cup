import { ArrowRightIcon } from '@heroicons/react/24/outline';

export function CTA() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="glass-card rounded-3xl p-12 text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Race?</h2>
          <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
            Join us at Pilots Cup and experience the thrill of professional karting. 
            Book your session now or become a member to access exclusive benefits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/rentals"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full transition-all hover-scale inline-flex items-center justify-center gap-2"
            >
              Explore Our Karts <ArrowRightIcon className="w-5 h-5" />
            </a>
            <a
              href="/membership"
              className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-4 rounded-full transition-all inline-flex items-center justify-center gap-2"
            >
              View Memberships
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 