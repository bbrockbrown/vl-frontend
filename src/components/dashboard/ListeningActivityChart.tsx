import { useAnalytics } from '@/context/AnalyticsContext';
import { useMemo } from 'react';
import { graphic } from 'echarts';
import * as echarts from 'echarts/core';
import ReactEchart from '@/components/base/ReactEchart';

export default function ListeningActivityChart() {
  const { data, loading, error } = useAnalytics();
  console.log("received data from context", data?.listeningActivity);

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

  // Calculate totals for summary
  const totalTracks = listeningActivity.reduce((sum, d) => sum + d.tracks, 0);
  const totalHours = listeningActivity.reduce((sum, d) => sum + d.hours, 0);
  const avgTracksPerMonth = Math.round(totalTracks / listeningActivity.length);
  const avgHoursPerMonth = Math.round((totalHours / listeningActivity.length) * 10) / 10;

  // Prepare data for ECharts
  const xAxisData = listeningActivity.map(item => item.month);
  const tracksData = listeningActivity.map(item => item.tracks);
  const hoursData = listeningActivity.map(item => item.hours);

  const option = useMemo(
    () => ({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'none',
        },
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderColor: 'transparent',
        textStyle: {
          color: '#ffffff',
          fontSize: 12,
        },
      },
      grid: {
        top: 40,
        bottom: 40,
        left: 50,
        right: 70,
      },
      xAxis: {
        type: 'category',
        data: xAxisData,
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          margin: 10,
          color: '#9CA3AF',
          fontSize: 11,
        },
      },
      yAxis: [
        {
          type: 'value',
          name: 'Tracks',
          position: 'left',
          axisLabel: {
            color: '#9CA3AF',
            fontSize: 11,
          },
          splitLine: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        {
          type: 'value',
          name: 'Hours',
          position: 'right',
          axisLabel: {
            color: '#9CA3AF',
            fontSize: 11,
          },
          splitLine: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
      ],
      series: [
        {
          name: 'Tracks',
          data: tracksData,
          type: 'line',
          smooth: true,
          showSymbol: false,
          yAxisIndex: 0,
          lineStyle: {
            color: '#3B82F6',
            width: 2,
          },
          areaStyle: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(59, 130, 246, 0.1)',
              },
              {
                offset: 1,
                color: 'rgba(59, 130, 246, 0)',
              },
            ]),
          },
        },
        {
          name: 'Hours',
          data: hoursData,
          type: 'line',
          smooth: true,
          showSymbol: false,
          yAxisIndex: 1,
          lineStyle: {
            color: '#10B981',
            width: 2,
          },
          areaStyle: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(16, 185, 129, 0.1)',
              },
              {
                offset: 1,
                color: 'rgba(16, 185, 129, 0)',
              },
            ]),
          },
        },
      ],
    }),
    [xAxisData, tracksData, hoursData],
  );

  return (
    <div className="bg-card rounded-lg p-6 shadow-sm border border-border mb-8">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-card-foreground">Listening Activity</h3>
        <p className="text-sm text-muted-foreground">Your music consumption over the past month</p>
      </div>

      {/* ECharts Line Chart */}
      <div className="mb-6" style={{ height: '300px' }}>
        <ReactEchart echarts={echarts} option={option} sx={{ height: '100% !important' }} />
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