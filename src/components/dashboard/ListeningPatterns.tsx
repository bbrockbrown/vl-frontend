import { useAnalytics } from '@/context/AnalyticsContext';

export default function ListeningPatterns() {
  const { data, loading, error } = useAnalytics();

  if (loading) {
    return (
      <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
        <div className="animate-pulse">
          <div className="h-6 bg-muted rounded w-48 mb-6"></div>
          <div className="space-y-6">
            <div>
              <div className="h-4 bg-muted rounded w-24 mb-3"></div>
              <div className="space-y-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-12 h-4 bg-muted rounded"></div>
                    <div className="flex-1 h-3 bg-muted rounded"></div>
                    <div className="w-12 h-4 bg-muted rounded"></div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="h-4 bg-muted rounded w-24 mb-3"></div>
              <div className="grid grid-cols-7 gap-2">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="text-center">
                    <div className="h-3 bg-muted rounded mb-1"></div>
                    <div className="bg-muted rounded h-16"></div>
                    <div className="h-3 bg-muted rounded mt-1"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
        <div className="text-center text-destructive">
          <p>Error loading listening patterns: {error}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const { listeningPatterns } = data;
  const { timeOfDay, dayOfWeek, peakTime, peakDay } = listeningPatterns;

  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-card-foreground">Listening Patterns</h3>
        <p className="text-sm text-muted-foreground">When you listen to music</p>
      </div>

      <div className="space-y-6">
        {/* Time of day patterns */}
        <div>
          <h4 className="text-sm font-medium text-card-foreground mb-3">Time of Day</h4>
          <div className="space-y-2">
            {timeOfDay.map((item) => (
              <div key={item.hour} className="flex items-center space-x-3">
                <span className="text-sm text-muted-foreground w-12">
                  {item.hour === 0 ? '12 AM' : item.hour < 12 ? `${item.hour} AM` : item.hour === 12 ? '12 PM' : `${item.hour - 12} PM`}
                </span>
                <div className="flex-1 bg-muted rounded-full h-3">
                  <div 
                    className="h-3 rounded-full bg-blue-500"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-card-foreground w-12 text-right">
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Day of week patterns */}
        <div>
          <h4 className="text-sm font-medium text-card-foreground mb-3">Day of Week</h4>
          <div className="grid grid-cols-7 gap-2">
            {dayOfWeek.map((item) => (
              <div key={item.day} className="text-center">
                <div className="text-xs text-muted-foreground mb-1">{dayNames[item.day]}</div>
                <div className="bg-muted rounded h-16 relative">
                  <div 
                    className="absolute bottom-0 left-0 right-0 rounded bg-green-500"
                    style={{ height: `${item.percentage}%` }}
                  ></div>
                </div>
                <div className="text-xs font-medium text-card-foreground mt-1">
                  {item.percentage}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-card-foreground">{peakTime}</p>
            <p className="text-sm text-muted-foreground">Peak Time</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-card-foreground">{peakDay}</p>
            <p className="text-sm text-muted-foreground">Peak Day</p>
          </div>
        </div>
      </div>
    </div>
  );
};