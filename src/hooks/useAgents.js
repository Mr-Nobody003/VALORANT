import { useQuery } from '@tanstack/react-query';
import api from '../api';
import { Languages } from 'lucide-react';

export const useAgents = () => {
  return useQuery({
    queryKey: ['agents-v3'],
    queryFn: async () => {
      const { data } = await api.get('/agents', {
        params: {
          language:"en-US",
          isPlayableCharacter: true
        }
      });
      const agents = data.data;
      
      // Determine the latest agent by sorting a copy of the array by releaseDate
      const latestAgent = [...agents].sort((a, b) => {
        const dateA = new Date(a.releaseDate || '1970-01-01T00:00:00Z');
        const dateB = new Date(b.releaseDate || '1970-01-01T00:00:00Z');
        return dateB - dateA;
      })[0];

      return { agents, latestAgent };
    },
  });
};
