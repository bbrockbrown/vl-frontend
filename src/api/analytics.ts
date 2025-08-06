import { getApiUrl } from "@/lib/utils";

const API_BASE_URL = getApiUrl();

export interface AnalyticsOverview {
  overview: {
    totalTracks: number;
    totalHours: number;
    activeDays: number;
    avgEnergy: number;
    tracksChange: number;
    hoursChange: number;
    energyChange: number;
    daysChange: number;
  };
  timeRange: string;
}

export interface ListeningActivity {
  monthlyData: Array<{
    month: string;
    tracks: number;
    hours: number;
  }>;
  timeRange: string;
}

export interface MoodDistribution {
  moodDistribution: {
    [key: string]: number;
  };
  avgEnergy: number;
  avgValence: number;
  timeRange: string;
}

export interface ListeningPatterns {
  timeOfDay: Array<{
    hour: number;
    percentage: number;
    duration: number;
  }>;
  dayOfWeek: Array<{
    day: number;
    dayName: string;
    percentage: number;
    duration: number;
  }>;
  peakTime: string;
  peakDay: string;
  timeRange: string;
}

export interface AudioFeaturesCorrelation {
  correlations: Array<{
    feature1: string;
    feature2: string;
    correlation: number;
  }>;
  strongestCorrelation: {
    feature1: string;
    feature2: string;
    correlation: number;
  };
  mostInfluential: string;
  totalRelationships: number;
  timeRange: string;
}

// Analytics API functions
export const getAnalyticsOverview = async (timeRange = '30d'): Promise<AnalyticsOverview> => {
  const response = await fetch(`${API_BASE_URL}/analytics/overview?timeRange=${timeRange}`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch analytics overview');
  }

  return response.json();
};

export const getListeningActivity = async (timeRange = '1y'): Promise<ListeningActivity> => {
  const response = await fetch(`${API_BASE_URL}/analytics/listening-activity?timeRange=${timeRange}`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch listening activity');
  }

  return response.json();
};

export const getMoodDistribution = async (timeRange = '30d'): Promise<MoodDistribution> => {
  const response = await fetch(`${API_BASE_URL}/analytics/mood-distribution?timeRange=${timeRange}`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch mood distribution');
  }

  return response.json();
};

export const getListeningPatterns = async (timeRange = '30d'): Promise<ListeningPatterns> => {
  const response = await fetch(`${API_BASE_URL}/analytics/listening-patterns?timeRange=${timeRange}`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch listening patterns');
  }

  return response.json();
};

export const getAudioFeaturesCorrelation = async (timeRange = '30d'): Promise<AudioFeaturesCorrelation> => {
  const response = await fetch(`${API_BASE_URL}/analytics/audio-features-correlation?timeRange=${timeRange}`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch audio features correlation');
  }

  return response.json();
};

export const getUserTrackIds = async (timeRange = '30d', limit = 50): Promise<{ trackIds: string[]; timeRange: string; totalTracks: number; uniqueTracks: number }> => {
  const response = await fetch(`${API_BASE_URL}/analytics/user-track-ids?timeRange=${timeRange}&limit=${limit}`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user track IDs');
  }

  return response.json();
}; 

export const getTrackAudioFeatures = async (trackIds: string[]) => {
  const queryParams = new URLSearchParams();
  trackIds.forEach(id => queryParams.append('trackIds', id));
  
  const response = await fetch(`${API_BASE_URL}/spotify/multiple-audio-features?${queryParams}`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch track audio features');
  }

  return response.json();
}

// New centralized analytics service
export interface ConsolidatedAnalytics {
  overview: AnalyticsOverview['overview'];
  moodDistribution: MoodDistribution['moodDistribution'];
  avgEnergy: number;
  avgValence: number;
  listeningActivity: ListeningActivity['monthlyData'];
  listeningPatterns: {
    timeOfDay: ListeningPatterns['timeOfDay'];
    dayOfWeek: ListeningPatterns['dayOfWeek'];
    peakTime: string;
    peakDay: string;
  };
  audioFeaturesCorrelation: AudioFeaturesCorrelation;
  audioFeaturesRadar: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  timeRange: string;
}

export const getConsolidatedAnalytics = async (timeRange = '30d'): Promise<ConsolidatedAnalytics> => {
  const response = await fetch(`${API_BASE_URL}/analytics/consolidated?timeRange=${timeRange}`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch consolidated analytics');
  }

  return response.json();
};