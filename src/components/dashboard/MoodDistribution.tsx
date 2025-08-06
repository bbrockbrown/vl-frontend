import { useAnalytics } from '@/context/AnalyticsContext';
import { BarChart } from '@mui/x-charts/BarChart';

export default function MoodDistribution() {
  const { data, loading, error } = useAnalytics();

  if (loading) {
    return (
      <div className='bg-card rounded-lg p-6 shadow-sm border border-border'>
        <div className='animate-pulse'>
          <div className='h-6 bg-muted rounded w-48 mb-6'></div>
          <div className='space-y-4'>
            {[...Array(5)].map((_, i) => (
              <div key={i} className='flex items-center space-x-4'>
                <div className='w-4 h-4 bg-muted rounded-full'></div>
                <div className='flex-1 space-y-2'>
                  <div className='h-4 bg-muted rounded w-32'></div>
                  <div className='h-3 bg-muted rounded w-32'></div>
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
      <div className='bg-card rounded-lg p-6 shadow-sm border border-border'>
        <div className='text-center text-destructive'>
          <p>Error loading mood distribution: {error}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const { moodDistribution } = data;

  const moodColors = {
    Energetic: '#EF4444',
    Happy: '#F59E0B',
    Chill: '#10B981',
    Melancholic: '#8B5CF6',
    Aggressive: '#6B7280',
    Intimate: '#EC4899',
    Dynamic: '#06B6D4',
  };

  // Convert mood distribution to bar chart data
  const moodData = Object.entries(moodDistribution).map(
    ([mood, percentage]) => ({
      mood,
      percentage,
      color: moodColors[mood as keyof typeof moodColors] || '#6B7280',
    })
  );

  // Sort by percentage for better visualization
  moodData.sort((a, b) => b.percentage - a.percentage);

  // Normalize percentages to sum to exactly 100%
  const totalPercentage = moodData.reduce((sum, item) => sum + item.percentage, 0);
  
  const normalizedMoodData = moodData.map(item => {
    const normalized = Math.round((item.percentage / totalPercentage) * 100);
    return {
      ...item,
      percentage: normalized,
    };
  });

  // Adjust the largest percentage to ensure total is exactly 100%
  const normalizedTotal = normalizedMoodData.reduce((sum, item) => sum + item.percentage, 0);
  if (normalizedTotal !== 100) {
    const largestIndex = normalizedMoodData.findIndex(item => item.percentage === Math.max(...normalizedMoodData.map(d => d.percentage)));
    normalizedMoodData[largestIndex].percentage += (100 - normalizedTotal);
  }

  // Create dataset with one row and multiple series
  const stackedMoodData = [
    {
      category: '',
      ...normalizedMoodData.reduce((acc, { mood, percentage }) => ({
        ...acc,
        [mood]: percentage,
      }), {}),
    },
  ];

  return (
    <div className='h-full border-t border-border pt-5'>
      {/* Horizontal Stacked Bar Chart */}
      <div className='mb-6'>
        <BarChart
          dataset={stackedMoodData}
          yAxis={[
            {
              scaleType: 'band',
              dataKey: 'category',
              tickLabelPlacement: 'middle',
              label: '',
              hideTooltip: true,
            },
          ]}
          series={normalizedMoodData.map(({ mood }) => ({
            dataKey: mood,
            label: mood,
            stack: 'total',
            valueFormatter: (value) => `${value}%`,
          }))}
          margin={{ left: -10 }}
          layout='horizontal'
          height={150}
          sx={{
            '& .MuiChartsAxis-line': {
              stroke: 'white',
            },
            '& .MuiChartsAxis-tick': {
              stroke: 'white',
            },
            '& .MuiChartsAxis-tickLabel': {
              fill: 'white',
              fontSize: '12px',
            },
            '& .MuiChartsAxis-label': {
              fill: 'white',
            },
            '.MuiChartsAxis-root .MuiChartsAxis-line': {
              stroke: 'white',
            },
            '& .MuiChartsBar-label .MuiChartsAxis-label': {
              fill: 'white !important',
              fontSize: '16px', // Change this value to adjust text size
              fontWeight: 'bold',
            },
            '& .MuiBarElement-series-auto-generated-id-0': {
              color: 'white',
            },
            // Target legend specifically without affecting axes
            '& .MuiChartsLegend-root': {
              '& .MuiChartsLegend-label': {
                color: 'white',
                fill: 'white',
              },
            },
            // Ensure axis lines stay white
            '& .MuiChartsAxis-root': {
              // '& tspan': {
              //   display: 'none',
              // },
              '& .MuiChartsAxis-line': {
                stroke: 'white !important',
              },
              '& .MuiChartsAxis-tick': {
                stroke: 'white !important',
              },
            },
            '& .MuiChartsAxis-root .MuiChartsAxis-directionY .MuiChartsAxis-left .MuiChartsAxis-id-defaultized-y-axis-0 .css-1i6astg-MuiChartsAxis-root-MuiChartsYAxis-root': {
              overflow: 'visible',
              '& text': {
                display: 'none',
              }
            },
            // Make bar labels white
            '& .MuiBarLabel-root': {
              fill: 'white !important',
              color: 'white !important',
              stroke: 'white !important',
            },
            '& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel': {
              color: 'white !important',
              fill: 'white !important',
            },
            // Make x-axis label white
            '& .MuiChartsXAxis-root .MuiChartsAxis-label': {
              fill: 'white !important',
              color: 'white !important',
            },
            '& MuiChartsAxis-root-MuiChartsXAxis-root .MuiChartsAxis-label': {
              fill: 'white !important',
              color: 'white !important',
            },
            '& > *': {
              fill: 'white !important',
              color: 'white !important',
            },
            // Hide y-axis label completely
            '& .MuiChartsYAxis-root .MuiChartsAxis-label': {
              display: 'none !important',
            },
            // Color each bar segment with its mood color
            ...normalizedMoodData.reduce((acc, { mood, color }) => ({
              ...acc,
              [`& .MuiBarElement-series-${mood}`]: {
                fill: color,
              },
            }), {}),
          }}
          barLabel={(obj) => {
            // Only show labels on large screens and above
            if (window.innerWidth >= 1024) { // lg breakpoint
              return `${obj.value}%`;
            }
            return null;
          }}
        />
        <div className="text-center text-sm lg:text-md mt-[-20px]">
          Overall Mood Contribution (%)
        </div>
      </div>
    </div>
  );
}
