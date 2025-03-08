import { mockAvailability } from '../../lib/data/static-data';

export default function handler(req, res) {
  const { category } = req.query;
  
  if (category && mockAvailability[category]) {
    return res.status(200).json({ [category]: mockAvailability[category] });
  }
  
  res.status(200).json(mockAvailability);
} 