import { useAnalytics } from '@/context/AnalyticsContext';
import { LineChart } from '@mui/x-charts/LineChart';

export default function ListeningActivityChart() {
  const { data, loading, error } = useAnalytics();

  if (loading) {
    return (
      <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
        <div className="animate-pulse">
          <div className="h-6 bg-muted rounded w-48 mb-6"></div>
          <div className="h-64 bg-muted rounded"></div>
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

  if (!data || !data.listeningActivity || data.listeningActivity.length === 0) {
    return (
      <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
        <div className="text-center text-muted-foreground">
          <p>No listening activity data available</p>
        </div>
      </div>
    );
  }

  const { listeningActivity, listeningPatterns } = data;
  console.log('listeningActivity', listeningActivity)
  console.log('listeningPatterns', listeningPatterns)

  // Prepare data for the line chart
  const chartData = listeningActivity.map((item, index) => ({
    month: item.month,
    tracks: item.tracks,
    hours: item.hours,
    id: index,
  }));

  // Calculate totals for summary
  const totalTracks = listeningActivity.reduce((sum, d) => sum + d.tracks, 0);
  const totalHours = listeningActivity.reduce((sum, d) => sum + d.hours, 0);
  const avgTracksPerMonth = Math.round(totalTracks / listeningActivity.length);
  const avgHoursPerMonth = Math.round((totalHours / listeningActivity.length) * 10) / 10;

  return (
    <div className="bg-card rounded-lg p-6 shadow-sm border border-border mb-8">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-card-foreground">Listening Activity</h3>
        <p className="text-sm text-muted-foreground">Your music consumption over the past month</p>
      </div>

      {/* Line Chart */}
      <div className="mb-6">
        <LineChart
          dataset={chartData}
          xAxis={[
            {
              scaleType: 'band',
              dataKey: 'month',
              tickLabelPlacement: 'middle',
              label: 'Days',
            },
          ]}
          yAxis={[
            {
              scaleType: 'linear',
              label: 'Tracks',
              color: '#3B82F6',
            },
            {
              scaleType: 'linear',
              label: 'Hours',
              color: '#10B981',
              position: 'right',
            },
          ]}
          series={[
            {
              dataKey: 'tracks',
              label: 'Tracks',
              color: '#3B82F6',
              yAxisKey: 'left',
            },
            {
              dataKey: 'hours',
              label: 'Hours',
              color: '#10B981',
              yAxisKey: 'right',
            },
          ]}
          height={300}
          sx={{
            '& .MuiChartsAxis-line': {
              stroke: 'white',
            },
            '& .MuiChartsAxis-tick': {
              stroke: 'white',
            },
            '& .MuiChartsAxis-tickLabel': {
              color: 'white !important',
              fill: 'white',
              fontSize: '12px',

              '& tspan': {
                fill: 'white !important',
                color: 'white !important',
              }
            },
            '& .MuiChartsAxis-label': {
              fill: 'white !important',
              color: 'white',
              fontSize: '14px',
            },
            '& .MuiChartsLegend-root': {
              '& .MuiChartsLegend-label': {
                color: 'white',
                fill: 'white',
              },
            },
            '& .MuiChartsAxis-root': {
              '& .MuiChartsAxis-line': {
                stroke: 'white !important',
              },
              '& .MuiChartsAxis-tick': {
                stroke: 'white !important',
              },
            },
          }}
        />
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-border">
        <div className="text-center">
          <p className="text-2xl font-bold text-card-foreground">
            {totalTracks.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">Total Tracks</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-card-foreground">
            {Math.round(totalHours * 10) / 10}h
          </p>
          <p className="text-sm text-muted-foreground">Total Hours</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-card-foreground">
            {avgTracksPerMonth}
          </p>
          <p className="text-sm text-muted-foreground">Avg Tracks/Month</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-card-foreground">
            {avgHoursPerMonth}h
          </p>
          <p className="text-sm text-muted-foreground">Avg Hours/Month</p>
        </div>
      </div>
    </div>
  );
} 