import { useQuery } from '@tanstack/react-query';
import api from '../api';

export const useCompetitiveTiers = () => {
  return useQuery({
    queryKey: ['competitive-tiers'],
    queryFn: async () => {
      const { data } = await api.get('/competitivetiers');
      return data.data;
    },
  });
};
