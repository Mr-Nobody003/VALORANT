import { useQuery } from '@tanstack/react-query';
import api from '../api';

export const useAgents = () => {
  return useQuery({
    queryKey: ['agents'],
    queryFn: async () => {
      const { data } = await api.get('/agents', {
        params: {
          isPlayableCharacter: true
        }
      });
      return data.data; // The valorant-api returns { status, data: [...] }
    },
  });
};
