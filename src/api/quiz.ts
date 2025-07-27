import { getApiUrl } from "@/lib/utils";

const API_BASE_URL = getApiUrl();

export interface QuizAnswer {
  questionId: string;
  answer: string | number;
  category: string;
}

export interface SpotifyAnalysis {
  topTracks: any[];
  recentlyPlayed: any[];
  audioFeatures: any[];
  listeningPatterns: {
    averageValence: number;
    averageEnergy: number;
    averageDanceability: number;
    averageTempo: number;
    averageAcousticness: number;
    averageInstrumentalness: number;
  };
}

export interface QuizResult {
  personalityTraits: {
    moodProfile: string;
    energyLevel: string;
    socialStyle: string;
    creativityLevel: string;
    lifestylePattern: string;
  };
  musicCorrelations: {
    moodMusicMatch: number;
    energyMusicMatch: number;
    socialMusicMatch: number;
    creativityMusicMatch: number;
  };
  insights: string[];
  recommendations: string[];
}

// Submit quiz answers and get analysis
export const submitQuizAnswers = async (answers: QuizAnswer[]): Promise<QuizResult> => {
  console.log("answers for submitQuizAnswers", answers);
  const response = await fetch(`${API_BASE_URL}/quiz/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ answers }),
  });

  if (!response.ok) {
    throw new Error('Failed to analyze quiz answers');
  }

  return response.json();
};

// Get detailed Spotify analysis
export const getSpotifyAnalysis = async (): Promise<SpotifyAnalysis> => {
  const response = await fetch(`${API_BASE_URL}/quiz/spotify-analysis`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to get Spotify analysis');
  }

  return response.json();
};

// Get personalized recommendations based on quiz and Spotify data
export const getPersonalizedRecommendations = async (quizAnswers: QuizAnswer[]): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/quiz/recommendations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ quizAnswers }),
  });

  if (!response.ok) {
    throw new Error('Failed to get recommendations');
  }

  return response.json();
}; 