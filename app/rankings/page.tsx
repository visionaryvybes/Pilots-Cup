import { BackToTop } from 'components/back-to-top';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Rankings | Pilots Cup',
  description: 'View the top drivers and their achievements at Pilots Cup. Race, compete, and win amazing prizes!'
};

// Mock data for rankings
const rankings = [
  {
    id: 1,
    driver: 'Ahmed Al-Sayed',
    category: 'DD2',
    totalHours: 48,
    bestLapTime: '52.341',
    points: 2750
  },
  {
    id: 2,
    driver: 'Sarah Thompson',
    category: 'Senior',
    totalHours: 45,
    bestLapTime: '53.122',
    points: 2680
  },
  {
    id: 3,
    driver: 'Mohammed Rahman',
    category: 'Junior',
    totalHours: 42,
    bestLapTime: '53.891',
    points: 2590
  }
];

const prizes = [
  {
    title: '50 Hours Champion',
    description: 'Complete Rotax Kart Package',
    value: 'AED 75,000'
  },
  {
    title: '25 Hours Champion',
    description: 'Custom Racing Helmet',
    value: 'AED 15,000'
  },
  {
    title: 'Monthly Best Lap',
    description: 'Free 5-Hour Package',
    value: 'AED 2,500'
  }
];

export default function RankingsPage() {
  // Sample data for lap times
  const lapTimes = [
    { rank: 1, name: 'Mohammed Al-Qasimi', lapTime: '42.315', date: '2025-03-01', kart: 'Rotax Senior' },
    { rank: 2, name: 'Sarah Johnson', lapTime: '42.587', date: '2025-03-02', kart: 'Rotax Senior' },
    { rank: 3, name: 'Ahmed Al-Mansouri', lapTime: '42.901', date: '2025-02-28', kart: 'Rotax Senior' },
    { rank: 4, name: 'Emma Williams', lapTime: '43.124', date: '2025-03-01', kart: 'Rotax Senior' },
    { rank: 5, name: 'Khalid Rahman', lapTime: '43.256', date: '2025-02-27', kart: 'Rotax Senior' },
    { rank: 6, name: 'John Smith', lapTime: '43.412', date: '2025-03-02', kart: 'Rotax Senior' },
    { rank: 7, name: 'Fatima Al-Zaabi', lapTime: '43.589', date: '2025-02-28', kart: 'Rotax Senior' },
    { rank: 8, name: 'David Chen', lapTime: '43.678', date: '2025-03-01', kart: 'Rotax Senior' },
    { rank: 9, name: 'Aisha Al-Mazrouei', lapTime: '43.901', date: '2025-02-27', kart: 'Rotax Senior' },
    { rank: 10, name: 'Michael Brown', lapTime: '44.023', date: '2025-03-02', kart: 'Rotax Senior' },
  ];

  // Sample data for junior lap times
  const juniorLapTimes = [
    { rank: 1, name: 'Hamad Al-Suwaidi', lapTime: '44.215', date: '2025-03-01', kart: 'Rotax Junior' },
    { rank: 2, name: 'Lily Chen', lapTime: '44.587', date: '2025-03-02', kart: 'Rotax Junior' },
    { rank: 3, name: 'Omar Al-Hashimi', lapTime: '44.901', date: '2025-02-28', kart: 'Rotax Junior' },
    { rank: 4, name: 'Sophie Williams', lapTime: '45.124', date: '2025-03-01', kart: 'Rotax Junior' },
    { rank: 5, name: 'Rashid Al-Nuaimi', lapTime: '45.256', date: '2025-02-27', kart: 'Rotax Junior' },
  ];

  // Sample data for recent races
  const recentRaces = [
    { 
      id: 1, 
      name: 'Weekend Sprint Cup', 
      date: 'March 2, 2025', 
      participants: 18,
      winner: 'Mohammed Al-Qasimi',
      image: '/images/events/event-1.jpg'
    },
    { 
      id: 2, 
      name: 'Corporate Challenge', 
      date: 'February 28, 2025', 
      participants: 24,
      winner: 'Team Alpha',
      image: '/images/events/event-2.jpg'
    },
    { 
      id: 3, 
      name: 'Junior Championship Round 1', 
      date: 'February 25, 2025', 
      participants: 12,
      winner: 'Hamad Al-Suwaidi',
      image: '/images/events/event-3.jpg'
    },
  ];

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-[40vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/track/PHOTO-2025-03-04-08-57-41.jpg"
            alt="Pilots Cup Rankings"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
            Rankings & Lap Times
          </h1>
          <p className="mb-8 text-xl font-medium md:text-2xl max-w-3xl">
            See who's setting the pace at Pilots Cup
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Main Content - Lap Times */}
          <div className="lg:col-span-2">
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">Senior Class Lap Records</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-neutral-900 text-white">
                    <tr>
                      <th className="px-6 py-3 text-sm font-semibold">Rank</th>
                      <th className="px-6 py-3 text-sm font-semibold">Driver</th>
                      <th className="px-6 py-3 text-sm font-semibold">Lap Time</th>
                      <th className="px-6 py-3 text-sm font-semibold">Date</th>
                      <th className="px-6 py-3 text-sm font-semibold">Kart</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    {lapTimes.map((record) => (
                      <tr key={record.rank} className="bg-neutral-900/50 hover:bg-neutral-900">
                        <td className="px-6 py-4 text-sm">
                          {record.rank === 1 ? (
                            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-yellow-500 text-black font-bold">
                              {record.rank}
                            </span>
                          ) : record.rank === 2 ? (
                            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-neutral-300 text-black font-bold">
                              {record.rank}
                            </span>
                          ) : record.rank === 3 ? (
                            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-amber-700 text-white font-bold">
                              {record.rank}
                            </span>
                          ) : (
                            <span className="px-2">{record.rank}</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-white">{record.name}</td>
                        <td className="px-6 py-4 text-sm font-mono">{record.lapTime}</td>
                        <td className="px-6 py-4 text-sm text-neutral-400">{record.date}</td>
                        <td className="px-6 py-4 text-sm text-neutral-400">{record.kart}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-white mb-6">Junior Class Lap Records</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-neutral-900 text-white">
                    <tr>
                      <th className="px-6 py-3 text-sm font-semibold">Rank</th>
                      <th className="px-6 py-3 text-sm font-semibold">Driver</th>
                      <th className="px-6 py-3 text-sm font-semibold">Lap Time</th>
                      <th className="px-6 py-3 text-sm font-semibold">Date</th>
                      <th className="px-6 py-3 text-sm font-semibold">Kart</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    {juniorLapTimes.map((record) => (
                      <tr key={record.rank} className="bg-neutral-900/50 hover:bg-neutral-900">
                        <td className="px-6 py-4 text-sm">
                          {record.rank === 1 ? (
                            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-yellow-500 text-black font-bold">
                              {record.rank}
                            </span>
                          ) : record.rank === 2 ? (
                            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-neutral-300 text-black font-bold">
                              {record.rank}
                            </span>
                          ) : record.rank === 3 ? (
                            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-amber-700 text-white font-bold">
                              {record.rank}
                            </span>
                          ) : (
                            <span className="px-2">{record.rank}</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-white">{record.name}</td>
                        <td className="px-6 py-4 text-sm font-mono">{record.lapTime}</td>
                        <td className="px-6 py-4 text-sm text-neutral-400">{record.date}</td>
                        <td className="px-6 py-4 text-sm text-neutral-400">{record.kart}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* Sidebar - Recent Races */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              <div className="rounded-lg bg-neutral-900 p-6 shadow-md border border-neutral-800">
                <h2 className="text-2xl font-bold text-white mb-4">Recent Races</h2>
                <div className="space-y-6">
                  {recentRaces.map((race) => (
                    <div key={race.id} className="border-b border-neutral-800 pb-6 last:border-0 last:pb-0">
                      <div className="relative h-40 w-full mb-4 rounded-md overflow-hidden">
                        <Image
                          src={race.image}
                          alt={race.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                      <h3 className="text-lg font-bold text-white">{race.name}</h3>
                      <p className="text-neutral-400 text-sm mt-1">{race.date}</p>
                      <div className="mt-2 flex justify-between">
                        <span className="text-sm text-neutral-400">Participants: {race.participants}</span>
                        <span className="text-sm text-neutral-400">Winner: <span className="text-white">{race.winner}</span></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg bg-neutral-900 p-6 shadow-md border border-neutral-800">
                <h2 className="text-2xl font-bold text-white mb-4">Track Record</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400">All-time Record:</span>
                    <span className="text-white font-mono font-bold">41.872s</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400">Record Holder:</span>
                    <span className="text-white font-bold">Mohammed Al-Qasimi</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400">Set on:</span>
                    <span className="text-white">January 15, 2025</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400">Kart:</span>
                    <span className="text-white">Rotax Senior #7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BackToTop />
    </div>
  );
} 