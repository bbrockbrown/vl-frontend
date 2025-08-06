import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { getConsolidatedAnalytics, type ConsolidatedAnalytics } from '@/api/analytics';

interface AnalyticsContextType {
  data: ConsolidatedAnalytics | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

interface AnalyticsProviderProps {
  children: ReactNode;
  timeRange?: string;
}

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ 
  children, 
  timeRange = '30d' 
}) => {
  const [data, setData] = useState<ConsolidatedAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getConsolidatedAnalytics(timeRange);
      setData(response);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load analytics';
      setError(errorMessage);
      console.error('Error fetching consolidated analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const refetch = () => {
    fetchAnalytics();
  };

  const value: AnalyticsContextType = {
    data,
    loading,
    error,
    refetch
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = (): AnalyticsContextType => {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
}; 