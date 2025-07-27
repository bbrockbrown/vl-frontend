import { getApiUrl } from "@/lib/utils";

const API_BASE_URL = getApiUrl();

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

// Get user's top tracks
export const getUserTopTracks = async (timeRange: 'short_term' | 'medium_term' | 'long_term' = 'short_term', limit: number = 20): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/api/spotify/top-tracks?time_range=${timeRange}&limit=${limit}`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch top tracks');
  }

  return response.json();
};

// Get user's recently played tracks
export const getUserRecentlyPlayed = async (limit: number = 50): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/api/spotify/recently-played?limit=${limit}`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch recently played tracks');
  }

  return response.json();
};

// Get audio features for tracks
export const getTrackAudioFeatures = async (trackIds: string[]): Promise<any> => {
  const ids = trackIds.join(',');
  const response = await fetch(`${API_BASE_URL}/api/spotify/audio-features?ids=${ids}`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch audio features');
  }

  return response.json();
};

// Get user's saved tracks
export const getUserSavedTracks = async (limit: number = 20, offset: number = 0): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/api/spotify/saved-tracks?limit=${limit}&offset=${offset}`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch saved tracks');
  }

  return response.json();
};
