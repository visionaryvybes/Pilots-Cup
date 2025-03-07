import { CalendarIcon, MapIcon, TrophyIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const features = [
  {
    title: 'Professional Track',
    description: 'Race on our FIA-approved track designed for both beginners and professionals.',
    icon: MapIcon,
  },
  {
    title: 'Expert Training',
    description: 'Learn from certified instructors with years of professional racing experience.',
    icon: UserGroupIcon,
  },
  {
    title: 'Regular Events',
    description: 'Participate in weekly races, championships, and special karting events.',
    icon: TrophyIcon,
  },
  {
    title: 'Multiple Categories',
    description: 'From Bambino to DD2, we offer premium Rotax karts for all skill levels.',
    icon: CalendarIcon,
  },
];

export function Features() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Experience Excellence
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl p-6 hover-scale"
            >
              <feature.icon className="w-12 h-12 text-red-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-neutral-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 