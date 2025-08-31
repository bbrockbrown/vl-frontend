import type { SpotifyUser } from '@/api/spotify';
export declare const useUser: () => {
    user: SpotifyUser | null;
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
};
