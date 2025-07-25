import { getApiUrl } from "@/lib/utils";

const API_BASE_URL = getApiUrl();
console.log("API_BASE_URL IS", API_BASE_URL)

// Types
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
  images?: Array<{ url: string; height: number; width: number }>;
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{ id: string; name: string }>;
  album: {
    id: string;
    name: string;
    images: Array<{ url: string; height: number; width: number }>;
  };
  external_urls: { spotify: string };
}

// Spotify OAuth Login
export const spotifyLogin = (): void => {
  window.location.href = `${API_BASE_URL}/auth/spotify/login`;
};

// Handle Spotify callback (called from your callback page)
export const handleSpotifyCallback = async (code: string, state: string): Promise<SpotifyTokens> => {
  const response = await fetch(`${API_BASE_URL}/auth/spotify/callback?code=${code}&state=${state}`);
  
  if (!response.ok) {
    throw new Error('Failed to complete Spotify authentication');
  }
  
  return response.json();
};

// Refresh Spotify access token
export const refreshSpotifyToken = async (refreshToken: string): Promise<SpotifyTokens> => {
  const response = await fetch(`${API_BASE_URL}/auth/spotify/refresh-token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  if (!response.ok) {
    throw new Error('Failed to refresh Spotify token');
  }

  return response.json();
};
