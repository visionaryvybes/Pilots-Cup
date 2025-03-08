import { mockKarts } from '../../lib/data/static-data';

export default function handler(req, res) {
  const { category } = req.query;
  
  if (category) {
    const filteredKarts = mockKarts.filter(kart => kart.category === category);
    return res.status(200).json(filteredKarts);
  }
  
  res.status(200).json(mockKarts);
} 