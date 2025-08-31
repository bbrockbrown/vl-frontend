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
export declare const getAnalyticsOverview: (timeRange?: string) => Promise<AnalyticsOverview>;
export declare const getListeningActivity: (timeRange?: string) => Promise<ListeningActivity>;
export declare const getMoodDistribution: (timeRange?: string) => Promise<MoodDistribution>;
export declare const getListeningPatterns: (timeRange?: string) => Promise<ListeningPatterns>;
export declare const getAudioFeaturesCorrelation: (timeRange?: string) => Promise<AudioFeaturesCorrelation>;
export declare const getUserTrackIds: (timeRange?: string, limit?: number) => Promise<{
    trackIds: string[];
    timeRange: string;
    totalTracks: number;
    uniqueTracks: number;
}>;
export declare const getTrackAudioFeatures: (trackIds: string[]) => Promise<any>;
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
export declare const getConsolidatedAnalytics: (timeRange?: string) => Promise<ConsolidatedAnalytics>;
