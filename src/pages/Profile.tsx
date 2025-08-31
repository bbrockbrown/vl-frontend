import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnalyticsProvider } from '@/context/AnalyticsContext';
import TopCards from '@/components/dashboard/TopCards';
import AudioFeaturesRadar from '@/components/dashboard/AudioFeaturesRadar';
import AudioFeaturesCorrelation from '@/components/dashboard/AudioFeaturesCorrelation';
import ListeningActivityChart from '@/components/dashboard/ListeningActivityChart';

export default function Profile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated - you might want to add auth check here
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="!text-3xl font-bold text-card-foreground !mb-8 text-center">
            Your Music Profile 🎵
          </h1>
          
          {/* Music Analytics Dashboard */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-card-foreground !mb-6 text-center">
              Your Music Analytics 📊
            </h2>
            
            <AnalyticsProvider timeRange="30d">
              {/* Top Cards */}
              <TopCards />
              <AudioFeaturesRadar />

              <ListeningActivityChart />

              <div>
                <AudioFeaturesCorrelation />
              </div>
            </AnalyticsProvider>
          </div>

          <div className="flex md:flex-row flex-col text-center md:gap-0 gap-3">
            <button
              onClick={() => navigate('/')}
              className="px-8 py-3 w-full bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors mr-4"
            >
              Back to Home
            </button>
            <button
              onClick={() => {
                // TODO: Add export functionality
                console.log('Export profile data');
              }}
              className="px-8 w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Export My Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}