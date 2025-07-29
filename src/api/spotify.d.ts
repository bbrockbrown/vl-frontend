export interface SpotifyTokens {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: string;
}
export interface SpotifyUser {
    id: string;
    display_name: string;
    email: string;
    images?: Array<{
        url: string;
        height: number;
        width: number;
    }>;
}
export interface SpotifyTrack {
    id: string;
    name: string;
    artists: Array<{
        id: string;
        name: string;
    }>;
    album: {
        id: string;
        name: string;
        images: Array<{
            url: string;
            height: number;
            width: number;
        }>;
    };
    external_urls: {
        spotify: string;
    };
}
export declare const spotifyLogin: () => void;
export declare const handleSpotifyCallback: (code: string, state: string) => Promise<SpotifyTokens>;
export declare const refreshSpotifyToken: (refreshToken: string) => Promise<SpotifyTokens>;
export declare const getUserTopTracks: (timeRange?: "short_term" | "medium_term" | "long_term", limit?: number) => Promise<any>;
export declare const getUserRecentlyPlayed: (limit?: number) => Promise<any>;
export declare const getTrackAudioFeatures: (trackIds: string[]) => Promise<any>;
export declare const getUserSavedTracks: (limit?: number, offset?: number) => Promise<any>;
