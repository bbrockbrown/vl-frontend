import { useState, useEffect } from 'react';
import { getMoodDistribution, type MoodDistribution } from '@/api/analytics';

export default function MoodDistribution() {
  const [data, setData] = useState<MoodDistribution | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getMoodDistribution('30d');
        setData(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load mood distribution');
        console.error('Error fetching mood distribution:', err);
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
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="w-4 h-4 bg-muted rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-32"></div>
                  <div className="h-3 bg-muted rounded w-32"></div>
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
          <p>Error loading mood distribution: {error}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const { moodDistribution, avgEnergy, avgValence } = data;

  const moodColors = {
    Energetic: '#EF4444',
    Happy: '#F59E0B',
    Chill: '#10B981',
    Melancholic: '#8B5CF6',
    Aggressive: '#6B7280',
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-card-foreground">Mood Distribution</h3>
        <p className="text-sm text-muted-foreground">Your music mood preferences</p>
      </div>

      <div className="space-y-4">
        {Object.entries(moodDistribution).map(([mood, percentage]) => (
          <div key={mood} className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: moodColors[mood as keyof typeof moodColors] || '#6B7280' }}
              ></div>
              <span className="text-sm font-medium text-card-foreground truncate">
                {mood}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-32 bg-muted rounded-full h-3">
                <div 
                  className="h-3 rounded-full"
                  style={{ 
                    width: `${percentage}%`,
                    backgroundColor: moodColors[mood as keyof typeof moodColors] || '#6B7280'
                  }}
                ></div>
              </div>
              <span className="text-sm font-medium text-card-foreground w-12 text-right">
                {percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-card-foreground">{Math.round(avgEnergy * 10) / 10}</p>
            <p className="text-sm text-muted-foreground">Avg Energy</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-card-foreground">{Math.round(avgValence * 100) / 100}</p>
            <p className="text-sm text-muted-foreground">Avg Valence</p>
          </div>
        </div>
      </div>
    </div>
  );
};