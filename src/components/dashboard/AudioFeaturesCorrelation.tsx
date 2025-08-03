import { useState, useEffect } from 'react';
import { getAudioFeaturesCorrelation, type AudioFeaturesCorrelation } from '@/api/analytics';

export default function AudioFeaturesCorrelation() {
  const [data, setData] = useState<AudioFeaturesCorrelation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getAudioFeaturesCorrelation('30d');
        setData(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load audio features correlation');
        console.error('Error fetching audio features correlation:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
        <div className="animate-pulse">
          <div className="h-6 bg-muted rounded w-48 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="h-4 bg-muted rounded w-24"></div>
                  <div className="h-6 bg-muted rounded w-16"></div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="h-3 bg-muted rounded w-8"></div>
                    <div className="h-3 bg-muted rounded w-8"></div>
                    <div className="h-3 bg-muted rounded w-8"></div>
                  </div>
                  <div className="h-2 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded w-12 mx-auto"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
        <div className="text-center text-destructive">
          <p>Error loading audio features correlation: {error}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const { correlations, strongestCorrelation, totalRelationships } = data;

  const getCorrelationColor = (correlation: number) => {
    const absCorrelation = Math.abs(correlation);
    if (absCorrelation > 0.7) return '#EF4444'; // Strong positive
    if (absCorrelation > 0.5) return '#F59E0B'; // Moderate positive
    if (absCorrelation > 0.3) return '#10B981'; // Weak positive
    return '#6B7280'; // Weak/negative
  };

  const getCorrelationLabel = (correlation: number) => {
    const absCorrelation = Math.abs(correlation);
    if (absCorrelation > 0.7) return 'Strong';
    if (absCorrelation > 0.5) return 'Moderate';
    if (absCorrelation > 0.3) return 'Weak';
    return 'None';
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-card-foreground">Audio Features Correlation</h3>
        <p className="text-sm text-muted-foreground">How your music features relate to each other</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {correlations.map((item) => (
          <div key={`${item.feature1}-${item.feature2}`} className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-medium text-card-foreground">
                {item.feature1} ↔ {item.feature2}
              </div>
              <div 
                className="text-xs font-medium px-2 py-1 rounded"
                style={{ 
                  backgroundColor: getCorrelationColor(item.correlation) + '20',
                  color: getCorrelationColor(item.correlation)
                }}
              >
                {getCorrelationLabel(item.correlation)}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>-1.0</span>
                <span>0.0</span>
                <span>+1.0</span>
              </div>
              <div className="bg-muted rounded-full h-2 relative">
                <div 
                  className="absolute top-0 h-2 rounded-full"
                  style={{ 
                    left: `${((item.correlation + 1) / 2) * 100}%`,
                    width: '4px',
                    backgroundColor: getCorrelationColor(item.correlation),
                    transform: 'translateX(-50%)'
                  }}
                ></div>
              </div>
              <div className="text-center">
                <span className="text-sm font-bold text-card-foreground">
                  {item.correlation > 0 ? '+' : ''}{item.correlation.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-card-foreground">{strongestCorrelation.correlation.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">Strongest Correlation</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-card-foreground">{strongestCorrelation.feature1}</p>
            <p className="text-sm text-muted-foreground">Most Influential</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-card-foreground">{totalRelationships}</p>
            <p className="text-sm text-muted-foreground">Key Relationships</p>
          </div>
        </div>
      </div>
    </div>
  );
};