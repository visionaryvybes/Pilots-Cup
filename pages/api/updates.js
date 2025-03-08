import { mockUpdates } from '../../lib/data/static-data';

export default function handler(req, res) {
  const { type } = req.query;
  
  if (type) {
    const filteredUpdates = mockUpdates.filter(update => update.type === type);
    return res.status(200).json(filteredUpdates);
  }
  
  res.status(200).json(mockUpdates);
} 