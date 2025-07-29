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
export declare const submitQuizAnswers: (answers: QuizAnswer[]) => Promise<QuizResult>;
export declare const getSpotifyAnalysis: () => Promise<SpotifyAnalysis>;
export declare const getPersonalizedRecommendations: (quizAnswers: QuizAnswer[]) => Promise<any>;
