import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import api from '../api';

const GlobalDataPrefetcher = () => {
    const queryClient = useQueryClient();

    useEffect(() => {
        const prefetchData = async () => {
            // We use Promise.allSettled to ensure one failing fetch doesn't stop others
            // Using setTimeout to defer fetching until after the initial render is complete
            setTimeout(() => {
                Promise.allSettled([
                    // Agents
                    queryClient.prefetchQuery({
                        queryKey: ['agents-v3'],
                        queryFn: async () => {
                            const { data } = await api.get('/agents', {
                                params: { language: "en-US", isPlayableCharacter: true }
                            });
                            const agents = data.data;
                            const latestAgent = [...agents].sort((a, b) => {
                                const dateA = new Date(a.releaseDate || '1970-01-01T00:00:00Z');
                                const dateB = new Date(b.releaseDate || '1970-01-01T00:00:00Z');
                                return dateB - dateA;
                            })[0];
                            return { agents, latestAgent };
                        }
                    }),
                    // Maps
                    queryClient.prefetchQuery({
                        queryKey: ['maps'],
                        queryFn: async () => {
                            const { data } = await api.get('/maps');
                            return data.data.filter(m => m.displayIcon !== null);
                        }
                    }),
                    // Competitive Tiers
                    queryClient.prefetchQuery({
                        queryKey: ['competitive-tiers'],
                        queryFn: async () => {
                            const { data } = await api.get('/competitivetiers');
                            return data.data;
                        }
                    }),
                    // Weapons (Skins)
                    queryClient.prefetchQuery({
                        queryKey: ['weapons'],
                        queryFn: async () => {
                            const { data } = await api.get('/weapons');
                            return data.data;
                        }
                    }),
                    // Playercards
                    queryClient.prefetchQuery({
                        queryKey: ['playercards'],
                        queryFn: async () => {
                            const { data } = await api.get('/playercards');
                            return data.data;
                        }
                    }),
                    // Bundles
                    queryClient.prefetchQuery({
                        queryKey: ['bundles'],
                        queryFn: async () => {
                            const { data } = await api.get('/bundles');
                            return data.data;
                        }
                    })
                ]);
            }, 1000); // 1 second delay to prioritize UI rendering
        };

        prefetchData();
    }, [queryClient]);

    return null; // This component doesn't render anything
};

export default GlobalDataPrefetcher;
