import React, { type ReactNode } from 'react';
import { type ConsolidatedAnalytics } from '@/api/analytics';
interface AnalyticsContextType {
    data: ConsolidatedAnalytics | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}
interface AnalyticsProviderProps {
    children: ReactNode;
    timeRange?: string;
}
export declare const AnalyticsProvider: React.FC<AnalyticsProviderProps>;
export declare const useAnalytics: () => AnalyticsContextType;
export {};
