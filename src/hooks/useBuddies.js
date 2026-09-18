import { useQuery } from '@tanstack/react-query';
import api from '../api';

export const useBuddies = () => {
  return useQuery({
    queryKey: ['buddies'],
    queryFn: async () => {
      const { data } = await api.get('/buddies');
      return data.data;
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};
