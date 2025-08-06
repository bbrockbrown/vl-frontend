import { useEffect, useRef, useState } from 'react';
import { useAnalytics } from '@/context/AnalyticsContext';
import { RadarChart } from '@mui/x-charts/RadarChart';
import { Tooltip, Zoom } from '@mui/material';
import MoodDistribution from './MoodDistribution';

interface ChartDimensions {
  width: number;
  height: number;
}

export default function AudioFeaturesRadar() {
  const { data, loading, error } = useAnalytics();
  const [showTooltips, setShowTooltips] = useState(false);
  const chartRef = useRef<SVGSVGElement>(null);
  const [chartDimensions, setChartDimensions] = useState<ChartDimensions>({
    width: window.innerWidth < 576 ? 350 : 450,
    height: window.innerWidth < 576 ? 350 : 450,
  });
  const [isMobile, setIsMobile] = useState<boolean>(() => window.innerWidth < 576)
  

  const toggleTooltips = () => {
    setShowTooltips(!showTooltips);
  };

  // Apply colored dots after chart renders
  useEffect(() => {
    if (
      data?.audioFeaturesRadar &&
      data.audioFeaturesRadar.length > 0 &&
      chartRef.current
    ) {
      const timeoutId = setTimeout(() => {
        // Find and color the data points
        const points = chartRef.current!.querySelectorAll(
          '.MuiRadarSeriesPlot-mark'
        );

        points.forEach((point, index) => {
          if (data.audioFeaturesRadar[index]) {
            (point as SVGElement).setAttribute(
              'fill',
              data.audioFeaturesRadar[index].color
            );
            (point as SVGElement).setAttribute(
              'stroke',
              data.audioFeaturesRadar[index].color
            );
            (point as SVGElement).setAttribute('r', '3');
            (point as SVGElement).setAttribute('stroke-width', '2');
          }
        });
      }, 300); // Small delay to ensure chart is rendered

      return () => clearTimeout(timeoutId);
    }
  }, [data?.audioFeaturesRadar]);

  useEffect(() => {
    const handleResize = () => {
      const tempMobile = window.innerWidth < 576;
      setChartDimensions({
        width: tempMobile ? 350 : 450,
        height: tempMobile ? 350 : 450,
      });
      setIsMobile(tempMobile);
    };

    // Set initial dimensions
    handleResize();
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (loading) {
    return (
      <div className='bg-card rounded-lg p-6 shadow-sm border border-border'>
        <div className='text-center mb-6'>
          <h3 className='text-xl font-semibold text-card-foreground'>
            Audio Features Profile
          </h3>
          <p className='text-sm text-muted-foreground'>
            Your music taste characteristics
          </p>
        </div>
        <div className='flex items-center justify-center h-48'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='bg-card rounded-lg p-6 shadow-sm border border-border'>
        <div className='text-center mb-6'>
          <h3 className='text-xl font-semibold text-card-foreground'>
            Audio Features Profile
          </h3>
          <p className='text-sm text-muted-foreground'>
            Your music taste characteristics
          </p>
        </div>
        <div className='text-center text-muted-foreground'>
          <p>Failed to load audio features: {error}</p>
        </div>
      </div>
    );
  }

  if (!data?.audioFeaturesRadar || data.audioFeaturesRadar.length === 0) {
    return (
      <div className='bg-card rounded-lg p-6 shadow-sm border border-border'>
        <div className='text-center mb-6'>
          <h3 className='text-xl font-semibold text-card-foreground'>
            Audio Features Profile
          </h3>
          <p className='text-sm text-muted-foreground'>
            Your music taste characteristics
          </p>
        </div>
        <div className='text-center text-muted-foreground'>
          <p>No audio features available</p>
        </div>
      </div>
    );
  }

  const audioFeatures = data.audioFeaturesRadar;

  return (
    <div className='bg-card rounded-lg p-6 shadow-sm border border-border mb-8'>
      <div className='text-center mb-6'>
        <h3 className='text-xl font-semibold text-card-foreground'>
          Audio Features and Moods Profile
        </h3>
        <p className='text-sm text-muted-foreground'>
          Your music taste characteristics
        </p>
        <button
          onClick={toggleTooltips}
          className='mt-2 px-3 py-1 text-xs bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors md:hidden'
        >
          {showTooltips ? 'Hide' : 'Show'} Tooltips
        </button>
      </div>

      <div className='grid grid-cols-1 xl:grid-cols-2 items-center justify-center mb-7 mt-[-10px]'>
        <div
          className='col-span-1 xl:col-span-1 flex justify-center items-center h-96 w-full relative overflow-visible p-4'
          style={{ overflow: 'visible !important' }}
        >
          <div className='relative'>
            <RadarChart
              ref={chartRef}
              height={chartDimensions.height}
              width={chartDimensions.width}
              series={[
                {
                  data: audioFeatures.map((feature) => feature.value),
                  color: '#3B82F6',
                  fillArea: true,
                },
              ]}
              radar={{
                max: 1,
                metrics: audioFeatures.map((feature) => feature.name),
              }}
              slotProps={{
                tooltip: {
                  trigger: 'axis',
                },
              }}
              sx={{
                '& svg': {
                  overflow: 'visible !important',
                },
                '& .MuiChartsLabel-root': {
                  color: 'white',
                  fontFamily: "'Inter', sans-serif",
                },
                '& @media (max-width: 768px)': {
                  '& text': {
                    display: 'none !important'
                  }
                },
                '& .MuiChartsSurface-root': {
                  fontFamily: "'Inter', sans-serif",
                },
                '& .MuiRadarGrid-radial': {
                  stroke: 'white',
                  strokeWidth: '1px',
                  shapeRendering: 'crispEdges',
                },
                '& .MuiRadarGrid-divider': {
                  stroke: 'white',
                },
                '& svg text': {
                  fill: 'white !important',
                  zIndex: 1000,
                  display: {
                    xs: 'none', // hide on mobile
                    sm: 'block',
                  },
                },
                '& .MuiRadarSeriesPlot-area': {
                  fill: 'url(#gradient) !important',
                  opacity: 1,
                },
              }}
            />

            {/* Clickable circles at hexagon tips for mobile */}
            <div className="md:hidden">
              {audioFeatures.map((feature, index) => {
                // Find the feature's position in the original data order
                const originalIndex = data.audioFeaturesRadar.findIndex(f => f.name === feature.name);
                const angle = (originalIndex / audioFeatures.length) * 2 * Math.PI - 1.57079632679;
                const radius = isMobile ? 125 : 175; // Distance from center
                const centerX = isMobile ? 175 : 225; // Chart center X
                const centerY = isMobile ? 175 : 225; // Chart center Y
                const x = centerX + Math.cos(angle) * radius;
                const y = centerY + Math.sin(angle) * radius;
                
                return (
                  <Tooltip
                    key={index}
                    title={showTooltips ? feature.name : ''}
                    placement="top"
                    arrow
                    open={showTooltips}
                    sx={{
                      '& .MuiTooltip-tooltip': {
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                        color: 'white',
                        fontSize: '14px',
                        padding: '8px 12px',
                      },
                    }}
                    slots={{
                      transition: Zoom,
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        left: x - 8,
                        top: y - 8,
                        width: '16px',
                        height: '16px',
                        backgroundColor: feature.color,
                        borderColor: feature.color,
                        borderWidth: '2px',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        zIndex: 10,
                        transition: 'all 0.2s ease',
                      }}
                      className="hover:opacity-80"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = feature.color;
                        e.currentTarget.style.borderColor = feature.color;
                        e.currentTarget.style.opacity = '0.8';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = feature.color;
                        e.currentTarget.style.borderColor = feature.color;
                        e.currentTarget.style.opacity = '1';
                      }}
                    />
                  </Tooltip>
                );
              })}
            </div>
          </div>
          {/* Enhanced SVG Gradient Definition */}
          <svg
            width='0'
            height='0'
            style={{ position: 'absolute', left: '-9999px' }}
          >
            <defs>
              <linearGradient id='gradient' x1='0%' y1='0%' x2='100%' y2='100%'>
                {audioFeatures.map((feature, index) => (
                  <stop
                    key={index}
                    offset={`${(index / (audioFeatures.length - 1)) * 100}%`}
                    stopColor={feature.color}
                    stopOpacity={1}
                  />
                ))}
                {/* Add more stops for smoother gradient */}
                {audioFeatures.map((feature, index) => (
                  <stop
                    key={`mid-${index}`}
                    offset={`${
                      ((index + 0.5) / (audioFeatures.length - 1)) * 100
                    }%`}
                    stopColor={feature.color}
                    stopOpacity={0.8}
                  />
                ))}
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Feature breakdown */}
        <div className='flex flex-col justify-center gap-4 w-full h-full col-span-1 xl:col-span-1'>
          {audioFeatures.map((feature) => (
            <div
              key={feature.name}
              className='flex items-center justify-between'
            >
              <div className='flex items-center space-x-2'>
                <div
                  className='w-3 h-3 rounded-full'
                  style={{ backgroundColor: feature.color }}
                ></div>
                <span className='text-sm text-muted-foreground'>
                  {feature.name}
                </span>
              </div>
              <div className='flex items-center space-x-2'>
                <div className='sm:w-50 w-25 bg-muted rounded-full h-2'>
                  <div
                    className='h-2 rounded-full'
                    style={{
                      width: `${feature.value * 100}%`,
                      backgroundColor: feature.color,
                    }}
                  ></div>
                </div>
                <span className='text-sm font-medium text-card-foreground'>
                  {Math.round(feature.value * 100)}%
                </span>
              </div>
            </div>
          ))}
          {/* Clarifying note */}
          <div className='mt-4 pt-3'>
            <p className='relative text-xs text-muted-foreground text-center'>
              <span className='text-red-400'>* </span>Each feature is scored
              independently (0-100%). A track can be high in multiple features
              simultaneously.
            </p>
          </div>
        </div>
      </div>

      {/* Mood Distribution */}
      <MoodDistribution />
    </div>
  );
}
