import { useQuery } from '@tanstack/react-query';
import api from '../api';

export const useMaps = () => {
  return useQuery({
    queryKey: ['maps'],
    queryFn: async () => {
      const { data } = await api.get('/maps');
      // Filter out 'The Range' if we only want real maps
      return data.data.filter(m => m.displayIcon !== null);
    },
  });
};
