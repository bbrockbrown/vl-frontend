import { useAnalytics } from '@/context/AnalyticsContext';

export default function AudioFeaturesCorrelation() {
  const { data, loading, error } = useAnalytics();

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

  const { audioFeaturesCorrelation } = data;
  const { correlations, strongestCorrelation, mostInfluential, totalRelationships } = audioFeaturesCorrelation;

  return (
    <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-card-foreground">Audio Features Correlation</h3>
        <p className="text-sm text-muted-foreground">How your music features relate to each other</p>
      </div>

      {/* Top 3 Strongest Positive Correlations */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-card-foreground mb-3">Strongest Positive Relationships</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {correlations
            .filter(item => item.correlation > 0)
            .slice(0, 3)
            .map((item) => (
            <div key={`${item.feature1}-${item.feature2}`} className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-medium text-card-foreground">
                {item.feature1[0].toUpperCase() + item.feature1.slice(1)} ↔ {item.feature2[0].toUpperCase() + item.feature2.slice(1)}
                </div>
                <div className="text-xs font-medium px-2 py-1 rounded bg-red-100 text-red-700">
                  Strong
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>-1.0</span>
                  <span>0.0</span>
                  <span>+1.0</span>
                </div>
                              <div className="bg-muted rounded-full h-2 relative">
                {/* Center tick mark at 0.0 */}
                <div 
                  className="absolute top-0 h-2 w-px bg-muted-foreground/30"
                  style={{ 
                    left: '50%',
                    transform: 'translateX(-50%)'
                  }}
                ></div>
                <div 
                  className="absolute top-0 h-2 rounded-full bg-red-500"
                  style={{ 
                    left: `${((item.correlation + 1) / 2) * 100}%`,
                    width: '4px',
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
      </div>

      {/* Bottom 3 Weakest Correlations */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-card-foreground mb-3">Weakest Relationships</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {correlations
            .slice(-3)
            .map((item) => (
            <div key={`${item.feature1}-${item.feature2}`} className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-medium text-card-foreground">
                  {item.feature1[0].toUpperCase() + item.feature1.slice(1)} ↔ {item.feature2[0].toUpperCase() + item.feature2.slice(1)}
                </div>
                <div className="text-xs font-medium px-2 py-1 rounded bg-blue-100 text-blue-700">
                  Weak
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>-1.0</span>
                  <span>0.0</span>
                  <span>+1.0</span>
                </div>
                <div className="bg-muted rounded-full h-2 relative">
                  {/* Center tick mark at 0.0 */}
                  <div 
                    className="absolute top-0 h-2 w-px bg-muted-foreground/30"
                    style={{ 
                      left: '50%',
                      transform: 'translateX(-50%)'
                    }}
                  ></div>
                  <div 
                    className="absolute top-0 h-2 rounded-full bg-gray-500"
                    style={{ 
                      left: `${((item.correlation + 1) / 2) * 100}%`,
                      width: '4px',
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
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-card-foreground">{strongestCorrelation.correlation.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">Strongest Correlation</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-card-foreground">{mostInfluential[0].toUpperCase() + mostInfluential.slice(1)}</p>
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