import { IconifyIcon } from '@/components/dashboard/IconifyIcon';
import { useAnalytics } from '@/context/AnalyticsContext';

interface TopCardProps {
  icon: string;
  title: string;
  value: string;
  rate: string;
  isUp: boolean;
}

const TopCard = ({ icon, title, value, rate, isUp }: TopCardProps) => {
  return (
    <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center x-3">
          <div className="flex p-2 bg-primary/10 rounded-lg justify-center items-center mr-3">
            <IconifyIcon icon={icon} className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            <p className="text-2xl font-bold text-card-foreground">{value}</p>
          </div>
        </div>
        <div className={`flex items-center space-x-1 text-sm ${isUp ? 'text-green-500' : 'text-red-500'}`}>
          <IconifyIcon icon={isUp ? 'mdi:trending-up' : 'mdi:trending-down'} className="w-4 h-4" />
          <span>{rate}</span>
        </div>
      </div>
    </div>
  );
};

const TopCards = () => {
  const { data: analyticsData, loading, error } = useAnalytics();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-card rounded-lg p-6 shadow-sm border border-border animate-pulse">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-muted rounded-lg w-10 h-10"></div>
                <div>
                  <div className="h-4 bg-muted rounded w-20 mb-2"></div>
                  <div className="h-8 bg-muted rounded w-16"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="col-span-full bg-destructive/10 rounded-lg p-6 border border-destructive/20">
          <p className="text-destructive text-center">Error loading analytics: {error}</p>
        </div>
      </div>
    );
  }

  if (!analyticsData) {
    return null;
  }

  const { overview } = analyticsData;

  const cardsData = [
    {
      id: 1,
      title: 'Total Tracks',
      value: overview.totalTracks.toLocaleString(),
      rate: `${overview.tracksChange}%`,
      isUp: overview.tracksChange >= 0,
      icon: 'mdi:music-note',
    },
    {
      id: 2,
      title: 'Listening Hours',
      value: `${overview.totalHours}h`,
      rate: `${overview.hoursChange}%`,
      isUp: overview.hoursChange >= 0,
      icon: 'mdi:clock-outline',
    },
    {
      id: 3,
      title: 'Active Days',
      value: overview.activeDays.toString(),
      rate: `${overview.daysChange}%`,
      isUp: overview.daysChange >= 0,
      icon: 'mdi:calendar-check',
    },
    {
      id: 4,
      title: 'Avg Energy',
      value: `${Math.round(overview.avgEnergy * 100)}%`,
      rate: `${overview.energyChange}%`,
      isUp: overview.energyChange >= 0,
      icon: 'mdi:lightning-bolt',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cardsData.map((item) => (
        <TopCard
          key={item.id}
          title={item.title}
          value={item.value}
          rate={item.rate}
          isUp={item.isUp}
          icon={item.icon}
        />
      ))}
    </div>
  );
};

export default TopCards; 