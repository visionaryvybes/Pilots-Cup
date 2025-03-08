import { mockRankings } from '../../lib/data/static-data';

export default function handler(req, res) {
  const { hours } = req.query;
  
  if (hours) {
    const hoursNum = parseInt(hours, 10);
    const filteredRankings = mockRankings.filter(ranking => ranking.hours === hoursNum);
    return res.status(200).json(filteredRankings);
  }
  
  res.status(200).json(mockRankings);
} 