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
