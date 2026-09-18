import { useQuery } from '@tanstack/react-query';
import api from '../api';

export const useThemes = () => {
  return useQuery({
    queryKey: ['themes'],
    queryFn: async () => {
      const { data } = await api.get('/themes');
      return data.data;
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};
