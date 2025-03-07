import { BackToTop } from 'components/back-to-top';
import { IMAGES } from 'lib/constants/images';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Events | Pilots Cup',
  description: 'Join exciting karting events at Pilots Cup UAE. From weekly race nights to championships, experience the thrill of competitive racing.'
};

const upcomingEvents = [
  {
    id: 1,
    title: 'Weekend Sprint Cup',
    date: 'March 15, 2025',
    time: '14:00 - 18:00',
    description: 'A fast-paced sprint race for all skill levels. Prizes for top 3 finishers in each category.',
    image: '/images/events/event-1.jpg',
    categories: ['Senior', 'Junior'],
    price: 'AED 350',
    spotsLeft: 8
  },
  {
    id: 2,
    title: 'Corporate Challenge',
    date: 'March 20, 2025',
    time: '16:00 - 20:00',
    description: 'Team-based racing event perfect for corporate team building. Each team consists of 4 drivers.',
    image: '/images/events/event-2.jpg',
    categories: ['Corporate'],
    price: 'AED 2,500 per team',
    spotsLeft: 3
  },
  {
    id: 3,
    title: 'Junior Championship Round 2',
    date: 'March 25, 2025',
    time: '10:00 - 14:00',
    description: 'The second round of our junior championship series. Open to drivers aged 8-15.',
    image: '/images/events/event-3.jpg',
    categories: ['Junior'],
    price: 'AED 250',
    spotsLeft: 6
  },
  {
    id: 4,
    title: 'Endurance Race',
    date: 'April 5, 2025',
    time: '16:00 - 22:00',
    description: 'A 3-hour endurance race with team-based pit stops and driver changes. Test your stamina and strategy.',
    image: '/images/events/race-event.jpg',
    categories: ['Senior', 'Teams'],
    price: 'AED 1,200 per team',
    spotsLeft: 5
  },
  {
    id: 5,
    title: 'Ladies Night',
    date: 'April 10, 2025',
    time: '18:00 - 22:00',
    description: 'A special racing event for female drivers of all skill levels. Includes training session and race.',
    image: '/images/events/training-session.jpg',
    categories: ['Ladies'],
    price: 'AED 300',
    spotsLeft: 12
  }
];

const specialEvents = [
  {
    title: 'Family Race Day',
    date: 'First Sunday Monthly',
    description: 'A fun-filled day of racing for the whole family. Special activities and competitions.',
    image: IMAGES.track.overview
  },
  {
    title: 'Corporate Challenge',
    date: 'By Appointment',
    description: 'Team building events and corporate championships. Custom packages available.',
    image: IMAGES.facilities.garage
  },
  {
    title: 'School Programs',
    date: 'Weekdays',
    description: 'Special programs for schools, introducing students to karting and motorsports.',
    image: IMAGES.facilities.briefing
  }
];

export default function EventsPage() {
  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/events/race-event.jpg"
            alt="Pilots Cup Events"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
            Events & Competitions
          </h1>
          <p className="mb-8 text-xl font-medium md:text-2xl max-w-3xl">
            Join our exciting racing events and test your skills against other drivers
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Event Categories */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Event Categories</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-neutral-900 p-6 text-center border border-neutral-800">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Sprint Races</h3>
              <p className="mt-4 text-neutral-400">
                Fast-paced races focusing on speed and precision. Perfect for competitive drivers.
              </p>
            </div>
            <div className="rounded-lg bg-neutral-900 p-6 text-center border border-neutral-800">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Team Events</h3>
              <p className="mt-4 text-neutral-400">
                Collaborative racing events for teams. Great for corporate events and team building.
              </p>
            </div>
            <div className="rounded-lg bg-neutral-900 p-6 text-center border border-neutral-800">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Endurance Races</h3>
              <p className="mt-4 text-neutral-400">
                Long-format races testing stamina and consistency. Includes pit stops and strategy.
              </p>
            </div>
            <div className="rounded-lg bg-neutral-900 p-6 text-center border border-neutral-800">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Junior Events</h3>
              <p className="mt-4 text-neutral-400">
                Special events for younger drivers aged 8-15. Focus on skill development and safety.
              </p>
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Upcoming Events</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="rounded-lg bg-neutral-900 overflow-hidden border border-neutral-800">
                <div className="relative h-48">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white">{event.title}</h3>
                    <div className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                      {event.spotsLeft} spots left
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="text-neutral-400 text-sm">{event.date} • {event.time}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {event.categories.map((category) => (
                        <span key={category} className="bg-neutral-800 text-white text-xs px-2 py-1 rounded">
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-neutral-300 mb-4">{event.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold">{event.price}</span>
                    <Link
                      href="#book-event"
                      className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Host Your Own Event */}
        <section className="mb-16">
          <div className="rounded-lg bg-neutral-900 p-8 border border-neutral-800">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Host Your Own Event</h2>
                <p className="text-neutral-300 mb-6">
                  Looking to organize a private racing event for your company, friends, or family? We offer customized packages for groups of all sizes.
                </p>
                <ul className="space-y-2 text-neutral-300 mb-6">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-red-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Exclusive track access</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-red-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Customized race formats</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-red-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Catering options available</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-red-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Professional timing and results</span>
                  </li>
                </ul>
                <Link
                  href="/contact"
                  className="inline-block rounded-md bg-red-600 px-6 py-3 text-base font-medium text-white hover:bg-red-700"
                >
                  Inquire Now
                </Link>
              </div>
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="/images/events/PHOTO-2025-03-04-08-56-42.jpg"
                  alt="Private Event"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Event Calendar */}
        <section id="book-event">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Event Calendar</h2>
          <div className="rounded-lg bg-neutral-900 p-8 border border-neutral-800">
            <p className="text-white text-center py-8">Event booking calendar will be implemented soon.</p>
          </div>
        </section>
      </div>
      <BackToTop />
    </div>
  );
} 