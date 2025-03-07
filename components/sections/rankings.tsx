'use client';

import { useEffect, useState } from 'react';
import { useWebSocket } from '../../lib/hooks/use-websocket';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface RankingData {
  position: number;
  name: string;
  lapTime: string;
  category: string;
  date: string;
  hours: number;
}

interface RankingMessage {
  type: 'ranking_update';
  data: RankingData[];
}

interface Prize {
  position: number;
  description: string;
  image: string;
}

const fiftyHourPrizes: Prize[] = [
  { 
    position: 1, 
    description: 'Complete Kart', 
    image: 'placeholder' 
  },
  { 
    position: 2, 
    description: 'Kart (no engine)', 
    image: 'placeholder' 
  },
  { 
    position: 3, 
    description: 'Customized Helmet', 
    image: 'placeholder' 
  },
];

const twentyFiveHourPrizes: Prize[] = [
  { 
    position: 1, 
    description: 'Customized Helmet', 
    image: 'placeholder' 
  },
  { 
    position: 2, 
    description: 'Used MyChron', 
    image: 'placeholder' 
  },
  { 
    position: 3, 
    description: 'Used GoPro', 
    image: 'placeholder' 
  },
];

export function Rankings() {
  const [rankings, setRankings] = useState<RankingData[]>([]);
  const { lastMessage } = useWebSocket();
  const [activeTab, setActiveTab] = useState('50-hour');

  useEffect(() => {
    if (!lastMessage) return;

    try {
      const message = JSON.parse(lastMessage) as RankingMessage;
      if (message.type === 'ranking_update') {
        setRankings(message.data);
      }
    } catch (err) {
      console.error('Error parsing ranking update:', err);
    }
  }, [lastMessage]);

  // Temporary mock data
  useEffect(() => {
    setRankings([
      {
        position: 1,
        name: 'Ahmed Al-Mansoori',
        lapTime: '00:45.321',
        category: 'Senior Max',
        date: '2024-03-15',
        hours: 50,
      },
      {
        position: 2,
        name: 'Sarah Thompson',
        lapTime: '00:45.654',
        category: 'Senior Max',
        date: '2024-03-15',
        hours: 50,
      },
      {
        position: 3,
        name: 'Mohammed Al-Hashimi',
        lapTime: '00:45.987',
        category: 'Senior Max',
        date: '2024-03-14',
        hours: 50,
      },
      {
        position: 4,
        name: 'John Davidson',
        lapTime: '00:46.123',
        category: 'Senior Max',
        date: '2024-03-14',
        hours: 50,
      },
      {
        position: 5,
        name: 'Fatima Al-Sayed',
        lapTime: '00:46.432',
        category: 'Senior Max',
        date: '2024-03-13',
        hours: 50,
      },
    ]);
  }, []);

  // Filter rankings based on active tab
  const filteredRankings = rankings.filter(ranking => 
    activeTab === '50-hour' ? ranking.hours === 50 : ranking.hours === 25
  );

  return (
    <section id="rankings" className="bg-neutral-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Top Lap Times
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-300">
            Our fastest racers across all categories
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="text-white">
            <TabsList className="bg-neutral-800 border border-neutral-700">
              <TabsTrigger value="50-hour" className="data-[state=active]:bg-red-600">50-Hour Challenge</TabsTrigger>
              <TabsTrigger value="25-hour" className="data-[state=active]:bg-red-600">25-Hour Challenge</TabsTrigger>
            </TabsList>
            <TabsContent value="50-hour">
              <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle">
                    <table className="min-w-full divide-y divide-neutral-700">
                      <thead>
                        <tr>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">
                            Position
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                            Name
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                            Lap Time
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                            Category
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-700">
                        {filteredRankings.map((ranking) => (
                          <tr key={`${ranking.name}-${ranking.lapTime}`}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                              {ranking.position}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                              {ranking.name}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                              {ranking.lapTime}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                              {ranking.category}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                              {new Date(ranking.date).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                        {filteredRankings.length === 0 && (
                          <tr>
                            <td colSpan={5} className="py-4 text-center text-sm text-gray-300">
                              No rankings available for this category
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="25-hour">
              <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle">
                    <table className="min-w-full divide-y divide-neutral-700">
                      <thead>
                        <tr>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">
                            Position
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                            Name
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                            Lap Time
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                            Category
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-700">
                        {filteredRankings.map((ranking) => (
                          <tr key={`${ranking.name}-${ranking.lapTime}`}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                              {ranking.position}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                              {ranking.name}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                              {ranking.lapTime}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                              {ranking.category}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                              {new Date(ranking.date).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                        {filteredRankings.length === 0 && (
                          <tr>
                            <td colSpan={5} className="py-4 text-center text-sm text-gray-300">
                              No rankings available for this category
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
} 