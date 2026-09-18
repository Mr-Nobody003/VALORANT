import { useQuery } from '@tanstack/react-query';
import api from '../api';

export const useWeapons = () => {
  return useQuery({
    queryKey: ['weapons'],
    queryFn: async () => {
      const { data } = await api.get('/weapons');
      return data.data;
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};
