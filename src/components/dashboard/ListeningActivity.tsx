import { useState, useEffect } from 'react';
import { getListeningActivity, type ListeningActivity } from '@/api/analytics';

export default function ListeningActivity() {
  const [data, setData] = useState<ListeningActivity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getListeningActivity('1y');
        setData(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load listening activity');
        console.error('Error fetching listening activity:', err);
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
          <div className="h-6 bg-muted rounded w-48 mb-4"></div>
          <div className="space-y-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="w-12 h-4 bg-muted rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded" style={{ width: `${Math.random() * 100}%` }}></div>
                  <div className="h-3 bg-muted rounded" style={{ width: `${Math.random() * 100}%` }}></div>
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
          <p>Error loading listening activity: {error}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const { monthlyData } = data;

  const maxTracks = Math.max(...monthlyData.map(d => d.tracks));
  const maxHours = Math.max(...monthlyData.map(d => d.hours));

  return (
    <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-semibold text-card-foreground">Listening Activity</h3>
          <p className="text-sm text-muted-foreground">Your music consumption over the past year</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-muted-foreground">Tracks</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-muted-foreground">Hours</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {monthlyData.map((data) => (
          <div key={data.month} className="flex items-center space-x-4">
            <div className="w-12 text-sm text-muted-foreground font-medium">{data.month}</div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center space-x-2">
                <div 
                  className="h-4 bg-blue-500 rounded"
                  style={{ width: `${maxTracks > 0 ? (data.tracks / maxTracks) * 100 : 0}%` }}
                ></div>
                <span className="text-sm text-muted-foreground w-12">{data.tracks}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div 
                  className="h-3 bg-green-500 rounded"
                  style={{ width: `${maxHours > 0 ? (data.hours / maxHours) * 100 : 0}%` }}
                ></div>
                <span className="text-sm text-muted-foreground w-12">{data.hours}h</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-card-foreground">
              {monthlyData.reduce((sum, d) => sum + d.tracks, 0).toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Total Tracks</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-card-foreground">
              {Math.round(monthlyData.reduce((sum, d) => sum + d.hours, 0) * 10) / 10}h
            </p>
            <p className="text-sm text-muted-foreground">Total Hours</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-card-foreground">{monthlyData.length}</p>
            <p className="text-sm text-muted-foreground">Months</p>
          </div>
        </div>
      </div>
    </div>
  );
};