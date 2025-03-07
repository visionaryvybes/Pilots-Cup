import { CalendarIcon, ClockIcon, MapIcon, TrophyIcon } from '@heroicons/react/24/outline';

const stats = [
  { value: '1.2km', label: 'Track Length', icon: MapIcon },
  { value: '6', label: 'Kart Categories', icon: CalendarIcon },
  { value: '12', label: 'Track Corners', icon: TrophyIcon },
  { value: '140km/h', label: 'Top Speed (DD2)', icon: ClockIcon }
];

export function Stats() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl p-6 transform hover-scale"
            >
              <stat.icon className="w-8 h-8 text-red-500 mb-4" />
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-neutral-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 