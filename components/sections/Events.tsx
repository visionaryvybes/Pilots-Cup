import { ArrowRightIcon, CalendarIcon } from '@heroicons/react/24/outline';

const upcomingEvents = [
  {
    title: 'Weekend Championship',
    date: 'Next Saturday',
    description: 'Join our monthly championship race with competitors from across the UAE.',
    category: 'Championship'
  },
  {
    title: 'Junior Training',
    date: 'Every Wednesday',
    description: 'Specialized training session for junior racers to improve their skills.',
    category: 'Training'
  },
  {
    title: 'Corporate Event',
    date: 'Book Now',
    description: 'Team building events with racing, catering, and awards ceremony.',
    category: 'Corporate'
  }
];

export function Events() {
  return (
    <section className="py-20 bg-neutral-900/50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-white">Upcoming Events</h2>
          <a href="/events" className="text-red-500 hover:text-red-400 flex items-center gap-2">
            View All <ArrowRightIcon className="w-4 h-4" />
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {upcomingEvents.map((event, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl p-6 hover-scale"
            >
              <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-red-500/10 text-red-500 mb-4">
                {event.category}
              </span>
              <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
              <p className="text-neutral-400 mb-4">{event.description}</p>
              <div className="flex items-center text-neutral-500">
                <CalendarIcon className="w-5 h-5 mr-2" />
                {event.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 